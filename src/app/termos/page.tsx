import StaticPage from "@/components/StaticPage";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata = {
  title: "Termos de uso — Zerbinatti Coffee",
  description:
    "Termos e condições de uso do site e da loja Zerbinatti Coffee.",
};

export default function Termos() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Termos de uso"
      lastUpdated="16 de abril de 2026"
    >
      <p>
        Bem-vindo à Zerbinatti Coffee. Ao acessar e utilizar nosso site, você
        concorda com os termos descritos abaixo. Leia com atenção antes de
        realizar qualquer pedido.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        1. Aceitação dos termos
      </h2>
      <p>
        O uso deste site implica a aceitação integral destes Termos de uso, da
        nossa Política de privacidade e da Política de entregas. Se você não
        concorda com algum dos termos, por favor não utilize o site.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        2. Produtos e pedidos
      </h2>
      <p>
        As informações de produtos, preços e disponibilidade estão sujeitas a
        alterações sem aviso prévio. Em caso de erro de preço ou divergência de
        estoque, entraremos em contato para alinhar antes de processar o
        pedido.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        3. Pagamentos
      </h2>
      <p>
        Aceitamos PIX (com desconto de 10%), cartão de crédito parcelado e
        boleto bancário. Todo pedido só é confirmado após a aprovação do
        pagamento.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        4. Assinaturas
      </h2>
      <p>
        Os planos de assinatura (Apreciador, Sommelier, Herdeiro) são cobrados
        mensalmente e podem ser pausados, trocados ou cancelados a qualquer
        momento, sem multa. O cancelamento é efetivado no ciclo seguinte.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        5. Propriedade intelectual
      </h2>
      <p>
        Todo o conteúdo do site (textos, imagens, marca, fotografias,
        identidade visual) é de propriedade da Zerbinatti Coffee e protegido
        por lei. É proibida a reprodução sem autorização expressa.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        6. Foro
      </h2>
      <p>
        Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da
        comarca da sede da empresa para dirimir eventuais controvérsias.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        7. Contato
      </h2>
      <p>
        Dúvidas sobre estes Termos podem ser encaminhadas para{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-semibold text-gold-600 hover:text-gold-500"
        >
          {CONTACT_EMAIL}
        </a>
        .
      </p>
    </StaticPage>
  );
}
