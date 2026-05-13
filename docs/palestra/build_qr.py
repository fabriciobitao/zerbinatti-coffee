"""
QR code Zerbinatti — logo oficial dentro de orbital redondo dourado.
Error correction H (30%) para aguentar oclusao circular.

- Crop do logo de public/images/farm/brand-composition.webp
- Circle cream com borda dourada dupla (orbital) sobre QR
- Validacao via api.qrserver.com
"""
import os
from PIL import Image, ImageDraw, ImageFilter
import qrcode
from qrcode.constants import ERROR_CORRECT_H

URL = "https://zerbinatticoffee.com"
OUT = "/Users/fabricio/dev/cafe/docs/palestra/img/qr-zerbinatti.png"
BRAND_SRC = "/Users/fabricio/dev/cafe/public/images/farm/brand-composition.webp"

CREAM = (236, 236, 236)
BLACK = (10, 10, 10)
GOLD = (201, 169, 97)
GOLD_LIGHT = (221, 200, 160)
GOLD_DARK = (138, 115, 66)

# -----------------------------------------------------------------------------
# 1. Gerar QR base
# -----------------------------------------------------------------------------
qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,
    box_size=22,
    border=2,
)
qr.add_data(URL)
qr.make(fit=True)

img = qr.make_image(fill_color=BLACK, back_color=CREAM).convert("RGB")
W, H = img.size
cx, cy = W // 2, H // 2

# -----------------------------------------------------------------------------
# 2. Cropar logo de brand-composition.webp
# Logo (flags + Zerbinatti + Dall'italia) ~y=580..1180, x=260..1190
# -----------------------------------------------------------------------------
brand = Image.open(BRAND_SRC).convert("RGB")
logo_crop = brand.crop((230, 565, 1230, 1195))  # ~1000x630
LW, LH = logo_crop.size

# -----------------------------------------------------------------------------
# 3. Orbital circular (medalhao) — wood texture do logo como interior natural
# -----------------------------------------------------------------------------
SS = 4
# Diametro do orbital: ~28% da largura do QR
diam = int(W * 0.28)
diam_ss = diam * SS

# Cropar o logo NATIVO (com wood texture) — escalar para preencher o circulo
# Crop maior pra deixar o logo confortavel dentro do circulo (sem cortar Zerbinatti nas pontas)
# Logo natural ~930px wide. Circulo inscreve quadrado de 0.707*D — entao logo deve ser ~70% do crop.
brand_full = Image.open(BRAND_SRC).convert("RGB")
crop_size = 1300
ccx, ccy = 730, 880
disc_src = brand_full.crop((ccx - crop_size // 2, ccy - crop_size // 2,
                             ccx + crop_size // 2, ccy + crop_size // 2))
disc_resized = disc_src.resize((diam_ss, diam_ss), Image.LANCZOS).convert("RGBA")

# Mascara circular
mask = Image.new("L", (diam_ss, diam_ss), 0)
md = ImageDraw.Draw(mask)
md.ellipse([0, 0, diam_ss - 1, diam_ss - 1], fill=255)

orbital = Image.new("RGBA", (diam_ss, diam_ss), (0, 0, 0, 0))
orbital.paste(disc_resized, (0, 0), mask)

# Borda dourada dupla (medalhao)
od = ImageDraw.Draw(orbital)
ring_outer = max(4, int(diam_ss * 0.022))
ring_inner_w = max(2, int(diam_ss * 0.008))
ring_inner_gap = int(diam_ss * 0.022)

# Anel externo grosso (dourado)
od.ellipse([0, 0, diam_ss - 1, diam_ss - 1], outline=(*GOLD_DARK, 255), width=ring_outer)
# Anel interno fino (dourado claro)
gap = ring_outer + ring_inner_gap
od.ellipse(
    [gap, gap, diam_ss - gap - 1, diam_ss - gap - 1],
    outline=(*GOLD_LIGHT, 255),
    width=ring_inner_w,
)

# Brilho leve no topo (highlight de medalhao)
hl = Image.new("RGBA", (diam_ss, diam_ss), (0, 0, 0, 0))
hd = ImageDraw.Draw(hl)
hd.ellipse(
    [int(diam_ss * 0.15), int(diam_ss * 0.08), int(diam_ss * 0.85), int(diam_ss * 0.45)],
    fill=(255, 240, 200, 28),
)
hl = hl.filter(ImageFilter.GaussianBlur(radius=diam_ss * 0.02))
orbital = Image.alpha_composite(orbital, hl)

# Downsample para antialias
orbital_final = orbital.resize((diam, diam), Image.LANCZOS)

# -----------------------------------------------------------------------------
# 4. Sombra circular suave
# -----------------------------------------------------------------------------
shadow_pad = 14
shadow = Image.new("RGBA", (diam + shadow_pad * 2, diam + shadow_pad * 2), (0, 0, 0, 0))
sd = ImageDraw.Draw(shadow)
for i in range(shadow_pad, 0, -2):
    alpha = int(50 * (1 - i / shadow_pad))
    sd.ellipse(
        [shadow_pad - i, shadow_pad - i + 4, diam + shadow_pad + i, diam + shadow_pad + i + 4],
        fill=(0, 0, 0, alpha),
    )
shadow = shadow.filter(ImageFilter.GaussianBlur(radius=7))

# -----------------------------------------------------------------------------
# 5. Composita: QR -> shadow -> orbital
# -----------------------------------------------------------------------------
img_rgba = img.convert("RGBA")
sh_x = cx - (diam // 2) - shadow_pad
sh_y = cy - (diam // 2) - shadow_pad
img_rgba.alpha_composite(shadow, (sh_x, sh_y))
img_rgba.alpha_composite(orbital_final, (cx - diam // 2, cy - diam // 2))

img_rgba.convert("RGB").save(OUT, "PNG", dpi=(300, 300))
print(f"Saved: {OUT} ({W}x{H}) orbital diam={diam}")

# -----------------------------------------------------------------------------
# 6. Validar scanneabilidade via api.qrserver.com
# -----------------------------------------------------------------------------
import subprocess
result = subprocess.run(
    ["curl", "-s", "-F", f"file=@{OUT}", "https://api.qrserver.com/v1/read-qr-code/"],
    capture_output=True, text=True, timeout=30,
)
out = result.stdout.strip()
print(f"Decoder: {out[:200]}")
if URL in out:
    print(f"✓ QR scanneavel — decodificou {URL}")
elif '"data":null' in out or '"error"' in out and 'null' not in out.split('"error"')[1][:30]:
    print(f"✗ QR NAO decodificou — reduzir orbital ou reaumentar margem")
else:
    print(f"⚠ Resposta inesperada do decoder")
