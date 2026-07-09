# PhysioDanali — Master Launch TODO (SEO-safe go-live)

Πλήρης λίστα από το audit ([seo-launch-audit.md](seo-launch-audit.md)), με τις **αποφάσεις πελάτη** κλειδωμένες. Τσεκάρουμε ένα-ένα.

---

## ✅ Αποφάσεις κλειδωμένες (2026-07-09)

- [x] **Άλιμος / Νέα Σμύρνη landers → ΔΕΝ χτίζονται** (δεν εξυπηρετούνται). Τα παλιά τους URLs μένουν να προωθούν στα γενικά hubs — αποδεκτό.
- [x] **Ωράριο = 10:00–22:00** (επιβεβαιωμένο από το παλιό site: «Δευτέρα-Κυριακή 10:00-22:00»). → Διορθώνουμε το schema να το λέει κι αυτό.
- [x] **ΑΦΜ / αρ. άδειας → μένουν ΚΕΝΑ** (το παλιό site δεν τα έδειχνε — δεν είναι blocker).
- [x] **Google Search Console → αργότερα** (μελλοντικά, όχι τώρα).

⚠️ **ΝΑ ΑΠΟΦΑΣΙΣΤΕΙ:** Το site αυτή τη στιγμή **διαφημίζει τον Άλιμο** (στο booking ως περιοχή, homepage, schema, llms.txt). Αφού δεν τον εξυπηρετείς — να τον **βγάλω από παντού**; (booking area + κείμενα + schema)

---

## 🔴 SEO fixes — ΑΟΡΑΤΑ (μηδέν αλλαγή εμφάνισης, το μεγαλύτερο κέρδος)

- [ ] **Repoint 15 blog redirects** → στο συγκεκριμένο `/articles/<slug>` (όχι στη λίστα). *Το μεγαλύτερο bang-for-effort.*
- [ ] **Repoint shoulder/knee** head-terms + sub-clusters → `/articles/shoulder-pain` & `/articles/knee-pain` (υπάρχουν ήδη, 4-6χιλ. λέξεις).
- [ ] **Repoint condition pages** που πάνε στο γενικό `/therapies` → στο **κοντινότερο υπαρκτό** (π.χ. σκολίωση→/kyphosis, γόνατο-παθήσεις→/articles/knee-pain). *Χωρίς GSC, με best-judgment τώρα· επανέλεγχος όταν έρθει το GSC.*
- [ ] **Fix** `/en/physical-therapy-at-home-gr.html` → `/en/home-care` (μία γραμμή, τώρα δείχνει σε ελληνική).
- [ ] **Ενοποίηση neuro redirects** σε ΕΝΑ προορισμό (τώρα σκορπίζονται σε /home-care + /therapies).
- [ ] **Ωράριο στο schema** → άλλαξε `seo.ts` openingHours σε **10:00-22:00** (να ταιριάζει με booking/llms/FAQ/παλιό site).
- [ ] **EN area-landers JSON-LD** → χρήση `getLocale()` αντί hardcoded `'el'` (τώρα βγάζει ελληνικό schema σε αγγλικές σελίδες).
- [ ] **Review objects** στο schema από τα testimonials + **ένας** αριθμός reviews παντού (τώρα 100 vs 121 vs 122).
- [ ] **noindex στο preview** `*.vercel.app` (τώρα indexable = duplicate).
- [ ] **Homepage title** → επαναφορά τοποθεσίας «…στη Γλυφάδα & Βούλα» (χάθηκε ο CTR hook· μόνο ο τίτλος καρτέλας/Google, όχι η σελίδα).
- [ ] **Area-lander titles** → fix διπλό brand («…Γλυφάδα — PhysioDanali · PhysioDanali»).
- [ ] **Cacheability** → βγάλε `headers()/cookies()` από το root layout (edge-cache, ταχύτητα/LCP).
- [ ] **Breadcrumb/ContactPoint schema** σε /about, /contact.
- [ ] **hreflang** σε /articles·/privacy·/cookies·/terms (τώρα το ρίχνουν).

## 👁️ Ορατές διορθώσεις (μικρές, factual — έγκριση πριν)

