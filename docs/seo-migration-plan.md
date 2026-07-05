# Πλάνο SEO Migration — physiodanali.gr

**Στόχος:** Το νέο site να αντικαταστήσει το παλιό στο ίδιο domain **χωρίς να χαθεί ούτε μία θέση** στη Google — και να βγει μπροστά και στα LLMs (ChatGPT, Perplexity, Claude).

**Βάση δεδομένων:** Πλήρες crawl του παλιού site (264 URLs — sitemaps XML+HTML, homepage, blog, hubs), inventory του νέου (20 routes), mapping κάθε URL, και 3 ανεξάρτητοι έλεγχοι (πληρότητα / τεχνικός / ρίσκα).

---

## 0. TL;DR

1. Το παλιό site **δεν είναι 15 σελίδες — είναι 264 URLs**: ~45 σελίδες παθήσεων, **~20 τοπικά landing pages ανά περιοχή** (Γλυφάδα/Βούλα/Βάρη/Βουλιαγμένη/Άλιμος/Νέα Σμύρνη), 2 γλώσσες, ~25 blog posts, testimonials, NFC-contact (τυπωμένο σε **φυσικές κάρτες**!).
2. **Ίδια paths δεν αρκούν και δεν συμφέρουν** — η σωστή λύση είναι **301 redirects** από κάθε παλιό URL στο πιο σχετικό νέο (μεταφέρουν ~100% του SEO equity) **+ ξαναχτίσιμο των σελίδων που φέρνουν traffic**.
3. **12 σελίδες πρέπει να χτιστούν ΠΡΙΝ το cutover** (P0): τα 10 τοπικά landers + `/reviews` + `/neuro-rehab`. Αλλιώς τα πολυτιμότερα τοπικά rankings θα προσγειώνονται σε γενικές σελίδες και θα φθίνουν.
4. Τα υπόλοιπα ~80 αξιόλογα URLs ξαναχτίζονται σταδιακά **μέσω του AI blog CMS που ήδη έχουμε** (P1: ~20 άρθρα).
5. Μέχρι το cutover: **τίποτα δεν αλλάζει στο DNS**. Το παλιό site μένει live.

**Το #1 που χρειαζόμαστε από τον πελάτη: πρόσβαση στο Google Search Console** του παλιού site. Χωρίς αυτό δουλεύουμε στα τυφλά ως προς το ποιες σελίδες φέρνουν πραγματικά κλικ.

---

## 1. Τι διακυβεύεται — το asset

| Κατηγορία | Πλήθος | Παραδείγματα | Αξία |
|---|---|---|---|
| Τοπικά landers (περιοχή × υπηρεσία) | ~20 | `physical-therapy-at-home-glyfada`, `chiropractor-athome-vari`, `intensive-lymphatic-drainage-glyfada` | ⭐⭐⭐ Το ψωμί του local SEO — «φυσικοθεραπεία κατ' οίκον Γλυφάδα» |
| Σελίδες παθήσεων | ~45×2 γλώσσες | μηνίσκος, ACL, παγωμένος ώμος, carpal tunnel, πελματιαία απονευρωσίτιδα, σκολίωση… | ⭐⭐⭐ Long-tail — φέρνουν ασθενείς με συγκεκριμένο πρόβλημα |
| Υπηρεσίες | ~15×2 | χειροπρακτική, νευρολογική ΦΘ, TECAR, μασάζ, dry needling, telerehab | ⭐⭐ |
| Blog | ~25×2 | εγκεφαλικό, δισκοκήλη, Πάρκινσον, ίλιγγος BPPV | ⭐⭐ |
| Λοιπά | testimonials, NFC-contact, policy, sitemaps | | ⭐ (το NFC είναι **κρίσιμο** — φυσικές κάρτες) |

Το παλιό site έχει επίσης **AI-crawler κανόνες στο robots.txt** (OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot) — ήδη επενδύει σε GEO. Δεν θα το χάσουμε.

---

## 2. Η απόφαση: «ίδια paths» ή 301s;

Η αρχική σκέψη ήταν *«τα νέα paths να είναι ίδια με τα παλιά»*. **Δεν το προτείνω**, για 3 λόγους:

1. Τα παλιά URLs είναι `.html` με suffix `-gr`/`-eng` (`/el/neck-pain-treatment-gr.html`) — αντίκες. Θα κουβαλάμε άσχημα URLs για πάντα.
2. Το πρόβλημα ΔΕΝ είναι το path — είναι το **περιεχόμενο**. Ίδιο URL χωρίς αντίστοιχο περιεχόμενο = χαμένο ranking ούτως ή άλλως.
3. Τα **301 redirects μεταφέρουν ~όλο το link equity** (επιβεβαιωμένο από Google). Καθαρά URLs + 301 = μοντέρνο site χωρίς SEO απώλεια.

**Απόφαση: καθαρά νέα paths + πλήρες 301 map + rebuild του περιεχομένου που αξίζει.**

---

## 3. Οι 3 πυλώνες

### Πυλώνας 1 — 301 Redirect map (264 URLs, Παράρτημα Β)
Κάθε παλιό URL → στο **πιο σχετικό θεματικά** νέο URL. Ποτέ «όλα στην αρχική» (soft-404 pattern → χάνεις rankings). Κατανομή: 25 exact, 157 consolidate σε hubs, 80 rebuild.

### Πυλώνας 2 — Rebuild του περιεχομένου με αξία (Παράρτημα Α)
- **P0 (πριν το cutover):** 10 τοπικά landers + `/reviews` + `/neuro-rehab`
- **P1 (μήνας 1):** `/shoulder-pain`, `/knee-pain`, `/lymphatic-glyfada` + ~20 άρθρα μέσω του **AI blog CMS** (δισκοκήλη, εγκεφαλικό, carpal tunnel, πελματιαία, τενοντίτιδες, Πάρκινσον, ίλιγγος…)
- **P2/P3:** ό,τι δείξει το GSC ότι αξίζει

### Πυλώνας 3 — Δεδομένα, όχι μαντεψιές
Με **GSC (12 μήνες, Pages + Queries)** επιβεβαιώνουμε ποιες σελίδες φέρνουν κλικ και αναπροσαρμόζουμε προτεραιότητες. Rebuild στα τυφλά = σπατάλη· 301-όλα-σε-hub στα τυφλά = απώλεια.

---

## 4. P0 — Χτίζονται ΠΡΙΝ το cutover (αποφυγή redirect chains)

