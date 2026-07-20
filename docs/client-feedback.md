# PhysioDanali — Αλλαγές πελάτη (Δανάλης)

Από το PDF του πελάτη + προφορικές οδηγίες. Τελευταία ενημέρωση: **2026-07-16**.

---

## 🔴 ΕΚΚΡΕΜΟΥΝ

### Go-live (αναλυτικά στο [go-live-checklist.md](go-live-checklist.md))
- [ ] **Cutover** — DNS από πελάτη → σύνδεση domain στο Vercel + `SITE_URL` + verify
- [ ] **Anthropic credits** — ο λογαριασμός είναι **άδειος**· η αυτόματη παραγωγή άρθρων δεν τρέχει
- [ ] **Google Calendar sync** — λείπει μόνο το **Calendar ID + share** του ημερολογίου *(SA email & key ήδη στο Vercel, επαληθευμένα)*
- [ ] **BOOKING_NOTIFY_TO** — ποιο inbox παίρνει ειδοποιήσεις ραντεβού
- [ ] **Email σε Google Workspace του πελάτη** — τα εξωτερικά emails κρατιούνται σε quarantine· ο admin να κάνει allowlist το `amox.gr` *(ή μόνιμα: αποστολή από `@physiodanali.gr`)*
- [ ] **Markdown links στα AI άρθρα** — ο renderer δεν κάνει parse `[text](/path)`· πριν δημοσιευτεί το 1ο AI άρθρο
- [ ] *(προαιρετικά)* Search Console · Analytics · DB constraint double-booking · Turnstile keys

---

## ✅ ΕΓΙΝΑΝ ΟΛΑ ΤΑ ΥΠΟΛΟΙΠΑ

### Περιεχόμενο (2026-07-16)
- [x] **5. About / Bio → νέα προσόντα.** Τίτλος → «Κωνσταντίνος Δανάλης, **PT, OMT**» (EL+EN). **Ακαδημαϊκή πορεία χωρίς νούμερα**, 2 items: *University of West Attica — Degree in Physiotherapy, Faculty of Health and Care Sciences* + *Orthopedic Manual Therapy — OMT Greece, IFOMPT member*. **Επαγγελματικά σώματα** += *APTA international affiliate* & *OMT Greece — IFOMPT member*, με Π.Σ.Φ. + τα 3 Επιστημονικά Τμήματα από κάτω. ✅ **IFOMPT** (ο πελάτης επιβεβαίωσε — το «IFMOPT» του PDF ήταν τυπογραφικό).
- [x] **1. Κύφωση → βγήκε ΤΕΛΕΙΩΣ.** Σελίδα `/kyphosis` (τώρα **404**), nav EL+EN, κάρτα υπηρεσίας, entry Θεραπειών, `kyphosis`/`kyphosisFaq` blocks, 14 translation keys, `sitemap.ts`, `seo.ts`, `llms.txt`, AI article-prompt topic, booking label. **Τα 4 legacy redirects (kyphosis + scoliosis, EL/EN) → `/chiropractic`** — επαληθεύτηκε 200, **μηδέν απώλεια SEO**. Ξαναγράφτηκαν και τα κείμενα που τη διαφήμιζαν («Τέσσερις→Τρεις προσεγγίσεις», meta, «Στάση & κίνηση», λίστα παθήσεων).
- [x] **2. «No guesswork / Χωρίς εικασίες» → έξω από παντού** (EL + EN). Μηδέν υπολείμματα.
- [x] **3. Χρόνια εμπειρίας → «15+» παντού.** «Δεκαετής»→«15+», `10+`→`15+`. *(Τα «decades» σε άρθρα ΣΚΠ/Parkinson είναι κλινικό κείμενο — άθικτα.)*
- [x] **4. Brazilian Lymphatic → ΑΚΡΙΒΗΣ ΕΠΑΝΑΦΟΡΑ του παλιού site** (EL + EN). Ο πελάτης παραπονέθηκε ότι το αλλάξαμε χωρίς λόγο — επανήλθαν αυτούσια:
  - Τίτλος/lead «**μετά από Λιποαναρρόφηση & Επέμβαση**» (μετεγχειρητική στόχευση)
  - **12 ενδείξεις** (λιποαναρρόφηση, κοιλιοπλαστική, BBL, αυξητική στήθους, ρινοπλαστική/face lift, εγκυμοσύνη, καισαρική, βαριά πόδια, λεμφοίδημα, κυτταρίτιδα, detox, μετά από άσκηση)
  - **Vodder σύγκριση**, **πρόληψη ίνωσης/σηρώματα/4-6 εβδομάδες**, **διακριτικότητα**
  - **Τίτλοι:** Brazilian Lymphatic Drainage Specialist · **IFOMPT-certified & APTA International Affiliate** · ΠΣΦ · ΠΑΔΑ · Mulligan/Maitland/Shacklock
  - «Πώς λειτουργεί» σε 4 βήματα + CTA «Έτοιμοι για ταχύτερη αποκατάσταση;»

### Λειτουργικά (2026-07-16)
- [x] **6. Chiropractic — τα 4 πλαίσια έγιναν links** (Αυχεναλγία→`/neck-pain`, Οσφυαλγία→`/low-back-pain`, Ισχιαλγία→`/articles/low-back-pain`, Ώμος→`/articles/shoulder-pain`), locale-aware.
- [x] **7. Άρθρα και στα Αγγλικά.** Αιτία: τα ελληνικά από CMS, τα αγγλικά από στατικό αρχείο → τα νέα άρθρα έλειπαν. **+ bonus bug:** τα links έδειχναν `/articles/…` στο `/en` και σε πετούσαν στα ελληνικά. **19 άρθρα** σε EL & EN.
- [x] **8. Ροή μετάφρασης — απαντήθηκε.** Νέα CMS άρθρα: το `/en` δείχνει το ελληνικό → **edit ενημερώνει και το αγγλικό**. Τα 18 παλιά με χειροκίνητη μετάφραση: **δεν** ενημερώνονται. Αυτόματη μετάφραση δεν υπάρχει (θέλει στήλες EN στη ΒΔ + Anthropic credits).
- [x] **9. Λογότυπο στο reviews microsite** (clickable → κύριο site).
- [x] **10. Admin login → magic link** (χωρίς κωδικό, `shouldCreateUser:false`).
- [x] **11. Λογότυπο στο admin** (login + διαχείριση) → αρχική.
- [x] **12. Homepage hero σε mobile** — `object-left` ώστε να φαίνεται ο Δανάλης.

---

## 📌 Αποφάσεις πελάτη (κλειδωμένες — μην τα ξαναβγάλεις)

- **Testimonials που αναφέρουν κύφωση → ΜΕΝΟΥΝ** (είναι αληθινές κριτικές).
- **«Αυχενική κύφωση» στα αίτια αυχεναλγίας → ΜΕΝΕΙ** (κλινικός όρος, όχι υπηρεσία).
- **Ωράριο** → μένει ως έχει (10:00–22:00 formal + «έως 23:00» marketing).
- **Φωτογραφίες & κείμενα** → τελικά (πλην του βιογραφικού).
- **«Brazilian lymphatic drainage» & «Clinical Pilates»** → μένουν **αγγλικά** (brand terms).
- **GBP** → υπάρχει ήδη.
- **RESEND key rotate / DKIM στο physiodanali.gr** → δεν τα κάνουμε.
