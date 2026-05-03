import type { Rule } from "sanity";

/**
 * Article schema — Revista Zerbinatti.
 * Conteudo editorial: ensaios, guias, historias, receitas.
 *
 * Slug e unico por documento, usado em /revista/[slug].
 * Body em Portable Text com blocos custom (image, code, blockquote).
 */
export default {
  name: "article",
  title: "Artigo da Revista",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(5).max(120),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Resumo (lede)",
      description:
        "Paragrafo curto exibido sob o titulo na listagem e no topo do artigo (~70-90 palavras).",
      type: "text",
      rows: 4,
      validation: (Rule: Rule) => Rule.required().min(50).max(400),
    },
    {
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: "caption",
          title: "Legenda (opcional)",
          type: "string",
        },
      ],
    },
    {
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Tecnica", value: "tecnica" },
          { title: "Historia", value: "historia" },
          { title: "Receitas", value: "receitas" },
          { title: "Lugares", value: "lugares" },
        ],
        layout: "radio",
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Autor",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(2).max(80),
    },
    {
      name: "publishedAt",
      title: "Data de publicacao",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "readingTime",
      title: "Tempo de leitura (minutos)",
      type: "number",
      validation: (Rule: Rule) => Rule.required().min(1).max(60).integer(),
    },
    {
      name: "body",
      title: "Corpo do artigo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citacao (pull quote)", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Italico", value: "em" },
              { title: "Codigo", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule: Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Legenda",
            },
          ],
        },
        {
          type: "object",
          name: "codeBlock",
          title: "Bloco de codigo",
          fields: [
            { name: "language", type: "string", title: "Linguagem" },
            { name: "code", type: "text", title: "Codigo" },
          ],
        },
      ],
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta titulo",
          type: "string",
          validation: (Rule: Rule) => Rule.max(70),
        },
        {
          name: "metaDescription",
          title: "Meta descricao",
          type: "text",
          rows: 3,
          validation: (Rule: Rule) => Rule.max(170),
        },
      ],
    },
  ],
  orderings: [
    {
      title: "Mais recentes",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
};