Οι verifiers το τόνισαν: αν τα τοπικά landers κάνουν 301 σε hub «προσωρινά» και μετά τα ξαναδείξουμε στη νέα σελίδα, δημιουργούμε **αλυσίδες redirect** που κρατάνε cache και καθυστερούν την Google. Γι' αυτό οι P0 σελίδες χτίζονται πρώτες, ώστε τα 301 να δείχνουν στον **τελικό προορισμό από την πρώτη μέρα**:

| Νέα σελίδα | Καλύπτει παλιά URLs | Σημείωση |
|---|---|---|
| `/physiotherapy-glyfada` | ΦΘ κατ' οίκον Γλυφάδα (GR+EN) | Μεγαλύτερη αγορά |
| `/physiotherapy-voula` | Βούλα + Άνω Βούλα | Έδρα — δυνατό local |
| `/physiotherapy-vari` | Βάρη | |
| `/physiotherapy-vouliagmeni` | Βουλιαγμένη (+neuro duplicates) | |
| `/physiotherapy-alimos` | Άλιμος (+neuro) | ✳ επιβεβαίωση περιοχής |
| `/physiotherapy-nea-smyrni` | Νέα Σμύρνη | ✳ επιβεβαίωση περιοχής |
| `/chiropractic-glyfada` | Χειροπρακτική Γλυφάδα (GR+EN) | Ναυαρχίδα brand |
| `/chiropractic-vari` | Χειροπρακτική Βάρη | |
| `/chiropractic-vouliagmeni` | Χειροπρακτική Βουλιαγμένη | |
| `/neuro-rehab` | 8 παλιά URLs (νευρολογική ΦΘ, μετά από εγκεφαλικό, Bobath/PNF) | Ναυαρχίδα υπηρεσία |
| `/reviews` | testimonials (GR+EN) | Δένει με το #13 (LLM/GEO) |
| *(P1 αμέσως μετά)* `/chiropractic-alimos`, `/chiropractic-nea-smyrni`, `/lymphatic-glyfada` | | |

Κάθε lander: μοναδικό περιεχόμενο ανά περιοχή (όχι copy-paste με αλλαγμένο όνομα), τοπικά σήματα (χρόνος άφιξης, περιοχές-γειτονιές), LocalBusiness/areaServed schema, εσωτερικά links από/προς υπηρεσίες, CTA → `/booking`.

---

## 5. Υλοποίηση redirects — κανόνες (ευρήματα verification)

1. **Πού:** `next.config.ts` → `redirects()`. **ΟΧΙ στο proxy** — ο matcher του proxy (`/((?!api|_next|.*\..*).*)`)  **αποκλείει όλα τα `.html`** — αν μπουν εκεί, κανένα legacy redirect δεν θα πυροδοτηθεί. Τα config-level redirects τρέχουν πριν το proxy: σωστό layer.
2. **Source of truth:** `src/lib/legacy-redirects.ts` — ένας πίνακας `{old, target}` που τροφοδοτεί το `redirects()`. Μία γραμμή ανά παλιό URL, εύκολο diff/review.
3. **Extensionless duplicates:** το παλιό Apache σερβίρει και `/el/contact-gr` ΚΑΙ `/el/contact-gr.html` (MultiViews). Από κάθε γραμμή παράγονται **2 κανόνες** (με και χωρίς `.html`) → ~530 κανόνες, κάτω από το όριο (~1024) του Vercel.
4. **Case-sensitivity:** τα matches είναι case-sensitive. Τα uppercase slugs (`TECAR-`, `ACL-`, `MCL-LCL-`, `NFC-contact`) παίρνουν **και lowercase διπλότυπα**.
5. **`permanent: true`** (εκπέμπει 308 — ισοδύναμο 301 για Google· να μην «διορθωθεί» σε 307).
6. **Query strings** (fbclid/gclid/utm) περνάνε αυτούσια — καμία `has:` συνθήκη.
7. **Ειδικές γραμμές:** `/el/neurodynamics.html` (χωρίς `-gr` suffix — explicit γραμμή)· `/en/NFC-contact-eng.html` → `/en/contact` — **ΔΕΝ αφαιρείται ΠΟΤΕ** (φυσικές NFC κάρτες).
8. **Τα 301 μένουν για πάντα.** Όχι «καθάρισμα μετά από 90 μέρες».
9. **Legacy sitemap trick:** τα παλιά XML sitemaps (`/el/sitemap-gr.xml`, `/en/sitemap-eng.xml`) θα σερβίρονται από το νέο site ως **`/sitemap-legacy.xml`** με όλα τα παλιά URLs, και θα υποβληθούν στο GSC → η Google επισκέπτεται κάθε παλιό URL, βλέπει το 301, μεταφέρει το equity **σε εβδομάδες αντί για 6-12 μήνες**. Αφαιρείται μετά από ~6 μήνες.

---

## 6. Τεχνικό SEO — τι έχουμε ήδη ✅ / τι λείπει ❌

| | Κατάσταση |
|---|---|
| Canonical ανά σελίδα (path-aware) | ✅ layout.tsx |
| **hreflang** el/en/x-default σε σελίδες & sitemap | ✅ ήδη υλοποιημένο |
| JSON-LD: MedicalBusiness/Physiotherapist + γεω + ωράριο + Person | ✅ sitewide |
| JSON-LD: MedicalTherapy, FAQPage, Article, Breadcrumb | ✅ per-page helpers |
| Sitemap.xml δυναμικό (και τα άρθρα από Supabase) | ✅ |
| GSC verification (env var) | ✅ έτοιμο — θέλει το token |
| **Redirects()** | ❌ **δεν υπάρχει — ο πυρήνας αυτού του πλάνου** |
| **AI-crawler robots rules** (τα έχει το παλιό!) | ❌ να προστεθούν στο robots.ts |
| **llms.txt** | ❌ να προστεθεί (GEO) |
| P0 σελίδες (landers, /reviews, /neuro-rehab) | ❌ να χτιστούν |
| Legacy sitemap | ❌ να προστεθεί |
| aggregateRating με αληθινά δεδομένα | ⚠️ υπάρχει hardcoded 5.0/100 — να δέσει με αληθινά reviews στο /reviews |

---

## 7. GEO — ορατότητα στα LLMs

