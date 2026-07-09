# PhysioDanali — Τι μένει για 100% (Definition of Done)

> **Πού είμαστε (2026-07-09):** Το **SEO είναι ασφαλές** (δεν χάνουμε τίποτα στο flip — δες κάτω).
> Το site δουλεύει: booking, blog CMS, legal, design, EL/EN. Για να είμαστε **10000% έτοιμοι**
> μένουν **3 launch blockers** + 3 λειτουργικά που «ανάβουν με creds» + 2 συνιστώμενα.

---

## 🎯 Τι είναι το «cutover» (η μόνη κρίσιμη κίνηση για το SEO)

Αυτή τη στιγμή το domain **physiodanali.gr** δείχνει ακόμα στο **παλιό WordPress** (Apache/PHP, IP 31.22.114.153).
Το νέο site ζει στο `physiodanali.vercel.app`. **Cutover = «γύρισμα» του domain** ώστε το `physiodanali.gr`
να δείχνει στο **νέο** site — μία αλλαγή DNS + σύνδεση του domain στο Vercel.

Λέγεται «cut**over**» γιατί κόβεις από το παλιό και περνάς στο νέο. Πρέπει να γίνει **ατομικά** (όλα μαζί,
σε ένα παράθυρο): τη στιγμή που θα αλλάξει το DNS, όλοι — χρήστες + Google — αρχίζουν να βλέπουν το νέο site
στο πραγματικό domain, και τα 260 παλιά URLs κάνουν αυτόματα 301→νέο. **Δεν το έχουμε κάνει ακόμα** — είναι
η τελευταία κίνηση του launch.

---

## 🔴 MUST — πριν το launch (3 μόνο)

### 1. Cutover (domain flip)
- [ ] Σύνδεση `physiodanali.gr` (apex) + `www` στο Vercel project, ένα canonical redirect (www→apex).
- [ ] Αλλαγή DNS (A/CNAME) → Vercel, **όλα σε ένα παράθυρο**.
- [ ] Μετά: `physiodanali.gr` → **200** από νέο app, self-canonical στο `.gr`, **ΟΧΙ** `X-Robots-Tag: noindex`.
- [ ] Spot-check 15-20 παλιά URLs live στο `.gr` → 308 → σωστό target 200.
- [ ] **Ο παλιός WordPress μένει live 2-4 εβδομάδες** (rollback δίχτυ).

### 2. Φόρμα επικοινωνίας → πραγματικό backend
**Τι είναι:** Η φόρμα στο `/contact` **ΔΕΝ στέλνει email**. Ο κώδικας ([contact-form.tsx:34](../src/components/site/contact-form.tsx)) λέει *«No backend yet»* και απλώς ανοίγει το mail client του επισκέπτη με προ-συμπληρωμένο μήνυμα (`mailto:`).
**Το πρόβλημα:** Οι μισοί χρήστες (κινητό, webmail, κανένα configured mail app) πατάνε «Αποστολή», βλέπουν «success» — αλλά **το μήνυμα δεν φεύγει ποτέ**. **Χαμένα leads σιωπηλά.**
**Η λύση:** Server action / API route που στέλνει το μήνυμα μέσω **Resend** στο email του Δανάλη (η υποδομή Resend υπάρχει ήδη από το booking — μισή δουλειά). Ίδια ακριβώς εμφάνιση.
- [ ] Wire τη φόρμα `/contact` σε πραγματικό send (Resend) + πραγματικό success/error state.

### 3. Email deliverability
**Τι είναι:** Για να **φτάνουν** τα emails (ραντεβού + φόρμα) στα εισερχόμενα και όχι στα spam, το domain πρέπει να είναι «πιστοποιημένο» ως αποστολέας.
**Τι χρειάζεται:**
- [ ] Φρέσκο `RESEND_API_KEY` στο Vercel (το παλιό εκτέθηκε → rotate).
- [ ] **DKIM + DMARC** DNS records για το `physiodanali.gr` (μέσω Resend dashboard) — αλλιώς Gmail/Outlook τα κόβουν ή τα βάζουν spam.
- [ ] `NOTIFY_TO` / `BOOKING_NOTIFY_TO` = το σωστό email παραλήπτη.

---

## ⚙️ Λειτουργικά που «ανάβουν με creds» (το booking ΔΟΥΛΕΥΕΙ — αυτά το κάνουν πλήρες)

Το σύστημα κρατήσεων είναι **live & functional** (Supabase, /booking multi-step, /admin/bookings, self-cancel, emails, ωράριο 10:00-22:00). Τα παρακάτω είναι **έτοιμος κώδικας** που περιμένει μόνο κλειδιά:

