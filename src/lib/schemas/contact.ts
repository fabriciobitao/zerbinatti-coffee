import { z } from "zod";

/**
 * Schemas de validacao para o endpoint /api/contact.
 *
 * Discriminated union por `type` (newsletter | b2b | quiz) garante validacao
 * forte tanto em runtime (safeParse) quanto em compile-time (TS narrowing).
 *
 * Tamanhos maximos em todos os strings para prevenir DoS por payload inflado.
 * Honeypot (`_hp`) deve estar vazio — se preenchido, o cliente e bot.
 */

const emailSchema = z.string().trim().toLowerCase().email().max(254);
const phoneSchema = z.string().trim().regex(/^[\d\s()+-]{8,20}$/);
const nameSchema = z.string().trim().min(2).max(80);

export const newsletterSchema = z.object({
  type: z.literal("newsletter"),
  email: emailSchema,
  // honeypot — deve estar vazio
  _hp: z.string().max(0).optional(),
});

export const b2bSchema = z.object({
  type: z.literal("b2b"),
  name: nameSchema,
  company: z.string().trim().min(2).max(120),
  // CNPJ ja normalizado (apenas digitos) ou aceitar com mascara curta
  cnpj: z.string().trim().regex(/^\d{14}$/).optional(),
  email: emailSchema,
  phone: phoneSchema.optional(),
  message: z.string().trim().max(2000).optional(),
  consent: z.literal(true).optional(),
  _hp: z.string().max(0).optional(),
});

export const quizSchema = z.object({
  type: z.literal("quiz"),
  email: emailSchema,
  name: nameSchema.optional(),
  metadata: z.record(z.string().max(40), z.string().max(200)).optional(),
  _hp: z.string().max(0).optional(),
});

export const contactPayloadSchema = z.discriminatedUnion("type", [
  newsletterSchema,
  b2bSchema,
  quizSchema,
]);

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
