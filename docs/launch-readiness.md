# PhysioDanali — Launch Readiness Audit

> Πλήρες audit του project για να φτάσει **100% production-ready**.
> Ημερομηνία: 2026-06-15 · Live: https://physiodanali.vercel.app
> Stack: Next.js 16.2.5 · React 19 · Tailwind 4 · Supabase · Vercel (Hobby)

## 📊 Συνολική εικόνα

**Εκτίμηση ετοιμότητας: ~70%.**

Το θεμέλιο είναι **εξαιρετικό**: design, structured data (SEO schema), performance (272KB / 0.5s load), hosting, AI blog CMS — όλα σωστά. Αυτό που λείπει για 100% είναι κυρίως **νομικά (GDPR)**, η **φόρμα που δεν δουλεύει**, το **email σε production mode**, οπτικά (εικόνες/OG) και το **booking**.

| Κατηγορία | Κατάσταση |
|---|---|
| 🟢 Design / δομή | Έτοιμο (βελτιώσεις μόνο) |
| 🟢 SEO structured data | Εξαιρετικό |
| 🟢 Performance | Εξαιρετικό |
| 🟢 Hosting / deploy | Live |
| 🟢 AI blog automation | Λειτουργεί end-to-end |
| ✅ Νομικά / GDPR | **ΕΓΙΝΕ** (code) — εκκρεμεί μόνο ΑΦΜ/αρ.αδείας από πελάτη |
| 🔴 Φόρμα επικοινωνίας | **Δεν δουλεύει (fake mailto)** |
| 🟠 Email (Resend) production | From=amox.gr ✅· μένει φρέσκο key |
| 🟡 Εικόνες (ποιότητα) | Ο dev πρόσθεσε νέες εικόνες· μένει hero + φωτογράφιση |
| ✅ Social sharing (OG) | **ΕΓΙΝΕ** (default + per-article) |
| 🟠 Analytics | Δεν υπάρχει (εκκρεμεί) |
| 🟠 Booking system | Αφαιρέθηκε (μετά τον πελάτη) |
| ✅ Security headers / error pages | **ΕΓΙΝΕ** |

---

# 🎯 ΤΙ ΜΕΝΕΙ ΓΙΑ 100% — Master Checklist (ενημ. 2026-06-17)

> Η **ενιαία λίστα αλήθειας**. Ό,τι έχει ολοκληρωθεί είναι στο «✅ Πρόοδος» πιο κάτω· εδώ μόνο ό,τι **ΜΕΝΕΙ**. Ομαδοποιημένο ανά «ποιος».

### 🔴 Functional — πριν το επίσημο launch
- [ ] **Φόρμα επικοινωνίας να στέλνει** (B1) — τώρα είναι `mailto:`/ψεύτικη. API route + Resend + spam protection. *(εγώ)*
- [ ] **Resend production**: φρέσκο API key (rotate το εκτεθειμένο) → GitHub Secrets + Vercel. *(owner δίνει key → εγώ wiring)*
- [ ] **Final QA pass** σε όλο το site πριν βγει (φόρμα, links, mobile, legal, login). *(εγώ)*

### 🔑 Rotate εκτεθειμένα keys — **owner**
- [ ] Anthropic · Supabase PAT · Resend · Unsplash (όλα μπήκαν σε chat). + άλλαξε τους temp κωδικούς admin (`Danaliqy3mt8` / `Amoxhh0gcona`).

### 🌐 Infrastructure — **owner** (+ dev wiring)
- [ ] ⭐ **Custom domain physiodanali.gr → νέο site** — ο Νο.1 SEO κρίκος (συνδέει το GBP με 121×5.0). *(owner DNS)*
- [ ] **Google Search Console** (ιδανικά μετά το domain) + verification token → `GOOGLE_SITE_VERIFICATION` + submit sitemap. *(owner + εγώ)*
- [ ] **Analytics** (GA4 ή Vercel Analytics) + cookie-consent gating. *(εγώ install + owner λογαριασμός)*
- [ ] **Supabase Pro** ~$25/μ (προαιρετικό· public blog καλυμμένο με static fallback, αλλά admin/generation θέλουν always-on). *(owner)*

### 📋 Από τον πελάτη (Δανάλη)
- [ ] **ΑΦΜ + αρ. άδειας ασκήσεως** → `site.legal` (εμφανίζονται αυτόματα). *(υποχρεωτικό νομικά)*
- [ ] **Έγκριση νομικών κειμένων** (privacy/terms/cookies).
- [ ] **Επαγγελματικές φωτογραφίες** (hero + about) — το μεγαλύτερο visual κενό.
- [ ] **Άδεια προβολής κριτικών** + testimonials (για Review schema).
- [ ] **Απόφαση booking** (SimplyBook / custom / όχι).

### 🟠 SEO / Design polish — **εγώ** (όταν έρθει υλικό)
- [ ] **Hero ≥1920px** + αντικατάσταση όσων low-res/Pinterest μένουν.
- [ ] **Review/AggregateRating fix** (τώρα hardcoded 100· πραγματικό 121 + embed κριτικών).
- [ ] **Location pages** (`/fysikotherapeftis-glyfada`, `-voula`…) — organic SEO.

### 🤖 Blog automation — finishing touches
- [ ] **Topic backlog preload** (15-20 SEO θέματα) — έλεγχος τι βγαίνει. *(εγώ)*
- [ ] **End-to-end test** (generate → email → login → preview → publish). *(μαζί)*

### 🟡 Smaller polish (P1–P10, μη-blockers)
- [ ] WebGL mobile frameloop · PWA manifest/apple-icon · skip-to-content · focus styles · contact canonical · lint/typecheck scripts · `.nvmrc` · accessibility statement.

---

# ✅ Πρόοδος

