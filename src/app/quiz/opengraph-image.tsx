import { ImageResponse } from "next/og";

export const alt = "Qual café é o seu? — Quiz Zerbinatti em 30 segundos";
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
          <span>teste da casa · 30 segundos</span>
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
              display: "flex",
              flexDirection: "column",
              fontSize: "120px",
              color: "#F4EFE6",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 400,
            }}
          >
            <span>Qual café</span>
            <span>é o seu?</span>
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
            3 perguntas, 30 segundos
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
              maxWidth: "640px",
            }}
          >
            A casa indica o pacote certo e a frequência de envio. Sem cadastro, sem fricção.
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
