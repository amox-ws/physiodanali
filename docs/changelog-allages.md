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

---

## 17. Νέες ενότητες από τον πελάτη (27/07)

**Brazilian Lymphatic** — `/lymphatic` → «Γιατί το Brazilian είναι διαφορετικό»:
από 3 κάρτες σε **6**. Νέες:
- Μετεγχειρητικό λεμφικό μασάζ (λιποαναρροφήσεις, μαστεκτομές)
- Ουλώδης / ινώδης ιστός (λεμφικό, RF, υπέρηχο)
- Νυφικό μασάζ / ειδικές περιστάσεις

**Μέση** — `/low-back-pain` → «Έξι θεραπευτικές τεχνικές» έγινε **«Επτά»**.
Νέα #6: *Θεραπεία ιερολαγόνιας άρθρωσης* — άμεση ανακούφιση και
λειτουργικότητα, χρόνιες ή οξείες καταστάσεις.

**Αυχένας** — `/neck-pain` → επίσης **«Επτά»**.
Νέα #6: *Ολιστική θεραπεία* — χαλάρωση και ηρεμία μετά τη θεραπεία.

Αρχεία: `src/lib/content.ts`, `src/lib/content.en.ts`

> Bonus: τα αγγλικά `/en/neck-pain` και `/en/low-back-pain` **δεν είχαν
> καθόλου** τις ενότητες τεχνικών (ούτε τις δύο επεξηγήσεις «γιατί ζαλίζομαι /
> γιατί μουδιάζω» στον αυχένα). Προστέθηκαν πλήρη — πλέον οι δύο γλώσσες
> δείχνουν ακριβώς το ίδιο περιεχόμενο.

---

## 18. Η αγγλική έκδοση των άρθρων (29/07)

**Το πρόβλημα που ανέφερε ο πελάτης:** διόρθωσε το ελληνικό «Σύνδρομο
Απιοειδούς» και στα αγγλικά έβλεπε πάλι το ελληνικό κείμενο.

**Τρία bugs, το ένα πίσω από το άλλο:**

1. **Η μετάφραση κοβόταν στα 10 δευτερόλεπτα.** Τρέχει σε `after()`,
   που ζει όσο το `maxDuration` της σελίδας· τα Server Actions
   κληρονομούν αυτό της σελίδας τους. Καμία admin σελίδα δεν το όριζε
   → default 10s, ενώ η μετάφραση θέλει ~30s. **100% αποτυχία** σε κάθε
   άρθρο του CMS, σιωπηλά (ο μεταφραστής είναι best-effort).
   → `maxDuration = 60` στις σελίδες του editor.

2. **Το μοντέλο σειριοποιούσε τον πίνακα.** Σε άρθρα με markdown links,
   το `sections_en` ερχόταν ως *string* με άκυρο JSON μέσα (unescaped
   quotes) — ούτε `JSON.parse` το σώζει. Μετρημένο: όλα τα άρθρα με
   links απέτυχαν, όσα δεν είχαν πέρασαν.
   → Fallback: μετάφραση ανά section (9/9 εκεί που το μαζικό έκανε 0/4).

3. **Δεν υπήρχε τρόπος να δει ή να διορθώσει τα αγγλικά.** Το admin
   είχε μόνο ελληνικά πεδία.
   → Νέα καρτέλα «Αγγλική έκδοση» στον editor.

**Αποτέλεσμα:** 36/36 άρθρα έχουν αγγλική έκδοση· 30/30 δημοσιευμένα
επαληθευμένα ζωντανά.

Αρχεία: `src/lib/translate-article.ts`, `src/lib/article-actions.ts`,
`src/components/admin/english-panel.tsx`, `scripts/backfill-en.ts`,
`supabase/migrations/0007_articles_english_edited.sql`

---

## 19. Απόδοση — PageSpeed (21/09)

Ο πελάτης έστειλε PageSpeed: **desktop 68, mobile 77**.

### CLS 0.918 → 0  (το κρίσιμο)

Το όριο είναι 0.1· ήμασταν 9x πάνω. Μέτρηση με PerformanceObserver:
**ένα** shift, στα 2014ms, με πηγή το `<footer>`.

Το reveal του footer γινόταν με JS — useEffect μετρούσε το ύψος και
πρόσθετε class που το έκανε `fixed`, με ισοδύναμο padding στο body.
Και τα δύο μετά το πρώτο paint → στοιχείο 865px εμφανιζόταν σε ένα
frame. Ο ResizeObserver το ξαναπυροδοτούσε σε κάθε εικόνα του footer.

`position: sticky` δίνει το ίδιο εφέ χωρίς τίποτα από αυτά, και λύνει
μόνο του την περίπτωση για την οποία υπήρχε το JS (footer ψηλότερο
από το viewport δεν έχει πού να κολλήσει). **38 γραμμές JS λιγότερες.**

### LCP

| | πριν | μετά |
|---|---|---|
| desktop | 1.6s | **0.87s** |
| mobile | **6.6s** | **1.15s** |

Δύο αιτίες:
1. Το `getImageProps` δεν εκπέμπει preload όπως το `<Image priority>`.
   Το hero, που είναι το LCP element, δεν προφορτωνόταν καθόλου.
   Λύση: `ReactDOM.preload` με media queries ανά crop.
2. Το logo του header δηλωνόταν 1190x190 ενώ εμφανίζεται σε ~275px —
   προφορτωνόταν η παραλλαγή των 1200px **πριν** από το hero.

### Βάρος

- 6 CSS backgrounds → WebP με `image-set()`: **445KB → 170KB**
- `gtag.js` (194KB) → `lazyOnload`, χωρίς απώλεια conversions
- 1.7MB αχρησιμοποίητων εικόνων σβήστηκαν

Αρχεία: `globals.css`, `footer.tsx`, `hero.tsx`, `header.tsx`,
`google-ads.tsx`, `booking-band.tsx`, `layout.tsx`
