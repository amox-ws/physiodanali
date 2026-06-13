# PhysioDanali — Blog CMS & AI Content Agent (handoff)

The blog is a Supabase-backed CMS with a human-in-the-loop AI writer: a weekly
job drafts an article, the owner reviews/edits it in a private admin, and one
click publishes it live. Built across phases 1–7 on branch `feature/blog-cms`.

> Online booking (SimplyBook.me) is a **separate** feature on branch
> `feature/simplybook-booking` — see that branch / `src/lib/booking.ts`.

---

## How it works

```
Δευτέρα 09:00 (Vercel Cron)
   │  GET /api/cron/generate-article   (Authorization: Bearer CRON_SECRET)
   ▼
AI writer (Claude, claude-sonnet-4-6, structured output)
   │  picks next topic from article_topics → writes full Greek article
   ▼
Supabase  articles row  status='draft'  ai_generated=true   ──►  📧 Resend email to owner
   │                                                              "Νέο άρθρο για έλεγχο"
   ▼
Owner opens /admin → reviews / edits → «Έγκριση & Δημοσίευση»
   │  status='published'  +  revalidateTag('articles')  +  IndexNow ping
   ▼
Live on /articles & /articles/[slug]  (ISR, appears in seconds)
```

Nothing is ever auto-published. RLS keeps drafts invisible to the public.

---

## Tech

- **Next.js 16** (App Router). Note Next-16 specifics: `middleware`→`proxy.ts`,
  async `cookies()`, previous caching model (`unstable_cache` + `revalidateTag`).
- **Supabase** — Postgres (`articles`, `article_topics`), Storage
  (`article-images`), Auth (magic link). Project `PhysioDanalis`
  (`rcfjklgnpswpgrzhsndh`).
- **Claude API** (`@anthropic-ai/sdk`) — generation, structured outputs.
- **Resend** — new-draft email. **IndexNow** — fast indexing on publish.
- **Vercel** — hosting + native Cron.

---

## Environment variables

| Var | Used by | Notes |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | site + admin | public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public reads | RLS → published only |
| `SUPABASE_SERVICE_ROLE_KEY` | cron job | **secret**, server-only |
| `ANTHROPIC_API_KEY` | generation | **secret** |
| `ANTHROPIC_MODEL` | generation | optional; default `claude-sonnet-4-6` |
| `CRON_SECRET` | cron auth | Vercel sends it as `Authorization: Bearer …` automatically |
| `RESEND_API_KEY` | email | optional; without it, email is skipped |
| `NOTIFY_TO` / `NOTIFY_FROM` | email | recipient / verified sender |
| `INDEXNOW_KEY` | indexing | optional; any UUID; served at `/indexnow.txt` |

Copy `.env.example` → `.env.local` for local dev. Set the same in Vercel for prod.

---

## Database

`articles`: `id, slug, title, category, excerpt, read_time, date, image,
sections(jsonb [{heading,body}]), meta_title, meta_description, keywords[],
faq(jsonb [{question,answer}]), status(draft|published|archived), ai_generated,
author, published_at, created_at, updated_at`.

`article_topics` (backlog the AI pulls from): `id, topic, target_keywords[],
status(pending|drafted|done|skipped), priority, notes`.

RLS: anon can `select` only `status='published'`; authenticated (logged-in
admin) full access. Storage bucket `article-images` is public-read, auth-write.

---

## Go-live checklist (Vercel)

1. Merge `feature/blog-cms` (and `feature/simplybook-booking`) to `main`.
2. Vercel project → **Pro plan** (the generation function needs `maxDuration`
   300s; generation takes ~150s — Hobby caps at 60s and would time out).
3. Set all env vars above in Vercel (Production).
4. Cron is already declared in `vercel.json` (Mon 09:00 UTC). With `CRON_SECRET`
   set, Vercel authenticates it automatically.
5. Seed `article_topics` with topics (8 already seeded).
6. **Resend**: verify a sender domain (e.g. `physiodanali.gr`), set
   `RESEND_API_KEY` + `NOTIFY_FROM`.
7. **IndexNow**: set `INDEXNOW_KEY` to a UUID (it's auto-served at
   `/indexnow.txt`); submit the site once in Bing Webmaster Tools.
8. Point the domain; confirm `SITE_URL` in `src/lib/seo.ts` matches prod.
9. Create the owner's admin user in Supabase Auth and add their email to
   `ADMIN_EMAILS` in `src/lib/admin.ts` (currently `info@amox.gr`).

---

## Client guide (Δανάλης) — Greek

1. Κάθε εβδομάδα: email **«Νέο άρθρο για έλεγχο»** → κλικ στον σύνδεσμο.
2. Μπαίνεις στο **/admin** (magic link — βάζεις το email σου, σου έρχεται
   σύνδεσμος, κλικ).
3. Διαβάζεις το προσχέδιο, αλλάζεις ό,τι θες (κείμενο, εικόνα, τίτλο).
4. Πατάς **«Έγκριση & Δημοσίευση»** → βγαίνει live. Τέλος.

Μπορείς επίσης να φτιάξεις δικό σου άρθρο με το **«Νέο άρθρο»**.

---

## Maintenance pointers

- **Add topics**: insert rows into `article_topics` (status `pending`).
- **Change cadence**: edit the cron schedule in `vercel.json`.
- **Change model**: set `ANTHROPIC_MODEL` (default Sonnet 4.6) or lower
  `effort` to `medium` in `src/lib/generate-article.ts` for faster/cheaper runs.
- **Change display font**: swap `EB_Garamond` in `src/app/layout.tsx` (any
  Greek-supporting serif — Literata, Noto Serif Display, GFS Didot).
- **Cost** (rough): Supabase free tier, Resend free tier (3k emails/mo), Claude
  ~a few cents per article on Sonnet. Negligible at 1–2 articles/week.

---

## Notes / decisions

- **Font**: switched Cormorant Garamond → **EB Garamond** because Cormorant has
  no Greek subset (every Greek heading was silently falling back). EB Garamond
  is the closest Garamond with full Greek. The CSS variable name
  (`--font-cormorant`) was kept to avoid churn.
- **Security**: drafts are RLS-protected; the service-role key is used only in
  the server-side cron; the admin is gated by proxy **and** a layout guard
  (defense in depth). Rotate any credentials that were shared during setup.
