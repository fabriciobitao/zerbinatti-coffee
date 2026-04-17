import StaticPage from "@/components/StaticPage";
import { CONTACT_EMAIL } from "@/lib/config";

export const metadata = {
  title: "Política de privacidade — Zerbinatti Coffee",
  description:
    "Como a Zerbinatti Coffee coleta, usa e protege seus dados pessoais em conformidade com a LGPD.",
};

export default function Privacidade() {
  return (
    <StaticPage
      eyebrow="Legal"
      title="Política de privacidade"
      lastUpdated="16 de abril de 2026"
    >
      <p>
        A Zerbinatti Coffee respeita sua privacidade e trata seus dados
        pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD —
        Lei 13.709/2018). Esta política descreve como coletamos, usamos e
        protegemos suas informações.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        1. Dados que coletamos
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong>Cadastro:</strong> nome, e-mail, telefone, CPF, endereço de
          entrega.
        </li>
        <li>
          <strong>Pagamento:</strong> dados processados diretamente pelo gateway
          de pagamento — não armazenamos números de cartão.
        </li>
        <li>
          <strong>Navegação:</strong> cookies, IP, tipo de dispositivo, páginas
          visitadas, para fins estatísticos e de melhoria do site.
        </li>
      </ul>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        2. Como usamos
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Processar pedidos e entregas.</li>
        <li>Enviar confirmações, atualizações e suporte.</li>
        <li>
          Comunicação de marketing, apenas com seu consentimento (newsletter,
          lançamentos).
        </li>
        <li>Cumprimento de obrigações legais e fiscais.</li>
      </ul>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        3. Compartilhamento
      </h2>
      <p>
        Seus dados são compartilhados apenas com prestadores essenciais (gateway
        de pagamento, transportadora, ferramenta de e-mail) e jamais vendidos a
        terceiros. Exigimos contratualmente que todos adotem padrões de
        segurança equivalentes aos nossos.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        4. Seus direitos (LGPD)
      </h2>
      <p>
        Você pode, a qualquer momento, solicitar: acesso aos seus dados,
        correção, exclusão, portabilidade ou revogação do consentimento.
        Entregamos a resposta em até 15 dias.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        5. Cookies
      </h2>
      <p>
        Usamos cookies essenciais para o funcionamento do site e analíticos
        para entender como ele é usado. Você pode desativar cookies não
        essenciais nas configurações do seu navegador.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        6. Encarregado de dados (DPO)
      </h2>
      <p>
        Para exercer seus direitos ou tirar dúvidas sobre tratamento de dados,
        escreva para{" "}
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
