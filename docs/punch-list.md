# PhysioDanali — Punch List (client call, Δανάλης)

Feedback από call με τον πελάτη. Τικάρουμε καθώς υλοποιούμε.

## 🎨 Design / Εμφάνιση
- [ ] **1. Γραμματοσειρά τίτλων** — δεν του αρέσει στους τίτλους (headings). Αλλαγή heading font.
- [x] **2. Chiropractic** → νέα stock φωτό (Unsplash): χειροπρακτική ανάταξη σε **γυναίκα**, επαγγελματικό setting. Αντικαθιστά `public/chiropractic.jpg` (ενημερώνει homepage card + detail + landers). ✅
- [x] **3. Brazilian lymphatic** → νέα φωτό **με τα χέρια** (`public/brazilian.jpg`, manual massage) + κείμενο ρητά «εξ ολοκλήρου με τα χέρια — χειροκίνητη τεχνική, χωρίς μηχανήματα». ✅
- [x] **4. Mobile** — εξαντλητικός έλεγχος (14 σελίδες × 2 viewports + booking flow): μηδέν overflow, μηδέν console errors. Fixes: **3D backgrounds ΜΟΝΟ σε desktop** (κύριος ένοχος «κολλήματος»), tap targets footer, typo «Πρωτοποριακή». ✅

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
- [ ] **12. SEO migration** — **P0 σελίδες ΕΤΟΙΜΕΣ ✅** (7 area landers + /reviews με τα αληθινά testimonials, redirects repointed στους τελικούς στόχους, sitemap + footer links). Αποφάσεις πελάτη: ΟΧΙ Άλιμος/Ν.Σμύρνη landers, ΟΧΙ neuro/μασάζ/TECAR/telerehab σελίδες (τα παλιά URLs → hubs μόνιμα). Μένουν: GSC + DNS cutover. → πλάνο: [seo-migration-plan.md](seo-migration-plan.md). **Πυλώνας 1 ΕΤΟΙΜΟΣ ✅**: 264 URLs → 545 κανόνες 301 (`legacy-redirects.ts` + next.config), legacy sitemap, AI-crawler robots, llms.txt — όλα verified (545/545). **Μένουν:** P0 σελίδες (10 landers + /reviews + /neuro-rehab), GSC πρόσβαση, cutover (DNS).
- [ ] **13. Reviews** → σύσταση στο πλάνο (§8): **ΟΧΙ ξεχωριστό domain** (μηδενικό authority) — `/reviews` στο κύριο site + Review schema + Google Business Profile. Vanity subdomain redirect αν το θέλει οπωσδήποτε.

## ⏳ Εκκρεμεί από τον πελάτη
- [ ] **14. Μικροαλλαγές σε TEXT** — τις περιμένουμε.
- [ ] **15. Εικόνες μέσω WeTransfer** — πραγματικές φωτό.