### Α. Google Calendar sync — προστασία double-booking
- **Τώρα:** το σύστημα αποτρέπει double-booking **μέσα στη δική του βάση** (δύο πελάτες δεν πιάνουν την ίδια ώρα).
- **Τι λείπει:** συγχρονισμός με το **προσωπικό ημερολόγιο** του Δανάλη. Χωρίς αυτό, αν έχει κλείσει κάτι *εκτός* site (π.χ. τηλεφωνικά, στο δικό του Google Calendar), το site **δεν το ξέρει** → κίνδυνος διπλής κράτησης στην ίδια ώρα.
- **Λύση:** Google service account creds ([google-calendar.ts](../src/lib/google-calendar.ts) έτοιμο, two-way freeBusy). Needs: `GOOGLE_SA_EMAIL`, `GOOGLE_SA_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`.
- [ ] Δημιουργία Google service account + share ημερολογίου Δανάλη + env vars στο Vercel.

### Β. Viva online προκαταβολή (προαιρετικό)
- **Τώρα:** πληρωμή με **μετρητά** στο ραντεβού (η προκαταβολή είναι optional/off).
- **Λύση:** [viva.ts](../src/lib/viva.ts) έτοιμο για Smart Checkout. Needs: `VIVA_CLIENT_ID`, `VIVA_CLIENT_SECRET`, `VIVA_SOURCE_CODE`.
- [ ] **Απόφαση Δανάλη:** θέλει online προκαταβολή ή μένουμε μετρητά; (αν όχι → δεν κάνουμε τίποτα)

### Γ. Captcha φόρμας booking (anti-spam)
- Το Turnstile είναι env-gated· χωρίς κλειδιά μένει μόνο το honeypot. Μικρό.
- [ ] (προαιρετικό) Cloudflare Turnstile keys για ισχυρό anti-spam στη φόρμα κράτησης.

---

## 📊 Συνιστώμενα (όχι blockers, αλλά «να τα έχουμε»)

- [ ] **Google Search Console:** verify + submit `sitemap.xml` + `sitemap-legacy.xml` → γρήγορο recrawl των redirects + monitoring 404/rankings στο κρίσιμο παράθυρο.
- [ ] **Analytics** (Vercel Analytics / Plausible): τώρα **μηδέν**. Χρειάζεται baseline **πριν** το flip για να δεις αν πέσει το traffic. Το consent-gate (`hasAnalyticsConsent`) υπάρχει ήδη.

---

## ✍️ Content — μικρές συνέπειες

- [ ] **2 αγγλικά titles στο ελληνικό homepage grid:** «Brazilian lymphatic drainage» & «Clinical Pilates» ([content.ts:314/331](../src/lib/content.ts)) φαίνονται αγγλικά δίπλα σε Αυχεναλγία/Οσφυαλγία/Ισχιαλγία. **Απόφαση:** Ελληνικά («Βραζιλιάνικη λεμφική παροχέτευση») ή κράτημα ως brand terms; *(Το «Clinical Pilates» συνήθως μένει αγγλικά — είναι διεθνής όρος.)*
- [ ] (προαιρετικό) Εικόνες: κάποιες μέτριας ανάλυσης — αναβάθμιση αν υπάρχει χρόνος.

---

## ✅ Ήδη ολοκληρωμένα (μη τα ξανασκέφτεσαι)

- **SEO (ασφαλές):** 260/260 παλιά indexed URLs → 308→200 (verified όλα)· χάρτης καλύπτει 100%· canonical/sitemap/hreflang στο .gr (0 vercel.app leak)· preview noindex· JSON-LD (business+person+aggregateRating)· 13 Review objects· hreflang σε όλες (legal/articles fix)· redirects repointed· «100+» reviews· 404 βελτιωμένη· skip-to-content.
- **Booking:** live custom σύστημα (Supabase, availability engine, admin, self-cancel, emails, ωράριο).
- **Blog CMS:** 7 phases, εβδομαδιαία AI παραγωγή (GitHub Action), /admin, magic-link/password, draft preview, IndexNow.
- **Legal/GDPR:** /privacy /cookies /terms + cookie consent + consent checkbox.
- **Design / χρώματα / font:** ✅ **καμία αλλαγή** (απόφασή σου — no redesign). Font EB Garamond (ελληνικό subset).
- **i18n EL/EN:** path-based `/en/` + hreflang.
- **Reviews microsite:** live (physiodanali-reviews.vercel.app) με 8 real Google reviews + AMOX backlink.

## ❌ ΔΕΝ κάνουμε (κομμένα — χαμηλή προτεραιότητα, δική σου απόφαση)

Καμία νέα σελίδα (/neuro-rehab, /shoulder-pain, /knee-pain, /lymphatic) · Άλιμος/Ν.Σμύρνη landers · αλλαγή ωραρίου (μένει 10:00-22:00 + «έως 23:00») · ΑΦΜ/άδεια (κενά) · data-quality tweaks στο redirect map (αβλαβή) · AI-crawler policy debate.
*Stale οδηγίες προς αγνόηση: seo-launch-audit appendix «08:00-23:00», seo-migration-plan Appendix A «build 12 σελίδες».*

## 🔑 Χρειαζόμαστε από τον Δανάλη

DNS access (cutover) · Resend domain verify (DKIM/DMARC) · Google service account + κοινή χρήση ημερολογίου (calendar sync) · απόφαση Viva προκαταβολή ή μετρητά · απόφαση για τα 2 αγγλικά titles · GBP ωράριο→10:00-22:00 · (μελλοντικά) GSC access.