### 2026-06-16 — Pull & integration (other dev) + SEO update
- ⬇️ **Pull 16 commits** του άλλου dev — ενσωματώθηκαν καθαρά πάνω στη δική μου δουλειά (build GREEN 43 routes, μηδέν conflicts). Συμπληρωματικά: **νέες εικόνες υπηρεσιών** (5×) + photo backgrounds, UI/layout αναβαθμίσεις (chiropractic/therapies/lymphatic, vertical timeline, color accents), content (lymphatic 15+ έτη), και ⭐ **static fallback άρθρων** όταν η Supabase είναι κάτω ([articles.ts](src/lib/articles.ts)).
- 🔎 **SEO/GEO section** προστέθηκε + αναθεωρήθηκε με βάση το πραγματικό GBP (verified, **121×5.0★**) — βλ. παρακάτω.

### 2026-06-15 — Social sharing OG + Security headers + Error pages (build GREEN, 43 routes)
- ✅ **OG / Social sharing (I2)** — δυναμικά branded 1200×630 images με `next/og`: default για όλο το site ([opengraph-image.tsx](src/app/opengraph-image.tsx)) + **per-article** με τον τίτλο του άρθρου ([articles/[slug]/opengraph-image.tsx](src/app/articles/[slug]/opengraph-image.tsx)). Twitter cards (`summary_large_image`). Ελληνικά renderάρουν σωστά (EB Garamond/Inter μέσω Google Fonts, subsetted, graceful fallback). Generator: [src/lib/og.tsx](src/lib/og.tsx). Verified: og:image/twitter:image meta με absolute URLs.
- ✅ **Security headers (I5)** — [next.config.ts](next.config.ts) `headers()`: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, X-DNS-Prefetch-Control. (CSP σκόπιμα όχι enforced ακόμα — template σε σχόλιο, hardening follow-up.)
- ✅ **Error pages (I6)** — branded custom [404](src/app/not-found.tsx) (status 404, με header/footer), [error boundary](src/app/error.tsx) (reset), [global-error](src/app/global-error.tsx). (loading.tsx παραλείφθηκε σκόπιμα — root-level loading κάνει flash σε static nav.)

### 2026-06-15 — Νομικά / GDPR (ΟΛΟΚΛΗΡΩΘΗΚΕ, build GREEN)
- ✅ **`/privacy`** — Πολιτική Απορρήτου (πλήρης GDPR, tailored στις πραγματικές ροές: φόρμα→Resend/Supabase, Vercel, analytics-με-συγκατάθεση· δικαιώματα GDPR + ΑΠΔΠΧ)
- ✅ **`/cookies`** — Πολιτική Cookies
- ✅ **`/terms`** — Όροι Χρήσης (+ ιατρική αποποίηση ευθύνης / medical disclaimer)
- ✅ **Cookie consent banner** — opt-in, θυμάται την επιλογή, helper `hasAnalyticsConsent()` έτοιμο να κλειδώνει τα analytics (I3)
- ✅ **GDPR consent checkbox** στη φόρμα — required, μπλοκάρει το submit μέχρι αποδοχή, link στο /privacy
- ✅ **Footer** — links (Πολιτική Απορρήτου / Cookies / Όροι Χρήσης) + στοιχεία υπευθύνου· ΑΦΜ/άδεια εμφανίζονται **αυτόματα** μόλις συμπληρωθούν
- ✅ Sitemap, canonical, title template — όλα σωστά· `next build` 41 routes GREEN
- ⏳ **Εκκρεμεί από πελάτη:** ΑΦΜ + αρ. άδειας ασκήσεως επαγγέλματος → `site.legal.afm` / `site.legal.license` σε [content.ts](src/lib/content.ts). Όλα τα νομικά κείμενα να ελεγχθούν/εγκριθούν από τον πελάτη.

> Αρχεία: [legal.ts](src/lib/legal.ts) (περιεχόμενο), [legal-prose.tsx](src/components/site/legal-prose.tsx) (renderer), [cookie-consent.tsx](src/components/site/cookie-consent.tsx), 3 pages σε `src/app/{privacy,cookies,terms}/`.

---

# 🔴 BLOCKERS — Πρέπει ΟΠΩΣΔΗΠΟΤΕ πριν βγει επίσημα

> Χωρίς αυτά το site είναι είτε **μη λειτουργικό** είτε **νομικά εκτεθειμένο** (ειδικά ως EU ιατρικό site).

### B1. Η φόρμα επικοινωνίας ΔΕΝ στέλνει μηνύματα ⚠️
**Το σοβαρότερο εύρημα.** Η φόρμα στο [contact-form.tsx](src/components/site/contact-form.tsx) δεν έχει backend — απλώς ανοίγει το email client του χρήστη με `mailto:` (σχόλιο στον κώδικα: *"No backend yet"*). Αν ο χρήστης δεν έχει ρυθμισμένο email client ή δεν πατήσει «αποστολή» μόνος του, **το μήνυμα χάνεται**. Χειρότερα: εμφανίζει μήνυμα επιτυχίας «Ευχαριστούμε» που είναι **παραπλανητικό** — ο πελάτης νομίζει ότι έλαβε ραντεβού ενώ δεν ήρθε τίποτα.

**Τι χρειάζεται:**
- API route `/api/contact` (server) που στέλνει το μήνυμα με **Resend** στο `info@physiodanali.gr`
- Αλλαγή της φόρμας από `mailto:` → `fetch("/api/contact")`
- Πραγματικά success/error states (όχι ψεύτικο «ευχαριστούμε»)
- **Spam protection**: honeypot field + rate limiting (τώρα = μηδέν προστασία)
- Αποθήκευση και στο Supabase (προαιρετικά, ως backup/CRM)

**Ποιος:** εγώ (κώδικας) → χρειάζεται Resend production (βλ. B5)
**Effort:** ~1–2 ώρες