1. **robots.ts**: explicit allow σε `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `Google-Extended` (συνέχεια της πολιτικής του παλιού).
2. **llms.txt** στο root: συνοπτικό προφίλ (ποιος, υπηρεσίες, περιοχές, τιμές 30′/60′, ωράριο, τηλέφωνο, /reviews) — τα LLMs το προτιμούν για γρήγορη κατανόηση.
3. **/reviews** με πραγματικές μαρτυρίες + `Review`/`AggregateRating` schema — τα LLMs αντλούν «τι λένε οι ασθενείς» από δομημένα δεδομένα.
4. **FAQ blocks** σε κάθε σελίδα υπηρεσίας/lander (FAQPage schema υπάρχει ήδη) — ιδανικό format για AI answers.
5. Καθαρό, semantic HTML (το έχει το νέο site) + γρήγορο LCP.

## 8. Reviews σε ξεχωριστό domain; (#13) — Ειλικρινής σύσταση

**Όχι ξεχωριστό domain.** Ένα νέο domain ξεκινά με **μηδενικό authority** — ούτε η Google ούτε τα LLMs το εμπιστεύονται· και «κλέβει» equity από το physiodanali.gr. Αυτό που πραγματικά διαβάζουν τα LLMs είναι: reviews **πάνω στο κύριο domain** με σωστό schema + **Google Business Profile** reviews (τα LLMs τραβάνε έντονα από GBP/Maps).

**Σύσταση:** `/reviews` στο κύριο site (P0) + συστηματική συλλογή Google reviews στο GBP + AggregateRating schema. Αν ο πελάτης θέλει οπωσδήποτε «κάτι ξεχωριστό»: subdomain `reviews.physiodanali.gr` που κάνει redirect στο `/reviews` (vanity, χωρίς SEO κόστος). Το κόστος ενός standalone review site δεν αποδίδει.

---

## 9. Cutover Runbook (ημέρα μετάβασης)

**Προαπαιτούμενα (πριν οριστεί ημερομηνία):**
- [ ] Λύση του Vercel deploy blocker (τίποτα δεν γίνεται χωρίς αυτό)
- [ ] P0 σελίδες live στο staging (vercel.app) και ελεγμένες
- [ ] Redirect map + legacy sitemap + robots/llms.txt deployed στο staging
- [ ] **Smoke test και των 264 URLs** στο staging (script: κάθε παλιό path → 308 → 200, **max 1 hop**, σωστός στόχος)
- [ ] GSC πρόσβαση + baseline export (rankings πριν, για σύγκριση)
- [ ] Backup/αρχείο του παλιού site (πλήρες wget mirror — και για περιεχόμενο των rebuilds)

**Ημέρα Χ:**
1. Μείωση DNS TTL σε 300s (24h πριν)
2. Προσθήκη `physiodanali.gr` + `www` στο Vercel project (www → apex 308)
3. Αλλαγή DNS (A/CNAME → Vercel)
4. Άμεσος έλεγχος: homepage 200, 5 δείγματα redirects, `/robots.txt`, `/sitemap.xml`, **κανένα noindex** (κλασικό λάθος cutover)
5. GSC: υποβολή `sitemap.xml` + `sitemap-legacy.xml`, URL Inspection στις 10 κορυφαίες σελίδες («Request indexing»)
6. Το παλιό hosting **μένει ενεργό** 1-2 εβδομάδες (rollback = γύρισμα DNS)

**Rollback trigger:** μαζικά 5xx/404 ή απότομη πτώση εμφανίσεων στο GSC τις πρώτες 72h.

## 10. Post-launch monitoring (6 εβδομάδες)

| Πότε | Τι |
|---|---|
| Καθημερινά (εβδ. 1) | GSC Coverage: νέα 404s → προσθήκη γραμμής στο map· Vercel logs για άγνωστα paths |
| Εβδομαδιαία (εβδ. 2-6) | GSC Performance vs baseline ανά σελίδα/query· πορεία indexing των νέων URLs |
| Εβδ. 3-4 | Αναμενόμενη προσωρινή διακύμανση ±15% — ΟΧΙ πανικός, ΟΧΙ αλλαγές στο map |
| Εβδ. 6 | Απολογισμός· απόφαση για P2 rebuilds βάσει δεδομένων |

**Φυσιολογική εικόνα:** μικρή βύθιση 2-4 εβδομάδες, πλήρης επαναφορά σε 4-8, και μετά **άνοδος** (το νέο site είναι ταχύτερο, mobile-first, με καλύτερο schema).

## 11. Χρονοδιάγραμμα & KPIs

| Φάση | Διάρκεια | Παραδοτέα |
|---|---|---|
| **Α. Προετοιμασία** | 1-2 εβδ. | redirects infra + P0 σελίδες (12) + robots/llms/legacy-sitemap + smoke tests |
| **Β. Cutover** | 1 μέρα | DNS switch + GSC submits |
| **Γ. Σταθεροποίηση** | εβδ. 1-6 | monitoring, hotfix 404s, P1 άρθρα μέσω AI CMS (~20) |
| **Δ. Ανάπτυξη** | συνεχής | P2 σελίδες βάσει GSC, νέα άρθρα, GBP reviews |

**KPIs:** organic clicks/impressions (GSC) vs baseline · θέσεις για «φυσικοθεραπεία κατ' οίκον <περιοχή>» ×6 και «χειροπρακτική <περιοχή>» ×4 · indexed pages · 404 count → 0 · κλήσεις/κρατήσεις από organic (το /booking μετράει).

## 12. Ανοιχτές ερωτήσεις για τον πελάτη

1. **GSC πρόσβαση** (ή export Pages+Queries 12μήνου) — το σημαντικότερο.
2. Μασάζ (therapeutic/relax/sports, reflexology, cupping, craniosacral): **προσφέρονται ακόμα;** → αποφασίζει αν χτιστεί `/massage` ή μένουν στο /therapies.
3. TECAR, shockwave, dry needling, kinesio-tape: ποια προσφέρονται; (να αναφέρονται στο /therapies ώστε τα 301 να προσγειώνονται σε σχετικό περιεχόμενο)
4. **Telerehabilitation** (online συνεδρίες Ελλάδα/Κύπρος): ισχύει; → `/telerehab` ή όχι.
5. **At-Villa massage** (Λαγονήσι/Σούνιο, EN, premium): ενεργό;
6. **Νέα Σμύρνη & Άλιμος**: εξυπηρετούνται ακόμα; → P0/P1 landers ή όχι.
7. NFC κάρτες: να επαναπρογραμματιστούν στο νέο URL; (το 301 μένει ούτως ή άλλως)
8. Δύο άρθρα εγκεφαλικού (πρώτες 48h / πρώτος χρόνος): merge ή δύο;
9. Ξεχωριστό `/physiotherapy-voula` ή το κρατά η αρχική; (πρόταση: ξεχωριστό)
10. Αγγλικά άρθρα στο μέλλον; (αποφασίζει τους στόχους των EN blog redirects)

## 13. Κίνδυνοι

| Κίνδυνος | Μετριασμός |
|---|---|
| Vercel deploy blocker δεν λυθεί | Προαπαιτούμενο· εναλλακτικά νέο Vercel project/λογαριασμός |
| Redirect σε άσχετο στόχο = soft-404 | Θεματικό mapping + verification (έγινε) + GSC monitoring |
| Extensionless/case variants 404 | Διπλοί κανόνες (§5.3, §5.4) + smoke test 264 URLs |
| Αλυσίδες redirect | P0 χτίζονται πριν το cutover· max-1-hop test |
| Google αργεί να δει τα 301 | Legacy sitemap trick (§5.9) |
| Προσωρινή πτώση rankings | Αναμενόμενη 2-4 εβδ.· baseline + ψυχραιμία |
| NFC κάρτες σπάνε | Μόνιμη γραμμή redirect, τεστ στο smoke suite |

---

*Τα Παραρτήματα Α (rebuild queue) και Β (πλήρης πίνακας 264 redirects) ακολουθούν. Ο πίνακας Β είναι το source of truth για το `src/lib/legacy-redirects.ts`.*

---

## Παράρτημα Α — Rebuild Queue (34 σελίδες)

| Prio | Νέα σελίδα | Καλύπτει | Σκεπτικό |
|---|---|---|---|
| P0 | `/reviews` | `/el/testimonials-gr.html`, `/en/testimonials-eng.html` | Client explicitly wants a reviews presence for LLM/GEO visibility; testimonials carry trust signals and long-tail brand queries. B |
| P0 | `/physiotherapy-voula` | `/el/physical-therapy-at-home-voula-gr.html`, `/en/physical-therapy-at-home-gr.html` | Core service area lander (Voula + Ano Voula). Old page duplicates the homepage — rebuild as a distinct, canonical Voula lander to  |
| P0 | `/physiotherapy-glyfada` | `/el/physical-therapy-at-home-glyfada-gr.html`, `/en/physical-therapy-at-home-glyfada-eng.html` | Highest-value local-SEO asset (content-rich in both languages, Glyfada is the biggest market incl. expats). Scheme: /<service>-<ar |
| P0 | `/physiotherapy-vari` | `/el/physical-therapy-at-home-vari-gr.html`, `/en/physical-therapy-at-home-vari-eng.html` | Local lander, content-rich GR version already optimized (IFOMPT, until-23:00 USP). |
| P0 | `/physiotherapy-vouliagmeni` | `/el/physical-therapy-at-home-vouliagmeni-gr.html`, `/en/physical-therapy-at-home-vouliagmeni-eng.html`, `/el/physical-therapy-neuro-at-home-vouliagmeni-gr.html` +1 | Local lander; the 'neuro' Vouliagmeni URLs are content duplicates of the generic lander so they consolidate here. |
| P0 | `/physiotherapy-nea-smyrni` | `/el/physical-therapy-at-home-neasmyrni-gr.html`, `/el/physical-therapy-neuro-at-home-neasmyrni-gr.html` | Local lander (GR only). Confirm Nea Smyrni is still an actively served area before building. |
| P0 | `/physiotherapy-alimos` | `/el/physical-therapy-at-home-alimos-gr.html`, `/en/physical-therapy-at-home-alimos-eng.html`, `/el/physical-therapy-neuro-at-home-alimos-gr.html` +1 | Local lander; neuro-Alimos URLs are generic-content duplicates, consolidated here. |
| P0 | `/chiropractic-glyfada` | `/el/chiropractor-athome-glyfada-gr.html`, `/en/chiropractor-athome-glyfada-eng.html` | Chiropractic is the brand's headline service; Glyfada lander is content-rich in both languages. Consistent /<service>-<area> schem |
| P0 | `/chiropractic-vari` | `/el/chiropractor-athome-vari-gr.html`, `/en/chiropractor-athome-vari-eng.html` | Content-rich GR chiropractic area lander. |
| P0 | `/chiropractic-vouliagmeni` | `/el/chiropractor-athome-vouliagmeni-gr.html`, `/en/chiropractor-athome-vouliagmeni-eng.html` | Content-rich GR chiropractic area lander; affluent area with strong at-home demand. |
| P0 | `/neuro-rehab` | `/el/physical-therapy-neuro-at-home-gr.html`, `/en/physical-therapy-neuro-at-home-eng.html`, `/el/neurological-physical-therapy-gr.html` +5 | Post-stroke/neurological at-home rehab is a flagship service with its own old cluster (Bobath/PNF/NDT content) plus two stroke art |
| P1 | `/chiropractic-nea-smyrni` | `/el/chiropractor-athome-neasmyrni-gr.html` | Thin old page, GR only — rebuild after core areas; verify area still served. |
| P1 | `/chiropractic-alimos` | `/el/chiropractor-athome-alimos-gr.html`, `/en/chiropractor-athome-alimos-eng.html` | Thin old pages — rebuild after core areas. |
| P1 | `/shoulder-pain` | `/el/shoulder-pain-treatment-gr.html`, `/en/shoulder-pain-treatment-eng.html`, `/el/blog-shoulder-pain-gr.html` +1 | Big condition head-term with a 6-page legacy sub-cluster (frozen shoulder, impingement, arthritis, calcific, supraspinatus, biceps |
| P1 | `/knee-pain` | `/el/knee-pain-treatment-gr.html`, `/en/knee-pain-treatment-eng.html`, `/el/blog-knee-pain-gr.html` | Big condition head-term with a 5-page legacy sub-cluster (OA, patellofemoral, meniscus, ACL, MCL/LCL). Repoint sub-condition 301s  |
| P1 | `/lymphatic-glyfada` | `/el/intensive-lymphatic-drainage-glyfada-gr.html`, `/en/intensive-lymphatic-drainage-glyfada-eng.html` | High-margin post-liposuction niche recently invested in (fresh copy); Glyfada is the cosmetic-surgery clientele hotspot. Vari vari |
| P1 | `/articles/brazilian-lymphatic-drainage` | `/el/blog-brazilian-drainage-gr.html`, `/en/blog-brazilian-drainage-eng.html` | Unique Renata França method article; supports /lymphatic commercially. Migrate via AI blog CMS. |
| P1 | `/articles/post-surgical-lymphatic-drainage` | `/el/blog-post-surgical-drainage-gr.html`, `/en/blog-post-surgical-drainage-eng.html` | Post-liposuction/abdominoplasty recovery article; strong conversion support for /lymphatic. |
| P1 | `/articles/carpal-tunnel-syndrome` | `/el/blog-carpal-tunnel-gr.html`, `/en/blog-carpal-tunnel-eng.html` | Content-rich clinical article (splints, nerve glides); also absorbs equity from the old carpal-tunnel condition pages via later re |
| P1 | `/articles/cerebral-palsy-adults` | `/el/blog-cerebral-palsy-gr.html`, `/en/blog-cerebral-palsy-eng.html` | Unique low-competition neuro topic; supports /neuro-rehab. |
| P1 | `/articles/disc-herniation` | `/el/blog-disc-herniation-gr.html`, `/en/blog-disc-herniation-eng.html` | High-volume topic ('κήλη δίσκου'); interlinks with /low-back-pain. |
| P1 | `/articles/frozen-shoulder` | `/el/blog-frozen-shoulder-gr.html`, `/en/blog-frozen-shoulder-eng.html` | Content-rich staging article (adhesive capsulitis); pairs with future /shoulder-pain. |
| P1 | `/articles/golfers-elbow` | `/el/blog-golfers-elbow-gr.html`, `/en/blog-golfers-elbow-eng.html` | Unique article; pairs with tennis-elbow article. |
| P1 | `/articles/tennis-elbow` | `/el/blog-tennis-elbow-gr.html`, `/en/blog-tennis-elbow-eng.html` | High-volume condition article; also absorbs old epicondylitis condition-page equity via later repointing. |
| P1 | `/articles/multiple-sclerosis-physiotherapy` | `/el/blog-multiple-sclerosis-gr.html`, `/en/blog-multiple-sclerosis-eng.html` | Neuro cluster support; interlink /neuro-rehab. |
| P1 | `/articles/parkinsons-exercise` | `/el/blog-parkinsons-exercise-gr.html`, `/en/blog-parkinsons-exercise-eng.html` | Neuro cluster; strong at-home-care intent audience. |
| P1 | `/articles/patellofemoral-pain` | `/el/blog-patellofemoral-pain-gr.html`, `/en/blog-patellofemoral-pain-eng.html` | Runner's-knee article; will interlink with /knee-pain when built. |
| P1 | `/articles/peripheral-neuropathy` | `/el/blog-peripheral-neuropathy-gr.html`, `/en/blog-peripheral-neuropathy-eng.html` | Unique neuro/balance topic, elderly at-home audience. |
| P1 | `/articles/plantar-fasciitis` | `/el/blog-plantar-fasciitis-treatment-gr.html`, `/en/blog-plantar-fasciitis-treatment-eng.html` | High-volume condition ('πελματιαία απονευρωσίτιδα'); absorbs old condition-page equity via later repointing. |
| P1 | `/articles/rotator-cuff-tears` | `/el/blog-rotator-cuff-gr.html`, `/en/blog-rotator-cuff-eng.html` | Conservative-care article; pairs with /shoulder-pain rebuild. |
| P1 | `/articles/stroke-rehabilitation-first-year` | `/el/blog-stroke-rehab-gr.html`, `/en/blog-stroke-rehab-eng.html` | Core neuro content supporting /neuro-rehab; strong caregiver search intent. |
| P1 | `/articles/stroke-first-48-hours` | `/el/blog-stroke-rehabilitation-gr.html`, `/en/blog-stroke-rehabilitation-eng.html` | Second stroke article (different angle: acute phase). Confirm with client whether to keep separate or merge into one canonical str |
| P1 | `/articles/tendinopathy-vs-tendonitis` | `/el/blog-tendinopathy-or-tendonitis-gr.html`, `/en/blog-tendinopathy-or-tendonitis-eng.html` | Evergreen educational piece; internal-link hub for all tendon condition pages. |
| P1 | `/articles/vestibular-rehabilitation` | `/el/blog-vestibular-rehab-gr.html`, `/en/blog-vestibular-rehab-eng.html` | Unique BPPV/vertigo topic with zero local competition; strong differentiator. |

## Παράρτημα Β — Πλήρης πίνακας 301 Redirects (264 URLs)

> **Source of truth** για το `src/lib/legacy-redirects.ts`. Τύποι: **exact** = 1:1 αντιστοιχία · **consolidate** = στο κοντινότερο hub · **rebuild** = προσωρινός στόχος μέχρι να χτιστεί η νέα σελίδα (στήλη «Τελικός») · **legal** = νομικές. Κάθε γραμμή παράγει 2 κανόνες (με/χωρίς `.html`).


### Αρχικές / Hubs (10)

| Παλιό URL | → Στόχος (cutover) | Τύπος | Prio | Τελικός (rebuild) |
|---|---|---|---|---|
| `/el/index-gr.html` | `/` | exact | P0 |  |
| `/el/our-services-gr.html` | `/therapies` | exact | P0 |  |
| `/en/index-eng.html` | `/en` | exact | P0 |  |
| `/en/our-services-eng.html` | `/en/therapies` | exact | P0 |  |
| `/el/what-we-treat-gr.html` | `/therapies` | consolidate | P1 |  |
| `/en/what-we-treat-eng.html` | `/en/therapies` | consolidate | P1 |  |
| `/el/physical-therapy-modalities-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/sitemap-gr.html` | `/therapies` | consolidate | P3 |  |
| `/en/physical-therapy-modalities-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/sitemap-eng.html` | `/en/therapies` | consolidate | P3 |  |

### Τοπικά landers (περιοχές) (32)

| Παλιό URL | → Στόχος (cutover) | Τύπος | Prio | Τελικός (rebuild) |
|---|---|---|---|---|
| `/el/chiropractor-athome-glyfada-gr.html` | `/chiropractic` | rebuild | P0 | `/chiropractic-glyfada` |
| `/el/chiropractor-athome-vari-gr.html` | `/chiropractic` | rebuild | P0 | `/chiropractic-vari` |
| `/el/chiropractor-athome-vouliagmeni-gr.html` | `/chiropractic` | rebuild | P0 | `/chiropractic-vouliagmeni` |
| `/el/physical-therapy-at-home-alimos-gr.html` | `/home-care` | rebuild | P0 | `/physiotherapy-alimos` |
| `/el/physical-therapy-at-home-glyfada-gr.html` | `/home-care` | rebuild | P0 | `/physiotherapy-glyfada` |
| `/el/physical-therapy-at-home-neasmyrni-gr.html` | `/home-care` | rebuild | P0 | `/physiotherapy-nea-smyrni` |
| `/el/physical-therapy-at-home-vari-gr.html` | `/home-care` | rebuild | P0 | `/physiotherapy-vari` |
| `/el/physical-therapy-at-home-voula-gr.html` | `/home-care` | rebuild | P0 | `/physiotherapy-voula` |
| `/el/physical-therapy-at-home-vouliagmeni-gr.html` | `/home-care` | rebuild | P0 | `/physiotherapy-vouliagmeni` |
| `/en/chiropractor-athome-glyfada-eng.html` | `/en/chiropractic` | rebuild | P0 | `/en/chiropractic-glyfada` |
| `/en/physical-therapy-at-home-glyfada-eng.html` | `/en/home-care` | rebuild | P0 | `/en/physiotherapy-glyfada` |
| `/el/chiropractor-athome-alimos-gr.html` | `/chiropractic` | rebuild | P1 | `/chiropractic-alimos` |
| `/el/chiropractor-athome-neasmyrni-gr.html` | `/chiropractic` | rebuild | P1 | `/chiropractic-nea-smyrni` |
| `/el/intensive-lymphatic-drainage-glyfada-gr.html` | `/lymphatic` | rebuild | P1 | `/lymphatic-glyfada` |
| `/el/physical-therapy-neuro-at-home-glyfada-gr.html` | `/home-care` | rebuild | P1 | `/neuro-rehab` |
| `/el/physical-therapy-neuro-at-home-vari-gr.html` | `/home-care` | rebuild | P1 | `/neuro-rehab` |
| `/el/physical-therapy-neuro-at-home-vouliagmeni-gr.html` | `/home-care` | rebuild | P1 | `/physiotherapy-vouliagmeni` |
| `/en/chiropractor-athome-alimos-eng.html` | `/en/chiropractic` | rebuild | P1 | `/en/chiropractic-alimos` |
| `/en/chiropractor-athome-vari-eng.html` | `/en/chiropractic` | rebuild | P1 | `/en/chiropractic-vari` |
| `/en/chiropractor-athome-vouliagmeni-eng.html` | `/en/chiropractic` | rebuild | P1 | `/en/chiropractic-vouliagmeni` |
| `/en/intensive-lymphatic-drainage-glyfada-eng.html` | `/en/lymphatic` | rebuild | P1 | `/en/lymphatic-glyfada` |
| `/en/physical-therapy-at-home-alimos-eng.html` | `/en/home-care` | rebuild | P1 | `/en/physiotherapy-alimos` |
| `/en/physical-therapy-at-home-vari-eng.html` | `/en/home-care` | rebuild | P1 | `/en/physiotherapy-vari` |
| `/en/physical-therapy-at-home-vouliagmeni-eng.html` | `/en/home-care` | rebuild | P1 | `/en/physiotherapy-vouliagmeni` |
| `/en/physical-therapy-neuro-at-home-glyfada-eng.html` | `/en/home-care` | rebuild | P1 | `/en/neuro-rehab` |
| `/el/intensive-lymphatic-drainage-vari-gr.html` | `/lymphatic` | consolidate | P2 |  |
| `/el/physical-therapy-neuro-at-home-alimos-gr.html` | `/home-care` | rebuild | P2 | `/physiotherapy-alimos` |
| `/el/physical-therapy-neuro-at-home-neasmyrni-gr.html` | `/home-care` | rebuild | P2 | `/physiotherapy-nea-smyrni` |
| `/en/intensive-lymphatic-drainage-vari-eng.html` | `/en/lymphatic` | consolidate | P2 |  |
| `/en/physical-therapy-neuro-at-home-alimos-eng.html` | `/en/home-care` | rebuild | P2 | `/en/physiotherapy-alimos` |
| `/en/physical-therapy-neuro-at-home-vari-eng.html` | `/en/home-care` | rebuild | P2 | `/en/neuro-rehab` |
| `/en/physical-therapy-neuro-at-home-vouliagmeni-eng.html` | `/en/home-care` | rebuild | P2 | `/en/physiotherapy-vouliagmeni` |

### Υπηρεσίες (50)

| Παλιό URL | → Στόχος (cutover) | Τύπος | Prio | Τελικός (rebuild) |
|---|---|---|---|---|
| `/el/chiropractor-athome-gr.html` | `/chiropractic` | exact | P0 |  |
| `/el/clinical-pilates-kat-oikon-gr.html` | `/clinical-pilates` | exact | P0 |  |
| `/el/intensive-lymphatic-drainage-gr.html` | `/lymphatic` | exact | P0 |  |
| `/el/orthopedic-manual-therapy-gr.html` | `/chiropractic` | exact | P0 |  |
| `/el/physical-therapy-at-home-gr.html` | `/home-care` | exact | P0 |  |
| `/el/physical-therapy-neuro-at-home-gr.html` | `/home-care` | rebuild | P0 | `/neuro-rehab` |
| `/en/chiropractor-athome-eng.html` | `/en/chiropractic` | exact | P0 |  |
| `/en/clinical-pilates-athome-eng.html` | `/en/clinical-pilates` | exact | P0 |  |
| `/en/intensive-lymphatic-drainage-eng.html` | `/en/lymphatic` | exact | P0 |  |
| `/en/physical-therapy-at-home-eng.html` | `/en/home-care` | exact | P0 |  |
| `/el/massage-gr.html` | `/therapies` | consolidate | P1 |  |
| `/el/muskuloskeletal-physical-therapy-gr.html` | `/therapies` | consolidate | P1 |  |
| `/el/neurological-physical-therapy-gr.html` | `/therapies` | rebuild | P1 | `/neuro-rehab` |
| `/el/pre-post-operative-gr.html` | `/therapies` | consolidate | P1 |  |
| `/en/massage-eng.html` | `/en/therapies` | consolidate | P1 |  |
| `/en/orthopedic-manual-therapy-eng.html` | `/en/chiropractic` | exact | P1 |  |
| `/en/physical-therapy-at-home-gr.html` | `/home-care` | rebuild | P1 | `/physiotherapy-voula` |
| `/en/physical-therapy-neuro-at-home-eng.html` | `/en/home-care` | rebuild | P1 | `/en/neuro-rehab` |
| `/el/TECAR-physical-therapy-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/dry-needling-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/kinesiotherapy-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/orthopedic-massage-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/telerehabilitation-gr.html` | `/therapies` | consolidate | P2 |  |
| `/en/at-villa-massage-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/en/dry-needling-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/en/muskuloskeletal-physical-therapy-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/en/neurological-physical-therapy-eng.html` | `/en/therapies` | rebuild | P2 | `/en/neuro-rehab` |
| `/en/pre-post-operative-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/en/telerehabilitation-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/el/craniosacral-therapy-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/cupping-therapy-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/kinesiology-tape-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/neurodynamics.html` | `/therapies` | consolidate | P3 |  |
| `/el/psyche-massage-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/reflexology-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/relax-massage-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/shockwave-therapy-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/sports-massage-gr.html` | `/therapies` | consolidate | P3 |  |
| `/en/TECAR-physical-therapy-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/craniosacral-therapy-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/cupping-therapy-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/electroacupuncture-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/kinesiology-tape-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/kinesiotherapy-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/orthopedic-massage-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/psyche-massage-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/reflexology-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/relax-massage-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/shockwave-therapy-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/sports-massage-eng.html` | `/en/therapies` | consolidate | P3 |  |

### Blog (56)

| Παλιό URL | → Στόχος (cutover) | Τύπος | Prio | Τελικός (rebuild) |
|---|---|---|---|---|
| `/el/blog-brazilian-drainage-gr.html` | `/lymphatic` | rebuild | P1 | `/articles/brazilian-lymphatic-drainage` |
| `/el/blog-carpal-tunnel-gr.html` | `/articles` | rebuild | P1 | `/articles/carpal-tunnel-syndrome` |
| `/el/blog-cerebral-palsy-gr.html` | `/articles` | rebuild | P1 | `/articles/cerebral-palsy-adults` |
| `/el/blog-disc-herniation-gr.html` | `/articles` | rebuild | P1 | `/articles/disc-herniation` |
| `/el/blog-frozen-shoulder-gr.html` | `/articles` | rebuild | P1 | `/articles/frozen-shoulder` |
| `/el/blog-golfers-elbow-gr.html` | `/articles` | rebuild | P1 | `/articles/golfers-elbow` |
| `/el/blog-gr.html` | `/articles` | exact | P1 |  |
| `/el/blog-hip-pain-gr.html` | `/hip-pain` | consolidate | P1 |  |
| `/el/blog-knee-pain-gr.html` | `/therapies` | rebuild | P1 | `/knee-pain` |
| `/el/blog-low-back-pain-gr.html` | `/low-back-pain` | consolidate | P1 |  |
| `/el/blog-multiple-sclerosis-gr.html` | `/articles` | rebuild | P1 | `/articles/multiple-sclerosis-physiotherapy` |
| `/el/blog-neck-pain-gr.html` | `/neck-pain` | consolidate | P1 |  |
| `/el/blog-parkinsons-exercise-gr.html` | `/articles` | rebuild | P1 | `/articles/parkinsons-exercise` |
| `/el/blog-patellofemoral-pain-gr.html` | `/articles` | rebuild | P1 | `/articles/patellofemoral-pain` |
| `/el/blog-peripheral-neuropathy-gr.html` | `/articles` | rebuild | P1 | `/articles/peripheral-neuropathy` |
| `/el/blog-plantar-fasciitis-treatment-gr.html` | `/articles` | rebuild | P1 | `/articles/plantar-fasciitis` |
| `/el/blog-post-surgical-drainage-gr.html` | `/lymphatic` | rebuild | P1 | `/articles/post-surgical-lymphatic-drainage` |
| `/el/blog-rotator-cuff-gr.html` | `/articles` | rebuild | P1 | `/articles/rotator-cuff-tears` |
| `/el/blog-shoulder-pain-gr.html` | `/therapies` | rebuild | P1 | `/shoulder-pain` |
| `/el/blog-stroke-rehab-gr.html` | `/articles` | rebuild | P1 | `/articles/stroke-rehabilitation-first-year` |
| `/el/blog-stroke-rehabilitation-gr.html` | `/articles` | rebuild | P1 | `/articles/stroke-first-48-hours` |
| `/el/blog-tendinopathy-or-tendonitis-gr.html` | `/articles` | rebuild | P1 | `/articles/tendinopathy-vs-tendonitis` |
| `/el/blog-tennis-elbow-gr.html` | `/articles` | rebuild | P1 | `/articles/tennis-elbow` |
| `/el/blog-vestibular-rehab-gr.html` | `/articles` | rebuild | P1 | `/articles/vestibular-rehabilitation` |
| `/el/blog-elbow-pain-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/blog-foot-pain-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/blog-hand-pain-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/blog-sprained-ankle-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/en/blog-brazilian-drainage-eng.html` | `/en/lymphatic` | rebuild | P2 | `/articles/brazilian-lymphatic-drainage` |
| `/en/blog-carpal-tunnel-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/carpal-tunnel-syndrome` |
| `/en/blog-cerebral-palsy-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/cerebral-palsy-adults` |
| `/en/blog-disc-herniation-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/disc-herniation` |
| `/en/blog-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/en/blog-frozen-shoulder-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/frozen-shoulder` |
| `/en/blog-golfers-elbow-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/golfers-elbow` |
| `/en/blog-hip-pain-eng.html` | `/en/hip-pain` | consolidate | P2 |  |
| `/en/blog-low-back-pain-eng.html` | `/en/low-back-pain` | consolidate | P2 |  |
| `/en/blog-multiple-sclerosis-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/multiple-sclerosis-physiotherapy` |
| `/en/blog-neck-pain-eng.html` | `/en/neck-pain` | consolidate | P2 |  |
| `/en/blog-parkinsons-exercise-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/parkinsons-exercise` |
| `/en/blog-patellofemoral-pain-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/patellofemoral-pain` |
| `/en/blog-peripheral-neuropathy-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/peripheral-neuropathy` |
| `/en/blog-plantar-fasciitis-treatment-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/plantar-fasciitis` |
| `/en/blog-post-surgical-drainage-eng.html` | `/en/lymphatic` | rebuild | P2 | `/articles/post-surgical-lymphatic-drainage` |
| `/en/blog-rotator-cuff-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/rotator-cuff-tears` |
| `/en/blog-shoulder-pain-eng.html` | `/en/therapies` | rebuild | P2 | `/en/shoulder-pain` |
| `/en/blog-stroke-rehab-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/stroke-rehabilitation-first-year` |
| `/en/blog-stroke-rehabilitation-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/stroke-first-48-hours` |
| `/en/blog-tendinopathy-or-tendonitis-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/tendinopathy-vs-tendonitis` |
| `/en/blog-tennis-elbow-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/tennis-elbow` |
| `/en/blog-vestibular-rehab-eng.html` | `/en/therapies` | rebuild | P2 | `/articles/vestibular-rehabilitation` |
| `/en/blog-elbow-pain-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/blog-foot-pain-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/blog-hand-pain-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/blog-knee-pain-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/blog-sprained-ankle-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |

### Ασκήσεις ασθενών (16)

| Παλιό URL | → Στόχος (cutover) | Τύπος | Prio | Τελικός (rebuild) |
|---|---|---|---|---|
| `/el/patient-exercises-cervical-gr.html` | `/neck-pain` | consolidate | P2 |  |
| `/el/patient-exercises-hip-gr.html` | `/hip-pain` | consolidate | P2 |  |
| `/el/patient-exercises-lumbar-gr.html` | `/low-back-pain` | consolidate | P2 |  |
| `/el/patient-exercises-elbow-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/patient-exercises-foot-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/patient-exercises-hand-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/patient-exercises-knee-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/patient-exercises-shoulder-gr.html` | `/therapies` | consolidate | P3 |  |
| `/en/patient-exercises-cervical-eng.html` | `/en/neck-pain` | consolidate | P3 |  |
| `/en/patient-exercises-elbow-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/patient-exercises-foot-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/patient-exercises-hand-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/patient-exercises-hip-eng.html` | `/en/hip-pain` | consolidate | P3 |  |
| `/en/patient-exercises-knee-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/patient-exercises-lumbar-eng.html` | `/en/low-back-pain` | consolidate | P3 |  |
| `/en/patient-exercises-shoulder-eng.html` | `/en/therapies` | consolidate | P3 |  |

