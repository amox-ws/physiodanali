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
| 🔴 Email (Resend) production | Test mode |
| 🟠 Εικόνες (ποιότητα) | Χαμηλή ανάλυση (εκκρεμεί) |
| ✅ Social sharing (OG) | **ΕΓΙΝΕ** (default + per-article) |
| 🟠 Analytics | Δεν υπάρχει (εκκρεμεί) |
| 🟠 Booking system | Αφαιρέθηκε (μετά τον πελάτη) |
| ✅ Security headers / error pages | **ΕΓΙΝΕ** |

---

# ✅ Πρόοδος

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

**Τι χρειάζεται:** επαγγελματική φωτογράφιση του Δανάλη (hero/about/services) + συνεκτικό licensed stock για τα υπόλοιπα. Hero ≥1920px.
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
| O2 | **Supabase Pro** ($25/μήνα) | AMOX/πελάτης | Το free tier **παγώνει** μετά ~1 βδομάδα αδράνειας → το site σπάει. Pro = always-on. |
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
