-- Marks an article whose English copy was corrected by hand in the editor's
-- English panel. syncEnglish() skips those rows, so saving the Greek no longer
-- silently overwrites the practitioner's own wording. Cleared whenever the
-- machine translation is re-run on purpose ("Ξαναμετάφρασε").

alter table public.articles
  add column if not exists english_edited boolean not null default false;

comment on column public.articles.english_edited is
  'True when the *_en columns were hand-edited; publish-time auto-translation skips these rows.';
