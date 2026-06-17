# Deep SEO / GEO Playbook — PhysioDanali

> **Στόχος:** Νο.1 στο Google (local pack + organic) + αναφορά από AI (ChatGPT/Perplexity/AI Overviews) για **φυσικοθεραπευτής / φυσικοθεραπεία κατ' οίκον / χιροπρακτικός** σε **Γλυφάδα, Βούλα, Βουλιαγμένη, Βάρη, Άλιμο**.
>
> Δομή: εργαλεία → keyword research → architecture/paths → on-page → content/blog → technical → local → links → GEO → ανταγωνισμός → μέτρηση → roadmap → seed keywords.

---

## 0. Εργαλεία & setup (αξιοποίηση των free trials)

| Εργαλείο | Κόστος | Τι το θες |
|---|---|---|
| **Google Search Console** | δωρεάν, μόνιμο | indexing, queries, θέσεις, CTR, coverage |
| **Google Analytics 4** | δωρεάν | traffic, conversions, πηγές |
| **Google Business Profile Insights** | δωρεάν | κλήσεις, οδηγίες, αναζητήσεις |
| **Ahrefs Webmaster Tools (AWT)** | **δωρεάν** (verified site) | site audit + backlinks + organic keywords του ΔΙΚΟΥ σου site |
| **SEMrush** | 7-ήμερο free trial | keyword magic, competitor gap, position tracking, site audit |
| **Ahrefs full** | trial/paid | keywords explorer, competitor backlinks/content gap |
| **Google Keyword Planner** | δωρεάν (Ads account) | πραγματικά volumes Ελλάδας |

### ⏳ Σχέδιο για τη **free εβδομάδα** (SEMrush/Ahrefs είναι time-limited — εξάγεις ΟΛΑ πριν λήξει)
**Ημέρα 1-2 — Keyword research & εξαγωγή**
- SEMrush *Keyword Magic Tool*: βάλε κάθε seed (λίστα §12) → filter (volume, KD, intent) → **export CSV** όλα.
- Ahrefs *Keywords Explorer*: ίδια seeds → "matching terms" + "questions" → export.
- Google Keyword Planner: επιβεβαίωσε volumes Ελλάδας.

**Ημέρα 3 — Competitor intelligence**
- SEMrush/Ahrefs *Domain Overview* στους ανταγωνιστές (care4physio.gr, physiovardas.com + όποιον βρεις top-5 στα target queries).
- *Keyword Gap* / *Content Gap*: keywords που rank-άρουν ΑΥΤΟΙ κι όχι εμείς → **export** (το πιο πολύτιμο: έτοιμη λίστα ευκαιριών).
- *Backlink Gap*: backlinks που έχουν αυτοί → στόχοι link building → export.

**Ημέρα 4 — Technical audit**
- SEMrush *Site Audit* + Ahrefs *Site Audit* → crawl → export errors/warnings (broken links, duplicate, missing meta, slow, schema).

**Ημέρα 5 — Position tracking & σχέδιο**
- Στήσε *Position Tracking* (SEMrush) με τα target keywords + τοποθεσία **Glyfada/Athens** (κράτα screenshots/export — μένει ως baseline).
- Κατέβασε ό,τι έμεινε. Μετά το trial δουλεύεις με GSC + Ahrefs Webmaster Tools (δωρεάν).

> 💡 Όλα τα exports → ένα **master spreadsheet** (στήλες: keyword, volume, KD, intent, target URL, priority, status). Αυτό γίνεται το «μυαλό» του SEO.

---

## 1. Keyword Research — μεθοδολογία

### Search intent buckets (κάθε keyword → 1 intent → 1 τύπος σελίδας)
| Intent | Παράδειγμα | Target σελίδα |
|---|---|---|
| **Transactional / local** | «φυσικοθεραπευτής Γλυφάδα» | Location page / Service page |
| **Commercial** | «brazilian lymphatic drainage Αθήνα» | Service page |
| **Informational** | «ασκήσεις για οσφυαλγία» | Blog article |
| **Navigational** | «physiodanali» | Homepage (το έχουμε) |

### Η long-tail χρυσωρυχείο: **matrix Υπηρεσία × Πάθηση × Περιοχή**
Συνδυασμοί όπως: `φυσικοθεραπεία για {οσφυαλγία/αυχεναλγία/ισχιαλγία} {Γλυφάδα/Βούλα/κατ' οίκον}`.
→ Χαμηλός ανταγωνισμός, υψηλή πρόθεση. Κάθε συνδυασμός = πιθανό blog ή ενότητα σε location page.

