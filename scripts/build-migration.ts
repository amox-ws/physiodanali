import { articles, articleBodies } from "../src/lib/content";
import { writeFileSync } from "node:fs";

const rows = articles.posts.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: (p as { category?: string }).category ?? null,
  excerpt: p.excerpt ?? null,
  read_time: p.readTime ?? null,
  date: p.date ?? null,
  image: p.image ?? null,
  sections: articleBodies[p.slug]?.sections ?? [],
}));

const json = JSON.stringify(rows);
const sql = `insert into public.articles (slug,title,category,excerpt,read_time,date,image,sections,status,ai_generated,published_at)
select slug,title,category,excerpt,read_time,date,image,sections,'published',false,now()
from jsonb_to_recordset($mig$${json}$mig$::jsonb)
as x(slug text,title text,category text,excerpt text,read_time text,date text,image text,sections jsonb)
on conflict (slug) do update set title=excluded.title,category=excluded.category,excerpt=excluded.excerpt,read_time=excluded.read_time,date=excluded.date,image=excluded.image,sections=excluded.sections,status='published';`;

writeFileSync("/tmp/migrate.json", JSON.stringify({ query: sql }));
console.log(`Built migration: ${rows.length} articles, ${(json.length/1024).toFixed(0)} KB JSON.`);