### B2. Πολιτική Απορρήτου (Privacy Policy) — λείπει, link σπασμένο
Το footer έχει link `/privacy` αλλά **η σελίδα δεν υπάρχει** → 404 αυτή τη στιγμή. Για EU ιατρικό site που μαζεύει προσωπικά δεδομένα (όνομα/email/τηλέφωνο/υγεία), η Πολιτική Απορρήτου είναι **υποχρεωτική** (GDPR Άρθρα 13–14).

**Τι χρειάζεται:** σελίδα `/privacy` με: ποια δεδομένα μαζεύονται, γιατί, πόσο κρατιούνται, ποιοι τρίτοι (Supabase/Resend/Vercel), δικαιώματα χρήστη, στοιχεία επικοινωνίας υπευθύνου.
**Ποιος:** εγώ (template) + πελάτης/AMOX (επιβεβαίωση στοιχείων & data practices)
**Effort:** ~1 ώρα (template) + review

### B3. Cookie consent banner — λείπει
Δεν υπάρχει banner συγκατάθεσης cookies. Υποχρεωτικό σε EU (ePrivacy + GDPR) μόλις μπει analytics ή οποιοδήποτε non-essential cookie.

**Τι χρειάζεται:** lightweight cookie banner (opt-in), που να μπλοκάρει analytics μέχρι ο χρήστης να αποδεχτεί.
**Ποιος:** εγώ
**Effort:** ~1 ώρα (συνδυάζεται με το analytics στο I3)

### B4. GDPR consent + νομικά στοιχεία επιχείρησης
- **Consent checkbox στη φόρμα**: η φόρμα μαζεύει προσωπικά δεδομένα χωρίς checkbox συγκατάθεσης («Αποδέχομαι την επεξεργασία...» με link στο privacy). Υποχρεωτικό (GDPR Άρθρο 7).
- **Στοιχεία επιχείρησης στο footer**: λείπουν **ΑΦΜ / ΓΕΜΗ / αριθμός άδειας ασκήσεως επαγγέλματος**. Η ελληνική νομοθεσία τα απαιτεί για εμπορικά/ιατρικά sites.

**Ποιος:** εγώ (checkbox + footer fields) · **πελάτης** (δίνει ΑΦΜ/ΓΕΜΗ/αρ. αδείας)
**Effort:** ~30 λεπτά (μόλις έρθουν τα στοιχεία)

### B5. Resend σε production mode (πραγματικό email)
Τώρα το email στέλνει από `onboarding@resend.dev` (**test sender** — πάει spam, δεν δουλεύει αξιόπιστα). Επιβεβαιωμένο: τα test emails πήγαν σε spam.

**Τι χρειάζεται:**
- Resend account στον **λογαριασμό του πελάτη** (billing/ownership)
- **Verified domain** physiodanali.gr (SPF + DKIM + DMARC DNS records)
- FROM = `noreply@physiodanali.gr` ή `info@physiodanali.gr`
- Νέο API key στα Vercel env + GitHub Secrets

**Ποιος:** AMOX/πελάτης (account + DNS) · εγώ (wiring)
**Effort:** ~1 ώρα (+ DNS propagation)

### B6. Rotate τα εκτεθειμένα κλειδιά 🔑
Στη συνομιλία εκτέθηκαν πραγματικά κλειδιά (Anthropic, Supabase PAT, Resend). **Πρέπει να ακυρωθούν/αντικατασταθούν** όλα, ακόμα κι αν δεν έγινε commit (είναι μόνο στο gitignored `.env.local`).

**Ποιος:** AMOX (owner)
**Effort:** ~20 λεπτά

---

# 🟠 IMPORTANT — Για επαγγελματικό launch

### I1. Εικόνες — ποιότητα (το μεγάλο visual θέμα)
Επιβεβαιωμένο: οι source εικόνες είναι χαμηλής ποιότητας.
- `auxenelia.jpg` **300×225** (πολύ μικρή)
- `herohome2.jpg` **768×512** (soft/γενικό hero)
- Πολλές service εικόνες **736px** = Pinterest-sourced (μέτριες + πιθανό copyright)
- Στιλιστική ασυνέπεια + νεκρό αρχείο `herohome.jpeg` (1.6MB)

> ℹ️ Δεν επηρεάζει **ταχύτητα** (το `next/image` τις συμπιέζει), μόνο **εμφάνιση**.

> ✅ **Update (pull 2026-06-16):** ο άλλος dev πρόσθεσε **νέες εικόνες υπηρεσιών** (`brazilian2g`, `chiropractic2g`, `clinical2g`, `services2g`, `serviceshero`) + photo backgrounds (`bgImage` prop) — βελτιώνει αισθητά την κατάσταση. **Μένει:** δυνατό hero ≥1920px + επαγγελματική φωτογράφιση του Δανάλη + καθάρισμα των παλιών low-res/Pinterest assets.

**Τι χρειάζεται (υπόλοιπο):** επαγγελματική φωτογράφιση του Δανάλη (hero/about) + αντικατάσταση όσων παλιών 736px/low-res μένουν. Hero ≥1920px.
**Ποιος:** πελάτης/φωτογράφος (υλικό) · εγώ (wiring/optimization)

### I2. OG images — τα social shares βγαίνουν ΚΕΝΑ
`metadataBase` υπάρχει, αλλά **καμία `openGraph.images`** → όταν μοιράζεσαι το link σε FB/Insta/WhatsApp/Viber εμφανίζεται **χωρίς εικόνα**. Επίσης λείπει εντελώς το Twitter card.

**Τι χρειάζεται:** default OG image (1200×630) στο root layout + per-article OG (το cover κάθε άρθρου) + twitter card metadata.
**Ποιος:** εγώ
**Effort:** ~1 ώρα

