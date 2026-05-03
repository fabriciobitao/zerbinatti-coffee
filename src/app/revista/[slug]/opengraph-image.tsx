import { ImageResponse } from "next/og";
import { getArticleBySlug } from "@/lib/sanity/queries";

export const alt = "Revista Zerbinatti — Ensaios sobre café e tradição";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = { slug: string };

const CATEGORY_LABEL: Record<string, string> = {
  tecnica: "Técnica",
  historia: "História",
  receitas: "Receitas",
  lugares: "Lugares",
};

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;

  let title = "Revista Zerbinatti";
  let category = "Notas da casa";

  try {
    const article = await getArticleBySlug(slug);
    if (article) {
      title = article.title;
      category = CATEGORY_LABEL[article.category] ?? article.category;
    }
  } catch {
    // graceful fallback se Sanity nao configurado ou indisponivel
  }

  // Reduz fonte do titulo se for longo demais
  const titleFontSize =
    title.length > 60 ? "64px" : title.length > 40 ? "84px" : "104px";

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
        {/* Hairline superior — categoria mono */}
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
          <span>revista · {category.toLowerCase()}</span>
        </div>

        {/* Bloco central — titulo do artigo */}
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
              fontSize: titleFontSize,
              color: "#1B1714",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 400,
              maxWidth: "1040px",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "32px",
              color: "#4A5237",
              fontStyle: "italic",
              marginTop: "24px",
              letterSpacing: "-0.01em",
              fontWeight: 400,
            }}
          >
            Editorial Zerbinatti
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
              fontSize: "18px",
              lineHeight: 1.4,
              maxWidth: "640px",
              fontStyle: "italic",
            }}
          >
            Notas da casa: técnica, história, lugares e receitas.
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
