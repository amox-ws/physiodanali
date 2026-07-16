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

## 🔴 ΑΠΟ ΤΟΝ ΔΑΝΑΛΗ — τελική λίστα (μετά τις αποφάσεις 2026-07-16)

**Πραγματικά κρίσιμα:**
1. **DNS access** (registrar του physiodanali.gr) → για το **cutover** στο νέο site.
2. **Anthropic credits — top-up.** ⚠️ Ο λογαριασμός είναι **ΑΔΕΙΟΣ** («credit balance too low», επιβεβ. 2×). Τα 18 άρθρα φαίνονται, αλλά η **αυτόματη** παραγωγή νέων θα αποτυγχάνει μέχρι credits στο console.anthropic.com → Billing.
3. **Google service account** για calendar sync — 3 τιμές (`GOOGLE_SA_EMAIL`, `GOOGLE_SA_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`) + **share** του ημερολογίου (οδηγός παρακάτω).
4. **Ποιο email** να παίρνει ειδοποιήσεις **ραντεβού** (τώρα → info@amox.gr· η φόρμα επικοινωνίας πάει ήδη → info@physiodanali.gr).

**Αποφάσεις (όχι blockers):**
5. **Search Console / Analytics** — θέλει; (δες εξήγηση κάτω· το στήνουμε εμείς).

**Κλειδωμένα — ΔΕΝ χρειάζονται άλλο:**
- ✅ Ωράριο → μένει ως έχει (10:00–22:00 formal + «έως 23:00» marketing).
- ✅ Φωτογραφίες → **τελικές** (κρατάμε τις υπάρχουσες).
- ✅ Κείμενα → **τελικά**.
- ✅ GBP → υπάρχει ήδη.
- ✅ Περιοχές/ωράριο booking → 10:00–22:00 ×7 ημέρες (επιβεβαιωμένο σωστό).

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

## 📅 Calendar sync — τι είναι & πώς στήνεται (οδηγός για Δανάλη)

**Τι κάνει (2 κατευθύνσεις):**
- Επιβεβαιωμένο ραντεβού στο site → **δημιουργεί event στο Google Calendar του** → το βλέπει στο κινητό.
- Έχει προσωπικό/άλλο event στο ημερολόγιό του → το site **κρύβει αυτή την ώρα** → **δεν** κλείνεται ραντεβού πάνω σε ήδη πιασμένη ώρα.

**Βήματα (μία φορά, ~5 λεπτά) — τα κάνει ο Δανάλης με τον Google λογαριασμό του:**
1. **console.cloud.google.com** → πάνω, «Select a project» → **New Project** (όνομα π.χ. «PhysioDanali Booking») → Create.
2. **APIs & Services → Library** → ψάξε «**Google Calendar API**» → **Enable**.
3. **APIs & Services → Credentials → Create Credentials → Service account** → όνομα «booking-sync» → Create → (roles: κανένα, Done).
4. Κλικ στο service account → καρτέλα **Keys → Add Key → Create new key → JSON** → κατεβαίνει ένα **.json** αρχείο. Μέσα έχει `client_email` και `private_key`.
5. **calendar.google.com** → δίπλα στο ημερολόγιό του → **Settings and sharing** → **Share with specific people** → **Add people** → βάλε το `client_email` (από το JSON) → δικαίωμα **«Make changes to events»** → Send.
6. Στο ίδιο Settings, ενότητα «**Integrate calendar**» → αντίγραψε το **Calendar ID**.
7. Μας στέλνει: το **.json** (ή τα `client_email` + `private_key`) **+ το Calendar ID**. ⚠️ Είναι μυστικά — ιδανικά όχι σε απλό email.

**Μετά (εμείς):** βάζουμε τις 3 τιμές στο Vercel (`GOOGLE_SA_EMAIL`, `GOOGLE_SA_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`) → redeploy → test: (1) κλείνουμε δοκιμαστικό ραντεβού → εμφανίζεται στο κινητό του, (2) βάζουμε busy block στο ημερολόγιο → κλείνει το slot στο site.

## 🔎 Search Console & Analytics — τι σημαίνει για τον Δανάλη

**Δεν είναι blockers — απλώς να αποφασίσει ναι/όχι. Τη ρύθμιση την κάνουμε εμείς.**
- **Google Search Console** (δωρεάν): βλέπεις πώς εμφανίζεται το site στην Google (θέσεις, clicks, indexing, 404). Χρήσιμο **μετά το cutover** για να δούμε ότι δεν έπεσε το SEO. Ο Δανάλης δεν κάνει κάτι τεχνικό: **με το DNS που θα δώσει, το verify-άρουμε εμείς** (DNS TXT) και του δίνουμε πρόσβαση. → Πρόταση: **ναι**.
- **Analytics** (επισκεψιμότητα): δύο επιλογές — **Vercel Analytics** (μηδέν κόπος, το ανάβουμε εμείς) ή **Google Analytics 4** (θέλει ένα property + measurement id). → Πρόταση: **Vercel Analytics** για αρχή. Ο Δανάλης απλώς λέει «ναι».

## Γρήγορες απαντήσεις στις ερωτήσεις σου

| Ερώτηση | Απάντηση |
|---|---|
| Calendar sync; | Κώδικας έτοιμος· **θέλει 3 Google creds + share** από Δανάλη. |
| Booking δουλεύει «κομπλέ»; | **Ναι**, end-to-end. Tests: **δεν υπάρχουν automated** — build+types+live όλα πράσινα. |
| Articles; | **Reading ναι** (18). **AI παραγωγή νεκρή** μέχρι credits. |
| «Λεφτά στο API»; | **ΟΧΙ — άδειο.** Πρέπει top-up ο Δανάλης. |
| Domain; | **Cutover** — θέλει DNS. |
| Texts/pictures; | Δικό του πέρασμα + πραγματικές φωτο. |
