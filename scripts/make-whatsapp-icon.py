"""
Gera icone redondo (com bleed quadrado) pra grupo de WhatsApp.

Output: public/assets/whatsapp-group-icon.png 1024x1024
Tambem gera variant 512x512 pra upload mais leve.

Design:
- Fundo radial mocha velluto (#1F1611 -> #100A07)
- 2 aneis orbitais dourados concentricos (8px externo, 2px interno tracejado)
- Wordmark "Zerbinatti" centralizado (gold) escala segura
- Pequenos pontos orbitais (3 graos de cafe estilizados) ao longo do anel externo

WhatsApp aplica crop circular — composicao mantem safe zone de ~78% do quadrado.
"""

from PIL import Image, ImageDraw, ImageFilter
import math
import os

SIZE = 1024
OUT_DIR = r"C:/Users/fabio/dev/zerbinatti-coffee/public/assets"
WORDMARK_PATH = os.path.join(OUT_DIR, "zerbinatti-wordmark-gold.png")
OUT_1024 = os.path.join(OUT_DIR, "whatsapp-group-icon.png")
OUT_512 = os.path.join(OUT_DIR, "whatsapp-group-icon-512.png")

# Paleta da marca
MOCHA_LIGHT = (44, 30, 22)   # #2C1E16 — centro do gradiente
MOCHA_DARK = (16, 10, 7)     # #100A07 — borda do gradiente
GOLD = (201, 169, 97)        # #C9A961
GOLD_SOFT = (252, 233, 168)  # #FCE9A8

def radial_background(size):
    """Cria fundo radial mocha velluto."""
    img = Image.new("RGB", (size, size), MOCHA_DARK)
    px = img.load()
    cx, cy = size / 2, size / 2
    max_d = math.hypot(cx, cy)
    for y in range(size):
        for x in range(size):
            d = math.hypot(x - cx, y - cy) / max_d
            # ease-out: centro mais claro, cantos mais escuros
            t = d ** 1.4
            r = int(MOCHA_LIGHT[0] * (1 - t) + MOCHA_DARK[0] * t)
            g = int(MOCHA_LIGHT[1] * (1 - t) + MOCHA_DARK[1] * t)
            b = int(MOCHA_LIGHT[2] * (1 - t) + MOCHA_DARK[2] * t)
            px[x, y] = (r, g, b)
    return img

def make_icon():
    bg = radial_background(SIZE).convert("RGBA")

    # Camada de aneis orbitais
    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx = cy = SIZE / 2

    # Anel externo solido (~78% do diametro = safe zone do crop circular do WA)
    r_outer = int(SIZE * 0.46)
    draw.ellipse(
        (cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer),
        outline=GOLD + (200,),
        width=6,
    )
    # Anel interno mais sutil
    r_inner = int(SIZE * 0.40)
    draw.ellipse(
        (cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner),
        outline=GOLD + (90,),
        width=2,
    )

    # Anel externo mais externo (decorativo) — bem proximo da borda quadrada
    # mas dentro da safe zone circular do WhatsApp
    r_far = int(SIZE * 0.49)
    draw.ellipse(
        (cx - r_far, cy - r_far, cx + r_far, cy + r_far),
        outline=GOLD + (60,),
        width=1,
    )

    # Tres "graos" orbitais (pontos dourados nos 120deg) — referencia ao cafe
    bead_radius = 9
    for deg in (-30, 90, 210):
        rad = math.radians(deg)
        bx = cx + r_outer * math.cos(rad)
        by = cy + r_outer * math.sin(rad)
        # Halo brilhante embaixo
        draw.ellipse(
            (bx - bead_radius - 4, by - bead_radius - 4, bx + bead_radius + 4, by + bead_radius + 4),
            fill=GOLD_SOFT + (60,),
        )
        draw.ellipse(
            (bx - bead_radius, by - bead_radius, bx + bead_radius, by + bead_radius),
            fill=GOLD + (255,),
        )

    # Glow suave atras do wordmark — radial dourado central
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    glow_r = int(SIZE * 0.32)
    gdraw.ellipse(
        (cx - glow_r, cy - glow_r, cx + glow_r, cy + glow_r),
        fill=GOLD + (38,),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=60))

    # Compose: bg + glow + aneis
    out = Image.alpha_composite(bg, glow)
    out = Image.alpha_composite(out, overlay)

    # Wordmark — escala pra caber ~64% da largura do icone (folga lateral)
    wordmark = Image.open(WORDMARK_PATH).convert("RGBA")
    target_w = int(SIZE * 0.64)
    ratio = target_w / wordmark.width
    target_h = int(wordmark.height * ratio)
    wordmark = wordmark.resize((target_w, target_h), Image.LANCZOS)

    # Posicao: centralizado horizontal, levemente acima do meio pra dar
    # respiro pra eventual subtitulo (mantemos sem subtitulo pra leitura
    # em tamanhos pequenos do WhatsApp).
    wx = int(cx - target_w / 2)
    wy = int(cy - target_h / 2)
    out.paste(wordmark, (wx, wy), wordmark)

    # Salva 1024 e 512
    out.save(OUT_1024, "PNG", optimize=True)
    out_512 = out.resize((512, 512), Image.LANCZOS)
    out_512.save(OUT_512, "PNG", optimize=True)
    print(f"Saved {OUT_1024} (1024x1024)")
    print(f"Saved {OUT_512} (512x512)")

if __name__ == "__main__":
    make_icon()
