import type { Rule } from "sanity";

/**
 * Page schema — paginas estaticas editaveis via Studio (ex: /sobre, /fazenda).
 *
 * Hoje as paginas estaticas sao codadas direto no Next; este schema fica
 * disponivel para o caso de futuras paginas migrarem para CMS sem deploy.
 */
export default {
  name: "page",
  title: "Pagina",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titulo",
      type: "string",
      validation: (Rule: Rule) => Rule.required().min(2).max(120),
    },
    {
      name: "slug",
      title: "Slug (path)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Corpo",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citacao", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Italico", value: "em" },
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
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
};
