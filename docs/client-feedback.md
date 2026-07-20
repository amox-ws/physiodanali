# PhysioDanali — Αλλαγές πελάτη (Δανάλης)

Από το PDF του πελάτη + προφορικές οδηγίες (2026-07-16).

---

## 📝 Περιεχόμενο / σελίδες — **ΕΚΚΡΕΜΟΥΝ**

- [ ] **1. Κύφωση → έξω ΤΕΛΕΙΩΣ** — αφαίρεση σελίδας/υπηρεσίας από παντού (menu, homepage, θεραπείες, schema, sitemap, redirects → πού να δείχνουν;).
- [ ] **2. «No guesswork / Χωρίς εικασίες» → έξω από ΠΑΝΤΟΥ** (κάθε σελίδα, EL + EN). Δεν του αρέσει.
- [ ] **3. Χρόνια εμπειρίας → «15+» παντού** (τώρα ασυνέπεια: «10+», «Δεκαετής», «15+»).
- [ ] **4. Brazilian Lymphatic → ΙΔΙΟ με το παλιό site**, κείμενα εντελώς αμετάβλητα *(να ελεγχθεί αν τα αλλάξαμε· αν ναι → επαναφορά)*.
- [ ] **5. About / Bio → ανανέωση προσόντων** (χωρίς χρονολογίες):
  - Κωνσταντίνος Δανάλης, **PT, OMT**
  - *Academic Path:* University of West Attica — Degree in Physiotherapy, Faculty of Health and Care Sciences · Orthopedic Manual Therapy — OMT Greece – IFMOPT member
  - *Professional bodies:* APTA international affiliate · OMT Greece – IFMOPT member · Panhellenic Physiotherapists' Association (P.S.F.) — Licensed member → Scientific Departments: Musculoskeletal Physiotherapy / Therapeutic Exercise / Mental Health Physiotherapy

---

## ✅ Έγιναν (2026-07-16)

- [x] **6. Chiropractic — τα 4 πλαίσια έγιναν links.** Αυχεναλγία→`/neck-pain`, Οσφυαλγία→`/low-back-pain`, Ισχιαλγία→`/articles/low-back-pain`, Πόνος στον ώμο→`/articles/shoulder-pain`. Όλα 200, locale-aware (δουλεύουν και στο `/en`). *(Τα `/sciatica` & `/shoulder-pain` δεν υπάρχουν ως σελίδες — γι' αυτό δείχνουν στα αντίστοιχα άρθρα.)*
- [x] **7. Τα άρθρα φαίνονται πλέον και στα Αγγλικά.** **Αιτία:** τα ελληνικά διαβάζονταν από Supabase (CMS) ενώ τα αγγλικά από στατικό αρχείο → κάθε νέο άρθρο του CMS **έλειπε εντελώς** από το `/en`. **Fix:** η αγγλική λίστα διαβάζει τώρα τα πραγματικά δημοσιευμένα άρθρα και βάζει τη μετάφραση όπου υπάρχει. **Δεύτερο bug που βρέθηκε & διορθώθηκε:** τα links των καρτών έδειχναν `/articles/…` αντί `/en/articles/…` (σε πετούσαν στα ελληνικά). Επαληθεύτηκε: **19 άρθρα** σε EL & EN, detail 200.
- [x] **8. Ροή μετάφρασης — απαντήθηκε:**
  - **Νέα άρθρα CMS** (χωρίς χειροκίνητη μετάφραση): το `/en` δείχνει το ελληνικό κείμενο → **αν το επεξεργαστεί, ενημερώνεται αυτόματα και το αγγλικό**.
  - **Τα 18 παλιά** με χειροκίνητη μετάφραση: το `/en` δείχνει τη σταθερή αγγλική έκδοση → **edit στα ελληνικά ΔΕΝ την αλλάζει**.
  - **Αυτόματη μετάφραση ΔΕΝ υπάρχει.** Για να μπει χρειάζεται (α) στήλες EN στη ΒΔ → **migration (θέλει έγκρισή σου)** και (β) **credits στο Anthropic** (τώρα μηδέν).
- [x] **9. Reviews microsite — μπήκε το λογότυπο** (clickable → physiodanali.gr), responsive.
- [x] **10. Admin login → magic link.** Χωρίς κωδικό· one-time link στο email (`shouldCreateUser:false` → μόνο υπάρχοντες λογαριασμοί). Το callback route υπήρχε ήδη.
- [x] **11. Λογότυπο στο admin** — σε **login** και **διαχείριση**, clickable → **αρχική**. (Το dashboard παραμένει προσβάσιμο από Άρθρα/Ραντεβού.)
- [x] **12. Homepage hero σε mobile** — η φωτο «αγκυρώνει» τώρα αριστερά (`object-left`) όπου στέκεται ο Δανάλης· από md και πάνω μένει κεντραρισμένη.
