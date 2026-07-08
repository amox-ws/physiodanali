import type { Locale } from "@/lib/i18n";

// Local-SEO area landers (SEO migration P0 — docs/seo-migration-plan.md §4).
// STRICTLY the services & areas the site already offers — nothing carried
// over from the old site's retired offerings. Unique copy per area (no
// copy-paste with a swapped name), both locales.

export type AreaLander = {
  slug: string;
  service: "physio" | "chiro";
  bgImage: string;
  meta: { title: string; description: string };
  breadcrumb: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  lead: string;
  intro: string[];
  bulletsTitle: string;
  bullets: string[];
  faq: { question: string; answer: string }[];
};

const FAQ_PRICE_EL = {
  question: "Πόσο κοστίζει η συνεδρία;",
  answer:
    "Συνεδρία 30 λεπτών: 50€ — συνεδρία 60 λεπτών: 100€. Δεκτά μετρητά και κάρτα, χωρίς κρυφές χρεώσεις μετακίνησης.",
};
const FAQ_HOURS_EL = {
  question: "Ποιες ώρες γίνονται επισκέψεις;",
  answer:
    "Καθημερινά — και Σαββατοκύριακα — από τις 10:00 έως τις 22:00. Κλείνετε ώρα online στο /booking ή τηλεφωνικά στο +30 6944 344 342.",
};
const FAQ_PRICE_EN = {
  question: "How much does a session cost?",
  answer:
    "A 30-minute session is €50 and a 60-minute session is €100. Cash and card accepted — no travel surcharges.",
};
const FAQ_HOURS_EN = {
  question: "When are home visits available?",
  answer:
    "Every day — weekends included — from 10:00 to 22:00. Book online at /booking or call +30 6944 344 342.",
};

