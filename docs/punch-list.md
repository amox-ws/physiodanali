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

## 💳 Πληρωμές (Viva) — ⚠️ χρειάζεται Viva account/creds
- [ ] **10. Contact** → button που βγάζει **Viva payment link**.
- [ ] **11. Cash + κάρτα** δεκτά (σημείωση στις τιμές).

## 🔎 SEO / Domain
- [ ] **12. SEO για paths** (URLs/metadata ανά σελίδα).
- [ ] **13. Reviews domain** — ξεχωριστό domain μόνο για reviews (καλύτερο για LLMs/GEO).

## ⏳ Εκκρεμεί από τον πελάτη
- [ ] **14. Μικροαλλαγές σε TEXT** — τις περιμένουμε.
- [ ] **15. Εικόνες μέσω WeTransfer** — πραγματικές φωτό.
