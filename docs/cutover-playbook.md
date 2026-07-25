# Cutover Playbook — τι κάνουμε πριν, κατά και μετά το DNS

> **Ετυμηγορία (επαληθευμένη 2026-07-25, μετά από ΟΛΕΣ τις αλλαγές):**
> **ΔΕΝ χάνουμε SEO.** Είναι same-domain migration με μόνιμα 308 redirects — το ασφαλέστερο σενάριο.

---

## ✅ ΠΡΙΝ ΤΟ DNS — όλα έτοιμα (τσεκαρισμένα τώρα)

| Έλεγχος | Αποτέλεσμα |
|---|---|
| **260/260** παλιά indexed URLs → **308 → 200** | ✅ μηδέν 404, μηδέν chains |
| Sitemap: **64 URLs**, όλα `physiodanali.gr` | ✅ **0** διαρροές `vercel.app` |
| Legacy sitemap (recrawl trick) | ✅ **264** URLs |
| Canonical + hreflang (el/en/x-default) | ✅ σε κάθε σελίδα |
| Preview `noindex` | ✅ ενεργό (**πρέπει να φύγει μετά το flip**) |
| robots.txt + AI crawlers | ✅ |
| JSON-LD (MedicalBusiness, Person, AggregateRating…) | ✅ |
| Κύφωση: σελίδα 404, **redirects → /chiropractic** | ✅ 200 |
| Νέα `/shoulder-pain` στο sitemap + 14 redirects | ✅ |

**Δεν χρειάζεται να κάνουμε τίποτα άλλο πριν.** Ο κώδικας είναι έτοιμος.

---

## 🔧 ΤΗΝ ΩΡΑ ΤΟΥ FLIP — με τη σειρά

### 1. Πρώτα το Vercel, μετά το DNS
Στο Vercel → Project → Settings → **Domains** → πρόσθεσε:
- `physiodanali.gr` (apex)
- `www.physiodanali.gr` → **Redirect to** `physiodanali.gr`

*Το Vercel θα δώσει τις εγγραφές DNS. Πρόσθεσέ τες **πριν** αλλάξεις οτιδήποτε άλλο.*

### 2. DNS εγγραφές
| Τύπος | Όνομα | Τιμή |
|---|---|---|
| A | `@` | `76.76.21.21` *(ή ό,τι δώσει το Vercel)* |
| CNAME | `www` | `cname.vercel-dns.com` |

⚠️ **ΜΗΝ ΑΓΓΙΞΕΤΕ τα MX** — είναι το email του. Αλλάζουμε **μόνο** A και CNAME.

### 3. `SITE_URL` στο Vercel
```
SITE_URL = https://physiodanali.gr
```
*Χωρίς αυτό, τα links ακύρωσης στα emails ραντεβού δείχνουν σε `vercel.app`.*
Μετά: **redeploy**.

---

## 🔍 ΑΜΕΣΩΣ ΜΕΤΑ ΤΟ FLIP — 5 έλεγχοι

Τρέξε αυτά (ή πες μου να τα τρέξω):

```bash
# 1) Το domain σερβίρει το ΝΕΟ site
curl -sI https://physiodanali.gr | head -1          # → 200

# 2) ΔΕΝ έχει noindex (κρίσιμο!)
curl -sI https://physiodanali.gr | grep -i x-robots  # → ΚΕΝΟ

# 3) Canonical δείχνει στον εαυτό του
curl -s https://physiodanali.gr | grep -o 'rel="canonical"[^>]*'

# 4) www → apex
curl -sI https://www.physiodanali.gr | head -1       # → 301/308

# 5) Παλιά URLs ζωντανά
curl -sIL https://physiodanali.gr/el/index-gr.html | grep -E "HTTP|location"
```

**Αν το #2 δείξει noindex → σταμάτα και φώναξέ με.** Σημαίνει ότι το Vercel δεν αναγνώρισε το custom domain.

---

## 📈 ΜΕΤΑ ΤΟ FLIP — SEO ενέργειες

### Την ίδια μέρα
- [ ] **Google Search Console** → πρόσθεσε το `physiodanali.gr` (verify με DNS TXT — θα το κάνω εγώ)
- [ ] **Submit 2 sitemaps:** `sitemap.xml` **και** `sitemap-legacy.xml`
  *(Το δεύτερο είναι το κόλπο: λέει στο Google «ξαναδές αυτά τα 264 παλιά URLs» → βρίσκει τα 308 και μεταφέρει το equity **γρήγορα** αντί για εβδομάδες.)*
- [ ] **Google Business Profile** → άλλαξε το link σε `https://physiodanali.gr` *(ήδη εκεί δείχνει — απλώς επιβεβαίωσε)*

### Πρώτη εβδομάδα
- [ ] **GSC → Coverage/Pages**: παρακολούθησε για 404. Πρέπει να είναι **μηδέν**.
- [ ] **GSC → Performance**: κατέγραψε baseline θέσεων.
- [ ] Ο **παλιός WordPress μένει ζωντανός** — δίχτυ ασφαλείας.

### Εβδομάδες 2–4
- [ ] Έλεγχος ότι τα παλιά URLs έχουν αντικατασταθεί από τα νέα στα αποτελέσματα.
- [ ] **Μετά τις 4 εβδομάδες** μπορεί να κλείσει το παλιό hosting *(αλλά ΟΧΙ το DNS/email!)*.

---

## ⚠️ Τι θα δεις — και είναι ΦΥΣΙΟΛΟΓΙΚΟ

| Φαινόμενο | Εξήγηση |
|---|---|
| **Μικρή διακύμανση θέσεων** για 1-2 εβδομάδες | Το Google ξαναχαρτογραφεί. **Επανέρχεται.** |
| Τα παλιά URLs στα αποτελέσματα για λίγες μέρες | Ο index αργεί να ενημερωθεί — τα 308 δουλεύουν ήδη. |
| Πτώση impressions πρώτες μέρες | Αναμενόμενο σε κάθε migration. |

**Ανησυχούμε μόνο αν:** εμφανιστούν **404 στο GSC** ή η πτώση **συνεχίζεται μετά τις 4 εβδομάδες**.

---

## 🚨 Rollback (αν πάει κάτι στραβά)

Γυρνάς τα **A/CNAME** πίσω στο `31.22.114.153`. Το παλιό site επανέρχεται σε λεπτά.
*Γι' αυτό κρατάμε το παλιό hosting ζωντανό 4 εβδομάδες.*

---

## 🔑 Τι χρειάζομαι από σένα τη μέρα Χ

1. Πες μου **πότε** αλλάζει το DNS
2. Θα τρέξω τους **5 ελέγχους** αμέσως μετά
3. Θα στήσω **GSC + submit sitemaps** (θέλει ένα DNS TXT record)
4. Θα βάλω το **`SITE_URL`** και θα κάνω redeploy