### I3. Analytics + Search Console — μηδενική ορατότητα
Δεν υπάρχει **κανένα** analytics (ούτε GA, ούτε Vercel Analytics, ούτε Plausible) και το Google Search Console **δεν είναι verified**. Δηλαδή κανείς δεν ξέρει πόσοι μπαίνουν, από πού, τι κάνουν.

**Τι χρειάζεται:** Vercel Analytics (δωρεάν, privacy-friendly) ή GA4 + Search Console verification meta tag + submit sitemap. (Συνδέεται με B3 cookie consent.)
**Ποιος:** εγώ (install) · AMOX (GA/Search Console property)
**Effort:** ~1 ώρα

### I4. Booking system (ραντεβού online)
Αφαιρέθηκε στο προηγούμενο στάδιο. Τώρα οι CTA «Κλείστε ραντεβού» πάνε στο `/contact`. Αν θες πραγματικό online booking με ημερολόγιο/ώρες, χρειάζεται ξανά.

**Επιλογές:**
- **SimplyBook.me** — έτοιμο widget, calendar, reminders, GDPR-ready (account πελάτη). Γρήγορο.
- **Custom** — πλήρης έλεγχος design, αλλά πολύ περισσότερη δουλειά.

> ⚠️ Πες μου ποια επιλογή θες — να μην το ξαναχτίσω χωρίς απόφαση.
**Ποιος:** απόφαση δική σου → μετά εγώ + account πελάτη

### I5. Security headers
Το [next.config.ts](next.config.ts) δεν βάζει HTTP security headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP). Εύκολη προσθήκη μέσω `headers()`.
**Ποιος:** εγώ · **Effort:** ~30 λεπτά

### I6. Custom 404 / error / loading pages
Λείπουν `not-found.tsx`, `error.tsx`, `global-error.tsx`, `loading.tsx`. Τώρα ένα σπασμένο link δείχνει το γενικό Next.js 404 (όχι branded). Production site θέλει τουλάχιστον custom 404 + error boundary.
**Ποιος:** εγώ · **Effort:** ~1 ώρα

### I7. Όροι Χρήσης + Cookie Policy
- `/terms` (Όροι Χρήσης) — όρια ευθύνης, πολιτική ακυρώσεων ραντεβού, εύρος υπηρεσιών
- `/cookies` (Cookie Policy) — τι cookies, διάρκεια, σκοπός (ή ως section μέσα στο privacy)

**Ποιος:** εγώ (template) + πελάτης (review) · **Effort:** ~1 ώρα

---

# 🔎 SEO / GEO — Στρατηγική «Νο.1 φυσικοθεραπευτής Γλυφάδα & Βούλα»

> **Στόχος:** top-3 στο Google (local pack + organic) για «φυσικοθεραπευτής Γλυφάδα/Βούλα», και να μας **προτείνουν τα AI** (ChatGPT / Perplexity / Google AI Overviews / Gemini) όταν κάποιος ρωτά για φυσικοθεραπευτή ή χιροπρακτικό στα νότια προάστια.
>
> Η αλήθεια του local SEO: **~80% κρίνεται ΕΚΤΟΣ κώδικα** (Google Business Profile + κριτικές + citations). Ο κώδικας είναι ήδη άριστος — το «κλειδί» είναι τα owner-side βήματα παρακάτω.

## 🎯 Keyword map (στόχευση)
**Primary (υψηλή πρόθεση αγοράς):**
- `φυσικοθεραπευτής Γλυφάδα` · `φυσικοθεραπευτής Βούλα`
- `φυσικοθεραπεία κατ' οίκον` + Γλυφάδα / Βούλα / Βουλιαγμένη / Βάρη / Άλιμο
- `χιροπρακτικός Γλυφάδα` · `χιροπρακτικός Βούλα`

**Secondary / long-tail (υπηρεσία × περιοχή — εύκολες νίκες):**
- `φυσικοθεραπεία για οσφυαλγία/αυχεναλγία Γλυφάδα`
- `brazilian lymphatic drainage` / `λεμφικό μασάζ νότια προάστια`
- `clinical pilates Γλυφάδα` · `χιροπρακτική Βουλιαγμένη`
- `φυσικοθεραπεία στο σπίτι Βούλα` (γηριατρική, μετεγχειρητική, νευρολογική)

**English (expats νότιων προαστίων):** `physiotherapist Glyfada / Voula`, `home physiotherapy Athens south`.

## ✅ Τι έχουμε ήδη (γερό θεμέλιο — βαθμός A)
Structured data (LocalBusiness/MedicalBusiness/Person/FAQ/Article/Breadcrumb), geo coordinates, `areaServed` ×5, μοναδικά metadata παντού, δυναμικό sitemap, robots, ταχύτητα (272KB / 0.5s), mobile, canonical, OG images, **+ εβδομαδιαίο AI blog** (φρέσκο GEO περιεχόμενο). Αυτό το θεμέλιο είναι ήδη καλύτερο από τον μέσο τοπικό ανταγωνιστή.

## 🥇 Local SEO — οι ΜΕΓΑΛΥΤΕΡΟΙ μοχλοί (κατά σειρά impact)

