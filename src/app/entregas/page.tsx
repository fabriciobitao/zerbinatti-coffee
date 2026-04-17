import StaticPage from "@/components/StaticPage";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata = {
  title: "Política de entregas — Zerbinatti Coffee",
  description:
    "Prazos, frete, troca e devolução de café torrado Zerbinatti.",
};

export default function Entregas() {
  return (
    <StaticPage
      eyebrow="Logística"
      title="Política de entregas"
      lastUpdated="16 de abril de 2026"
    >
      <h2 className="mt-4 font-serif text-2xl font-bold text-coffee-900">
        Torra sob demanda
      </h2>
      <p>
        Torramos seu café depois que você compra. O pedido entra na próxima
        leva de torra e é enviado em até 5 dias úteis após a confirmação do
        pagamento.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Prazos de envio
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Capitais Sudeste/Sul:</strong> 2-4 dias úteis após postagem.
        </li>
        <li>
          <strong>Demais capitais:</strong> 4-7 dias úteis após postagem.
        </li>
        <li>
          <strong>Interior:</strong> 5-10 dias úteis após postagem.
        </li>
      </ul>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Frete grátis
      </h2>
      <p>
        Pedidos acima de R$ 99 têm frete grátis para todo o Brasil. Planos de
        assinatura têm frete grátis sempre.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Rastreamento
      </h2>
      <p>
        Assim que seu pedido for postado, você recebe o código de rastreio por
        e-mail e WhatsApp.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Trocas e devoluções
      </h2>
      <p>
        Por se tratar de alimento, só aceitamos troca ou devolução em caso de
        defeito de fabricação ou avaria no transporte, mediante registro em até
        7 dias úteis após o recebimento. Entre em contato por{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-gold-600 hover:text-gold-500"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        com fotos e número do pedido.
      </p>
    </StaticPage>
  );
}
