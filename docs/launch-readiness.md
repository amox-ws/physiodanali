# PhysioDanali — Τι μένει για το launch

> **Live:** https://physiodanali.vercel.app · **Repo:** amox-ws/physiodanali
> **Κατάσταση:** ~85% ready. Το θεμέλιο + όλοι οι code-blockers είναι έτοιμοι· μένουν **1 functional** (φόρμα) + **εξωτερικά** (keys, domain, υλικό πελάτη).
> *(Ιστορικό αλλαγών: `git log`.)*

---

## ✅ Έτοιμα (μην ξαναγίνουν)
Design & UI · ταχύτητα (272KB/0.5s) · mobile · **SEO schema** (LocalBusiness/Person/FAQ/Article/Breadcrumb) · sitemap + robots · **OG/social images** · **Νομικά/GDPR** (privacy/terms/cookies + cookie consent + form consent) · **security headers** · **custom 404/error pages** · Next 16.2.9 (**0 vulnerabilities**) · **password login** + footer «Διαχείριση» · **draft preview** · **AI blog** (weekly, auto-εικόνα Unsplash, IndexNow, email από amox.gr) · **GBP ήδη ισχυρό** (121×5.0★).

---

## 🎯 Τι μένει για 100%

### 🔴 Functional — *εγώ (dev)*
- [ ] **Φόρμα επικοινωνίας να στέλνει** (τώρα είναι ψεύτικη `mailto:`) → API route + Resend + spam protection
- [ ] **Final QA pass** πριν το επίσημο launch

### 🌐 Infrastructure — *owner (AMOX)*
- [ ] ⭐ **Domain physiodanali.gr → νέο site** — ο Νο.1 SEO μοχλός (συνδέει το GBP με τις 121 κριτικές στο νέο site)
- [ ] **Rotate keys** (Anthropic · Supabase PAT · Resend · Unsplash) + άλλαξε temp admin passwords
- [ ] **Google Search Console** (ιδανικά μετά το domain) → token στο `GOOGLE_SITE_VERIFICATION` + submit sitemap
- [ ] **Analytics** account (GA4 ή Vercel Analytics)
- [ ] **Supabase Pro** (~$25/μ, προαιρετικό — για always-on admin/generation)

### 📋 Από τον πελάτη (Δανάλη)
- [ ] **ΑΦΜ + αρ. άδειας ασκήσεως** → εμφανίζονται αυτόματα (νομικά/footer)
- [ ] **Έγκριση νομικών κειμένων** (privacy/terms/cookies)
- [ ] **Επαγγελματικές φωτογραφίες** (hero + about) — το μεγαλύτερο visual κενό
- [ ] **Άδεια προβολής κριτικών** + testimonials
- [ ] **Απόφαση booking** (SimplyBook / custom / όχι)

### 🟠 Polish — *εγώ (dev)*
- [ ] **Hero ≥1920px** + αντικατάσταση low-res εικόνων (όταν έρθει υλικό)
- [ ] **Analytics install** + cookie-consent gating
- [ ] **Location pages** (`/fysikotherapeftis-glyfada`, `-voula`) — organic SEO
- [ ] **Review schema fix** (τώρα hardcoded 100· πραγματικό 121 + embed)
- [ ] **Easy/ασφαλή** (νέα αρχεία, μηδέν ρίσκο): `llms.txt` · PWA manifest+apple-icon · service schema · accessibility statement · dev scripts (`.nvmrc`/typecheck) · skip-link · medical disclaimer

---

## 🔎 SEO / GEO — οι μοχλοί που μένουν
**Στόχος:** Νο.1 για «φυσικοθεραπευτής Γλυφάδα/Βούλα» + να μας προτείνουν τα AI.

- ✅ **Ήδη κερδισμένα:** GBP verified + 121×5.0★ · schema · sitemap · AI blog (φρέσκο content).
- ⭐ **#1 μοχλός: domain switch** → η ισχύς του GBP «πέφτει» στο νέο site.
- **Organic:** location pages (vs ανταγωνιστές care4physio/physiovardas που τρέχουν Google Ads) · citations (doctoranytime/vrisko/ΠΣΦ) · **Review schema** με πραγματικές κριτικές.
- **Google indexing:** sitemap ✅ + **Search Console** (μετά το domain). *(IndexNow = μόνο Bing/Yandex, ήδη ενεργό.)*
- **GEO (AI search):** `llms.txt` · entity clarity (sameAs/ΠΣΦ) · FAQ ✅ · το blog ✅.

---

## 🤖 Blog automation — ✅ λειτουργικό
**Ροή:** κάθε **Δευτέρα ~12:00** (GitHub Action) → Claude γράφει 1 άρθρο + **auto εικόνα** (Unsplash) → μπαίνει ως **draft** → **email** στο info@amox.gr → ο πελάτης μπαίνει (password), κάνει **Προβολή** & **Δημοσίευση** → **IndexNow** ping. Τίποτα δεν δημοσιεύεται μόνο του.

**Μένει:** rotate το Resend key (όποτε) · *(προαιρετικά)* προφόρτωση 15-20 SEO θεμάτων στο backlog · ένα end-to-end test.

---

## 🔑 Πρόσβαση & κλειδιά (reference)
- **Admin:** `/admin` (ή footer «Διαχείριση») — password login, allowlist: `info@amox.gr` + `info@physiodanali.gr`. *(Κωδικοί: στη συνομιλία, όχι εδώ.)*
- **Deploy:** auto σε κάθε push στο `main` + `vercel --prod` (CLI).
- **Supabase:** project `PhysioDanalis` (tables articles/article_topics, bucket article-images).
- **Env set (Vercel + GitHub Secrets):** Supabase ×3 · Anthropic (+MODEL) · Resend (`NOTIFY_FROM=noreply@amox.gr`) · Unsplash · IndexNow · CRON_SECRET.
- **Pending env:** `GOOGLE_SITE_VERIFICATION` (όταν στηθεί Search Console).
