import { ImageResponse } from "next/og";
import { product, getSkuById } from "@/lib/data/products";

export const alt = "Café Zerbinatti — pacote da casa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default async function CafeOpenGraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const sku = getSkuById(slug);

  const title = sku ? product.name : "Café Zerbinatti";
  const subtitle = sku
    ? `${sku.weight} · ${sku.format === "graos" ? "em grãos" : "moído"} · ${formatBRL(sku.price)}`
    : "Pacote da casa";
  const footerLine = sku
    ? `Bourbon Amarelo + Catuaí Vermelho · Serra do Cabral · Score SCA ${product.score}`
    : "Casa italiana, café brasileiro";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1B1714",
          padding: "80px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Hairline superior */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#A8B188",
            fontSize: "18px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
        >
          <div style={{ width: "60px", height: "1px", backgroundColor: "#A8B188" }} />
          <span>desde 1897 · pacote da casa</span>
        </div>

        {/* Bloco central */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "128px",
              color: "#F4EFE6",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              fontWeight: 400,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#A8B188",
              fontStyle: "italic",
              marginTop: "20px",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Rodape */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#D9D2C5",
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "20px",
              lineHeight: 1.4,
              maxWidth: "700px",
            }}
          >
            {footerLine}
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "16px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#A8B188",
              fontWeight: 500,
            }}
          >
            zerbinatticoffee.com
          </div>
        </div>

        {/* Borda inferior olive */}
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: "8px",
            backgroundColor: "#4A5237",
          }}
        />
      </div>
    ),
    size
  );
}