**1. Google Business Profile (GBP) — ✅ ΗΔΗ ΙΣΧΥΡΟ** *(owner — επιβεβαιωμένο 2026-06-16)*
- ✅ Verified, ενεργό knowledge panel: «PhysioDanali – Χειροπρακτική & Φυσικοθεραπεία Κατ' Οίκον **Βούλα, Γλυφάδα**».
- ✅ Σωστή κατηγορία «**Φυσικοθεραπευτής στη Γλυφάδα**», διεύθυνση (Αγ. Νεκταρίου 58, Γλυφάδα 165 62), τηλέφωνο, ωράριο (έως 23:00), φωτογραφίες, χάρτης + street view.
- 🟢 Μικρές βελτιστοποιήσεις: πρόσθεσε *Χιροπρακτικός* ως 2η κατηγορία, **service areas** (Βουλιαγμένη/Βάρη/Άλιμο), εβδομαδιαία **GBP Posts** (αναδημοσίευση blog), ενότητα Q&A, υπηρεσίες με περιγραφές.
- ⭐ **ΚΡΙΣΙΜΟ**: το πεδίο «Ιστότοπος» του GBP δείχνει σε **physiodanali.gr** → μόλις το domain δείξει στο **νέο** site (task O1), όλη η ισχύς του GBP «πέφτει» στο νέο site. **Αυτό κάνει το custom domain switch τον Νο.1 συνδετικό κρίκο.**

**2. Google Reviews — ✅ ΗΔΗ ΕΞΑΙΡΕΤΙΚΕΣ** *(owner)*
- ✅ **121 αξιολογήσεις, 5.0★** — πραγματικές, στο Google. Καλύτερη prominence από τους περισσότερους τοπικούς ανταγωνιστές.
- 🟢 Διατήρηση: σταθερή **velocity** νέων κριτικών (QR/link μετά τη συνεδρία) + **απάντηση σε κάθε κριτική** + ενθάρρυνση keyword-rich («οσφυαλγία, ήρθε σπίτι στη Βούλα»).
- → Οι 2 δυσκολότεροι μοχλοί (GBP + κριτικές) είναι **ήδη κερδισμένοι** — τεράστιο πλεονέκτημα.

**3. Dedicated location landing pages** 🟠 *(dev)*
- Μοναδικές σελίδες ανά περιοχή: `/fysikotherapeftis-glyfada`, `/fysikotherapeftis-voula` (+ Βουλιαγμένη / Βάρη / Άλιμο).
- ⚠️ ΟΧΙ thin/duplicate — η κάθε μία θέλει **πραγματικό τοπικό περιεχόμενο**: χάρτης, τοπικά σημεία, τοπικές κριτικές, χρόνος εξυπηρέτησης, τοπικό FAQ, `LocalBusiness` schema με τη συγκεκριμένη περιοχή.
- → Μεγάλος μοχλός για organic «φυσικοθεραπευτής + περιοχή».

**4. NAP consistency + citations** 🟠 *(owner)*
- **Ίδιο ακριβώς** Όνομα / Διεύθυνση / Τηλέφωνο σε site + GBP + όλους τους καταλόγους.
- Εγγραφή σε: **doctoranytime.gr** (το πιο σημαντικό για health), doctari, vrisko.gr, xo.gr, 11888, Apple/Bing Maps, κατάλογος ΠΣΦ.

**5. Review / AggregateRating schema** 🟠 *(dev)*
- Το schema έχει `aggregateRating 5.0 / 100` hardcoded ([src/lib/seo.ts](src/lib/seo.ts)). Το rating είναι **πραγματικό** (GBP: 121 × 5.0) αλλά (α) ο αριθμός είναι **stale (100 → 121)** και (β) το Google δεν δίνει star rich-snippets σε «self-serving» aggregateRating που δεν στηρίζεται σε κριτικές **ορατές στη σελίδα**.
- Fix: ενημέρωση count + **embed πραγματικών Google reviews** στο site (testimonials section) ώστε το markup να είναι έγκυρο.

