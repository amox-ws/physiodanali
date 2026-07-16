# PhysioDanali — 100% LIVE checklist (για το meeting με Δανάλη)

> **Ετυμηγορία (full audit + live επαλήθευση, 2026-07-16):** _Ready-after-client-inputs._
> Το site είναι **τεχνικά έτοιμο** — δεν υπάρχει bug που να μπλοκάρει. Ό,τι μένει για το 100%
> είναι κυρίως **creds / αποφάσεις / περιεχόμενο που πρέπει να δώσει ο Δανάλης**.

---

## ✅ Verified έτοιμα (τα τσέκαρα live, όχι από μνήμη)

- **Booking** δουλεύει end-to-end: /booking 200 με 8 υπηρεσίες από το prod Supabase· availability **10:00–22:00, και τις 7 ημέρες** (επιβεβαιωμένο στη ΒΔ)· mode=**request** (χειροκίνητη επιβεβαίωση κάθε ραντεβού).
- **Access control:** /admin κλειδωμένο (307→login), RLS deny-anon, service-role server-only.
- **Emails δουλεύουν:** στέλνουν από `noreply@amox.gr` (verified sender στο Resend) — patient + owner.
- **Articles (reading):** 18 δημοσιευμένα, /articles + detail pages 200.
- **Build & types:** `tsc` καθαρό, `next build` πράσινο, 54 σελίδες. *(Σημ.: δεν υπάρχει automated test suite — ο πήχης είναι types-clean + build-green + live smoke checks.)*
- **SEO:** 260/260 redirects, canonical/hreflang/schema, sitemap+robots.
- **Legal/GDPR:** /privacy /cookies /terms + cookie banner + consent στις φόρμες.
- **Φόρμα επικοινωνίας:** πραγματικό Resend backend + honeypot + captcha-ready.
- **Calendar sync:** ο κώδικας είναι **πλήρως έτοιμος & two-way** — ενεργοποιείται μόλις μπουν 3 creds.
- **Viva:** hosted pay-by-link **ήδη live** στο /contact.
- **Security fix (σήμερα):** τα cancel/manage links υπογράφονται πλέον **fail-closed** (αφαιρέθηκε public literal secret).

---

## 🔴 ΑΠΟ ΤΟΝ ΔΑΝΑΛΗ — creds & αποφάσεις (διάβασέ τα στο meeting)

1. **DNS access** (registrar του physiodanali.gr) → για το **cutover** στο νέο site.
2. **Anthropic credits — top-up.** ⚠️ Ο λογαριασμός είναι **ΑΔΕΙΟΣ** (επιβεβαιωμένο 2×: το API λέει «credit balance too low» και το εβδομαδιαίο Action απέτυχε). **Τα 18 άρθρα φαίνονται κανονικά**, αλλά η **αυτόματη** παραγωγή νέων άρθρων θα αποτυγχάνει μέχρι να βάλει credits στο console.anthropic.com → Billing.
3. **Google service account** για calendar sync — 3 τιμές: `GOOGLE_SA_EMAIL`, `GOOGLE_SA_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID` + **share** του προσωπικού του ημερολογίου στο SA email με δικαίωμα «Make changes to events». *(Αλλιώς τα confirmed ραντεβού δεν εμφανίζονται στο κινητό του.)*
4. **Επιβεβαίωση ωραρίου & περιοχών:** τώρα 10:00–22:00 ×7 ημέρες + περιοχές Γλυφάδα/Βούλα/Βουλιαγμένη/Βάρη/Άλιμος. Σωστά;
5. **Ποιο email** να παίρνει ειδοποιήσεις ραντεβού (τώρα → info@amox.gr).
6. **Πραγματικές φωτογραφίες** (δικές του / της πρακτικής) αντί για stock.
7. **Τελικές διορθώσεις κειμένων** (πέρασμα δικό του).
8. **Αποφάσεις:** GBP ωράριο να ταιριάζει (10:00–22:00) · θέλει Google Search Console/analytics;

---

## 🔧 ΑΠΟ ΕΜΑΣ (AMOX) — μόλις πάρουμε τα creds / στο cutover

- [x] **BOOKING_SECRET fail-closed** — ΕΓΙΝΕ σήμερα.
- [ ] **Cutover:** σύνδεση domain στο Vercel + DNS + verify (200 από νέο app, self-canonical, όχι-noindex).
- [ ] **SITE_URL=**`https://physiodanali.gr` στο Vercel (μαζί με το cutover) — αλλιώς τα links στα emails δείχνουν vercel.app.
- [ ] **Google SA vars** στο Vercel + redeploy + verify (ραντεβού → κινητό· busy block → κλείνει slot).
- [ ] **BOOKING_NOTIFY_TO / NOTIFY_TO** μόλις πει το email.
- [ ] **Markdown links στα AI άρθρα:** ο renderer δεν κάνει parse `[text](/path)` — να μπει πριν δημοσιευτεί το 1ο AI άρθρο (latent τώρα).
- [ ] (προαιρετικά) DB constraint double-booking · Turnstile keys · καθάρισμα stray lockfile warning.

---

## ⚠️ ΠΡΟΣΟΧΗ — το «έως 23:00» ΔΕΝ είναι bug

Ο automated audit σημείωσε «αντίφαση 23:00 vs 22:00». **Δεν το αλλάζω** — εσύ αποφάσισες ρητά: **formal 10:00–22:00 + marketing «έως 23:00»**, ακριβώς όπως το παλιό site. Αν άλλαξες γνώμη, πες μου.

---

## Γρήγορες απαντήσεις στις ερωτήσεις σου

| Ερώτηση | Απάντηση |
|---|---|
| Calendar sync; | Κώδικας έτοιμος· **θέλει 3 Google creds + share** από Δανάλη. |
| Booking δουλεύει «κομπλέ»; | **Ναι**, end-to-end. Tests: **δεν υπάρχουν automated** — build+types+live όλα πράσινα. |
| Articles; | **Reading ναι** (18). **AI παραγωγή νεκρή** μέχρι credits. |
| «Λεφτά στο API»; | **ΟΧΙ — άδειο.** Πρέπει top-up ο Δανάλης. |
| Domain; | **Cutover** — θέλει DNS. |
| Texts/pictures; | Δικό του πέρασμα + πραγματικές φωτο. |
