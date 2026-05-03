import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import StaticPage from "@/components/StaticPage";
import { CONTACT_EMAIL } from "@/lib/config";
import { siteConfig } from "@/lib/site";

const LAST_UPDATED_ISO = "2026-05-03";
const LAST_UPDATED_BR = "03 de maio de 2026";

export const metadata: Metadata = {
  title: "Termos de uso",
  description:
    "Termos e condições de uso do site e da loja Zerbinatti Coffee — pedidos, entregas, trocas, propriedade intelectual e foro.",
  alternates: { canonical: "/termos" },
  openGraph: {
    title: "Termos de uso — Zerbinatti Coffee",
    description:
      "Termos e condições de uso do site e da loja Zerbinatti Coffee.",
    url: "/termos",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function TermosPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Termos de uso",
        item: `${siteConfig.url}/termos`,
      },
    ],
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="pt-[100px] lg:pt-[120px]">
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Termos" },
          ]}
        />
      </div>
      <StaticPage
        eyebrow="LEGAL"
        title="Termos de uso"
        lastUpdated={LAST_UPDATED_BR}
      >
        <p
          className="font-mono text-[11px] uppercase text-ink-mute"
          style={{ letterSpacing: "0.18em" }}
        >
          ÚLTIMA ATUALIZAÇÃO · {LAST_UPDATED_ISO}
        </p>

        <p className="mt-6">
          Bem-vindo. Estes termos regem o uso do site e dos serviços da
          Zerbinatti Coffee. Ao navegar ou realizar pedidos, você concorda com
          o que está descrito aqui.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          1. Aceitação dos termos
        </h2>
        <p>
          A utilização do site implica aceitação integral destes termos, da{" "}
          <a href="/privacidade" className="text-olive underline decoration-1 underline-offset-4">Política de privacidade</a>{" "}
          e da{" "}
          <a href="/entregas" className="text-olive underline decoration-1 underline-offset-4">Política de entregas</a>.
          Caso discorde de qualquer cláusula, não utilize o site.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          2. Cadastro e conta
        </h2>
        <p>
          Nesta versão do site, não há cadastro de conta. Pedidos são realizados
          via WhatsApp diretamente com a casa. Cadastro e área do cliente serão
          adicionados em fase futura.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          3. Compras e pagamento
        </h2>
        <p>
          Nesta versão, o canal de venda é o WhatsApp comercial. As condições
          comerciais (preço, prazo, frete) são confirmadas no atendimento. Em
          fase futura, integraremos pagamento online via Stripe (cartão e PIX).
          Toda informação de produto, preço e disponibilidade está sujeita a
          alteração sem aviso prévio.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          4. Entrega
        </h2>
        <p>
          Atendemos todo o território nacional. O prazo é estimado pelo CEP no
          momento do atendimento. Capitais costumam receber em 3–5 dias úteis;
          interior em 5–8 dias úteis. Pedidos confirmados até quarta-feira
          entram na torra da semana e são postados na sexta.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          5. Trocas e devoluções
        </h2>
        <p>
          Conforme o Código de Defesa do Consumidor (Lei 8.078/90), você tem 7
          dias após o recebimento para arrependimento. Por questão de higiene
          alimentar, pacotes de café <strong>já abertos</strong> não são
          aceitos para devolução. Trocas por produto avariado em transporte são
          feitas integralmente, mediante registro fotográfico.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          6. Propriedade intelectual
        </h2>
        <p>
          A marca <strong>Zerbinatti Coffee</strong>, o conteúdo da Revista, as
          fotografias e a identidade visual são de propriedade da casa e
          protegidos pela legislação brasileira de direitos autorais e marcas.
          Reprodução total ou parcial requer autorização escrita.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          7. Conduta do usuário
        </h2>
        <p>
          É proibido: scraping automatizado de conteúdo, uso de bots para
          consumir formulários, tentativa de acesso não autorizado a áreas
          administrativas, engenharia reversa de APIs e qualquer atividade que
          comprometa a integridade do serviço.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          8. Limitação de responsabilidade
        </h2>
        <p>
          A Zerbinatti Coffee responde pelos danos diretos comprovadamente
          decorrentes de falha na prestação do serviço. Não nos responsabilizamos
          por indisponibilidades pontuais decorrentes de manutenção, força maior
          ou ações de terceiros (provedor de hospedagem, transportadora,
          operadora de pagamento).
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          9. Lei aplicável e foro
        </h2>
        <p>
          Estes termos são regidos pela legislação brasileira. Fica eleito o
          foro da comarca de São Paulo (SP) para dirimir eventuais
          controvérsias.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          10. Contato
        </h2>
        <p>
          Dúvidas sobre estes termos:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-olive underline decoration-1 underline-offset-4">{CONTACT_EMAIL}</a>.
        </p>
      </StaticPage>
      <Footer />
    </>
  );
}