- [ ] **Αριθμός reviews** στο `/reviews`: «121» → σωστός αριθμός *(πες μου τον πραγματικό)*.
- [ ] **Ωράριο**: αν κάπου στο site φαίνεται 08:00-23:00 → 10:00-22:00 (ορατό μόνο αν εμφανίζεται σε σελίδα).

## 🏗️ Νέες σελίδες — θέλουν την απόφασή σου (ΔΕΝ αλλάζουν υπάρχουσες)

- [ ] **/neuro-rehab** (νευρολογική αποκατάσταση/μετά από εγκεφαλικό) — το παλιό site το είχε, flagship. Να χτιστεί; *(προσθήκη, όχι αλλαγή)*
- [ ] **/shoulder-pain** & **/knee-pain** ξεχωριστές σελίδες — προαιρετικό (αλλιώς redirect στα άρθρα). Να χτιστούν;
- [x] ~~Άλιμος/Ν.Σμύρνη landers~~ — **ΟΧΙ** (απόφαση)
- [ ] **/lymphatic-glyfada** — μόνο αν διαφημίζεις ενεργά το post-lipo λεμφικό. Να χτιστεί;

## 🔧 Λειτουργικότητα (backend)

- [ ] **Contact form** → πραγματικό backend (τώρα είναι mailto «μαϊμού» — χάνονται μηνύματα). Ίδια εμφάνιση.
- [ ] **Emails**: RESEND_API_KEY/NOTIFY_TO/BOOKING_NOTIFY_TO στο Vercel + DKIM/DMARC για physiodanali.gr (αλλιώς spam/bounce).
- [ ] **Analytics** (Plausible ή GA4) — τώρα ΜΗΔΕΝ· χρειάζεται για να βλέπουμε αν πέσει η επισκεψιμότητα στο cutover.
- [ ] **Cookie policy vs analytics**: το κείμενο περιγράφει banner/analytics που δεν υπάρχουν — ευθυγράμμιση.

## ⚖️ Legal / λοιπά

- [x] ~~ΑΦΜ + άδεια~~ — **κενά** (το παλιό site δεν τα είχε)
- [ ] **PWA icons / manifest** (τώρα 404) + **skip-to-content** link (a11y). Αόρατα.

## 🚀 Cutover Runbook (ημέρα go-live)

**Πριν:**
- [ ] Όλα τα παραπάνω αόρατα SEO fixes deployed & live
- [ ] Backup/rollback του παλιού WordPress έτοιμο
- [ ] Analytics ενεργό (baseline)
- [ ] *(GSC: όταν αποκτηθεί — ιδανικά πριν, για monitoring)*

**Ημέρα Χ (όλα μαζί, μια κίνηση):**
- [ ] Domain (apex + www) στο Vercel, ένα canonical redirect
- [ ] Αλλαγή DNS → Vercel
- [ ] Έλεγχος: physiodanali.gr = ΝΕΟ site (200), canonical self-referential
- [ ] Spot-check 15-20 παλιά URLs → 308 → σωστός στόχος
- [ ] Υποβολή `sitemap.xml` + `sitemap-legacy.xml` (όταν υπάρχει GSC)
- [ ] Παλιό hosting ΜΕΝΕΙ ζωντανό 2-4 εβδομάδες (rollback)

**Μετά:**
- [ ] Monitoring 404/rankings (GSC + analytics), test booking + contact email

## 🔑 Χρειαζόμαστε από πελάτη

- [ ] **GSC πρόσβαση** (μελλοντικά — αλλά όσο πιο νωρίς, τόσο ασφαλέστερα)
- [ ] **DNS πρόσβαση** για το cutover + DKIM/DMARC
- [ ] **Πραγματικός αριθμός Google reviews** (για ενοποίηση)
- [ ] **Google Business Profile link** (για schema/χάρτη/directions)
- [ ] **Απόφαση Άλιμος**: να τον βγάλω από τη διαφήμιση του site;
- [ ] **Απόφαση**: /neuro-rehab, /shoulder-pain, /knee-pain, /lymphatic-glyfada — να χτιστούν;
- [ ] ⚠️ **GBP ωράριο**: το Google σου δείχνει «έως 23:00» αλλά το site 10:00-22:00 — ή διόρθωσε το GBP σε 22:00, ή πες μου αν όντως δουλεύεις έως 23:00.
