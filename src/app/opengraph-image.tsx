import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F4EFE6",
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
            color: "#4A5237",
            fontSize: "18px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
            fontWeight: 500,
          }}
        >
          <div style={{ width: "60px", height: "1px", backgroundColor: "#4A5237" }} />
          <span>desde 1897</span>
        </div>

        {/* Bloco central — nome */}
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
              color: "#1B1714",
              lineHeight: 1,
              letterSpacing: "-0.025em",
              fontWeight: 400,
            }}
          >
            Zerbinatti
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#4A5237",
              fontStyle: "italic",
              marginTop: "16px",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Café brasileiro, casa italiana
          </div>
        </div>

        {/* Rodape — tagline tecnica */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#3A322C",
          }}
        >
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              lineHeight: 1.4,
              maxWidth: "640px",
            }}
          >
            Café especial brasileiro torrado na semana, direto da Serra do Cabral.
            Assinatura quinzenal ou mensal.
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "16px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#736961",
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
