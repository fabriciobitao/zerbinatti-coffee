/**
 * Renderiza JSON-LD safe-by-default. Usa Object.toString via JSON.stringify
 * + escape de </ pra evitar quebra de </script> em strings do schema.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
