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
  recommendedMethods: string[];
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
    tag: "Mais Vendido",
    tagVariant: "popular",
    score: "85",
    roast: "Média",
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
    recommendedMethods: ["Espresso", "Prensa Francesa", "Moka", "Coado"],
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
    name: "Reserva Especial",
    tagline: "Single origin de colheita seletiva",
    description:
      "Single origin, colheita seletiva, embalagem 500g. Notas de frutas vermelhas e mel.",
    longDescription:
      "Lote selecionado das partes mais altas da fazenda, colhido exclusivamente em grão cereja maduro. Processo cereja-descascado revela a doçura do fruto e a acidez fina característica das variedades Yellow Bourbon cultivadas acima de 1.000m. Edição limitada da safra — quando acaba, acaba.",
    price: 89.9,
    tag: "Edição Limitada",
    tagVariant: "limited",
    score: "88",
    roast: "Média-Clara",
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
    recommendedMethods: ["Hario V60", "Chemex", "Aeropress", "Espresso"],
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
    name: "Micro-Lote Premium",
    tagline: "Raridade da safra 2025 — SCA 90+",
    description:
      "Lote exclusivo, embalagem 500g. Notas florais, cítricas e acidez brilhante.",
    longDescription:
      "Apenas 400kg produzidos na safra inteira. Talhão específico da parte mais alta da Serra, variedade Geisha plantada em 2018 em caráter experimental — o primeiro lote a atingir maturidade comercial em 2025. Para cafeicultores e baristas obsessivos por cafés de competição. Score SCA 90+ conferido por Q-Grader independente.",
    price: 119.9,
    tag: "Raridade",
    tagVariant: "new",
    score: "90+",
    roast: "Clara",
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
    recommendedMethods: ["Hario V60", "Chemex", "Kalita Wave"],
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