### Priority score (για να ξέρεις τι πρώτα)
`Priority = (Volume × Intent_weight) / KD`. Intent_weight: transactional 3, commercial 2, informational 1.
Πρώτα τα **transactional/local με χαμηλό KD** (γρήγορες νίκες), μετά informational για authority.

---

## 2. Architecture & URL paths (σωστά paths)

### Αρχές URL
- Σύντομα, **keyword-rich**, lowercase, με παύλες, χωρίς params, σταθερά (μην αλλάζουν).
- Ένα keyword cluster → μία canonical σελίδα (όχι keyword cannibalization).
- Λογική ιεραρχία + breadcrumbs (✅ schema υπάρχει) + κανένα orphan page.

### Προτεινόμενη δομή
```
/                                  → homepage (brand + "φυσικοθεραπεία κατ' οίκον νότια προάστια")
/therapies                         → hub υπηρεσιών
  /chiropractic /lymphatic /kyphosis /clinical-pilates /home-care
/{condition}                       → neck-pain, low-back-pain, hip-pain (pillar ανά πάθηση)
/fysikotherapeftis-glyfada         → ⬅ ΝΕΑ location pages (Φάση 2)
/fysikotherapeftis-voula           → ⬅
/fysikotherapeftis-vouliagmeni /-vari /-alimo
/articles/{slug}                   → blog
/about /contact /privacy /terms /cookies
```

### Location pages — το URL & περιεχόμενο
- Slug: `fysikotherapeftis-{περιοχή}` (λατινικό transliteration — καθαρό, σταθερό).
- Title: `Φυσικοθεραπευτής {Περιοχή} – Κατ' οίκον | PhysioDanali`
- ΟΧΙ thin/duplicate: **μοναδικό** κείμενο ανά περιοχή (τοπικά σημεία, χρόνος εξυπηρέτησης, τοπικό FAQ, ενσωματωμένος χάρτης, τοπικές κριτικές, LocalBusiness schema με `areaServed`).

### Blog slugs — keyword στο path
- Σήμερα: αγγλικά kebab (π.χ. `telework-back-pain`). Λειτουργεί, αλλά **keyword-in-slug** βοηθά.
- Επιλογή: ο slug να περιέχει το αγγλικό keyword (ok) **ή** ελληνικό transliteration του primary keyword. Συνέπεια > τελειότητα. (Δες §4 — το AI ήδη βγάζει slug· θα το συντονίσουμε με το target keyword.)

### ⚠️ i18n / hreflang (κρίσιμο — bilingual site)
Ο site έγινε EL/EN. **Έλεγξε πώς σερβίρεται το EN:**
- Αν είναι **cookie-based χωρίς ξεχωριστά URLs** (`/en/...`) → η αγγλική έκδοση **ΔΕΝ είναι ξεχωριστά indexable** → χάνεις το English SEO (expats).
- Σωστό για SEO: ξεχωριστά paths (`/en/...` ή subdomain) + **hreflang** tags (`el` / `en` / `x-default`).
- *Action (dev):* επιβεβαίωση + αν χρειάζεται, EN σε `/en/` + hreflang. (Αλλιώς, focus 100% στο ελληνικό.)

### Domain (Φάση 0 — προαπαιτούμενο)
- `physiodanali.gr` → νέο site. **301 redirects** παλιά→νέα URLs (διατήρηση link equity).
- Στο GSC: **Change of Address** αν αλλάξει property.

---

## 3. On-page SEO (template ανά τύπο σελίδας)

### Τύποι (formulas)
- **Title (≤60ch):** `{Primary KW} {Περιοχή} | PhysioDanali` — π.χ. «Φυσικοθεραπευτής Γλυφάδα – Κατ' οίκον | PhysioDanali».
- **Meta description (≤155ch):** όφελος + περιοχή + CTA («Κλείστε ραντεβού», «έως 23:00»).
- **H1:** ένα, με το primary keyword. **H2/H3:** semantic variants + ερωτήσεις (FAQ).
- **Πρώτες 100 λέξεις:** primary keyword + περιοχή φυσικά.
- **Entities/NLP:** κάλυψε σχετικούς όρους (η SEMrush *SEO Writing Assistant* / Ahrefs δίνει τους όρους που έχουν οι top-10).
- **Internal links:** 2-4 με keyword-rich anchor προς σχετικές σελίδες.
- **Images:** περιγραφικό filename + alt με keyword (όχι stuffing).
- **Schema:** ανά τύπο (LocalBusiness/Service/MedicalProcedure/FAQ/Article/Breadcrumb/Review).
- **Βάθος:** service/location ≥800-1200 λέξεις· pillar ≥1500· blog 1000-1800 (όσο χρειάζεται το intent).

