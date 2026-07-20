-- English translations for CMS articles.
--
-- The CMS authors in Greek; these columns hold the English version produced at
-- publish time, so /en shows a real translation instead of falling back to the
-- Greek copy. Additive and nullable — existing rows and reads are unaffected,
-- and an article without a translation still falls back exactly as before.

alter table public.articles
  add column if not exists title_en    text,
  add column if not exists excerpt_en  text,
  add column if not exists sections_en jsonb;

comment on column public.articles.title_en is
  'English title, generated on publish from the (edited) Greek title.';
comment on column public.articles.excerpt_en is
  'English excerpt, generated on publish from the (edited) Greek excerpt.';
comment on column public.articles.sections_en is
  'English body sections, same shape as sections, generated on publish.';
