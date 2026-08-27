import { ArticleEditor } from "@/components/admin/article-editor";

export const dynamic = "force-dynamic";

// The publish/save actions kick off the Greek→English translation inside
// after(). Per the Next docs, after() only runs for the route's max duration,
// and Server Actions inherit the page's maxDuration — the default (10s on
// Hobby) cut the ~30s translation off every time, which is why every
// AI-written article shipped with empty *_en columns and /en fell back to
// Greek. 60s is the Hobby ceiling.
export const maxDuration = 60;


export default function NewArticlePage() {
  return <ArticleEditor article={null} />;
}
