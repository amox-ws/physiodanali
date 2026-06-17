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
- [ ] **Google Search Console** (ιδανικά μετά το domain) → token στο `GOOGLE_SITE_VERIFICATION` + submit sitemap
- [ ] **Analytics** account (GA4 ή Vercel Analytics)

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

## 🔎 SEO / GEO Plan — Νο.1 φυσικοθεραπευτής Γλυφάδα/Βούλα

> 📘 **Πλήρες deep playbook:** [docs/seo-plan.md](seo-plan.md) — keyword research (SEMrush/Ahrefs free week), σωστά paths, blog keyword strategy, technical, local, links, GEO, roadmap, seed keywords.

**Στόχος:** top-3 (local pack + organic) στα target keywords + να μας προτείνουν τα AI.
**Keywords:** `φυσικοθεραπευτής Γλυφάδα/Βούλα` · `φυσικοθεραπεία κατ' οίκον {Γλυφάδα/Βούλα/Βουλιαγμένη/Βάρη/Άλιμο}` · `χιροπρακτικός Γλυφάδα/Βούλα` · long-tail: **υπηρεσία × πάθηση × περιοχή**.
**✅ Ήδη κερδισμένα:** GBP verified **121×5.0★** · structured data · sitemap · IndexNow (Bing/Yandex) · AI blog.

### Φάση 1 — Σύνδεση θεμελίου *(κρίσιμη, πρώτα)*
1. ⭐ **Domain physiodanali.gr → νέο site** → η ισχύς GBP + 121 κριτικές «πέφτουν» στο νέο. *(owner)*
2. **Google Search Console** (domain property) + verification + submit sitemap. *(owner+dev)*
3. **Analytics** → μέτρηση. *(dev+owner)*

### Φάση 2 — Τοπική κυριαρχία (organic)
4. **Location pages** ανά περιοχή (Γλυφάδα/Βούλα/Βουλιαγμένη/Βάρη/Άλιμο) — μοναδικό κείμενο + τοπικό schema + FAQ + χάρτης + τοπικές κριτικές. *(dev)*
5. **Review schema** — embed των πραγματικών 121×5.0 κριτικών → rich snippets + trust. *(dev, θέλει άδεια πελάτη)*
6. **Citations / NAP** — doctoranytime · vrisko · xo.gr · 11888 · ΠΣΦ (ίδιο όνομα/διεύθ./τηλ.). *(owner)*
7. **GBP micro-opts** — 2η κατηγορία «Χιροπρακτικός» · service areas · εβδομαδιαία Posts (repost blog) · Q&A. *(owner)*

### Φάση 3 — Περιεχόμενο & authority (compounding)
8. **AI blog** συνεχίζει — backlog με θέματα **υπηρεσία × πάθηση × περιοχή**. *(dev/owner)*
9. **Internal linking** keyword-rich: location ↔ services ↔ articles. *(dev)*

### Φάση 4 — GEO (AI search: ChatGPT/Perplexity/AI Overviews)
10. **`llms.txt`** — curated περίληψη για LLMs. *(dev)*
11. **Entity clarity** — συνεπές NAP + sameAs (social/ΠΣΦ) + ιδανικά **Wikidata** → Knowledge Panel. *(dev/owner)*
12. **Answer-first FAQ** που ταιριάζει σε φυσικές ερωτήσεις AI. *(dev)*

### Φάση 5 — Off-page (long game)
13. **Backlinks** τοπικοί (γυμναστήρια/ιατρεία/σύλλογοι Γλυφάδας-Βούλας) + doctoranytime profile. *(owner)*
14. *(προαιρετικό)* **Google Ads** στα high-intent (οι ανταγωνιστές care4physio/physiovardas πληρώνουν → ζήτηση). *(owner)*

### 📊 Μέτρηση
Search Console (θέσεις/CTR) · GBP Insights (κλήσεις/οδηγίες) · rank tracking target keywords · **GEO spot-check** (ρώτα ChatGPT/Perplexity «φυσικοθεραπευτής Γλυφάδα» — μας αναφέρει;).

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
