"""Cria banner pro checkout: fundo dark + wordmark cream centralizado.
Vai cobrir o header inteiro do Shopify checkout (Logo position: Full width)."""
from PIL import Image
import os

ASSETS = r"C:\Users\fabio\dev\zerbinatti-coffee\public\assets"
SRC = os.path.join(ASSETS, "logo-white.png")
OUT = os.path.join(ASSETS, "zerbinatti-checkout-banner-dark.png")

BG = (31, 22, 17, 255)
W, H = 2400, 240
WORDMARK_HEIGHT = 140

src = Image.open(SRC).convert("RGBA")
ratio = WORDMARK_HEIGHT / src.height
new_w = int(src.width * ratio)
src = src.resize((new_w, WORDMARK_HEIGHT), Image.LANCZOS)

bg = Image.new("RGBA", (W, H), BG)
x = (W - src.width) // 2
y = (H - src.height) // 2
bg.paste(src, (x, y), src)

bg.convert("RGB").save(OUT, "PNG", optimize=True)
print(f"Saved: {OUT} ({W}x{H})")
