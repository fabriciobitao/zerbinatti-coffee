import { ImageResponse } from "next/og";

export const alt = "Para empresas — Equipamento e grão recorrente | Zerbinatti";
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
          <span>zerbinatti b2b · desde 1897</span>
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
              color: "#1B1714",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 400,
            }}
          >
            Para empresas
          </div>
          <div
            style={{
              fontSize: "44px",
              color: "#4A5237",
              fontStyle: "italic",
              marginTop: "20px",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Equipamento e grão recorrente
          </div>
        </div>

        {/* Rodape */}
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
              fontSize: "20px",
              lineHeight: 1.4,
              maxWidth: "640px",
            }}
          >
            Máquina profissional em comodato + grão torrado na semana. Quatro modelos para equipes de 5 a 500.
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
