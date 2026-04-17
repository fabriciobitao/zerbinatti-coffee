import StaticPage from "@/components/StaticPage";

export const metadata = {
  title: "A fazenda — Zerbinatti Coffee",
  description:
    "Conheça a fazenda Zerbinatti — herança italiana, solo brasileiro, café especial desde 1897.",
};

export default function Fazenda() {
  return (
    <StaticPage eyebrow="Origem" title="A fazenda">
      <p>
        Nossa fazenda fica na Serra do Cabral, Minas Gerais, a 900–1.000
        metros de altitude. Solos de origem vulcânica, noites frias e dias
        ensolarados — o terroir ideal para Arábica de alta pontuação.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Herança que começou em 1897
      </h2>
      <p>
        A família Zerbinatti chegou da Itália no fim do século XIX com o sonho
        de cultivar café de qualidade no Brasil. Três gerações depois, seguimos
        fiéis ao método: colheita seletiva, secagem em terreiro suspenso,
        torra artesanal.
      </p>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Números da fazenda
      </h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Altitude: 900–1.000 m</li>
        <li>Variedades: Bourbon Amarelo, Catuaí Vermelho, Mundo Novo</li>
        <li>Processo: natural e cereja descascado</li>
        <li>Pontuação SCA: 85 a 90+</li>
        <li>Colheita: 100% seletiva, manual</li>
      </ul>

      <h2 className="mt-8 font-serif text-2xl font-bold text-coffee-900">
        Visitas
      </h2>
      <p>
        Aceitamos visitas agendadas para cafeterias, jornalistas e clubes de
        café. Em breve vamos lançar um programa de agroturismo com degustações
        e passeios pelo terreiro.
      </p>
    </StaticPage>
  );
}
