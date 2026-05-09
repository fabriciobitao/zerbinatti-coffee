/**
 * FAQs curadas para SEO (FAQPage schema) + componente <FAQ /> visivel.
 * Foco em queries reais que geram featured snippets no Google BR.
 */

import type { FaqItem } from "@/lib/seo/schemas";

export const faqs: FaqItem[] = [
  {
    question: "O que torna o café Zerbinatti um café especial?",
    answer:
      "O café Zerbinatti é 100% Arábica da variedade Arara, cultivado entre 640 e 760 metros na Serra do Cabral, Minas Gerais. Cada lote é provado por Q-Graders certificados pela SCA, e só lotes com pontuação 85 ou mais viram Zerbinatti. Torramos sob demanda e enviamos em até 5 dias úteis.",
  },
  {
    question: "Como armazenar café em grãos para preservar o frescor?",
    answer:
      "Mantenha o pacote fechado em local seco, ao abrigo da luz e longe do calor — a embalagem com válvula desgaseificadora preserva o aroma por até 90 dias. Após aberto, consuma em até 30 dias. Não armazene na geladeira (umidade) nem no freezer (perda de óleos).",
  },
  {
    question: "Qual a moagem ideal para cada método de preparo?",
    answer:
      "Espresso: moagem fina. Coado, V60 e Chemex: moagem média. Prensa francesa: moagem grossa. Moka italiana: média-fina. Para o ponto exato, peça que moemos no envio escolhendo o método na compra.",
  },
  {
    question: "Posso pausar ou cancelar a assinatura a qualquer momento?",
    answer:
      "Sim. Você pode pausar, alterar a frequência ou cancelar a assinatura Zerbinatti a qualquer momento, sem multa nem fidelidade. Tudo é feito pelo painel da sua conta ou diretamente com nosso atendimento.",
  },
  {
    question: "Vocês entregam para todo o Brasil?",
    answer:
      "Sim, entregamos para todo o território nacional via Correios e transportadoras parceiras. O prazo padrão é de 3 a 7 dias úteis após a torra. Frete grátis em pedidos acima de R$ 99 para todo o Brasil.",
  },
  {
    question: "O que significa 'torra sob demanda'?",
    answer:
      "Torramos cada pedido depois que você compra. Sua encomenda entra na fila da semana, é torrada na quinta ou sexta e enviada no mesmo dia. Você recebe café torrado há 5 a 7 dias — não há 90 como no supermercado, onde a torra pode ter acontecido meses antes.",
  },
  {
    question: "Qual a diferença entre o Clássico, Reserva e Micro-Lote?",
    answer:
      "Clássico (SCA 85, R$ 79,90): blend tradicional da família, equilibrado e versátil para qualquer método. Reserva (SCA 88, R$ 89,90): single origin de colheita seletiva, mais doce e floral. Micro-Lote (SCA 90+, R$ 119,90): edição limitada, talhão específico, perfil de competição com acidez brilhante.",
  },
  {
    question: "Os cafés Zerbinatti têm certificação?",
    answer:
      "Sim. Todos os lotes são avaliados em cupping pela nossa equipe Q-Grader certificada pela SCA (Specialty Coffee Association). A pontuação SCA mínima para entrar na linha Zerbinatti é 85 — abaixo disso, o café é vendido como commodity para outras frentes.",
  },
];
