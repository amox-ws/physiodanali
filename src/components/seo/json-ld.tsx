type JsonLdProps = {
  data: object | object[];
};

/**
 * Inline JSON-LD structured data. Render as a server component so
 * the schema is in the initial HTML — Google reads it without JS.
 */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