### YMYL / E-E-A-T (ιατρικό περιεχόμενο — ΚΡΙΣΙΜΟ για ranking)
- **Author bio** σε κάθε άρθρο: Κων. Δανάλης, PT, credentials, ΠΣΦ, Παν. Δυτ. Αττικής.
- Σύνδεσμος σε **/about** + Person/MedicalBusiness schema.
- Παραπομπές σε αξιόπιστες πηγές όπου ταιριάζει· medical disclaimer (✅).
- Πραγματικές κριτικές/testimonials (trust).

---

## 4. Blog / Content Strategy — topic clusters

### Μοντέλο **Pillar → Cluster**
- **Pillar** = πλήρης σελίδα ανά πάθηση/υπηρεσία (π.χ. `/low-back-pain`).
- **Clusters** = blog άρθρα γύρω από υπο-θέματα, που **linkάρουν στο pillar** (και το pillar σε αυτά).
- Παράδειγμα cluster «Οσφυαλγία»: ασκήσεις, αιτίες, οσφυαλγία στην εγκυμοσύνη, από τηλεργασία, πότε θέλει φυσικοθεραπεία, κατ' οίκον στη Γλυφάδα… → όλα → `/low-back-pain`.

### Κανόνες ανά άρθρο
- **1 primary keyword** + 3-5 secondary (από το spreadsheet).
- Title/H1 με το primary· FAQ schema με τις «questions» από Ahrefs.
- 2-4 internal links: τουλάχιστον 1 σε **pillar/service** + 1 σε **location/contact** με keyword anchor.
- Local angle όπου ταιριάζει («…κατ' οίκον σε Βούλα/Γλυφάδα»).

### Τροφοδότηση του AI automation με τα ΣΩΣΤΑ keywords
Το blog automation παίρνει θέματα από τον πίνακα **`article_topics`** (`topic`, `target_keywords`, `priority`).
- *Action:* γέμισε το backlog από το keyword spreadsheet → κάθε row: topic + 3-5 target_keywords + priority.
- Έτσι κάθε εβδομάδα βγαίνει άρθρο **στοχευμένο σε keyword που θες**, με σωστό slug/title/FAQ.
- Σειρά: πρώτα keywords με καλό volume + χαμηλό KD.

### Content calendar
- 1 άρθρο/βδομάδα (automation) → 52/χρόνο. Χαρτογράφησέ τα στα clusters (π.χ. 8 εβδ. ανά πάθηση).
- **Refresh:** κάθε 6 μήνες ενημέρωσε top άρθρα (νέα ημερομηνία, νέο περιεχόμενο) → freshness boost.

---

## 5. Technical SEO

- [ ] **Site audit** (SEMrush + Ahrefs) → διόρθωση: broken links, 4xx/5xx, redirect chains, duplicate titles/meta, thin pages, missing alt.
- [ ] **Core Web Vitals** — ✅ ήδη άριστα (272KB/0.5s)· κράτα τα.
- [ ] **Mobile-first** — ✅.
- [ ] **Sitemap + robots** — ✅ (δυναμικό, νέα άρθρα auto).
- [ ] **Schema validation** — Rich Results Test σε όλους τους τύπους.
- [ ] **Indexing** — GSC submit sitemap· IndexNow ✅ (Bing/Yandex).
- [ ] **Canonical** — ✅· χωρίς duplicate· **hreflang** αν EN σε ξεχωριστά URLs (§2).
- [ ] **HTTPS/HSTS** — ✅.
- [ ] **301 redirects** στο domain switch· κανένα orphan page.
- [ ] **Breadcrumbs** — ✅ schema.

---

## 6. Local SEO (ο ΜΕΓΑΛΥΤΕΡΟΣ μοχλός για τοπικό)

### Google Business Profile — βαθιά βελτιστοποίηση
- ✅ verified, 121×5.0★. Πρόσθεσε/βελτίωσε:
  - **Κατηγορίες:** *Φυσικοθεραπευτής* (primary) + *Χιροπρακτικός* + τυχόν σχετικές δευτερεύουσες.
  - **Service areas:** Γλυφάδα/Βούλα/Βουλιαγμένη/Βάρη/Άλιμο.
  - **Services** με περιγραφές + (αν θες) τιμές· **Products** (πακέτα συνεδριών).
  - **Attributes** (κατ' οίκον, προσβασιμότητα κ.λπ.).
  - **Photos** 15+ (πρόσωπο/εργασία/εξοπλισμός) — ανανέωση τακτικά.
  - **GBP Posts** 1/βδομάδα → αναδημοσίευση blog (link στο άρθρο).
  - **Q&A:** πρόσθεσε μόνος σου 5-8 συχνές ερωτήσεις + απαντήσεις.

### Reviews — στρατηγική
- **Velocity:** σταθερή ροή (QR/short link μετά τη συνεδρία).
- **Keyword-rich:** ενθάρρυνε «…με βοήθησε με την οσφυαλγία, ήρθε σπίτι στη Βούλα».
- **Απάντηση σε ΚΑΘΕ κριτική** (με keyword/περιοχή φυσικά).
- **Review schema** στο site (embed των πραγματικών) → rich snippets.

### NAP + Citations (consistency = ranking)
Ίδιο **Όνομα / Διεύθυνση / Τηλέφωνο** παντού. Καταχώριση σε:
`doctoranytime.gr` (#1 health), `doctari.gr`, `vrisko.gr`, `xo.gr`, `11888.gr`, Apple/Bing Maps, `ΠΣΦ directory`, τοπικοί κατάλογοι Γλυφάδας/Βούλας.

---

## 7. Off-page / Link Building

- **Competitor backlink gap** (Ahrefs) → στόχευσε τα ίδια domains.
- **Τοπικοί σύνδεσμοι:** γυμναστήρια, ιατρεία, αθλητικοί σύλλογοι, φαρμακεία Γλυφάδας/Βούλας (συνεργασίες, αναφορές).
- **Health directories:** doctoranytime profile = link + citation μαζί.
- **Digital PR / local:** άρθρα σε τοπικά blogs/news νότιων προαστίων.
- **Brand mentions** (ακόμη & χωρίς link) — μετράνε για GEO/authority.
- Ποιότητα > ποσότητα· **όχι** spam/PBN (ποινή).

---

## 8. GEO — AI / LLM Optimization

Για να σε **προτείνουν** τα ChatGPT/Perplexity/Gemini/AI Overviews:
- **`llms.txt`** — curated markdown περίληψη (ποιος, υπηρεσίες, περιοχές, credentials, links). *(dev)*
- **Entity clarity** — απόλυτα συνεπές NAP + `sameAs` (social, ΠΣΦ) + ιδανικά **Wikidata entry** → χτίζει την «οντότητα Δανάλης» → Google Knowledge Panel.
- **Answer-first** περιεχόμενο: ξεκάθαρες, άμεσες απαντήσεις + **FAQ schema** που ταιριάζει σε φυσικές ερωτήσεις («ποιος είναι καλός φυσικοθεραπευτής στη Γλυφάδα;»).
- **Δομημένα δεδομένα πλούσια** (το έχουμε) — τα LLMs τα «διαβάζουν» ευκολότερα.
- **Παρουσία σε πηγές που εμπιστεύονται τα AI:** GBP, doctoranytime, κριτικές, directories.
- **Φρεσκάδα + βάθος:** το εβδομαδιαίο blog ✅ δουλεύει υπέρ μας.
- **Spot-check:** μηνιαία ρώτα τα AI «καλός φυσικοθεραπευτής Γλυφάδα/κατ' οίκον νότια προάστια» — μας αναφέρουν;

---

## 9. Competitor Analysis (συνεχές)

1. Βρες top-5 για τα target queries (care4physio.gr, physiovardas.com + όποιους δείξει το SERP).
2. Ahrefs/SEMrush *Domain Overview* ανά ανταγωνιστή: organic keywords, traffic, top pages, backlinks.
3. *Content Gap*: keywords που έχουν αυτοί κι όχι εμείς → λίστα άρθρων/σελίδων.
4. *Backlink Gap*: τα domains που τους linkάρουν → στόχοι.
5. Ανάλυσε **τι κάνουν στο GBP** (κατηγορίες, posts, κριτικές) → ξεπέρασέ τους.
6. Σημείωση: πολλοί τρέχουν **Google Ads** → υπάρχει ζήτηση· εμείς χτίζουμε organic + (προαιρετικά) ads.

---

## 10. Tracking & KPIs

| Μετρική | Εργαλείο | Στόχος |
|---|---|---|
| Θέσεις target keywords | GSC / SEMrush / Ahrefs rank tracker | top-3 σε 6-12 μήνες |
| Organic clicks / impressions | GSC | ↑ μήνα-μήνα |
| Local pack εμφανίσεις | GBP Insights | top-3 map |
| Κλήσεις / οδηγίες | GBP Insights | ↑ |
| Conversions (φόρμα/τηλ) | GA4 | ↑ |
| Backlinks / referring domains | Ahrefs | σταθερή αύξηση |
| Reviews (αριθμός/βαθμός) | GBP | velocity + 5.0 |
| GEO αναφορές | manual spot-check | «ναι, μας αναφέρει» |

**Reporting:** μηνιαίο review (θέσεις, traffic, conversions, νέα links/κριτικές, επόμενες ενέργειες).

---

## 11. Roadmap

| Χρόνος | Ενέργειες |
|---|---|
| **Free week (SEMrush/Ahrefs)** | keyword research + competitor gap + backlink gap + site audit → master spreadsheet (§0) |
| **Μήνας 1** | ⭐ domain switch + 301s · GSC + sitemap · Analytics · on-page optimization υπαρχουσών σελίδων · **location pages** · Review schema · γέμισμα blog backlog |
| **Μήνας 2-3** | citations/NAP · GBP deep · 8-12 στοχευμένα άρθρα (clusters) · ξεκίνημα link building · internal linking audit |
| **Μήνας 4-6** | συνεχές content + links · refresh παλιών · GEO (llms.txt/Wikidata) · monitoring & iterate |
| **Ongoing** | blog (εβδομαδιαίο) · reviews velocity · links · μηνιαίο report · προσαρμογή βάσει δεδομένων |

---

## 12. Seed keyword list (plug στο SEMrush/Ahrefs)

**Primary — transactional/local (πρώτη προτεραιότητα):**
- φυσικοθεραπευτής Γλυφάδα · φυσικοθεραπευτής Βούλα · φυσικοθεραπευτής Βουλιαγμένη/Βάρη/Άλιμο
- φυσικοθεραπεία Γλυφάδα · φυσικοθεραπεία Βούλα
- φυσικοθεραπεία κατ' οίκον {Γλυφάδα/Βούλα/Βουλιαγμένη/Βάρη/Άλιμο/νότια προάστια}
- χιροπρακτικός Γλυφάδα · χιροπρακτικός Βούλα · χιροπρακτική {περιοχή}
- φυσικοθεραπευτήριο Γλυφάδα

**Service-based (commercial):**
- brazilian lymphatic drainage Αθήνα · λεμφικό μασάζ Γλυφάδα/νότια προάστια
- clinical pilates Γλυφάδα · μετεγχειρητική μάλαξη
- φυσικοθεραπεία για κύφωση · διόρθωση στάσης σώματος
- γηριατρική / νευρολογική φυσικοθεραπεία κατ' οίκον · επανεκπαίδευση βάδισης

**Condition × location (long-tail goldmine):**
- φυσικοθεραπεία για οσφυαλγία {Γλυφάδα/Βούλα/κατ' οίκον}
- φυσικοθεραπεία αυχεναλγία {περιοχή} · ισχιαλγία {περιοχή}
- φυσικοθεραπεία μετά από κάταγμα κατ' οίκον · αποκατάσταση μετά από χειρουργείο

**Informational (blog clusters):**
- ασκήσεις για οσφυαλγία/αυχεναλγία/ισχιαλγία · τι είναι η χιροπρακτική
- πόνος στη μέση/αυχένα από τηλεργασία · ασκήσεις για κύφωση/σωστή στάση
- πότε χρειάζεται φυσικοθεραπεία · τι είναι το brazilian lymphatic drainage

**English (expats νότιων προαστίων):**
- physiotherapist Glyfada/Voula · home physiotherapy Athens · chiropractor Glyfada · physio at home Athens south

> Επέκτεινε κάθε seed στο Keyword Magic / Keywords Explorer → πάρε variants + questions + volumes + KD → βάλε στο master spreadsheet → προτεραιοποίησε (§1) → χαρτογράφησε σε URL/άρθρο.
