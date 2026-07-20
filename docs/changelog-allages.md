# PhysioDanali — Τι ακριβώς αλλάξαμε (με paths & πριν/μετά)

Όλα επαληθευμένα από το git. Δες τα live στο **https://physiodanali.vercel.app**

---

## 1. Ωράριο → 10:00–22:00 *(ακριβώς όπως το παλιό site)*

| Αρχείο | ΠΡΙΝ | ΜΕΤΑ |
|---|---|---|
| [src/lib/seo.ts](../src/lib/seo.ts) | `opens: "08:00"` / `closes: "23:00"` | `opens: "10:00"` / `closes: "22:00"` |
| [src/lib/translations.ts](../src/lib/translations.ts) | «Καθημερινά **08:00 — 23:00**» | «Καθημερινά **10:00 — 22:00**» |
| [src/lib/content.ts](../src/lib/content.ts) + `.en.ts` | 08:00-23:00 σε FAQ/booking | 10:00-22:00 |

📍 **Πού:** footer κάθε σελίδας · `/contact` · Google schema
⚠️ Το marketing «**έως 23:00**» έμεινε σκόπιμα (απόφασή σου).

## 2. Αξιολογήσεις → «100+» *(αντί 121, για να μην παλιώνει)*

| Αρχείο | ΠΡΙΝ | ΜΕΤΑ |
|---|---|---|
| [src/app/reviews/page.tsx](../src/app/reviews/page.tsx) | «5.0 · **121** αξιολογήσεις» | «5.0 · **100+** αξιολογήσεις» |
| [src/lib/seo.ts](../src/lib/seo.ts) | `reviewCount: "122"` | `reviewCount: "100"` |
| microsite `index.html` | «Άριστες αξιολογήσεις» | «**100+** αξιολογήσεις στο Google» |

📍 `/reviews` · physiodanali-reviews.vercel.app

## 3. Έφυγε το «απαντάμε εντός λίγων ωρών»

| Αρχείο | ΠΡΙΝ | ΜΕΤΑ |
|---|---|---|
| [src/lib/translations.ts](../src/lib/translations.ts) | «Απαντάμε **εντός λίγων ωρών**» | «Απαντάμε **σύντομα**» |
| [src/lib/content.ts](../src/lib/content.ts) + `.en.ts` | «within a few hours» | «soon» |

📍 `/contact` (κάτω από τη φόρμα) · FAQ παθήσεων

## 4. Σελίδα 404 — ξαναγράφτηκε

