import { ImageResponse } from "next/og";

// Shared Open Graph / Twitter image generator (1200×630, branded).
// Used by the root and per-article opengraph-image / twitter-image routes.
// Greek text needs a font with Greek glyphs — loaded from Google Fonts and
// subsetted to the exact text. If the fetch fails, the image still renders
// (Latin fallback) rather than breaking the build.

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

async function googleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const api = `https://fonts.googleapis.com/css2?family=${family.replace(
      / /g,
      "+",
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await fetch(api, {
      // Old UA → Google serves woff/ttf (Satori cannot parse woff2).
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)",
      },
    }).then((r) => r.text());
    const url = css.match(
      /src:\s*url\(([^)]+)\)\s*format\('(?:woff|truetype|opentype)'\)/,
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 500 | 600;
  style: "normal";
};

export async function renderOg(opts: {
  eyebrow: string;
  title: string;
  footer: string;
}): Promise<ImageResponse> {
  const text = `${opts.eyebrow}${opts.title}${opts.footer}PhysioDanali· `;
  const [serif, sans] = await Promise.all([
    googleFont("EB Garamond", 600, text),
    googleFont("Inter", 500, text),
  ]);

  const fonts: OgFont[] = [];
  if (serif)
    fonts.push({ name: "Garamond", data: serif, weight: 600, style: "normal" });
  if (sans)
    fonts.push({ name: "Inter", data: sans, weight: 500, style: "normal" });

  const titleFont = serif ? "Garamond" : sans ? "Inter" : undefined;
  const bodyFont = sans ? "Inter" : titleFont;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a1628",
          backgroundImage:
            "radial-gradient(900px 520px at 82% -12%, rgba(30,77,139,0.65), transparent 60%), radial-gradient(720px 520px at -12% 112%, rgba(184,153,104,0.22), transparent 60%)",
          color: "#f7f8fa",
        }}
      >
        {/* Wordmark / eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9999,
              background: "#b89968",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 25,
              letterSpacing: 6,
              color: "#e8eff8",
            }}
          >
            {opts.eyebrow}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontFamily: titleFont,
            fontWeight: 600,
            fontSize: 76,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 1000,
            color: "#ffffff",
          }}
        >
          {opts.title}
        </div>

        {/* Rule + footer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{ width: 104, height: 4, background: "#b89968", display: "flex" }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: bodyFont,
              fontWeight: 500,
              fontSize: 28,
              color: "rgba(247,248,250,0.72)",
            }}
          >
            {opts.footer}
          </div>
        </div>
      </div>
    ),
    {
      width: ogSize.width,
      height: ogSize.height,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
