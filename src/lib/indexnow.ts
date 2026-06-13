import "server-only";
import { SITE_URL } from "@/lib/seo";

/**
 * Pings IndexNow (Bing, Yandex, and others) so published/updated articles get
 * crawled fast — part of the GEO/SEO goal (Phase 6). No-ops (never throws) if
 * INDEXNOW_KEY is unset. The key is served at /indexnow.txt for verification.
 */
export async function pingIndexNow(paths: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) return;

  try {
    const host = new URL(SITE_URL).host;
    const urlList = paths.map((p) => `${SITE_URL}${p}`);
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `${SITE_URL}/indexnow.txt`,
        urlList,
      }),
    });
  } catch (e) {
    console.error("[indexnow] failed", e);
  }
}
