import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "Processo — Zerbinatti Coffee",
  description:
    "Do grão à xícara: como a Zerbinatti produz café especial desde 1897.",
};

export default function Processo() {
  const steps = [
    {
      n: "1",
      t: "Colheita seletiva",
      d: "Só grãos maduros (cereja) são colhidos, manualmente, um a um. Isso garante doçura e uniformidade do lote.",
    },
    {
      n: "2",
      t: "Secagem natural",
      d: "Os cerejos secam em terreiro suspenso por 18 a 22 dias, revolvidos várias vezes ao dia para secagem homogênea.",
    },
    {
      n: "3",
      t: "Beneficiamento",
      d: "Separação por densidade, tamanho e cor. Só os grãos perfeitos seguem adiante.",
    },
    {
      n: "4",
      t: "Prova de mesa (cupping)",
      d: "Cada lote é provado por Q-Graders certificados pela SCA. Só lotes 85+ viram Zerbinatti.",
    },
    {
      n: "5",
      t: "Torra sob demanda",
      d: "Torramos apenas após a sua compra — você recebe o café na mesma semana em que saiu do torrador.",
    },
    {
      n: "6",
      t: "Embalagem com válvula",
      d: "Embalagem metalizada com válvula desgaseificadora para preservar aroma e frescor por até 90 dias.",
    },
  ];
  return (
    <StaticPage eyebrow="Do grão à xícara" title="Nosso Processo">
      <p>
        Café especial de verdade começa muito antes do torrador. Veja cada
        etapa que um grão Zerbinatti percorre até chegar na sua xícara.
      </p>

      <div className="mt-10 space-y-8">
        {steps.map((s) => (
          <div key={s.n} className="flex gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500 font-serif text-sm font-bold text-coffee-950">
              {s.n}
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-coffee-900">
                {s.t}
              </h3>
              <p className="mt-2 text-coffee-700">{s.d}</p>
            </div>
          </div>
        ))}
      </div>
    </StaticPage>
  );
}