const el: Record<string, AreaLander> = {
  "physiotherapy-glyfada": {
    slug: "physiotherapy-glyfada",
    service: "physio",
    bgImage: "/physioathome.jpg",
    meta: {
      title: "Φυσικοθεραπεία κατ' οίκον στη Γλυφάδα — PhysioDanali",
      description:
        "Φυσικοθεραπεία στο σπίτι σας στη Γλυφάδα με πλήρη φορητό εξοπλισμό. Αποκατάσταση καταγμάτων, αρθροπλαστικής, νευρολογικών παθήσεων. Καθημερινά 10:00–22:00.",
    },
    breadcrumb: "Περιοχές · Γλυφάδα",
    eyebrow: "Γλυφάδα",
    title: "Φυσικοθεραπεία κατ' οίκον στη Γλυφάδα.",
    titleAccent: "στη Γλυφάδα.",
    lead: "Από το κέντρο της Γλυφάδας μέχρι την Άνω Γλυφάδα και το Γκολφ — η θεραπεία έρχεται στο σπίτι σας, με τον εξοπλισμό και την εξειδίκευση ενός σύγχρονου φυσικοθεραπευτηρίου.",
    intro: [
      "Η Γλυφάδα είναι από τις περιοχές που εξυπηρετούμε καθημερινά, με σύντομους χρόνους άφιξης σε όλες τις γειτονιές — κέντρο, Άνω Γλυφάδα, Γκολφ, Τερψιθέα, Αιξωνή. Κάθε επίσκεψη περιλαμβάνει ό,τι θα βρίσκατε σε ένα οργανωμένο φυσικοθεραπευτήριο: αξιολόγηση, θεραπεία με τα χέρια, ηλεκτροθεραπεία και καθοδηγούμενη άσκηση.",
      "Αναλαμβάνουμε αποκατάσταση μετά από κατάγματα και αρθροπλαστική, νευρολογική φυσικοθεραπεία, επανεκπαίδευση βάδισης, καθώς και χρόνιους μυοσκελετικούς πόνους — αυχένα, μέση, ισχίο — χωρίς να χρειαστεί να μετακινηθείτε.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η επίσκεψη στη Γλυφάδα",
    bullets: [
      "Αξιολόγηση και πλάνο θεραπείας στην πρώτη συνεδρία",
      "Πλήρης φορητός εξοπλισμός — ηλεκτροθεραπεία, βελονισμός ξηράς βελόνας όπου ενδείκνυται",
      "Αποκατάσταση καταγμάτων και αρθροπλαστικής",
      "Νευρολογική φυσικοθεραπεία και επανεκπαίδευση βάδισης",
      "Συνεργασία με τον θεράποντα ιατρό σας",
      "Ραντεβού αυθημερόν όταν υπάρχει διαθεσιμότητα",
    ],
    faq: [
      {
        question: "Πόσο γρήγορα μπορείτε να έρθετε στη Γλυφάδα;",
        answer:
          "Η Γλυφάδα είναι στον πυρήνα των περιοχών που καλύπτουμε — συνήθως υπάρχει διαθέσιμο ραντεβού την ίδια ή την επόμενη ημέρα, σε όλες τις γειτονιές.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
  "physiotherapy-voula": {
    slug: "physiotherapy-voula",
    service: "physio",
    bgImage: "/physioathome.jpg",
    meta: {
      title: "Φυσικοθεραπεία κατ' οίκον στη Βούλα — PhysioDanali",
      description:
        "Κατ' οίκον φυσικοθεραπεία στη Βούλα — η έδρα μας. Άμεση εξυπηρέτηση σε Άνω & Κάτω Βούλα και Πηγαδάκια, καθημερινά 10:00–22:00. Κλείστε online ραντεβού.",
    },
    breadcrumb: "Περιοχές · Βούλα",
    eyebrow: "Βούλα",
    title: "Φυσικοθεραπεία κατ' οίκον στη Βούλα.",
    titleAccent: "στη Βούλα.",
    lead: "Η Βούλα είναι η βάση μας — εδώ προσφέρουμε τους πιο άμεσους χρόνους εξυπηρέτησης, από τα Πηγαδάκια μέχρι την παραλία.",
    intro: [
      "Με έδρα τη Βούλα, οι επισκέψεις στην Άνω και Κάτω Βούλα, τα Πηγαδάκια και τη Δικηγορικά προγραμματίζονται με τη μεγαλύτερη ευελιξία — συχνά και αυθημερόν. Είναι η περιοχή όπου το «κατ' οίκον» γίνεται πραγματικά άμεσο.",
      "Η θεραπεία δεν είναι συμβιβασμός σε σχέση με το ιατρείο: φορητός εξοπλισμός ηλεκτροθεραπείας, τεχνικές manual therapy και εξατομικευμένο πρόγραμμα άσκησης, προσαρμοσμένα στον χώρο σας — από αποκατάσταση χειρουργείου μέχρι χρόνιο πόνο.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η επίσκεψη στη Βούλα",
    bullets: [
      "Η πιο άμεση διαθεσιμότητα από όλες τις περιοχές μας",
      "Αξιολόγηση, θεραπεία και πλάνο προόδου σε κάθε συνεδρία",
      "Μετεγχειρητική αποκατάσταση — αρθροπλαστική, κατάγματα",
      "Θεραπεία χρόνιων πόνων αυχένα, μέσης και ισχίου",
      "Ηλεκτροθεραπεία και θεραπευτική άσκηση στον χώρο σας",
      "Καθημερινή κάλυψη, και Σαββατοκύριακα",
    ],
    faq: [
      {
        question: "Καλύπτετε όλη τη Βούλα;",
        answer:
          "Ναι — Άνω Βούλα, Κάτω Βούλα, Πηγαδάκια, Δικηγορικά και τις όμορες γειτονιές. Ως έδρα μας, η Βούλα έχει τη μεγαλύτερη ευελιξία στο πρόγραμμα.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
  "physiotherapy-vari": {
    slug: "physiotherapy-vari",
    service: "physio",
    bgImage: "/physioathome.jpg",
    meta: {
      title: "Φυσικοθεραπεία κατ' οίκον στη Βάρη & Βάρκιζα — PhysioDanali",
      description:
        "Φυσικοθεραπεία στο σπίτι σας σε Βάρη, Βάρκιζα, Κόρμπι και Μηλαδέζα. Αποκατάσταση, νευρολογική φυσικοθεραπεία, θεραπεία πόνου. Καθημερινά 10:00–22:00.",
    },
    breadcrumb: "Περιοχές · Βάρη",
    eyebrow: "Βάρη — Βάρκιζα",
    title: "Φυσικοθεραπεία κατ' οίκον στη Βάρη.",
    titleAccent: "στη Βάρη.",
    lead: "Από το Κόρμπι και τη Μηλαδέζα μέχρι την παραλία της Βάρκιζας — πλήρης φυσικοθεραπεία στο σπίτι σας, χωρίς μετακινήσεις.",
    intro: [
      "Η Βάρη και η Βάρκιζα εξυπηρετούνται καθημερινά, με προγραμματισμένα ραντεβού σε Κόρμπι, Μηλαδέζα, Ασύρματο, Λαθούριζα και το παραλιακό μέτωπο. Για κατοίκους πιο απομακρυσμένων σημείων, το κατ' οίκον μοντέλο αφαιρεί τελείως το βάρος της μετακίνησης.",
      "Κάθε πρόγραμμα ξεκινά με αξιολόγηση και χτίζεται γύρω από τον στόχο σας: επιστροφή στη βάδιση μετά από χειρουργείο, ανακούφιση από χρόνιο πόνο, ή ασφαλής άσκηση για επανένταξη στη δραστηριότητα.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η επίσκεψη στη Βάρη",
    bullets: [
      "Κάλυψη σε Βάρη, Βάρκιζα, Κόρμπι, Μηλαδέζα",
      "Αποκατάσταση μετά από χειρουργείο ή κάταγμα",
      "Νευρολογική φυσικοθεραπεία στον χώρο σας",
      "Θεραπεία οσφυαλγίας, αυχεναλγίας, ισχιαλγίας",
      "Φορητός εξοπλισμός ηλεκτροθεραπείας",
      "Απογευματινά και βραδινά ραντεβού έως 22:00",
    ],
    faq: [
      {
        question: "Εξυπηρετείτε και τη Βάρκιζα;",
        answer:
          "Ναι — η Βάρκιζα, το Κόρμπι και η Μηλαδέζα καλύπτονται κανονικά, με τα ίδια ραντεβού και χωρίς επιπλέον χρέωση μετακίνησης.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
  "physiotherapy-vouliagmeni": {
    slug: "physiotherapy-vouliagmeni",
    service: "physio",
    bgImage: "/physioathome.jpg",
    meta: {
      title: "Φυσικοθεραπεία κατ' οίκον στη Βουλιαγμένη — PhysioDanali",
      description:
        "Διακριτική, εξατομικευμένη φυσικοθεραπεία στο σπίτι σας στη Βουλιαγμένη — Καβούρι, Λαιμός, κέντρο. Αποκατάσταση και θεραπεία πόνου, καθημερινά 10:00–22:00.",
    },
    breadcrumb: "Περιοχές · Βουλιαγμένη",
    eyebrow: "Βουλιαγμένη",
    title: "Φυσικοθεραπεία κατ' οίκον στη Βουλιαγμένη.",
    titleAccent: "στη Βουλιαγμένη.",
    lead: "Καβούρι, Λαιμός, κέντρο Βουλιαγμένης — premium φροντίδα αποκατάστασης στον δικό σας χώρο, με απόλυτη διακριτικότητα.",
    intro: [
      "Στη Βουλιαγμένη οι περισσότεροι ασθενείς μας ζητούν συνέπεια και ιδιωτικότητα: σταθερά ραντεβού στο σπίτι ή στη βίλα, χωρίς αίθουσες αναμονής. Καλύπτουμε Καβούρι, Λαιμό, Πανόραμα και το κέντρο, όλες τις ημέρες της εβδομάδας.",
      "Το θεραπευτικό φάσμα είναι πλήρες — μετεγχειρητική αποκατάσταση, θεραπεία σπονδυλικής στήλης, νευρολογικά περιστατικά και προγράμματα άσκησης — με τον ίδιο θεραπευτή σε κάθε συνεδρία, ώστε η πρόοδος να χτίζεται χωρίς ασυνέχειες.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η επίσκεψη στη Βουλιαγμένη",
    bullets: [
      "Σταθερός θεραπευτής σε όλη τη διάρκεια του προγράμματος",
      "Επισκέψεις σε σπίτι ή βίλα — Καβούρι, Λαιμός, κέντρο",
      "Μετεγχειρητική αποκατάσταση με πλάνο προόδου",
      "Θεραπεία πόνου σπονδυλικής στήλης",
      "Ευέλικτο ωράριο έως τις 22:00, και Σαββατοκύριακα",
      "Απόλυτη διακριτικότητα",
    ],
    faq: [
      {
        question: "Κάνετε επισκέψεις σε όλη τη Βουλιαγμένη;",
        answer:
          "Ναι — Καβούρι, Λαιμός, Πανόραμα και κέντρο Βουλιαγμένης, με προγραμματισμένα ή και έκτακτα ραντεβού ανάλογα με τη διαθεσιμότητα.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
  "chiropractic-glyfada": {
    slug: "chiropractic-glyfada",
    service: "chiro",
    bgImage: "/xiropraktik.jpg",
    meta: {
      title: "Χειροπρακτική κατ' οίκον στη Γλυφάδα — PhysioDanali",
      description:
        "Χειροπρακτική ανάταξη και manual therapy στο σπίτι σας στη Γλυφάδα, από αδειούχο φυσικοθεραπευτή. Άμεση ανακούφιση από αυχεναλγία και οσφυαλγία.",
    },
    breadcrumb: "Περιοχές · Γλυφάδα",
    eyebrow: "Χειροπρακτική · Γλυφάδα",
    title: "Χειροπρακτική κατ' οίκον στη Γλυφάδα.",
    titleAccent: "στη Γλυφάδα.",
    lead: "Χειροπρακτικές τεχνικές με ασφάλεια — από αδειούχο φυσικοθεραπευτή, στο σπίτι σας σε όλη τη Γλυφάδα.",
    intro: [
      "Η χειροπρακτική στο PhysioDanali γίνεται από αδειούχο φυσικοθεραπευτή με εξειδίκευση στη σπονδυλική στήλη — όχι απομονωμένο «κρακ», αλλά αξιολόγηση, ανάταξη όπου ενδείκνυται και θεραπευτική μάλαξη σε ένα ενιαίο πλάνο. Εξυπηρετούμε όλη τη Γλυφάδα: κέντρο, Άνω Γλυφάδα, Γκολφ, Τερψιθέα.",
      "Οι πιο συχνοί λόγοι επίσκεψης: αυχεναλγία με πονοκέφαλο, οσφυαλγία, αίσθημα «μπλοκαρίσματος», δυσκαμψία από καθιστική εργασία. Στις περισσότερες περιπτώσεις υπάρχει αισθητή βελτίωση από τις πρώτες συνεδρίες.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η χειροπρακτική επίσκεψη",
    bullets: [
      "Αξιολόγηση σπονδυλικής στήλης πριν από κάθε τεχνική",
      "Χειροπρακτική ανάταξη με ασφάλεια, όπου ενδείκνυται",
      "Θεραπευτική μάλαξη και manual therapy",
      "Οδηγίες στάσης και άσκησης για το γραφείο",
      "Επισκέψεις σε όλη τη Γλυφάδα",
      "Ραντεβού καθημερινά 10:00–22:00",
    ],
    faq: [
      {
        question: "Είναι ασφαλής η χειροπρακτική ανάταξη;",
        answer:
          "Όταν γίνεται από αδειούχο επαγγελματία υγείας μετά από αξιολόγηση — ναι. Κάθε συνεδρία ξεκινά με έλεγχο αντενδείξεων· αν η ανάταξη δεν ενδείκνυται, εφαρμόζονται εναλλακτικές τεχνικές manual therapy.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
  "chiropractic-vari": {
    slug: "chiropractic-vari",
    service: "chiro",
    bgImage: "/xiropraktik.jpg",
    meta: {
      title: "Χειροπρακτική κατ' οίκον σε Βάρη & Βάρκιζα — PhysioDanali",
      description:
        "Χειροπρακτική φροντίδα στο σπίτι σας σε Βάρη, Βάρκιζα και Κόρμπι — ανάταξη, manual therapy και θεραπευτική μάλαξη από αδειούχο φυσικοθεραπευτή.",
    },
    breadcrumb: "Περιοχές · Βάρη",
    eyebrow: "Χειροπρακτική · Βάρη",
    title: "Χειροπρακτική κατ' οίκον στη Βάρη.",
    titleAccent: "στη Βάρη.",
    lead: "Ανάταξη, manual therapy και θεραπευτική μάλαξη — στο σπίτι σας σε Βάρη, Βάρκιζα, Κόρμπι και Μηλαδέζα.",
    intro: [
      "Για τους κατοίκους της Βάρης και της Βάρκιζας, η κατ' οίκον χειροπρακτική σημαίνει θεραπεία σπονδυλικής στήλης χωρίς διαδρομές: ο θεραπευτής έρχεται με όλο τον απαραίτητο εξοπλισμό, αξιολογεί και εφαρμόζει το κατάλληλο πρωτόκολλο στον χώρο σας.",
      "Συχνά περιστατικά: οξεία οσφυαλγία που δυσκολεύει τη μετακίνηση, αυχενικός πόνος με περιορισμό κίνησης, χρόνια δυσκαμψία. Η προσέγγιση συνδυάζει χειροπρακτικές τεχνικές με θεραπευτική άσκηση για αποτέλεσμα που διαρκεί.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η χειροπρακτική επίσκεψη",
    bullets: [
      "Πλήρης αξιολόγηση πριν από κάθε τεχνική",
      "Ανάταξη και κινητοποίηση σπονδυλικής στήλης",
      "Θεραπευτική μάλαξη βαθέων ιστών",
      "Πρόγραμμα άσκησης για σταθερό αποτέλεσμα",
      "Κάλυψη σε Βάρη, Βάρκιζα, Κόρμπι, Μηλαδέζα",
      "Και Σαββατοκύριακα, 10:00–22:00",
    ],
    faq: [
      {
        question: "Μπορείτε να έρθετε άμεσα σε οξύ επεισόδιο;",
        answer:
          "Σε οξεία οσφυαλγία ή αυχεναλγία προσπαθούμε να δώσουμε ραντεβού αυθημερόν στη Βάρη και τη Βάρκιζα, ανάλογα με τη διαθεσιμότητα της ημέρας.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
  "chiropractic-vouliagmeni": {
    slug: "chiropractic-vouliagmeni",
    service: "chiro",
    bgImage: "/xiropraktik.jpg",
    meta: {
      title: "Χειροπρακτική κατ' οίκον στη Βουλιαγμένη — PhysioDanali",
      description:
        "Χειροπρακτική φροντίδα στο σπίτι ή στη βίλα σας στη Βουλιαγμένη — Καβούρι, Λαιμός, κέντρο. Διακριτικά, από αδειούχο φυσικοθεραπευτή.",
    },
    breadcrumb: "Περιοχές · Βουλιαγμένη",
    eyebrow: "Χειροπρακτική · Βουλιαγμένη",
    title: "Χειροπρακτική κατ' οίκον στη Βουλιαγμένη.",
    titleAccent: "στη Βουλιαγμένη.",
    lead: "Εξειδικευμένη φροντίδα σπονδυλικής στήλης στον δικό σας χώρο — Καβούρι, Λαιμός, κέντρο Βουλιαγμένης.",
    intro: [
      "Η κατ' οίκον χειροπρακτική στη Βουλιαγμένη απευθύνεται σε όσους θέλουν κορυφαία φροντίδα χωρίς μετακινήσεις και χωρίς αναμονή: αξιολόγηση, ανάταξη όπου ενδείκνυται, θεραπευτική μάλαξη και καθοδήγηση — όλα σε μία επίσκεψη στον χώρο σας.",
      "Εξυπηρετούμε Καβούρι, Λαιμό, Πανόραμα και το κέντρο, με ευέλικτα ραντεβού έως τις 22:00. Για σταθερά προγράμματα συντήρησης, κρατάμε τον ίδιο θεραπευτή και σταθερές ώρες.",
    ],
    bulletsTitle: "Τι περιλαμβάνει η χειροπρακτική επίσκεψη",
    bullets: [
      "Αξιολόγηση και ιστορικό πριν από κάθε τεχνική",
      "Χειροπρακτική ανάταξη με ασφάλεια",
      "Θεραπευτική μάλαξη και τεχνικές μαλακών μορίων",
      "Επισκέψεις σε σπίτι ή βίλα, με διακριτικότητα",
      "Καβούρι, Λαιμός, Πανόραμα, κέντρο",
      "Ευέλικτο ωράριο καθημερινά 10:00–22:00",
    ],
    faq: [
      {
        question: "Προσφέρετε σταθερό πρόγραμμα συντήρησης;",
        answer:
          "Ναι — για χρόνιες παθήσεις ή πρόληψη, κλείνουμε επαναλαμβανόμενα ραντεβού σε σταθερή ημέρα και ώρα με τον ίδιο θεραπευτή.",
      },
      FAQ_PRICE_EL,
      FAQ_HOURS_EL,
    ],
  },
};

const en: Record<string, AreaLander> = Object.fromEntries(
  Object.entries({
    "physiotherapy-glyfada": {
      meta: {
        title: "Home-Visit Physiotherapy in Glyfada — PhysioDanali",
        description:
          "Physiotherapy at your home in Glyfada with full portable equipment. Post-surgical rehab, neurological physiotherapy, pain treatment. Daily 10:00–22:00.",
      },
      breadcrumb: "Areas · Glyfada",
      eyebrow: "Glyfada",
      title: "Home-visit physiotherapy in Glyfada.",
      titleAccent: "in Glyfada.",
      lead: "From central Glyfada to Ano Glyfada and the Golf district — clinic-grade treatment delivered to your home.",
      intro: [
        "Glyfada is one of our core service areas, covered daily with short arrival times across every neighbourhood. Each visit brings what you would find in a well-equipped clinic: assessment, hands-on treatment, electrotherapy and guided exercise.",
        "We handle post-fracture and joint-replacement rehabilitation, neurological physiotherapy, gait retraining and chronic musculoskeletal pain — neck, lower back, hip — without you having to travel.",
      ],
      bulletsTitle: "What a visit in Glyfada includes",
      bullets: [
        "Assessment and treatment plan on the first session",
        "Full portable equipment, including electrotherapy",
        "Post-surgical and fracture rehabilitation",
        "Neurological physiotherapy and gait retraining",
        "Coordination with your treating physician",
        "Same-day appointments when available",
      ],
      faq: [
        {
          question: "How quickly can you visit in Glyfada?",
          answer:
            "Glyfada is at the heart of our coverage — a same-day or next-day appointment is usually available in every neighbourhood.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
    "physiotherapy-voula": {
      meta: {
        title: "Home-Visit Physiotherapy in Voula — PhysioDanali",
        description:
          "At-home physiotherapy in Voula — our home base. The fastest availability in Ano & Kato Voula and Pigadakia, daily 10:00–22:00. Book online.",
      },
      breadcrumb: "Areas · Voula",
      eyebrow: "Voula",
      title: "Home-visit physiotherapy in Voula.",
      titleAccent: "in Voula.",
      lead: "Voula is our home base — the fastest response times of all our areas, from Pigadakia to the seafront.",
      intro: [
        "Based in Voula, we schedule visits across Ano and Kato Voula and Pigadakia with maximum flexibility — often same-day. It is the area where home care is truly immediate.",
        "Treatment is no compromise versus a clinic: portable electrotherapy, manual therapy techniques and a personalised exercise programme, adapted to your space — from post-surgical rehab to chronic pain.",
      ],
      bulletsTitle: "What a visit in Voula includes",
      bullets: [
        "The fastest availability of all our areas",
        "Assessment, treatment and progress plan every session",
        "Post-surgical rehabilitation — joint replacement, fractures",
        "Chronic neck, back and hip pain treatment",
        "Electrotherapy and therapeutic exercise at home",
        "Daily coverage, weekends included",
      ],
      faq: [
        {
          question: "Do you cover all of Voula?",
          answer:
            "Yes — Ano Voula, Kato Voula, Pigadakia and the surrounding neighbourhoods. As our base, Voula gets the most flexible scheduling.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
    "physiotherapy-vari": {
      meta: {
        title: "Home-Visit Physiotherapy in Vari & Varkiza — PhysioDanali",
        description:
          "Physiotherapy at home in Vari, Varkiza, Korbi and Miladeza. Rehabilitation, neurological physiotherapy, pain treatment. Daily 10:00–22:00.",
      },
      breadcrumb: "Areas · Vari",
      eyebrow: "Vari — Varkiza",
      title: "Home-visit physiotherapy in Vari.",
      titleAccent: "in Vari.",
      lead: "From Korbi and Miladeza to the Varkiza seafront — complete physiotherapy at home, no travelling required.",
      intro: [
        "Vari and Varkiza are served daily, with scheduled visits in Korbi, Miladeza, Asyrmatos, Lathouriza and along the coast. For residents further out, the home-visit model removes the burden of travel entirely.",
        "Every programme starts with an assessment and is built around your goal: walking again after surgery, relief from chronic pain, or a safe return to activity.",
      ],
      bulletsTitle: "What a visit in Vari includes",
      bullets: [
        "Coverage across Vari, Varkiza, Korbi, Miladeza",
        "Post-surgical and post-fracture rehabilitation",
        "Neurological physiotherapy at home",
        "Low-back, neck and hip pain treatment",
        "Portable electrotherapy equipment",
        "Evening appointments until 22:00",
      ],
      faq: [
        {
          question: "Do you also serve Varkiza?",
          answer:
            "Yes — Varkiza, Korbi and Miladeza are covered normally, with the same appointments and no travel surcharge.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
    "physiotherapy-vouliagmeni": {
      meta: {
        title: "Home-Visit Physiotherapy in Vouliagmeni — PhysioDanali",
        description:
          "Discreet, personalised physiotherapy at your home in Vouliagmeni — Kavouri, Laimos, centre. Rehabilitation and pain care, daily 10:00–22:00.",
      },
      breadcrumb: "Areas · Vouliagmeni",
      eyebrow: "Vouliagmeni",
      title: "Home-visit physiotherapy in Vouliagmeni.",
      titleAccent: "in Vouliagmeni.",
      lead: "Kavouri, Laimos, central Vouliagmeni — premium rehabilitation care in your own space, with complete discretion.",
      intro: [
        "In Vouliagmeni most of our patients ask for consistency and privacy: fixed appointments at home or at the villa, no waiting rooms. We cover Kavouri, Laimos, Panorama and the centre, every day of the week.",
        "The treatment range is complete — post-surgical rehabilitation, spinal care, neurological cases and exercise programmes — with the same therapist at every session so progress builds without interruptions.",
      ],
      bulletsTitle: "What a visit in Vouliagmeni includes",
      bullets: [
        "The same therapist throughout your programme",
        "Home or villa visits — Kavouri, Laimos, centre",
        "Post-surgical rehabilitation with a progress plan",
        "Spinal pain treatment",
        "Flexible hours until 22:00, weekends included",
        "Complete discretion",
      ],
      faq: [
        {
          question: "Do you visit all of Vouliagmeni?",
          answer:
            "Yes — Kavouri, Laimos, Panorama and central Vouliagmeni, with scheduled or urgent visits depending on availability.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
    "chiropractic-glyfada": {
      meta: {
        title: "At-Home Chiropractic Care in Glyfada — PhysioDanali",
        description:
          "Chiropractic adjustment and manual therapy at your home in Glyfada, by a licensed physiotherapist. Fast relief from neck and lower-back pain.",
      },
      breadcrumb: "Areas · Glyfada",
      eyebrow: "Chiropractic · Glyfada",
      title: "At-home chiropractic care in Glyfada.",
      titleAccent: "in Glyfada.",
      lead: "Safe chiropractic techniques — delivered by a licensed physiotherapist, at your home anywhere in Glyfada.",
      intro: [
        "Chiropractic care at PhysioDanali is performed by a licensed physiotherapist specialised in the spine — not an isolated “crack”, but assessment, adjustment where indicated and therapeutic massage in one coherent plan. We serve all of Glyfada.",
        "The most frequent reasons for a visit: neck pain with headache, low-back pain, a “locked” feeling, stiffness from desk work. Most patients feel clear improvement within the first sessions.",
      ],
      bulletsTitle: "What a chiropractic visit includes",
      bullets: [
        "Spinal assessment before any technique",
        "Safe chiropractic adjustment, where indicated",
        "Therapeutic massage and manual therapy",
        "Posture and exercise guidance for desk workers",
        "Visits across all of Glyfada",
        "Appointments daily 10:00–22:00",
      ],
      faq: [
        {
          question: "Is chiropractic adjustment safe?",
          answer:
            "Performed by a licensed health professional after assessment — yes. Every session starts with a contraindication check; if adjustment is not indicated, alternative manual-therapy techniques are used.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
    "chiropractic-vari": {
      meta: {
        title: "At-Home Chiropractic Care in Vari & Varkiza — PhysioDanali",
        description:
          "Chiropractic care at your home in Vari, Varkiza and Korbi — adjustment, manual therapy and therapeutic massage by a licensed physiotherapist.",
      },
      breadcrumb: "Areas · Vari",
      eyebrow: "Chiropractic · Vari",
      title: "At-home chiropractic care in Vari.",
      titleAccent: "in Vari.",
      lead: "Adjustment, manual therapy and therapeutic massage — at your home in Vari, Varkiza, Korbi and Miladeza.",
      intro: [
        "For residents of Vari and Varkiza, at-home chiropractic means spinal care without the drive: the therapist arrives with all necessary equipment, assesses, and applies the right protocol in your own space.",
        "Common cases: acute low-back pain that makes travelling difficult, neck pain with restricted movement, chronic stiffness. The approach combines chiropractic techniques with therapeutic exercise for lasting results.",
      ],
      bulletsTitle: "What a chiropractic visit includes",
      bullets: [
        "Full assessment before any technique",
        "Spinal adjustment and mobilisation",
        "Deep-tissue therapeutic massage",
        "Exercise programme for lasting results",
        "Coverage in Vari, Varkiza, Korbi, Miladeza",
        "Weekends too, 10:00–22:00",
      ],
      faq: [
        {
          question: "Can you come urgently for an acute episode?",
          answer:
            "For acute low-back or neck pain we aim for a same-day appointment in Vari and Varkiza, subject to the day's availability.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
    "chiropractic-vouliagmeni": {
      meta: {
        title: "At-Home Chiropractic Care in Vouliagmeni — PhysioDanali",
        description:
          "Chiropractic care at your home or villa in Vouliagmeni — Kavouri, Laimos, centre. Discreet, by a licensed physiotherapist.",
      },
      breadcrumb: "Areas · Vouliagmeni",
      eyebrow: "Chiropractic · Vouliagmeni",
      title: "At-home chiropractic care in Vouliagmeni.",
      titleAccent: "in Vouliagmeni.",
      lead: "Specialised spinal care in your own space — Kavouri, Laimos, central Vouliagmeni.",
      intro: [
        "At-home chiropractic in Vouliagmeni is for those who want first-class care without travel or waiting: assessment, adjustment where indicated, therapeutic massage and guidance — all in one visit, in your space.",
        "We serve Kavouri, Laimos, Panorama and the centre with flexible appointments until 22:00. For ongoing maintenance programmes we keep the same therapist and fixed times.",
      ],
      bulletsTitle: "What a chiropractic visit includes",
      bullets: [
        "Assessment and history before any technique",
        "Safe chiropractic adjustment",
        "Therapeutic and soft-tissue massage",
        "Home or villa visits, with discretion",
        "Kavouri, Laimos, Panorama, centre",
        "Flexible hours daily 10:00–22:00",
      ],
      faq: [
        {
          question: "Do you offer a standing maintenance programme?",
          answer:
            "Yes — for chronic conditions or prevention we book recurring appointments on a fixed day and time with the same therapist.",
        },
        FAQ_PRICE_EN,
        FAQ_HOURS_EN,
      ],
    },
  }).map(([slug, v]) => [
    slug,
    { ...el[slug], ...v, slug } as AreaLander,
  ]),
);

export const areaLanderSlugs = Object.keys(el);

export function getAreaLander(locale: Locale, slug: string): AreaLander {
  return (locale === "en" ? en : el)[slug];
}

// Compact link list for internal linking (footer "Περιοχές" row).
export const areaLinks = areaLanderSlugs.map((slug) => ({
  href: `/${slug}`,
  el: el[slug].eyebrow,
  en: en[slug].eyebrow,
}));
