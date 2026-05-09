import StaticPage from "@/components/StaticPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schemas";

export const metadata = {
  title: "Nosso Processo — Do grão à xícara",
  description:
    "Como a Zerbinatti produz café especial desde 1897: colheita seletiva, secagem ao sol, beneficiamento, cupping SCA, torra sob demanda e embalagem com válvula.",
  alternates: { canonical: "/processo" },
  openGraph: {
    title: "Nosso Processo — Do grão à xícara | Zerbinatti Coffee",
    description:
      "Cada etapa que um grão Zerbinatti percorre: colheita seletiva, secagem ao sol em terreiro, cupping por Q-Graders SCA, torra sob demanda.",
    url: "/processo",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosso Processo — Do grão à xícara",
    description:
      "Colheita seletiva, secagem ao sol, cupping SCA, torra sob demanda. Veja como produzimos café especial.",
  },
};

const steps = [
  {
    n: "1",
    t: "Colheita seletiva",
    d: "Só grãos maduros (cereja) são colhidos, manualmente, um a um. Isso garante doçura e uniformidade do lote.",
    long:
      "Na safra entre maio e setembro, a equipe percorre cada talhão repetidas vezes. Só o grão no ponto cereja — vermelho-escuro, doce — entra na saca. Verdes e passas ficam para repasso ou descarte. Esse rigor explica por que nosso café tem sabor previsível de uma safra para outra: cada lote é uniforme em maturação.",
  },
  {
    n: "2",
    t: "Secagem ao sol em terreiro",
    d: "Os cerejos secam ao sol em terreiro por 18 a 22 dias, revolvidos várias vezes ao dia para secagem homogênea.",
    long:
      "Após a colheita, os cerejos são espalhados em terreiro suspenso de cimento sob sol direto. Revolvemos com rastelo a cada 2 horas para que a secagem seja uniforme — sem fermentação descontrolada. À noite, são cobertos com lona se a umidade subir. O processo dura entre 18 e 22 dias até o grão atingir 11% de umidade, ponto ideal para conservação.",
  },
  {
    n: "3",
    t: "Beneficiamento",
    d: "Separação por densidade, tamanho e cor. Só os grãos perfeitos seguem adiante.",
    long:
      "Depois de secos, os grãos passam por descascador, classificador de densidade, peneira granulométrica (peneira 16 e acima) e separador eletrônico de cor. Brocados, mal formados ou descoloridos saem nessa fase. Em média 18 a 22% de cada lote é descartado para virar commodity — só o melhor segue para o cupping.",
  },
  {
    n: "4",
    t: "Prova de mesa (cupping)",
    d: "Cada lote é provado por Q-Graders certificados pela SCA. Só lotes 85+ viram Zerbinatti.",
    long:
      "Cada microlote é tostado em torra clara padrão SCA e provado em mesa pela nossa equipe Q-Grader. Avaliamos fragrância, sabor, retrogosto, acidez, corpo, equilíbrio, doçura, uniformidade e limpidez. A pontuação final segue a tabela SCA de 100 pontos. Lotes abaixo de 85 são vendidos como commodity. Acima disso, viram linha Zerbinatti.",
  },
  {
    n: "5",
    t: "Torra sob demanda",
    d: "Torramos apenas após a sua compra — você recebe o café na mesma semana em que saiu do torrador.",
    long:
      "Não estocamos café torrado. Sua encomenda entra na fila da semana, é tostada na quinta ou sexta-feira em torrefadora Probat com perfil específico do lote, e enviada no mesmo dia. Resultado: você recebe café torrado há 5 a 7 dias — quando o aroma está no ápice. Café de supermercado típico tem 60 a 180 dias de torra.",
  },
  {
    n: "6",
    t: "Embalagem com válvula",
    d: "Embalagem metalizada com válvula desgaseificadora para preservar aroma e frescor por até 90 dias.",
    long:
      "Após a torra, o grão libera CO2 por dias. Em embalagem comum, isso estoura o saco. Usamos pacotes metalizados com válvula desgaseificadora unidirecional: o CO2 sai, o oxigênio não entra. Assim preservamos o aroma por até 90 dias após embalagem — mas o ideal continua ser consumir nos primeiros 30 dias depois de aberto.",
  },
];

const processoFaqs = [
  {
    question: "Por que vocês secam o café ao sol e não em secador mecânico?",
    answer:
      "Secagem natural ao sol em terreiro suspenso preserva os açúcares complexos do mucilagem do café, que viram complexidade aromática na xícara. O secador mecânico é mais rápido mas neutraliza o perfil sensorial — vira café commodity. A natural leva 18 a 22 dias e exige revoltas várias vezes ao dia, mas resulta em xícara muito mais expressiva.",
  },
  {
    question: "O que significa 'torra sob demanda' na prática?",
    answer:
      "Torramos cada pedido depois que você compra. Sua encomenda entra na fila da semana, é tostada na quinta ou sexta-feira e enviada no mesmo dia. Você recebe café torrado há 5 a 7 dias, quando o aroma está no ápice — não 60 a 180 dias como no supermercado.",
  },
  {
    question: "Por que só lotes com SCA acima de 85 viram café Zerbinatti?",
    answer:
      "85 é o limite inferior da categoria 'café especial' na escala SCA (Specialty Coffee Association). Abaixo disso, ainda é café arábica de qualidade mas sem o perfil sensorial completo. Vendemos esses lotes como commodity para outras frentes. Só os 85+ viram linha Zerbinatti, o que equivale a cerca de 30% da nossa produção total.",
  },
  {
    question: "Quanto tempo leva da colheita até chegar na minha xícara?",
    answer:
      "Da colheita à embalagem: cerca de 60 a 90 dias (colheita, secagem, beneficiamento, cupping, descanso). Da torra ao envio: 5 a 7 dias. Da postagem à entrega: 3 a 7 dias úteis dependendo do CEP. Total típico: você abre um pacote com café que estava no pé há 4 a 5 meses — fresquíssimo para padrões de café.",
  },
];

export default function Processo() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Início", url: "/" },
            { name: "Processo", url: "/processo" },
          ]),
          faqSchema(processoFaqs),
        ]}
      />
      <StaticPage eyebrow="Do grão à xícara" title="Nosso Processo">
        <p>
          Café especial de verdade começa muito antes do torrador. Veja cada
          etapa que um grão Zerbinatti percorre até chegar na sua xícara —
          desde a colheita seletiva manual nas encostas da Serra do Cabral até
          a torra sob demanda na quinta-feira da semana do seu pedido.
        </p>

        <div className="mt-10 space-y-10">
          {steps.map((s) => (
            <div key={s.n} className="flex gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 font-serif text-sm font-bold text-coffee-950">
                {s.n}
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-coffee-900 sm:text-2xl">
                  {s.t}
                </h2>
                <p className="mt-2 font-medium text-coffee-700">{s.d}</p>
                <p className="mt-3 text-coffee-700 leading-relaxed">{s.long}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-serif text-2xl font-bold text-coffee-900 sm:text-3xl">
          Perguntas frequentes sobre o processo
        </h2>
        <dl className="mt-6 space-y-6">
          {processoFaqs.map((faq) => (
            <div key={faq.question}>
              <dt className="font-serif text-lg font-semibold text-coffee-900">
                {faq.question}
              </dt>
              <dd className="mt-2 text-coffee-700 leading-relaxed">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </StaticPage>
    </>
  );
}
