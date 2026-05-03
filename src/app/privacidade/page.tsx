import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import StaticPage from "@/components/StaticPage";
import { siteConfig } from "@/lib/site";

const DPO_EMAIL = "dpo@zerbinatticoffee.com";
const LAST_UPDATED_ISO = "2026-05-03";
const LAST_UPDATED_BR = "03 de maio de 2026";

export const metadata: Metadata = {
  title: "Privacidade · Zerbinatti",
  description:
    "Como a Zerbinatti coleta, usa, compartilha e protege seus dados pessoais — bases legais, direitos do titular e contato do DPO. Em conformidade com a LGPD.",
  alternates: { canonical: "/privacidade" },
  openGraph: {
    type: "article",
    locale: "pt_BR",
    url: "/privacidade",
    title: "Privacidade · Zerbinatti",
    description:
      "Política de privacidade LGPD-compliant. Dados coletados, bases legais e direitos do titular.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacidade · Zerbinatti",
    description: "Política de privacidade LGPD-compliant da Zerbinatti.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacidadePage() {
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
        name: "Política de privacidade",
        item: `${siteConfig.url}/privacidade`,
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
            { label: "Privacidade" },
          ]}
        />
      </div>
      <StaticPage
        eyebrow="LEGAL"
        title="Política de privacidade"
        lastUpdated={LAST_UPDATED_BR}
      >
        <p
          className="font-mono text-[11px] uppercase text-ink-mute"
          style={{ letterSpacing: "0.18em" }}
        >
          ÚLTIMA ATUALIZAÇÃO · {LAST_UPDATED_ISO}
        </p>

        <p className="mt-6">
          A Zerbinatti Coffee respeita seus dados e trata informações pessoais
          em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei
          13.709/2018). Este documento descreve, em linguagem direta, o que
          coletamos, por quê, com quem compartilhamos e como você pode exercer
          seus direitos.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          1. Quem somos
        </h2>
        <p>
          Controlador dos dados: <strong>Zerbinatti Coffee</strong> — CNPJ a ser
          informado em ficha cadastral fiscal, com sede na Serra do Cabral, Minas
          Gerais, Brasil. Endereço comercial completo é fornecido sob solicitação
          ao DPO.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          2. Encarregado de dados (DPO)
        </h2>
        <p>
          Para qualquer questão relacionada ao tratamento de dados pessoais,
          escreva para <a href={`mailto:${DPO_EMAIL}`} className="text-olive underline decoration-1 underline-offset-4">{DPO_EMAIL}</a>.
          Resposta em até 15 dias.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          3. Dados que coletamos
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Formulário de contato B2B:</strong> nome, e-mail, telefone,
            CNPJ, empresa, volume estimado e mensagem opcional.
          </li>
          <li>
            <strong>Newsletter:</strong> e-mail. Confirmação por double opt-in.
          </li>
          <li>
            <strong>Navegação (Analytics):</strong> páginas visitadas, tempo na
            página, dispositivo, origem do tráfego — tudo agregado e com IP
            anonimizado, via Google Analytics 4.
          </li>
          <li>
            <strong>Marketing (Pixel):</strong> eventos de interesse para
            mensuração de campanhas, via Meta Pixel.
          </li>
          <li>
            <strong>Operacionais:</strong> cookies de sessão, preferência de
            cookies, segurança e prevenção de abuso.
          </li>
        </ul>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          4. Bases legais
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Consentimento:</strong> Analytics, Marketing e newsletter.
            Você revoga a qualquer momento.
          </li>
          <li>
            <strong>Legítimo interesse:</strong> segurança do site,
            anti-spam/anti-fraude, prevenção de abuso de formulários.
          </li>
          <li>
            <strong>Execução de contrato:</strong> processamento de pedidos e
            entregas.
          </li>
          <li>
            <strong>Obrigação legal:</strong> emissão fiscal e retenção
            tributária.
          </li>
        </ul>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          5. Seus direitos
        </h2>
        <p>
          Você pode, a qualquer momento, exercer os seguintes direitos previstos
          na LGPD:
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Confirmação da existência de tratamento.</li>
          <li>Acesso aos seus dados.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação de dados desnecessários.</li>
          <li>Portabilidade a outro fornecedor.</li>
          <li>Eliminação dos dados tratados com seu consentimento.</li>
          <li>Informação sobre entidades públicas e privadas com as quais houve compartilhamento.</li>
          <li>Informação sobre a possibilidade de não consentir e suas consequências.</li>
          <li>Revogação do consentimento.</li>
          <li>Oposição a tratamento realizado com base em outras hipóteses.</li>
          <li>Revisão de decisões automatizadas que afetem seus interesses.</li>
        </ul>
        <p className="mt-4">
          Para exercer qualquer direito, escreva para{" "}
          <a href={`mailto:${DPO_EMAIL}`} className="text-olive underline decoration-1 underline-offset-4">{DPO_EMAIL}</a>.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          6. Cookies
        </h2>
        <p>Utilizamos três categorias de cookies, configuráveis no banner:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Necessários (sempre ativos):</strong> sessão, preferência de
            cookies (<code>consent</code>), segurança.
          </li>
          <li>
            <strong>Analytics (opt-in):</strong> <code>_ga</code>,{" "}
            <code>_gid</code> — Google Analytics 4 com IP anonimizado.
          </li>
          <li>
            <strong>Marketing (opt-in):</strong> <code>_fbp</code> — Meta Pixel
            para mensuração de campanhas.
          </li>
        </ul>
        <p className="mt-4">
          Você pode rever suas preferências a qualquer momento clicando em{" "}
          <strong>Cookies</strong> no rodapé.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          7. Compartilhamento com terceiros
        </h2>
        <p>
          Compartilhamos dados estritamente com operadores essenciais à prestação
          do serviço. Cada um adere a padrões de segurança contratualmente
          obrigatórios. Não vendemos seus dados.
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Resend:</strong> envio de e-mails transacionais e
            newsletter — execução de contrato.
          </li>
          <li>
            <strong>Sanity:</strong> CMS para conteúdo editorial — operacional.
          </li>
          <li>
            <strong>Vercel:</strong> hospedagem do site — execução de contrato.
          </li>
          <li>
            <strong>Cloudflare (Turnstile):</strong> CAPTCHA invisível e CDN —
            legítimo interesse (segurança).
          </li>
          <li>
            <strong>Sentry:</strong> observability e diagnóstico de erros —
            legítimo interesse.
          </li>
          <li>
            <strong>Google (Analytics):</strong> métricas anônimas —
            consentimento.
          </li>
          <li>
            <strong>Meta (Pixel):</strong> mensuração de campanhas —
            consentimento.
          </li>
        </ul>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          8. Retenção
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Newsletter:</strong> até o cancelamento (unsubscribe).</li>
          <li><strong>Lead de contato/B2B:</strong> 6 meses.</li>
          <li><strong>Analytics:</strong> 14 meses (padrão GA4).</li>
          <li><strong>Preferência de consentimento:</strong> 1 ano.</li>
          <li><strong>Logs de segurança:</strong> 90 dias.</li>
          <li><strong>Documentos fiscais:</strong> conforme prazo legal.</li>
        </ul>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          9. Segurança
        </h2>
        <p>
          Adotamos HTTPS com TLS 1.3, headers fortes (CSP, HSTS, X-Frame-Options,
          Referrer-Policy), rate limiting via Edge, CAPTCHA Cloudflare Turnstile
          em formulários públicos e criptografia em repouso pelos provedores de
          hospedagem (Vercel) e CMS (Sanity). Auditoria contínua via Sentry e
          Dependabot.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          10. Crianças
        </h2>
        <p>
          O site não é destinado a menores de 18 anos e não coletamos
          deliberadamente dados de crianças. Se identificarmos coleta indevida,
          eliminamos os dados imediatamente.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          11. Alterações
        </h2>
        <p>
          Mudanças relevantes são sinalizadas no banner por 30 dias após a
          publicação. A data da última atualização permanece visível no topo
          desta página.
        </p>

        <h2 className="mt-12 font-display italic text-[28px] text-ink" style={{ fontWeight: 400 }}>
          12. Contato
        </h2>
        <p>
          Encarregado pelo Tratamento de Dados (DPO):{" "}
          <a href={`mailto:${DPO_EMAIL}`} className="text-olive underline decoration-1 underline-offset-4">{DPO_EMAIL}</a>.
        </p>
      </StaticPage>
      <Footer />
    </>
  );
}
