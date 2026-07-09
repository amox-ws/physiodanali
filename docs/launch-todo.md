# PhysioDanali — Launch TODO (μόνο όσα πρέπει να γίνουν)

> **Ετυμηγορία SEO (2026-07-09, full audit + ανεξάρτητη επαλήθευση):**
> **ΔΕΝ χάνουμε SEO στο cutover** — υπό έναν όρο: να γίνει **ατομικά** (όλα μαζί σε ένα παράθυρο).
> Είναι same-domain migration με μόνιμα 301/308 (το ασφαλέστερο σενάριο).

## 🟢 Γιατί είμαστε ασφαλείς (επαληθευμένο, όχι θεωρία)

- **260 / 260** πραγματικά indexed old URLs (από τα `/el/sitemap-gr.xml` = 131 + `/en/sitemap-eng.xml` = 129) → **308 → target 200**. Μηδέν 404, μηδέν soft-404, μηδέν redirect chains. *(Δοκιμάστηκαν ΟΛΑ live, όχι δείγμα.)*
- Ο χάρτης `legacy-redirects.ts` (264 rows) καλύπτει **100%** του πραγματικού old sitemap (0 orphans· 4 bonus rows παραπάνω). Καλύπτει και τα 4 legacy shapes: `.html`, extensionless, lowercase, mixed-case.
- **canonical / sitemap / hreflang** δείχνουν ήδη στο `physiodanali.gr` — **μηδενική διαρροή vercel.app**.
- **Preview noindex** host-gated στο `proxy.ts` (μόνο σε `*.vercel.app`) → μετά το flip το `.gr` γίνεται κανονικά index. Επαληθεύτηκε ότι δεν υπάρχει άλλο global noindex.
- Πλήρες JSON-LD (MedicalBusiness/Physiotherapist/LocalBusiness + Person + AggregateRating), **13 Review objects** στο /reviews, el/en/x-default hreflang σε όλες τις σελίδες (συμπ. legal/articles).
- 301 = **περνάει link equity**. Ακόμη κι αν το recrawl είναι αργό (χωρίς GSC), τίποτα δεν χάνεται — απλώς αργεί.

**Ο μόνος πραγματικός εναπομείνας κίνδυνος:** να μη γίνει το cutover ατομικά. Όλα τα υπόλοιπα «SEO fixes» έχουν κλείσει.

---

## 🔴 MUST-DO — cutover (SEO-blocking)

- [ ] **Atomic cutover σε ΕΝΑ παράθυρο:** attach `physiodanali.gr` (apex) + `www` στο Vercel project → ένα canonical redirect (www→apex) → flip DNS (A/CNAME → Vercel).
- [ ] **Μετά το flip:** `curl -I https://physiodanali.gr/` → **200** από το ΝΕΟ app + self-referential canonical στο `physiodanali.gr` (όχι vercel.app).
- [ ] **Μετά το flip:** επιβεβαίωση ότι το `physiodanali.gr` **ΔΕΝ** στέλνει `X-Robots-Tag: noindex` (το noindex να μείνει μόνο στο preview host).
- [ ] **Spot-check 15-20 legacy URLs live στο `.gr`** μετά το flip → 308 → σωστό target 200 (ήδη 260/260 σωστά στο vercel.app· απλή επιβεβαίωση στο νέο host).
- [ ] **Ο παλιός WordPress host μένει live 2-4 εβδομάδες** (rollback safety net· τώρα σερβίρει Apache/PHP στο 31.22.114.153).

## 🔴 MUST-DO — λειτουργικά (launch blockers, όχι SEO)

- [ ] **Contact form → πραγματικό backend.** Τώρα είναι `mailto` hack → **χάνονται leads**. Ίδια εμφάνιση.
- [ ] **Email deliverability:** `RESEND_API_KEY` + `NOTIFY_TO`/`BOOKING_NOTIFY_TO` στο Vercel **+ DKIM/DMARC για physiodanali.gr** (αλλιώς spam/bounce στα emails ραντεβού/φόρμας).

## 🟡 ΕΝΤΟΝΑ ΣΥΝΙΣΤΩΜΕΝΑ (όχι για αποφυγή απώλειας — για ταχύτητα & ορατότητα)

- [ ] **GSC:** verify property (ιδανικά πριν το flip) → submit `sitemap.xml` + `sitemap-legacy.xml` → force-recrawl των 264 redirects + monitoring Coverage/404 στο κρίσιμο παράθυρο.
- [ ] **Analytics** (Plausible / Vercel Analytics / GA4) + **baseline πριν το flip** → όργανο για να δεις τυχόν traffic cliff.

## ⚪ Μικρά / αποφάσεις (χαμηλή προτεραιότητα)

- [ ] **GBP ωράριο:** το Google δείχνει «έως 23:00», το site 10:00-22:00 — ο πελάτης να ευθυγραμμίσει το Google Business Profile.
- [ ] **reviewCount=100:** επιβεβαίωση ότι ταιριάζει με το πραγματικό σύνολο Google (13 marked-up vs «100+»).
- [ ] **AI-crawler policy** (robots.ts): απόφαση owner — το νέο robots καλωσορίζει AI bots (GEO)· δεν μπλοκάρει CCBot/Bytespider, χρησιμοποιεί deprecated `Claude-Web`. GEO policy, όχι ranking loss.
- [ ] **Data-quality στο `legacy-redirects.ts`** (αβλαβή, όλα 308→200 ήδη): mislabeled EN comment στο row `/en/physical-therapy-at-home-gr.html`, ασύμμετρη ορθογραφία `electro(a)cupuncture`.
- [ ] Επιβεβαίωση ότι **δεν** έμεινε ορατό «08:00-23:00» πουθενά (schema/footer/contact = 10:00-22:00 ✅).

---

## ✅ Ολοκληρωμένα (η SEO βάση — γιατί το verdict είναι «no-loss»)

Redirects repointed (120 rows → σχετικά articles/hubs) · 260/260 old URLs verified · noindex preview · hreflang παντού (+legal/articles fix) · schema hours 10:00-22:00 · EN area-landers JSON-LD locale-fix · homepage/area-lander titles · Review objects στο /reviews · breadcrumb/ContactPoint σε about/contact · Reviews «100+» ενιαία · «εντός ωρών» → «σύντομα» παντού · βελτιωμένη 404 · skip-to-content (a11y) · reviews microsite live.

## ❌ Κλειδωμένες αποφάσεις — ΔΕΝ γίνονται (μην τα ξαναβγάλεις ως TODO)

Καμία νέα σελίδα (/neuro-rehab, /shoulder-pain, /knee-pain, /lymphatic) · κανένας Άλιμος/Ν.Σμύρνη lander (301→γενικά, αποδεκτό) · ωράριο 10:00-22:00 + «έως 23:00» marketing · «100+» reviews · ΑΦΜ/άδεια κενά.
*(Σημ.: οδηγίες σε `seo-launch-audit.md` appendix για 08:00-23:00 και `seo-migration-plan.md` Appendix A για build 12 σελίδων είναι **stale** — αγνόησέ τες.)*