## ⚔️ Ανταγωνισμός (νότια προάστια)
- Στο brand search «physiodanali» κυριαρχούμε (knowledge panel + 121×5.0). Στα **generic** όμως («φυσικοθεραπεία κατ' οίκον», «φυσικοθεραπευτής Γλυφάδα») ανταγωνιστές όπως **care4physio.gr** & **physiovardas.com** τρέχουν **Google Ads** + οργανικό περιεχόμενο.
- Στρατηγική: (α) κέρδισε το **οργανικό** με location/content pages (έχουμε πλεονέκτημα: 121 κριτικές + AI blog) και (β) σκέψου **Google Ads** στα high-intent terms (οι ανταγωνιστές πληρώνουν → υπάρχει ζήτηση). *(owner απόφαση)*

## 🤖 GEO — Generative Engine Optimization (AI Search)
Για να σε **προτείνει το ChatGPT / Perplexity / AI Overviews** όταν ρωτούν «καλός φυσικοθεραπευτής στη Γλυφάδα»:
- **Answer-first περιεχόμενο** + **FAQ schema** που ταιριάζει σε φυσικές ερωτήσεις. ✅ έχουμε FAQ — εμπλούτισέ το με τοπικές ερωτήσεις.
- **Entity clarity**: συνεπές όνομα + credentials + `sameAs` (social/ΠΣΦ) χτίζει την «οντότητα Δανάλης» για τα LLMs. Ιδανικά: **Wikidata entry** + Google Knowledge Panel.
- **`llms.txt`** (αναδυόμενο standard): curated markdown περίληψη του site για LLMs. *(dev — εύκολο)*
- **Παρουσία σε πηγές που εμπιστεύονται τα AI**: GBP, doctoranytime, κριτικές — τα LLMs αντλούν από εκεί.
- **Φρεσκάδα + βάθος**: το εβδομαδιαίο AI blog ✅ δουλεύει υπέρ μας — μη στερέψει το backlog.
- **Brand mentions** (ακόμα & χωρίς backlink) σε τοπικά/health sites μετράνε για GEO.

## 📝 Content / topical authority
- Pillar pages ανά πάθηση ✅ (αυχεναλγία/οσφυαλγία/ισχίο…) — εμπλούτισε με τοπικό angle + internal links.
- AI blog ✅ — refill topics + 2-4 internal links/άρθρο (ήδη στο prompt).
- Long-tail άρθρα: **υπηρεσία × πάθηση × περιοχή**.

## 🔗 Off-page (backlinks)
- Τοπικές συνεργασίες: γυμναστήρια / ιατρεία / σύλλογοι Γλυφάδας-Βούλας.
- Health directories (doctoranytime profile = link + citation μαζί).
- Τοπικά news/blogs νότιων προαστίων.

## 🛠 Dev-side TODO (μπορώ εγώ)
- [ ] Location landing pages (Γλυφάδα/Βούλα/Βουλιαγμένη/Βάρη/Άλιμο) με τοπικό schema
- [ ] `llms.txt` (GEO)
- [ ] `Service` / `MedicalProcedure` schema ανά υπηρεσία + `areaServed`
- [ ] Review/AggregateRating από πραγματικές κριτικές (ή αφαίρεση placeholder)
- [ ] Internal-linking audit + keyword-rich anchor text
- [x] OG images ✅ · Breadcrumb schema ✅ · Sitemap/robots ✅

## 👤 Owner/client TODO
- [x] **Google Business Profile** verified + πλήρες ✅ (121×5.0) — μένουν micro-opts (2η κατηγορία, posts, Q&A, service areas)
- [x] **Google Reviews** ✅ (121×5.0) — διατήρηση velocity + απαντήσεις
- [ ] **Custom domain** physiodanali.gr → νέο site *(συνδέει το GBP)*
- [ ] **Search Console** + submit sitemap + Bing Webmaster Tools
- [ ] Citations: doctoranytime, vrisko, xo.gr, 11888, ΠΣΦ
- [ ] *(απόφαση)* Google Ads στα high-intent terms (ανταγωνιστές πληρώνουν)
- [ ] (GEO) Wikidata entry + brand mentions

## 📊 Μέτρηση (KPIs)
- **Google Search Console** — queries, positions, CTR (submit το sitemap).
- **GBP Insights** — κλήσεις, οδηγίες, αναζητήσεις «discovery vs direct».
- **Rank tracking** για τα primary keywords.
- **(GEO) spot-check**: ρώτα ChatGPT/Perplexity «φυσικοθεραπευτής Γλυφάδα» — μας αναφέρει;

## 🥇 Σειρά προτεραιότητας (αναθεωρημένη — GBP & κριτικές ✅ ήδη)
1. 🔴 **Custom domain physiodanali.gr → νέο site** *(owner+dev, task O1)* — συνδέει το ισχυρό GBP (121×5.0) με το νέο site. Ο Νο.1 κρίκος τώρα.
2. 🟠 **Location pages** *(dev)* — κέρδισε το οργανικό για «φυσικοθεραπευτής + περιοχή» vs care4physio/physiovardas.
3. 🟠 **Search Console** *(owner)* + submit sitemap.
4. 🟠 **Review schema fix** (121 + embed κριτικών) + **llms.txt** + **Service schema** *(dev)*.
5. 🟢 **GBP micro-opts** (2η κατηγορία, posts, Q&A) + **citations** (doctoranytime) *(owner)*.
6. 🟢 **Google Ads** στα high-intent terms *(owner απόφαση)* + **backlinks/Wikidata** (GEO long-game).

---

# 🤖 Blog Automation — προς 100%

> **Αποφάσεις & πρόοδος (2026-06-17):**
> - 🖼️ Εικόνα → **Unsplash auto-fetch** επιλέχθηκε. Κώδικας ΕΓΙΝΕ (AI βγάζει `image_query` → script τραβά Unsplash → μπαίνει στο draft). **Εκκρεμεί:** δωρεάν `UNSPLASH_ACCESS_KEY` (owner) → GitHub Secrets + Vercel. Χωρίς key → draft χωρίς cover (όπως τώρα), override στον editor.
> - 🖼️ Unsplash key → **ΜΠΗΚΕ & TESTED** ✅ (.env.local + Vercel + GitHub Secrets)· auto-image **ενεργό**. (Σε λίστα rotation μαζί με Resend.)
> - 🔎 Indexing → **Bing/Yandex ΕΝΕΡΓΟ** ✅ (IndexNow). **Google ≠ IndexNow** — ο Google βρίσκει μέσω **sitemap** (✅ δυναμικό) + **Search Console** (ΟΧΙ στημένο ακόμα). Google verification **wired** (env `GOOGLE_SITE_VERIFICATION`)· χρειάζεται property (ιδανικά **μετά** το domain switch σε physiodanali.gr) + submit sitemap. Δεν υπάρχει νόμιμο «auto-ping Google» (το Indexing API είναι μόνο για job postings).
> - 📧 Email → `NOTIFY_FROM=noreply@amox.gr` **μπήκε** στα GitHub Secrets ✅· παραλήπτης info@amox.gr. **Εκκρεμεί:** φρέσκο RESEND key (rotate).

## Πώς δουλεύει ΤΩΡΑ
- **Πότε:** κάθε **Δευτέρα 09:00 UTC (~12:00 ώρα Ελλάδας)**, μέσω **GitHub Action** ([weekly-article.yml](.github/workflows/weekly-article.yml)) — + χειροκίνητα με «Run workflow». Φτιάχνει **1 draft/βδομάδα**.
- **Πώς:** Action → `scripts/generate-article.ts` → παίρνει θέμα από το backlog (`article_topics`) ή το AI προτείνει μόνο του → Claude (`claude-sonnet-4-6`) γράφει πλήρες άρθρο (structured output) → **insert ως draft** → email ειδοποίηση.
- **Human-in-the-loop:** τίποτα δεν δημοσιεύεται αυτόματα. Ο πελάτης μπαίνει (password login) → **Προβολή** (draft preview ✅) → **Έγκριση & Δημοσίευση**.
- **Στη δημοσίευση:** καλείται ήδη `revalidateTag("articles")` + `pingIndexNow(...)` ([article-actions.ts](src/lib/article-actions.ts)).

## 1. 🖼️ Εικόνα — ΤΩΡΑ χειροκίνητη, τη θέλουμε αυτόματη
**Κατάσταση:** το AI **δεν** βάζει εικόνα (το schema/insert δεν έχει `image`) → τα drafts έρχονται **χωρίς cover** → ο πελάτης πρέπει να ανεβάσει εικόνα χειροκίνητα στον editor (Supabase Storage `article-images`). ⚠️ Αν δημοσιεύσει χωρίς, το `<Image>` βγαίνει κενό.

**Επιλογές αυτοματοποίησης:**
| | Προσέγγιση | Pros | Cons |
|---|---|---|---|
| **A** | **Unsplash auto-fetch** (το AI βγάζει `image_query` → script τραβά σχετική φωτό· το unsplash είναι ήδη allow-listed στο next.config) | Μηδέν δουλειά, δωρεάν, ποικιλία | Generic stock — ίδιο ρίσκο «μέτριας φωτό» |
| **B** ⭐ | **Curated pool ανά κατηγορία** (AMOX/πελάτης δίνει 4-5 καλές φωτό/υπηρεσία μία φορά· script επιλέγει με rotation/hash ανά slug) | Ποιότητα + συνέπεια + brand + αυτόματο + ποικιλία | Θέλει αρχικό υλικό μία φορά |
| **C** | **AI-generated** (DALL·E/Gemini) | Μοναδικές | Κόστος/εικόνα, ρίσκο ιατρικής ακρίβειας — **όχι** για κλινικά |

→ **Πρόταση: B** (curated pool) — αυτόματο + ποιοτικό, με **πάντα** δυνατότητα override στον editor. (A ως γρήγορο fallback αν δεν υπάρχει pool.)
**Τι χρειάζεται:** (dev) πεδίο `image_query`/`category` στο prompt + λογική επιλογής στο `scripts/generate-article.ts`· (owner) το pool εικόνων ανά κατηγορία.

## 2. 🔎 Indexing — wired αλλά ΑΝΕΝΕΡΓΟ
**Κατάσταση:** `pingIndexNow` καλείται **ήδη στη δημοσίευση** (Bing/Yandex), αλλά **no-op χωρίς `INDEXNOW_KEY`**. Στο Vercel δεν είναι σετ → δεν χτυπάει.
**Τι χρειάζεται:**
- (dev/owner) Δημιουργία IndexNow key (GUID) + set **`INDEXNOW_KEY` στο Vercel** → το `/indexnow.txt` το σερβίρει αυτόματα → κάθε publish ειδοποιεί Bing/Yandex **αυτόματα**. *(Μπορώ να το κάνω τώρα μέσω CLI.)*
- **Google:** δεν χρησιμοποιεί IndexNow → καλύπτεται από το **δυναμικό sitemap** (ήδη περιλαμβάνει νέα άρθρα) + **Search Console** (submit sitemap μία φορά· ο Google ξανα-crawl-άρει). 

## 3. 📧 Email ειδοποίησης (κάθε νέο blog) — τι μένει
**Κατάσταση:** στέλνεται σε κάθε νέο draft, αλλά από `onboarding@resend.dev` (test → spam) προς `info@amox.gr`. Το περιεχόμενο λέει «μπες να ελέγξεις» με link στο `/admin/articles/{id}` → password login (όχι magic link ✅).
**Τι χρειάζεται:**
- (owner) **Φρέσκο RESEND_API_KEY** (rotate το εκτεθειμένο) → set σε **GitHub Secrets** (το Action) **+ Vercel**.
- (dev) `NOTIFY_FROM=PhysioDanali <noreply@amox.gr>` (amox.gr ✅ verified) → GitHub Secrets + Vercel.
- (απόφαση) `NOTIFY_TO`: `info@physiodanali.gr` (πελάτης) ή `info@amox.gr` (εσύ) προς το παρόν.
- **Supabase custom SMTP** (Resend) — δεν χρειάζεται πια για login (password), αλλά καλό για τυχόν μελλοντικά auth emails.

## 4. 🗂️ Topic backlog — να μη στερέψει
Αν αδειάσει το `article_topics`, το AI διαλέγει μόνο του θέμα (ΟΚ, αλλά λιγότερος έλεγχος). **Πρόταση:** προφόρτωση **15-20 SEO θεμάτων** (φυσικοθεραπευτής Γλυφάδα/Βούλα × παθήσεις) → ξέρεις τι θα βγαίνει + στοχευμένο SEO.

## 5. 🔔 Monitoring
Αν αποτύχει το GitHub Action, το GitHub στέλνει email στον owner του repo by default. *(Καλό να επιβεβαιωθεί ότι φτάνει.)*

## ✅ Checklist για 100% blog automation
**Dev (εγώ):**
- [ ] Auto-εικόνα (επιλογή B ή A) στο `scripts/generate-article.ts` + prompt
- [ ] (γρήγορο) Generate + set `INDEXNOW_KEY` στο Vercel
- [ ] `NOTIFY_FROM` amox.gr στα env
- [ ] Προφόρτωση topic backlog (15-20)

**Owner:**
- [ ] Φρέσκο RESEND_API_KEY → GitHub Secrets + Vercel
- [ ] Απόφαση `NOTIFY_TO` (πελάτης/εσύ)
- [ ] (επιλογή B) pool εικόνων ανά κατηγορία
- [ ] Search Console: submit sitemap (για Google indexing)

---

# 🟡 POLISH — Nice to have (ποιοτικό φινίρισμα)

| # | Θέμα | Λεπτομέρεια | Effort |
|---|---|---|---|
| P1 | **WebGL mobile** | Τα 2 three.js scenes τρέχουν `frameloop="always"` → μπαταρία σε φθηνά κινητά. Αλλαγή σε `demand` ή κρύψιμο σε mobile. | 15′ |
| P2 | **PWA / icons** | Λείπουν `apple-icon.png`, `manifest.ts`, icon sizes (μόνο favicon υπάρχει). | 30′ |
| P3 | **Skip-to-content link** | Accessibility — keyboard nav. | 15′ |
| P4 | **Focus styles** | Minimal focus rings σε buttons/links (μόνο border change). | 30′ |
| P5 | **Contact canonical** | Λείπει canonical στο `/contact`. | 5′ |
| P6 | **Alt text** | 1 cover εικόνα στο admin editor με κενό alt. | 5′ |
| P7 | **Review schema** | Πραγματικές κριτικές (τώρα aggregateRating 5.0/100 είναι placeholder — προσοχή, χωρίς πραγματικές κριτικές είναι ρίσκο). | 30′ |
| P8 | **Accessibility statement** | Σελίδα δήλωσης προσβασιμότητας. | 30′ |
| P9 | **Dev scripts** | Λείπουν `lint` / `typecheck` scripts, ESLint config, `.nvmrc` (Node 22), `engines` field. | 30′ |
| P10 | **Medical disclaimer** | Site-wide disclaimer (τώρα μόνο μέσα στα άρθρα). | 15′ |

---

# 🏗️ Infrastructure / Owner setup (εκτός κώδικα)

| # | Task | Ποιος | Σημείωση |
|---|---|---|---|
| O1 | **Custom domain** physiodanali.gr → Vercel | AMOX | Τώρα τρέχει σε `.vercel.app`. DNS + SSL auto. |
| O2 | **Supabase Pro** ($25/μήνα) | AMOX/πελάτης | Free tier **παγώνει** μετά ~1 βδομάδα αδράνειας. ✅ Μετριάστηκε: ο dev πρόσθεσε **static fallback** στα άρθρα ([articles.ts](src/lib/articles.ts)) → το **public blog ΔΕΝ σπάει** αν η Supabase είναι κάτω. Pro παραμένει συστατό για αξιόπιστο **/admin + weekly generation**. |
| O3 | **Resend account πελάτη** + verified domain | AMOX/πελάτης | Βλ. B5. |
| O4 | **Google Search Console** + **GA property** | AMOX | Βλ. I3. |
| O5 | **Strong CRON_SECRET** | AMOX | Production-grade secret στα env. |
| O6 | **Νομικά στοιχεία** (ΑΦΜ/ΓΕΜΗ/αρ.αδείας) | πελάτης | Βλ. B4. |
| O7 | **Πραγματικές φωτογραφίες** Δανάλη | πελάτης | Βλ. I1. |
| O8 | **Πραγματικές κριτικές** πελατών | πελάτης | Βλ. P7. |
| O9 | **Refill topic backlog** για το blog | AMOX | Να μη στερέψουν τα θέματα των άρθρων. |
| O10 | **Uptime monitoring** (προαιρετικό) | AMOX | π.χ. UptimeRobot (δωρεάν). |

---

# ✅ Τι είναι ΗΔΗ σωστό (μην το αγγίξουμε)

- **Structured data / SEO schema** — LocalBusiness, Person, MedicalTherapy, FAQPage, Article, BreadcrumbList. Εξαιρετικό.
- **Metadata coverage** — όλες οι σελίδες έχουν unique title/description.
- **Sitemap + robots** — δυναμικά, πλήρη (static + articles).
- **Performance** — 272KB, 0.5s load, edge, lazy 3D, next/image.
- **Mobile** — lazy WebGL, prefers-reduced-motion, mobile fallbacks.
- **Supabase keys** — σωστός διαχωρισμός (anon client / service-role server-only).
- **Cron API** — σωστά gated με CRON_SECRET.
- **`.env.local`** — gitignored, κανένα secret committed.
- **AI blog** — δουλεύει end-to-end (GitHub Action → draft → email → human review → publish).
- **TypeScript strict** — ενεργό.

---

# 🗺️ Προτεινόμενη σειρά εκτέλεσης

**Phase 1 — Make it WORK & LEGAL (blockers) 🔴**
B1 φόρμα → B5 Resend prod → B2 privacy → B3 cookie banner → B4 consent+ΑΦΜ → B6 rotate keys

**Phase 2 — Make it PROFESSIONAL 🟠**
I2 OG images → I5 security headers → I6 404/error pages → I3 analytics → I7 terms/cookies → I1 εικόνες (όταν έρθει υλικό)

**Phase 3 — Decide & build 🟠**
I4 booking (μετά από απόφασή σου)

**Phase 4 — Polish 🟡**
P1–P10

**Phase 5 — Owner/infra**
O1–O10 (παράλληλα, όποτε ο πελάτης δώσει στοιχεία/πρόσβαση)

---

# 👥 Ποιος κάνει τι (σύνοψη)

**Εγώ (κώδικας) μπορώ ΤΩΡΑ χωρίς εξωτερικά:**
B1 (φόρμα — με test Resend), B2/B3/B4-checkbox/B7 (νομικές σελίδες templates), I2 (OG), I5 (headers), I6 (error pages), I3 (analytics install), I7 (terms/cookies), όλα τα P1–P10.

**Χρειάζομαι από εσένα/AMOX:**
Απόφαση για booking (I4), Resend account+domain (B5/O3), domain (O1), Supabase Pro (O2), GA/Search Console (O4), rotate keys (B6).

**Χρειάζομαι από τον πελάτη:**
ΑΦΜ/ΓΕΜΗ/αρ.αδείας (B4), φωτογραφίες (I1), κριτικές (P7), review νομικών κειμένων (B2/I7).
