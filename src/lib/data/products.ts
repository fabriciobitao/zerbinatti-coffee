/**
 * Fonte única de verdade dos produtos Zerbinatti.
 * Consumido por: Products.tsx, CartDrawer.tsx, páginas /cafes/[slug], Reviews.
 *
 * Campos sensoriais: escala 1-5 (doçura, acidez, corpo, complexidade).
 * Score SCA: 80-85 bom, 85-88 muito bom, 88+ excelente, 90+ excepcional.
 */

export type SensoryProfile = {
  sweetness: number; // doçura
  acidity: number; // acidez
  body: number; // corpo
  complexity: number; // complexidade
};

export type Review = {
  author: string;
  location: string;
  method: string;
  rating: number;
  date: string;
  text: string;
};

export type BrewMethod =
  | "V60"
  | "Chemex"
  | "Aeropress"
  | "Prensa Francesa"
  | "Espresso"
  | "Moka"
  | "Coado";

export type BrewRecipe = {
  method: BrewMethod;
  ratio: string;
  grind: string;
  waterTemp: string;
  dose: string;
  time: string;
  note?: string;
};

export type Product = {
  slug: string;
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  tag: string;
  tagVariant: "limited" | "popular" | "new";
  score: string;
  roast: string;
  weight: string;
  origin: {
    farm: string;
    region: string;
    state: string;
    altitude: string;
    variety: string;
    process: string;
  };
  notes: string[];
  sensory: SensoryProfile;
  harvest: string;
  roastDate: string;
  recommendedMethods: string[];
  brewRecipes: BrewRecipe[];
  reviews: Review[];
};

