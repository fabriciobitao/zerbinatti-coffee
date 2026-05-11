"""
Variante do icone WhatsApp para o grupo "development team".

Output: public/assets/whatsapp-group-icon-devteam.png 1024x1024 + 512.

Design (vs icone Zerbinatti original):
- Mesma paleta mocha + dois aneis orbitais dourados
- Wordmark "Zerbinatti" centralizado, escala reduzida pra deixar respiro
- "COFFEE" (Georgia small caps, ouro mais suave) imediatamente abaixo
- Linha fina + "development team" em mono (Consolas) bem discreta, na parte
  inferior dentro da safe zone — label sem caixa alta pra ficar despretensiosa
"""

from PIL import Image, ImageDraw, ImageFilter, ImageFont
import math
import os

SIZE = 1024
OUT_DIR = r"C:/Users/fabio/dev/zerbinatti-coffee/public/assets"
WORDMARK_PATH = os.path.join(OUT_DIR, "zerbinatti-wordmark-gold.png")
OUT_1024 = os.path.join(OUT_DIR, "whatsapp-group-icon-devteam.png")
OUT_512 = os.path.join(OUT_DIR, "whatsapp-group-icon-devteam-512.png")

FONT_SERIF = r"C:/Windows/Fonts/georgia.ttf"
FONT_SERIF_ITALIC = r"C:/Windows/Fonts/georgiai.ttf"
FONT_MONO = r"C:/Windows/Fonts/consola.ttf"

MOCHA_LIGHT = (44, 30, 22)
MOCHA_DARK = (16, 10, 7)
GOLD = (201, 169, 97)
GOLD_SOFT = (252, 233, 168)
INK_2 = (160, 138, 110)  # gold dessaturado pra textos secundarios


def radial_background(size):
    img = Image.new("RGB", (size, size), MOCHA_DARK)
    px = img.load()
    cx, cy = size / 2, size / 2
    max_d = math.hypot(cx, cy)
    for y in range(size):
        for x in range(size):
            d = math.hypot(x - cx, y - cy) / max_d
            t = d ** 1.4
            r = int(MOCHA_LIGHT[0] * (1 - t) + MOCHA_DARK[0] * t)
            g = int(MOCHA_LIGHT[1] * (1 - t) + MOCHA_DARK[1] * t)
            b = int(MOCHA_LIGHT[2] * (1 - t) + MOCHA_DARK[2] * t)
            px[x, y] = (r, g, b)
    return img


def make_icon():
    bg = radial_background(SIZE).convert("RGBA")

    overlay = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    cx = cy = SIZE / 2

    r_outer = int(SIZE * 0.46)
    draw.ellipse((cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer),
                 outline=GOLD + (200,), width=6)
    r_inner = int(SIZE * 0.40)
    draw.ellipse((cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner),
                 outline=GOLD + (90,), width=2)
    r_far = int(SIZE * 0.49)
    draw.ellipse((cx - r_far, cy - r_far, cx + r_far, cy + r_far),
                 outline=GOLD + (60,), width=1)

    # 3 graos orbitais
    bead_r = 9
    for deg in (-30, 90, 210):
        rad = math.radians(deg)
        bx = cx + r_outer * math.cos(rad)
        by = cy + r_outer * math.sin(rad)
        draw.ellipse((bx - bead_r - 4, by - bead_r - 4, bx + bead_r + 4, by + bead_r + 4),
                     fill=GOLD_SOFT + (60,))
        draw.ellipse((bx - bead_r, by - bead_r, bx + bead_r, by + bead_r),
                     fill=GOLD + (255,))

    # Glow central atras do wordmark
    glow = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    glow_r = int(SIZE * 0.32)
    gdraw.ellipse((cx - glow_r, cy - glow_r, cx + glow_r, cy + glow_r),
                  fill=GOLD + (38,))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=60))

    out = Image.alpha_composite(bg, glow)
    out = Image.alpha_composite(out, overlay)

    # Wordmark — escala generosa (~78%) pra dominar visualmente o circulo
    wordmark = Image.open(WORDMARK_PATH).convert("RGBA")
    target_w = int(SIZE * 0.78)
    ratio = target_w / wordmark.width
    target_h = int(wordmark.height * ratio)
    wordmark = wordmark.resize((target_w, target_h), Image.LANCZOS)

    # Posicao: bem deslocado pra cima pra abrir espaco generoso embaixo
    wx = int(cx - target_w / 2)
    wy = int(cy - target_h / 2) - 110
    out.paste(wordmark, (wx, wy), wordmark)

    # "COFFEE" — small caps com letterspacing simulado, maior
    text_layer = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(text_layer)
    coffee_font = ImageFont.truetype(FONT_SERIF, 74)
    coffee_text = "C O F F E E"
    cw = tdraw.textlength(coffee_text, font=coffee_font)
    tdraw.text((cx - cw / 2, wy + target_h + 2), coffee_text,
               fill=GOLD + (235,), font=coffee_font)

    # Divisor decorativo: linha mais larga
    div_y = wy + target_h + 130
    div_len = 180
    tdraw.line((cx - div_len / 2, div_y, cx + div_len / 2, div_y),
               fill=GOLD + (180,), width=3)
    tdraw.polygon(
        [(cx, div_y - 8), (cx + 8, div_y), (cx, div_y + 8), (cx - 8, div_y)],
        fill=GOLD + (255,),
    )

    # "development squad" — italic, bem maior (legibilidade total)
    label_font = ImageFont.truetype(FONT_SERIF_ITALIC, 68)
    label_text = "development squad"
    lw = tdraw.textlength(label_text, font=label_font)
    tdraw.text((cx - lw / 2, div_y + 28), label_text,
               fill=INK_2 + (245,), font=label_font)

    out = Image.alpha_composite(out, text_layer)

    out.save(OUT_1024, "PNG", optimize=True)
    out_512 = out.resize((512, 512), Image.LANCZOS)
    out_512.save(OUT_512, "PNG", optimize=True)
    print(f"Saved {OUT_1024}")
    print(f"Saved {OUT_512}")


if __name__ == "__main__":
    make_icon()
