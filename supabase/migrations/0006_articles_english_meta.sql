-- English category and read-time for CMS articles.
--
-- 0005 translated the title, excerpt and body, but the card labels stayed
-- Greek on /en ("ΑΥΧΈΝΑΣ", "8 ΛΕΠΤΑ") because those live in separate columns.
-- Additive and nullable — rows without them fall back to the Greek label.

alter table public.articles
  add column if not exists category_en  text,
  add column if not exists read_time_en text;

comment on column public.articles.category_en is
  'English category label, generated on publish alongside the translation.';
comment on column public.articles.read_time_en is
  'English read-time label (e.g. "8 min"), generated on publish.';