export const products: Product[] = [
  {
    slug: "classico",
    id: "classico-500g",
    name: "Clássico Zerbinatti",
    tagline: "O blend da família desde 1897",
    description:
      "Blend tradicional da família, embalagem 500g. Notas de chocolate, caramelo e nozes.",
    longDescription:
      "Nascido na primeira torra de Giuseppe Zerbinatti em 1897, este blend atravessou três gerações sem perder a alma. Equilíbrio entre doçura, corpo redondo e final persistente — o café que fez a reputação da casa e que você serve sem pensar duas vezes.",
    price: 69.9,
    tag: "Mais vendido",
    tagVariant: "popular",
    score: "85",
    roast: "média",
    weight: "500g",
    origin: {
      farm: "Fazenda Santa Rita + lotes parceiros",
      region: "Serra do Cabral",
      state: "Minas Gerais",
      altitude: "900 a 1.100m",
      variety: "Catuaí Vermelho + Mundo Novo",
      process: "Natural",
    },
    notes: ["Chocolate ao leite", "Caramelo", "Nozes", "Final doce"],
    sensory: { sweetness: 4, acidity: 2, body: 4, complexity: 3 },
    harvest: "Safra 2025",
    roastDate: "2026-04-10",
    recommendedMethods: ["Espresso", "Prensa Francesa", "Moka", "Coado"],
    brewRecipes: [
      {
        method: "Espresso",
        ratio: "1:2",
        grind: "Fina",
        waterTemp: "92-94°C",
        dose: "18g → 36g",
        time: "25-30s",
        note: "Corpo denso, crema firme. Ideal para espresso puro ou com leite.",
      },
      {
        method: "Prensa Francesa",
        ratio: "1:15",
        grind: "Grossa",
        waterTemp: "93°C",
        dose: "20g para 300ml",
        time: "4min de infusão",
        note: "Agite a crosta aos 4min, descarte a espuma, pressione devagar.",
      },
      {
        method: "Moka",
        ratio: "Encher o filtro sem compactar",
        grind: "Média-fina",
        waterTemp: "Pré-aquecida até a válvula",
        dose: "Filtro cheio, sem tamp",
        time: "3-4min em fogo médio-baixo",
        note: "Tire do fogo ao primeiro som de borbulha. A tradição da casa.",
      },
      {
        method: "Coado",
        ratio: "1:14",
        grind: "Média",
        waterTemp: "93°C",
        dose: "25g para 350ml",
        time: "3-4min total",
        note: "Filtro de pano ou papel. Molhe o filtro antes para remover gosto.",
      },
    ],
    reviews: [
      {
        author: "Marina Costa",
        location: "São Paulo, SP",
        method: "Prensa francesa",
        rating: 5,
        date: "2026-03-28",
        text: "Troquei meu café de supermercado por este há 4 meses. Não volto mais. Doce, encorpado, não amarga nem se eu esquecer o tempo da prensa.",
      },
      {
        author: "Rodrigo Alves",
        location: "Belo Horizonte, MG",
        method: "Moka italiana",
        rating: 5,
        date: "2026-03-15",
        text: "Meu nonno fazia café na moka todo domingo. Este aqui me traz de volta aquela mesa. Cremoso, doce, sem aquela queimação.",
      },
      {
        author: "Luciana Ferraz",
        location: "Curitiba, PR",
        method: "Espresso",
        rating: 4,
        date: "2026-02-20",
        text: "Ótimo espresso, creme firme e duradouro. Perde um pouco para blends mais caros em complexidade, mas para o dia a dia é imbatível.",
      },
    ],
  },
  {
    slug: "reserva",
    id: "reserva-500g",
    name: "Reserva especial",
    tagline: "Single origin de colheita seletiva",
    description:
      "Single origin, colheita seletiva, embalagem 500g. Notas de frutas vermelhas e mel.",
    longDescription:
      "Lote selecionado das partes mais altas da fazenda, colhido exclusivamente em grão cereja maduro. Processo cereja-descascado revela a doçura do fruto e a acidez fina característica das variedades Yellow Bourbon cultivadas acima de 1.000m. Edição limitada da safra — quando acaba, acaba.",
    price: 89.9,
    tag: "Edição limitada",
    tagVariant: "limited",
    score: "88",
    roast: "média-clara",
    weight: "500g",
    origin: {
      farm: "Fazenda Santa Rita",
      region: "Serra do Cabral",
      state: "Minas Gerais",
      altitude: "1.050 a 1.200m",
      variety: "Yellow Bourbon",
      process: "Cereja descascado (honey)",
    },
    notes: [
      "Frutas vermelhas",
      "Mel silvestre",
      "Acidez cítrica discreta",
      "Corpo sedoso",
    ],
    sensory: { sweetness: 5, acidity: 4, body: 3, complexity: 4 },
    harvest: "Safra 2025 — lote 042",
    roastDate: "2026-04-05",
    recommendedMethods: ["Hario V60", "Chemex", "Aeropress", "Espresso"],
    brewRecipes: [
      {
        method: "V60",
        ratio: "1:16",
        grind: "Média-fina",
        waterTemp: "93°C",
        dose: "20g para 320ml",
        time: "2:45-3:15min",
        note: "Bloom de 40g por 30s. Depois despeje em espiral, pausando aos 100g e 200g.",
      },
      {
        method: "Chemex",
        ratio: "1:17",
        grind: "Média",
        waterTemp: "94°C",
        dose: "30g para 500ml",
        time: "4-4:30min",
        note: "Clareza máxima. Use filtro Chemex original para reter mais óleos.",
      },
      {
        method: "Aeropress",
        ratio: "1:14",
        grind: "Média",
        waterTemp: "88°C",
        dose: "15g para 210ml",
        time: "1:30min total",
        note: "Método invertido. Agite 10s, repouse 1min, pressione 30s.",
      },
      {
        method: "Espresso",
        ratio: "1:2,2",
        grind: "Fina",
        waterTemp: "93-94°C",
        dose: "18g → 40g",
        time: "28-32s",
        note: "Puxa mais extração para destacar notas florais e cítricas.",
      },
    ],
    reviews: [
      {
        author: "Pedro Henrique Serra",
        location: "Rio de Janeiro, RJ",
        method: "Hario V60",
        rating: 5,
        date: "2026-04-02",
        text: "A acidez deste café é uma aula. Bebe como um vinho — começa floral, termina em mel. Meu V60 matinal virou obrigatório.",
      },
      {
        author: "Camila Okada",
        location: "Campinas, SP",
        method: "Chemex",
        rating: 5,
        date: "2026-03-18",
        text: "Comprei para presentear meu pai e acabei assinando. Dá pra sentir que é café colhido à mão — a doçura é diferente, não é açúcar, é fruta.",
      },
      {
        author: "André Machado",
        location: "Porto Alegre, RS",
        method: "Aeropress",
        rating: 4,
        date: "2026-02-10",
        text: "Excelente café. Tirei uma estrela só porque a edição limitada acaba rápido e fico sem por semanas. Culpa minha por não assinar ainda.",
      },
    ],
  },
  {
    slug: "microlote",
    id: "microlote-500g",
    name: "Micro-Lote premium",
    tagline: "Raridade da safra 2025 — SCA 90+",
    description:
      "Lote exclusivo, embalagem 500g. Notas florais, cítricas e acidez brilhante.",
    longDescription:
      "Apenas 400kg produzidos na safra inteira. Talhão específico da parte mais alta da Serra, variedade Geisha plantada em 2018 em caráter experimental — o primeiro lote a atingir maturidade comercial em 2025. Para cafeicultores e baristas obsessivos por cafés de competição. Score SCA 90+ conferido por Q-Grader independente.",
    price: 119.9,
    tag: "Raridade",
    tagVariant: "new",
    score: "90+",
    roast: "clara",
    weight: "500g",
    origin: {
      farm: "Fazenda Santa Rita — Talhão 7",
      region: "Serra do Cabral",
      state: "Minas Gerais",
      altitude: "1.200m",
      variety: "Geisha",
      process: "Lavado",
    },
    notes: [
      "Jasmim",
      "Bergamota",
      "Mel de laranjeira",
      "Acidez brilhante (ácido málico)",
      "Final longo e floral",
    ],
    sensory: { sweetness: 4, acidity: 5, body: 3, complexity: 5 },
    harvest: "Safra 2025 — lote Geisha 01",
    roastDate: "2026-04-14",
    recommendedMethods: ["Hario V60", "Chemex", "Kalita Wave"],
    brewRecipes: [
      {
        method: "V60",
        ratio: "1:16,5",
        grind: "Média-fina",
        waterTemp: "94°C",
        dose: "15g para 250ml",
        time: "2:30-2:45min",
        note: "Bloom de 30g por 30s. Despeje em espiral suave, sem agitar o leito.",
      },
      {
        method: "Chemex",
        ratio: "1:17",
        grind: "Média",
        waterTemp: "94°C",
        dose: "25g para 425ml",
        time: "4min",
        note: "Extração limpa que separa os florais dos cítricos. Beba quente E temperado.",
      },
      {
        method: "Aeropress",
        ratio: "1:14",
        grind: "Média",
        waterTemp: "85°C",
        dose: "14g para 200ml",
        time: "2min total",
        note: "Método invertido, água mais fria preserva o jasmim. Pressione em 40s.",
      },
    ],
    reviews: [
      {
        author: "Gustavo Nakamura",
        location: "São Paulo, SP",
        method: "Hario V60",
        rating: 5,
        date: "2026-04-05",
        text: "Sou Q-Grader. Este Geisha entrega tudo o que promete: florais intensos, acidez limpa, complexidade real. Vale cada centavo para quem sabe o que busca.",
      },
      {
        author: "Beatriz Lemos",
        location: "Florianópolis, SC",
        method: "Chemex",
        rating: 5,
        date: "2026-03-22",
        text: "Guardei a última grama para o domingo de aniversário do meu marido. A xícara virou conversa da mesa. Café assim é memória.",
      },
      {
        author: "Fernando Cruz",
        location: "Brasília, DF",
        method: "Kalita Wave",
        rating: 5,
        date: "2026-02-28",
        text: "Já provei Geishas panamenhos de R$300 o pacote. Este não fica atrás e custa um terço. Orgulho de ter Geisha brasileiro neste nível.",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
