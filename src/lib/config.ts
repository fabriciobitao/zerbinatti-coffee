// Configuracao centralizada. Valores sensiveis ou variaveis vem de env vars.

// Numero WhatsApp comercial (formato internacional: 55 + DDD + numero, somente digitos)
// Define no .env.local: NEXT_PUBLIC_WHATSAPP_NUMBER=5511999998888
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999998888";

// Email comercial
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@zerbinatticoffee.com";

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
