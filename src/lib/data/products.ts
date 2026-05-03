/**
 * Fonte unica de verdade do produto Zerbinatti.
 * Modelo refatorado: 1 produto unico (Cafe Zerbinatti) com 3 SKUs (variacoes).
 *
 * Consumido por: Home, PDP /cafe, CartDrawer, schema.ts.
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

// Variacao de SKU (peso + formato)
export type SkuVariant = {
  id: string; // ex: "zerbinatti-500g-graos"
  weight: "500g" | "250g";
  format: "graos" | "moido";
  label: string; // ex: "500g · em grãos"
  shortLabel: string; // ex: "500g grãos"
  price: number;
  pricePerKg: number; // calculado para mostrar comparacao (R$/kg)
  badge?: string; // ex: "Mais econômico" ou "Pronto para coar"
  description: string; // descricao curta do SKU
};

export type Product = {
  slug: string;
  id: string; // id base do produto
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tag: string;
  tagVariant: "limited" | "popular" | "new";
  score: string;
  roast: string;
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
  skus: SkuVariant[];
  defaultSkuId: string;
};

// Produto unico Zerbinatti com 3 SKUs
export const product: Product = {
  slug: "zerbinatti",
  id: "zerbinatti",
  name: "Café Zerbinatti",
  tagline: "O blend da família desde 1897",
  description:
    "Blend tradicional da família Zerbinatti — Bourbon e Catuaí da Serra do Cabral. Notas de chocolate, caramelo e nozes.",
  longDescription:
    "Nascido na primeira torra de Giuseppe Zerbinatti em 1897, este blend atravessou três gerações sem perder a alma. Bourbon Amarelo e Catuaí Vermelho cultivados acima de 900m na Serra do Cabral (MG), torrados sob demanda em torrefação própria. Equilíbrio entre doçura, corpo redondo e final persistente — o café que fez a reputação da casa e que você serve sem pensar duas vezes. Disponível em três versões: 500g em grãos para quem mói em casa, 250g em grãos para experimentar e 250g moído para o coador do dia a dia.",
  tag: "Mais vendido",
  tagVariant: "popular",
  score: "85",
  roast: "média",
  origin: {
    farm: "Fazenda Santa Rita + lotes parceiros",
    region: "Serra do Cabral",
    state: "Minas Gerais",
    altitude: "900 a 1.100m",
    variety: "Bourbon Amarelo + Catuaí Vermelho",
    process: "Natural",
  },
  notes: ["Chocolate ao leite", "Caramelo", "Nozes", "Final doce"],
  sensory: { sweetness: 4, acidity: 2, body: 4, complexity: 3 },
  harvest: "Safra 2025",
  roastDate: "2026-04-10",
  recommendedMethods: ["Espresso", "Prensa Francesa", "Moka", "Coado", "V60"],
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
    {
      method: "V60",
      ratio: "1:16",
      grind: "Média-fina",
      waterTemp: "93°C",
      dose: "20g para 320ml",
      time: "2:45-3:15min",
      note: "Bloom de 40g por 30s. Despeje em espiral, pausando aos 100g e 200g.",
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
      text: "Ótimo espresso, creme firme e duradouro. Para o dia a dia é imbatível, melhor custo-benefício que achei em café especial.",
    },
    {
      author: "Pedro Henrique Serra",
      location: "Rio de Janeiro, RJ",
      method: "Hario V60",
      rating: 5,
      date: "2026-04-02",
      text: "Comprei o 250g moído para a esposa que não tem moedor. Saiu redondo na cafeteira, sem amargor. Pedi o de grãos para mim na sequência.",
    },
    {
      author: "Camila Okada",
      location: "Campinas, SP",
      method: "Coador de pano",
      rating: 5,
      date: "2026-03-18",
      text: "Cresci tomando café no coador de pano da minha vó. Este aqui resgata aquele sabor — doce, encorpado, sem aquele gosto de queimado dos cafés de mercado.",
    },
    {
      author: "André Machado",
      location: "Porto Alegre, RS",
      method: "Aeropress",
      rating: 4,
      date: "2026-02-10",
      text: "Excelente café para o dia. Compro o 500g, rende muito mais e o preço por quilo cai bastante. Recomendo.",
    },
    {
      author: "Gustavo Nakamura",
      location: "São Paulo, SP",
      method: "Hario V60",
      rating: 5,
      date: "2026-04-05",
      text: "Sou Q-Grader. Para um blend desta faixa, entrega muito mais do que cobra: doçura limpa, corpo redondo, sem defeitos. Café honesto.",
    },
    {
      author: "Beatriz Lemos",
      location: "Florianópolis, SC",
      method: "Chemex",
      rating: 5,
      date: "2026-03-22",
      text: "Presenteei meu pai e acabei assinando para mim também. A diferença para o café que tomava antes é absurda — e a embalagem chega cheirando torra fresca.",
    },
    {
      author: "Fernando Cruz",
      location: "Brasília, DF",
      method: "Moka",
      rating: 5,
      date: "2026-02-28",
      text: "Pedi o moído para a Bialetti e fiquei impressionado. A moagem está no ponto certo, sem entupir o filtro. Já é meu café fixo da semana.",
    },
  ],
  skus: [
    {
      id: "zerbinatti-500g-graos",
      weight: "500g",
      format: "graos",
      label: "500g · em grãos",
      shortLabel: "500g grãos",
      price: 89.9,
      pricePerKg: 179.8,
      badge: "Mais econômico",
      description:
        "Pacote família. Melhor R$/kg, ideal para quem mói em casa e consome todo dia.",
    },
    {
      id: "zerbinatti-250g-graos",
      weight: "250g",
      format: "graos",
      label: "250g · em grãos",
      shortLabel: "250g grãos",
      price: 49.9,
      pricePerKg: 199.6,
      badge: "Para experimentar",
      description: "Pacote menor para conhecer o café antes de assinar ou levar o 500g.",
    },
    {
      id: "zerbinatti-250g-moido",
      weight: "250g",
      format: "moido",
      label: "250g · moído",
      shortLabel: "250g moído",
      price: 49.9,
      pricePerKg: 199.6,
      badge: "Pronto para coar",
      description:
        "Moagem média universal — funciona em coador, Moka, prensa e cafeteira elétrica.",
    },
  ],
  defaultSkuId: "zerbinatti-500g-graos",
};

// --- Helpers ---

export function getProduct(): Product {
  return product;
}

export function getSkuById(id: string): SkuVariant | undefined {
  return product.skus.find((s) => s.id === id);
}

export function getDefaultSku(): SkuVariant {
  const sku = product.skus.find((s) => s.id === product.defaultSkuId);
  if (!sku) throw new Error(`Default SKU ${product.defaultSkuId} não encontrado`);
  return sku;
}
