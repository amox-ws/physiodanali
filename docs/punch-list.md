# PhysioDanali — Punch List (client call, Δανάλης)

Feedback από call με τον πελάτη. Τικάρουμε καθώς υλοποιούμε.

## 🎨 Design / Εμφάνιση
- [ ] **1. Γραμματοσειρά τίτλων** — δεν του αρέσει στους τίτλους (headings). Αλλαγή heading font.
- [ ] **2. Chiropractic** → φωτό με γυναίκα.
- [ ] **3. Brazilian lymphatic** — περιγραφή ΛΑΘΟΣ: γίνεται **με τα χέρια** (manual), όχι μηχάνημα. Διόρθωση κειμένου (content.ts + /lymphatic page).
- [ ] **4. Mobile** — έλεγχος/διόρθωση responsive.

## 📅 Booking
- [x] **5. Και τις 8 υπηρεσίες** (από homepage): Φυσικοθεραπεία κατ' οίκον, Χειροπρακτική, Κύφωση, Brazilian lymphatic drainage, Clinical Pilates, Αυχεναλγία, Οσφυαλγία, Ισχιαλγία. ✅ (migration 0003)
- [x] **6. Τιμές & διάρκειες:** ο ασθενής διαλέγει **30′ = 50€** ή **60′ = 100€** ανά υπηρεσία + σημείωση «δεκτά μετρητά & κάρτα». Τιμή φαίνεται σε summary, emails, admin. ✅
- [x] **7. Captcha** στο booking form: Cloudflare Turnstile (env-gated) + honeypot, server-verified. ✅ *(contact form = mailto, μπαίνει captcha όταν αποκτήσει backend μαζί με #10)*
- [x] **8. Χρώματα κατάστασης:** εκκρεμεί=μωβ · επιβεβαιωμένο=**πράσινο** · άλλαξε ώρα=**πορτοκαλί** · ακυρωμένο=κόκκινο · ολοκληρώθηκε=γκρι. ✅
- [x] **9. Admin έλεγχος ραντεβού** (αντί email negotiation): **Νέο ραντεβού** χειροκίνητα (τηλεφωνικά, confirmed), **Τροποποίηση** ημ/ώρα/διάρκεια/περιοχή + **σχόλιο** → email στον ασθενή + status «άλλαξε ώρα». **Google Calendar two-way** (getBusyTimes) → μηδέν double-booking (ανενεργό μέχρι creds). ✅

## 💳 Πληρωμές (Viva)
- [x] **10. Contact** → διακριτικό «Κάντε online πληρωμή» link → Viva **hosted payment** (`vivapayments.com/web2?ref=...`). ✅ *(χωρίς API creds — έτοιμο link)*
- [x] **11. Cash + κάρτα** στο booking (φόρμα/emails/admin). ⏳ *μένει η σημείωση στις σελίδες υπηρεσιών/τιμών αν υπάρχουν*

## 🔎 SEO / Domain
- [ ] **12. SEO migration** → πλήρες πλάνο στο [seo-migration-plan.md](seo-migration-plan.md): 264 παλιά URLs χαρτογραφημένα, 301 map, 12 P0 σελίδες πριν το cutover, runbook. **Επόμενο βήμα: GSC πρόσβαση + υλοποίηση redirects.**
- [ ] **13. Reviews** → σύσταση στο πλάνο (§8): **ΟΧΙ ξεχωριστό domain** (μηδενικό authority) — `/reviews` στο κύριο site + Review schema + Google Business Profile. Vanity subdomain redirect αν το θέλει οπωσδήποτε.

## ⏳ Εκκρεμεί από τον πελάτη
- [ ] **14. Μικροαλλαγές σε TEXT** — τις περιμένουμε.
- [ ] **15. Εικόνες μέσω WeTransfer** — πραγματικές φωτό.