**[src/app/not-found.tsx](../src/app/not-found.tsx)** — ΠΡΙΝ: μόνο «επιστροφή στην αρχική» + υπόσχεση ωρών.
**ΜΕΤΑ:** CTA «Κλείστε ραντεβού» + σειρά «**Δημοφιλείς σελίδες**» (booking/θεραπείες/κατ' οίκον/χειροπρακτική/άρθρα/αξιολογήσεις/επικοινωνία).
📍 Δες: physiodanali.vercel.app/**οτιδήποτε-ανύπαρκτο**

## 5. SEO — αόρατα

| Τι | Αρχείο | ΠΡΙΝ → ΜΕΤΑ |
|---|---|---|
| **Review schema** | [src/app/reviews/page.tsx](../src/app/reviews/page.tsx) | καμία → **13 `Review` objects** στο JSON-LD |
| **hreflang** | `privacy/terms/cookies/articles/[slug]` | το page-level `alternates` **έριχνε** το el/en/x-default → αφαιρέθηκε, το κληρονομούν από το layout |
| **skip-to-content** | [src/components/site/site-chrome.tsx](../src/components/site/site-chrome.tsx) | — → link WCAG + `<main id="main">` |

📍 Δεν φαίνονται οπτικά (view-source / Tab από την κορυφή για το skip-link)

## 6. Φόρμα επικοινωνίας — από «μαϊμού» σε πραγματική

**ΠΡΙΝ:** [contact-form.tsx](../src/components/site/contact-form.tsx) έκανε `window.location.href = "mailto:..."` με σχόλιο *«No backend yet»* → **χανόντουσαν leads**.

**ΜΕΤΑ:** νέο αρχείο **[src/app/contact/actions.ts](../src/app/contact/actions.ts)** → στέλνει μέσω Resend:
- **to** `info@physiodanali.gr`, **cc** `info@amox.gr`, **reply_to** = ο επισκέπτης
- honeypot + validation + **Cloudflare Turnstile** (ανάβει με keys)
- πραγματικό success/error (σε αποτυχία δείχνει τηλέφωνο — **ποτέ ψεύτικο «στάλθηκε»**)

📍 `/contact`

## 7. Ασφάλεια booking

**[src/lib/booking.ts](../src/lib/booking.ts)** — ΠΡΙΝ: `BOOKING_SECRET || CRON_SECRET || "physiodanali-dev"` (**public literal** στο repo).
**ΜΕΤΑ:** fail-closed — κάνει throw αντί να υπογράψει με γνωστό μυστικό.

## 8. Chiropractic — τα 4 πλαίσια έγιναν links

**[src/app/chiropractic/page.tsx](../src/app/chiropractic/page.tsx)** — ΠΡΙΝ: απλά `<div>`, δεν πήγαιναν πουθενά.
**ΜΕΤΑ:** `<Link>` locale-aware:

| Πλαίσιο | Πάει σε |
|---|---|
| Αυχεναλγία | `/neck-pain` |
| Οσφυαλγία | `/low-back-pain` |
| Ισχιαλγία | `/articles/low-back-pain` |
| Πόνος στον ώμο | `/articles/shoulder-pain` |

📍 `/chiropractic` — πρώτη ενότητα

## 9. Άρθρα στα Αγγλικά *(2 bugs)*

**Bug 1 — [src/lib/articles.ts](../src/lib/articles.ts):**
- **ΠΡΙΝ:** `if (locale === "en") return staticAll("en", limit);` → τα αγγλικά διάβαζαν **μόνο στατικό αρχείο** ⇒ κάθε νέο άρθρο του CMS **έλειπε εντελώς**.
- **ΜΕΤΑ:** διαβάζει τα **πραγματικά δημοσιευμένα** από τη ΒΔ και βάζει τη μετάφραση όπου υπάρχει.

**Bug 2 — [src/components/site/article-grid.tsx](../src/components/site/article-grid.tsx):**
- **ΠΡΙΝ:** `href={post.href}` → στο `/en` έδειχνε `/articles/…` και **σε πετούσε στα ελληνικά**.
- **ΜΕΤΑ:** `href={localeHref(post.href, locale)}`

📍 `/en/articles` — **19 άρθρα**, όσα και στα ελληνικά

## 10. Admin — magic link + λογότυπο

| Αρχείο | ΠΡΙΝ | ΜΕΤΑ |
|---|---|---|
| [src/app/admin/login/page.tsx](../src/app/admin/login/page.tsx) | email + **κωδικός** | **magic link** (χωρίς κωδικό) + **λογότυπο → αρχική** |
| [src/app/admin/(dash)/layout.tsx](../src/app/admin/(dash)/layout.tsx) | κείμενο «PhysioDanali» → `/admin` | **λογότυπο → `/`** (αρχική) |

📍 `/admin/login`

## 11. Homepage hero σε κινητό

**[src/components/site/hero.tsx](../src/components/site/hero.tsx)**
- **ΠΡΙΝ:** `object-cover object-center` → σε mobile έκοβε τον Δανάλη (στέκεται στο **αριστερό τρίτο**)
- **ΜΕΤΑ:** `object-cover object-left md:object-center`

📍 Αρχική **από κινητό**

## 12. Κύφωση — βγήκε τελείως

**Διαγράφηκε:** `src/app/kyphosis/page.tsx` (148 γραμμές) → τώρα **404**
**Καθαρίστηκε από:** [content.ts](../src/lib/content.ts) (152 γρ.), [content.en.ts](../src/lib/content.en.ts) (139 γρ.), [translations.ts](../src/lib/translations.ts) (30 γρ.), [sitemap.ts](../src/app/sitemap.ts), [seo.ts](../src/lib/seo.ts), [llms.txt](../public/llms.txt), [article-prompt.ts](../src/lib/article-prompt.ts), [booking-form.tsx](../src/components/site/booking-form.tsx)

**Κρίσιμο —** [src/lib/legacy-redirects.ts](../src/lib/legacy-redirects.ts): τα 4 παλιά URLs **ΔΕΝ έσπασαν**:
`/el/kyphosis-treatment-gr.html` & `/el/scoliosis-treatment-gr.html` (+EN) → **`/chiropractic`** (επαληθευμένο 200)

📍 Menu «Θεραπείες», αρχική, `/therapies` — **δεν υπάρχει πουθενά**

## 13. «No guesswork» + «15+»

| Αρχείο | ΠΡΙΝ | ΜΕΤΑ |
|---|---|---|
| content.ts | «Επιστημονική προσέγγιση. **Χωρίς εικασίες**.» | «Επιστημονική προσέγγιση.» |
| content.en.ts | «A scientific approach. **No guesswork**.» | «A scientific approach.» |
| content.ts | «**Δεκαετής** κλινική εμπειρία» | «**15+ χρόνια** κλινικής εμπειρίας» |
| content.ts / .en.ts | `n: "10+"` | `n: "15+"` |

📍 `/about` — ενότητα «Φιλοσοφία» & τα στατιστικά

## 14. Brazilian Lymphatic — **ακριβής επαναφορά του παλιού site**

**[src/lib/content.ts](../src/lib/content.ts)** + **[content.en.ts](../src/lib/content.en.ts)** + **[translations.ts](../src/lib/translations.ts)**

| | ΠΡΙΝ (δικό μας) | ΜΕΤΑ (= παλιό site) |
|---|---|---|
| Τίτλος | «Λεμφικό μασάζ κατ' οίκον» | «**μετά από Λιποαναρρόφηση & Επέμβαση** κατ' οίκον» |
| Ενδείξεις | 7 γενικά («χάστε πόντους», αποτοξίνωση) | **12** (λιποαναρρόφηση, κοιλιοπλαστική, **BBL**, αυξητική στήθους, ρινοπλαστική/face lift, εγκυμοσύνη, καισαρική…) |
| Διαφοροποίηση | — | **σύγκριση με Vodder**, πρόληψη **ίνωσης/σηρωμάτων**, «πρώτες 4-6 εβδομάδες» |
| Τίτλοι | γενικό bio | **IFOMPT-certified · APTA International Affiliate · Mulligan/Maitland/Shacklock** |
| CTA | «Νοιώστε τη διαφορά» | «**Έτοιμοι για ταχύτερη αποκατάσταση;**» |

📍 `/lymphatic` και `/en/lymphatic`

## 15. Βιογραφικό (CV)

| Αρχείο | ΠΡΙΝ | ΜΕΤΑ |
|---|---|---|
| [translations.ts](../src/lib/translations.ts) | «Κωνσταντίνος Δανάλης, **PT**» | «Κωνσταντίνος Δανάλης, **PT, OMT**» |
| [about/page.tsx](../src/app/about/page.tsx) | `<ol>` με νούμερα **1-4** | `<ul>` **χωρίς νούμερα** |
| [content.ts](../src/lib/content.ts) education | 4 items (ΠΑΔΑ + 3 Τμήματα) | **2 items**: ΠΑΔΑ + **Orthopedic Manual Therapy (OMT Greece, IFOMPT)** |
| content.ts memberships | 4 items | **6**: +**APTA international affiliate**, +**OMT Greece — IFOMPT**, μετά Π.Σ.Φ. + 3 Τμήματα |

📍 `/about` — «Ακαδημαϊκή πορεία» & «Επαγγελματικά σώματα»

## 16. Reviews microsite

`physiodanali-reviews/index.html` — **ΠΡΙΝ:** κανένα λογότυπο. **ΜΕΤΑ:** λογότυπο στο hero, clickable → physiodanali.gr
📍 physiodanali-reviews.vercel.app

---

# 🔴 Τι μένει για 100%

## Από τον Δανάλη
1. **DNS** → cutover *(και διόρθωση email — δες κάτω)*
2. **Anthropic credits** — άδειος λογαριασμός ⇒ δεν παράγονται νέα άρθρα
3. **Calendar ID + share** ημερολογίου *(SA email & key ήδη στο Vercel, επαληθευμένα)*
4. **Ποιο email** για ειδοποιήσεις ραντεβού (`BOOKING_NOTIFY_TO`)
5. **Email provider** — ⚠️ χαλασμένο: **SPF** εξουσιοδοτεί μόνο τις παλιές IP του aspx.gr, **όχι το Google** ⇒ δεν φεύγουν ούτε τα δικά του emails. Είτε διόρθωση SPF (1 γραμμή) είτε μετάβαση σε Zoho.

## Από εμάς
6. **Markdown links στα AI άρθρα** — ο renderer δεν κάνει parse `[text](/path)`· πριν δημοσιευτεί το 1ο AI άρθρο
7. *(προαιρετικά)* Search Console · Analytics · DB constraint double-booking · Turnstile keys · `SITE_URL` στο cutover
