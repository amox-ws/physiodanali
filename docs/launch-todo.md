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

### 2. ✅ Φόρμα επικοινωνίας → πραγματικό backend — **ΕΓΙΝΕ (2026-07-09, live)**
Η φόρμα `/contact` στέλνει τώρα μέσω **Resend** (server action [contact/actions.ts](../src/app/contact/actions.ts)): **to** `info@physiodanali.gr`, **cc** `info@amox.gr`, **reply_to** = ο επισκέπτης (απαντάς κατευθείαν). Honeypot + validation + πραγματικό success/error (σε αποτυχία δείχνει τηλέφωνο, ποτέ fake success). Επαληθεύτηκε: Resend send → 200 από `noreply@amox.gr`, `RESEND_API_KEY` υπάρχει στο Vercel → δουλεύει live.

### 3. Email deliverability — **σχεδόν κλειστό**
Στέλνουμε από **`noreply@amox.gr`** (ήδη verified με DKIM στο AMOX Resend) → deliverability **εντάξει** για ειδοποιήσεις. Μένουν:
- [ ] **Rotate** το `RESEND_API_KEY` (το τρέχον είχε εκτεθεί σε chat) + update Vercel/GitHub Secret.
- [ ] (προαιρετικό, branding) DKIM/DMARC για `physiodanali.gr` **μόνο** αν θες τα mails να φαίνονται από `@physiodanali.gr` αντί για `@amox.gr`.

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

- [x] ~~2 αγγλικά titles («Brazilian lymphatic drainage», «Clinical Pilates»)~~ → **μένουν αγγλικά** ως brand terms (απόφαση πελάτη 2026-07-09).
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
