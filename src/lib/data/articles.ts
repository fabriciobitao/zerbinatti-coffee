export type Article = {
  slug: string;
  title: string;
  eyebrow: string;
  excerpt: string;
  readingTime: string;
  publishedAt: string;
  author: string;
  category: "Origem" | "Preparo" | "História" | "Terroir";
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "serra-do-cabral-terroir",
    title:
      "Por que a Serra do Cabral produz cafés diferentes de toda Minas Gerais",
    eyebrow: "Terroir",
    category: "Terroir",
    excerpt:
      "Altitude acima de 1.000m, solo de quartzito e amplitude térmica de 15°C — os três fatores que explicam a acidez brilhante dos cafés da região.",
    readingTime: "5 min",
    publishedAt: "2026-04-02",
    author: "Giuliano Zerbinatti",
    body: [
      "Quando meu bisavô Giuseppe desembarcou no Porto de Santos em 1891 com uma mala e uma foto da Toscana no bolso, ele procurou terras que lembrassem a casa que deixou. Encontrou a Serra do Cabral — e foi categórico: aqui é onde a família vai plantar.",
      "Cento e trinta anos depois, a escolha continua certeira. A Serra do Cabral é uma formação quartzítica no centro-norte de Minas, com altitudes que passam dos 1.400 metros. Nossa fazenda fica entre 900 e 1.200m — exatamente a faixa onde o café arábica encontra o estresse ideal.",
      "Estresse, aqui, é virtude. O grão que matura lentamente sob amplitude térmica alta (nossos invernos têm manhãs a 8°C e tardes a 23°C) desenvolve mais açúcares complexos. É o mesmo princípio do vinho de altitude — quanto mais devagar o fruto amadurece, mais complexa a xícara que ele gera.",
      "Somados ao solo de quartzito decomposto, com drenagem altíssima e micronutrientes específicos, temos o que os cupping scores traduzem em número: nossos lotes batem consistentemente SCA 85+, com picos de 92 em edições como o Geisha da safra 2025.",
      "A Serra do Cabral ainda é região emergente no mapa do café especial brasileiro. Poucas fazendas, menos de 300 produtores. Isso é vantagem para quem bebe — e responsabilidade nossa, de preservar o solo e a fauna enquanto produzimos.",
    ],
  },
  {
    slug: "torra-sob-demanda-por-que-importa",
    title:
      "Torra sob demanda: por que o seu café de supermercado nunca vai competir",
    eyebrow: "Preparo",
    category: "Preparo",
    excerpt:
      "Café torrado perde 30% do aroma nos primeiros 30 dias. Entenda por que torramos só depois que você compra — e como isso muda a xícara.",
    readingTime: "4 min",
    publishedAt: "2026-03-18",
    author: "Marco Zerbinatti",
    body: [
      "Pergunta para você: há quanto tempo foi torrado o café que está na sua cozinha agora? Se veio de supermercado, a resposta honesta é: provavelmente entre 60 e 180 dias.",
      "A indústria tradicional torra em larga escala, embala, distribui. Entre torra e xícara pode passar um semestre. E café é perecível — ele começa a perder aroma a partir da semana 2 e entra em declínio acelerado depois do dia 45.",
      "Por isso torramos sob demanda. Sua encomenda entra na fila da semana, a torra acontece na quinta ou sexta, o pacote sai pelo correio no mesmo dia. Você recebe café torrado há 5 ou 7 dias — não há 90.",
      "Tecnicamente, isso muda três coisas na xícara: aroma no nariz, complexidade nas notas secundárias e retrogosto. Um café fresco dá as notas florais que o produtor prometeu; um café velho só entrega as notas mais robustas — chocolate, nozes, amargor — porque as voláteis delicadas evaporaram.",
      "A embalagem com válvula desgaseificadora (aquela bolinha plástica que tem nos nossos pacotes) também ajuda: o CO2 da torra sai, mas o oxigênio não entra. Assim preservamos o aroma por até 90 dias depois de aberto — mas o ideal continua sendo consumir em 30.",
    ],
  },
  {
    slug: "historia-giuseppe-zerbinatti-1897",
    title: "1897: o ano em que um imigrante italiano torrou o primeiro saco",
    eyebrow: "História",
    category: "História",
    excerpt:
      "Giuseppe Zerbinatti chegou ao Brasil em 1891 com 19 anos. Seis anos depois, comprou seu primeiro torrador a lenha. A marca que você bebe hoje começou naquele dia.",
    readingTime: "6 min",
    publishedAt: "2026-02-28",
    author: "Elena Zerbinatti",
    body: [
      "Meu trisavô Giuseppe nasceu em 1872 em Lucca, filho de um pequeno cafeicultor da Toscana — daqueles que cultivavam variedades locais em terraços na encosta, mais por tradição familiar que por viabilidade econômica.",
      "Em 1891, com 19 anos, embarcou para o Brasil na Grande Imigração Italiana. Chegou em Santos com 3.200 liras no bolso, uma carta de referência de um padre de Lucca e uma ideia fixa: encontrar onde plantar café.",
      "Passou seis anos trabalhando em fazendas no Oeste Paulista, aprendendo o manejo do arábica brasileiro e economizando. Em 1897, comprou o primeiro pedaço de terra na região que hoje se chama Serra do Cabral — 40 hectares de mata que ele e mais dois conterrâneos desbravaram com enxada e machado.",
      "Naquele mesmo ano, torrou o primeiro saco. Era um torrador a lenha de esfera rotativa, importado de Trieste. A torra saiu escura demais, segundo os relatos — Giuseppe escreveu no diário que era preciso 'achar o ponto onde o grão canta mas não grita'. A frase virou mantra da família.",
      "Três gerações depois, o torrador a lenha virou torrador elétrico Probat. A fazenda de 40ha virou 380ha. Mas o compromisso permanece: tostiamo solo quando il chicco è pronto e il cliente lo vuole. Torramos só quando o grão está pronto e o cliente quer.",
      "Quando você abre um pacote Zerbinatti, está abrindo um pacto de 128 anos entre uma família imigrante e a terra que a acolheu. Isso é a única coisa que não mudou — e não vai mudar.",
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