### Παθήσεις (100)

| Παλιό URL | → Στόχος (cutover) | Τύπος | Prio | Τελικός (rebuild) |
|---|---|---|---|---|
| `/el/contact-gr.html` | `/contact` | exact | P0 |  |
| `/el/hip-pain-treatment-gr.html` | `/hip-pain` | exact | P0 |  |
| `/el/kyphosis-treatment-gr.html` | `/kyphosis` | exact | P0 |  |
| `/el/low-back-pain-treatment-gr.html` | `/low-back-pain` | exact | P0 |  |
| `/el/neck-pain-treatment-gr.html` | `/neck-pain` | exact | P0 |  |
| `/el/testimonials-gr.html` | `/about` | rebuild | P0 | `/reviews` |
| `/en/contact-eng.html` | `/en/contact` | exact | P0 |  |
| `/en/hip-pain-treatment-eng.html` | `/en/hip-pain` | exact | P0 |  |
| `/en/kyphosis-treatment-eng.html` | `/en/kyphosis` | exact | P0 |  |
| `/en/low-back-pain-treatment-eng.html` | `/en/low-back-pain` | exact | P0 |  |
| `/en/neck-pain-treatment-eng.html` | `/en/neck-pain` | exact | P0 |  |
| `/el/frozen-shoulder-treatment-gr.html` | `/therapies` | consolidate | P1 |  |
| `/el/greater-trochanteric-pain-syndrome-treatment-gr.html` | `/hip-pain` | consolidate | P1 |  |
| `/el/hip-arthritis-treatment-gr.html` | `/hip-pain` | consolidate | P1 |  |
| `/el/knee-pain-treatment-gr.html` | `/therapies` | rebuild | P1 | `/knee-pain` |
| `/el/policy-gr.html` | `/privacy` | legal | P1 |  |
| `/el/scoliosis-treatment-gr.html` | `/kyphosis` | consolidate | P1 |  |
| `/el/shoulder-pain-treatment-gr.html` | `/therapies` | rebuild | P1 | `/shoulder-pain` |
| `/el/spondylolisthesis-treatment-gr.html` | `/low-back-pain` | consolidate | P1 |  |
| `/en/NFC-contact-eng.html` | `/en/contact` | consolidate | P1 |  |
| `/en/knee-pain-treatment-eng.html` | `/en/therapies` | rebuild | P1 | `/en/knee-pain` |
| `/en/shoulder-pain-treatment-eng.html` | `/en/therapies` | rebuild | P1 | `/en/shoulder-pain` |
| `/en/testimonials-eng.html` | `/en/about` | rebuild | P1 | `/en/reviews` |
| `/el/ACL-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/MCL-LCL-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/achilles-tendinopathy-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/arthritis-pain-relief-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/biceps-tendinopathy-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/carpal-tunnel-syndrome-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/de-quervain-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/elbow-pain-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/elbow-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/fibromyalgia-pain-relief-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/foot-pain-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/foot-tendinopathy-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/fractures-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/hand-pain-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/hand-tendinopathy-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/hip-fractures-gr.html` | `/hip-pain` | consolidate | P2 |  |
| `/el/iliotibial-band-syndrome-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/knee-osteoarthritis-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/meniscus-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/multiple-sclerosis-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/patellofemoral-syndrome-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/plantar-fasciitis-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/rheumatoid-arthritis-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/shoulder-arthritis-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/shoulder-calcific-tendonitis-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/shoulder-impigment-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/sports-injury-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/sprained-ankle-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/el/supraspinatus-tendinopathy-treatment-gr.html` | `/therapies` | consolidate | P2 |  |
| `/en/frozen-shoulder-treatment-eng.html` | `/en/therapies` | consolidate | P2 |  |
| `/en/greater-trochanteric-pain-syndrome-treatment-eng.html` | `/en/hip-pain` | consolidate | P2 |  |
| `/en/hip-arthritis-treatment-eng.html` | `/en/hip-pain` | consolidate | P2 |  |
| `/en/policy-eng.html` | `/privacy` | legal | P2 |  |
| `/en/scoliosis-treatment-eng.html` | `/en/kyphosis` | consolidate | P2 |  |
| `/en/spondylolisthesis-treatment-eng.html` | `/en/low-back-pain` | consolidate | P2 |  |
| `/el/clavicle-fracture-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/elbow-fractures-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/electroacupunture-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/foot-fractures-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/hand-fractures-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/knee-fractures-gr.html` | `/therapies` | consolidate | P3 |  |
| `/el/shoulder-fractures-gr.html` | `/therapies` | consolidate | P3 |  |
| `/en/ACL-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/MCL-LCL-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/achilles-tendinopathy-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/arthritis-pain-relief-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/biceps-tendinopathy-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/carpal-tunnel-syndrome-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/clavicle-fracture-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/de-quervain-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/elbow-fractures-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/elbow-pain-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/elbow-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/fibromyalgia-pain-relief-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/foot-fractures-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/foot-pain-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/foot-tendinopathy-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/fractures-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/hand-fractures-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/hand-pain-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/hand-tendinopathy-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/hip-fractures-eng.html` | `/en/hip-pain` | consolidate | P3 |  |
| `/en/iliotibial-band-syndrome-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/knee-fractures-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/knee-osteoarthritis-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/meniscus-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/multiple-sclerosis-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/patellofemoral-syndrome-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/plantar-fasciitis-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/rheumatoid-arthritis-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/shoulder-arthritis-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/shoulder-calcific-tendonitis-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/shoulder-fractures-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/shoulder-impigment-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/sports-injury-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/sprained-ankle-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
| `/en/supraspinatus-tendinopathy-treatment-eng.html` | `/en/therapies` | consolidate | P3 |  |
