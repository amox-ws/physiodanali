import { localeHref, type Locale } from "@/lib/i18n";
import type { NavItem } from "@/lib/content";

// ─────────────────────────────────────────────────────────────────────
// UI / chrome strings (header, footer, shared CTAs, common labels).
// Page-body content is translated separately via the content layer.
// ─────────────────────────────────────────────────────────────────────

const STRINGS = {
  el: {
    book: "Κλείστε ραντεβού",
    callNow: "Καλέστε τώρα",
    contactForm: "Φόρμα επικοινωνίας",
    openMenu: "Άνοιγμα μενού",
    closeMenu: "Κλείσιμο μενού",
    openSubmenu: "Άνοιγμα υπομενού",
    homeAria: "PhysioDanali — Αρχική",
    langLabel: "Γλώσσα",
    // Footer
    footerLine1: "Ο πόνος δεν περιμένει.",
    footerLine2: "Ούτε εμείς.",
    footerTagline:
      "Φυσικοθεραπεία και χειροπρακτική κατ' οίκον σε Βούλα, Βουλιαγμένη, Βάρη και Γλυφάδα.",
    colNavigation: "Πλοήγηση",
    colContact: "Επικοινωνία",
    colSocial: "Social",
    // Site facts that contain words
    hoursShort: "Καθημερινά 10:00 — 22:00 · Σ/Κ & αργίες",
    address: "Αγίου Νεκταρίου 58, 16562, Γλυφάδα",
    // Article cards
    readArticle: "Διαβάστε το άρθρο",
    allArticles: "Όλα τα άρθρα",
    // Home hero headline (hardcoded in the Hero component)
    heroTitle1: "Χειροπρακτική και Φυσικοθεραπεία",
    heroTitleAccent: "κατ' οίκον",
    heroTitle2: "στη Βούλα και τη Γλυφάδα.",
    submitting: "Αποστολή...",
    // Shared section labels (hardcoded in templates/pages)
    faqTitle: "Ό,τι σας ενδιαφέρει.",
    faqHeading: "Συχνές ερωτήσεις",
    condSymptomsIntro:
      "Αναγνωρίστε αν τα συμπτώματά σας ταιριάζουν — η πρώιμη παρέμβαση φέρνει ταχύτερη ανακούφιση.",
    condFaqIntro:
      "Αν η ερώτησή σας δεν απαντιέται εδώ, καλέστε ή στείλτε μήνυμα — απαντάμε σύντομα.",
    condCtaTitle: "Ραντεβού αξιολόγησης. Άμεσα.",
    condCtaAccent: "Άμεσα.",
    condCtaLead:
      "Ραντεβού αυθημερόν εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα, Άλιμο.",
    // Article detail page
    authorName: "Κωνσταντίνος Δανάλης",
    keepReading: "Συνεχίστε την ανάγνωση.",
    articleCtaText:
      "Κλείστε αξιολόγηση και βρείτε την προσέγγιση που ταιριάζει στη δική σας περίπτωση.",
    articleFinalTitle: "Έτοιμοι όταν είστε.",
    articleFinalAccent: "Έτοιμοι",
    articleFinalLead:
      "Από αξιολόγηση μέχρι ολοκληρωμένο πρόγραμμα αποκατάστασης — στο σπίτι σας ή στο ιατρείο.",
    articleMetaFallback: "Άρθρο",
    // Practitioner card / FinalCTA / RelatedServices (shared primitives)
    practitionerName: "Κωνσταντίνος Δανάλης, PT, OMT",
    practitionerRole: "Φυσικοθεραπευτής · Χειροπρακτικός",
    practitionerAlt: "Κωνσταντίνος Δανάλης, Φυσικοθεραπευτής - Χειροπρακτικός",
    practitionerBio:
      "Αδειούχος Φυσικοθεραπευτής, μέλος του Πανελλήνιου Συλλόγου Φυσικοθεραπευτών και απόφοιτος του Πανεπιστημίου Δυτικής Αττικής. Συνδυαστική χρήση χειροπρακτικής, νευροδυναμικής και θεραπευτικής άσκησης σε βιβλιογραφικά τεκμηριωμένα πρωτόκολλα.",
    finalCtaTitle: "Έτοιμοι όταν είστε.",
    finalCtaAccent: "Έτοιμοι",
    finalCtaLead:
      "Επικοινωνήστε σήμερα — ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει διαθεσιμότητα.",
    relatedHeading: "Συνεχίστε",
    relatedTitle: "Δείτε επίσης.",
    relatedIntro: "Οι υπόλοιπες υπηρεσίες — όλες με τον ίδιο φυσικοθεραπευτή.",
    // BookingBand (home) + ArticleGrid + contact extras
    bookingTitle: "Κλείστε ραντεβού.",
    bookingAccent: "Άμεσα.",
    bookingLead:
      "Επικοινωνήστε μέσω τηλεφώνου ή WhatsApp. Απαντάμε τις ίδιες μέρες — και ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει διαθεσιμότητα.",
    latestTitle1: "Οι ",
    latestTitleAccent: "τελευταίες δημοσιεύσεις",
    latestTitle2: " στο blog.",
    latestIntro:
      "Επιστημονικά τεκμηριωμένη ενημέρωση από τον Κωνσταντίνο Δανάλη — γραμμένη σε απλά ελληνικά, για ασθενείς που θέλουν να καταλάβουν τι συμβαίνει στο σώμα τους.",
    latestSeeAll: "Δείτε όλα τα άρθρα",
    // Services default header (home)
    servicesTitle1: "Άμεση εξυπηρέτηση επειγόντων.",
    servicesTitleAccent: "Ερευνητικά τεκμηριωμένες παρεμβάσεις.",
    // Why-us
    whyHeading: "Γιατί",
    whyBioLink: "Πλήρες βιογραφικό",
    // Bio (home)
    bioAlt: "Κωνσταντίνος Δανάλης, Φυσικοθεραπευτής - Χειροπρακτικός",
    bioCred1Abbr: "ΠΣΦ",
    bioCred1Label: "Μέλος Συλλόγου",
    bioCred2Abbr: "ΠΑΔΑ",
    bioCred2Label: "Απόφοιτος",
    bioSpecialties: "Εξειδικεύσεις",
    bioFullCv: "Πλήρες βιογραφικό",
    // Testimonials
    testimonialsTitle1: "Τι λένε ",
    testimonialsAccent: "οι ασθενείς μας",
    testimonialsRole: "Ασθενής",
    testimonialsPrev: "Προηγούμενη μαρτυρία",
    testimonialsNext: "Επόμενη μαρτυρία",
    // Contact form
    cfSubjectPrefix: "Ραντεβού — ",
    cfBodyName: "Όνομα",
    cfBodyPhone: "Τηλέφωνο",
    cfSuccessTitle: "Ευχαριστούμε για την επικοινωνία.",
    cfSuccessBody1: "Λάβαμε το μήνυμά σας και θα απαντήσουμε σύντομα — για άμεσο ραντεβού καλέστε",
    cfError: "Κάτι πήγε στραβά με την αποστολή. Δοκιμάστε ξανά ή καλέστε μας στο",
    cfCaptcha: "Ολοκληρώστε τον έλεγχο ασφαλείας και δοκιμάστε ξανά.",
    cfPlaceholderName: "Το όνομά σας",
    cfPlaceholderMessage: "Περιγράψτε σύντομα την κατάστασή σας.",
    cfConsent1: "Έχω διαβάσει και αποδέχομαι την",
    cfPrivacy: "Πολιτική Απορρήτου",
    cfConsent2: "και συναινώ στην επεξεργασία των στοιχείων μου για την απάντηση στο αίτημά μου.",
    cfFootnote: "Απαντάμε σύντομα. Δωρεάν αξιολόγηση μέσω τηλεφώνου.",
    scrollTop: "Επιστροφή στην κορυφή",
    // About page
    aboutPractitionerName: "Κωνσταντίνος Δανάλης, PT, OMT",
    aboutPractitionerRole: "Φυσικοθεραπευτής · Χειροπρακτικός",
    aboutPortraitAlt:
      "Κωνσταντίνος Δανάλης, Φυσικοθεραπευτής - Χειροπρακτικός",
    aboutEducationLabel: "Εκπαίδευση",
    aboutSpecialtiesLabel: "Εξειδικεύσεις",
    aboutMembershipsLabel: "Συμμετοχές",
    aboutTestimonialsTitle1: "Τι λένε ",
    aboutTestimonialsTitleAccent: "οι ασθενείς",
    aboutCtaTitle: "Έτοιμοι για το επόμενο βήμα.",
    aboutCtaLead:
      "Κλείστε αξιολόγηση ή ραντεβού — αυθημερόν εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα και Άλιμο.",
    aboutCtaForm: "Φόρμα επικοινωνίας",
    // Contact page
    contactCallNow: "Καλέστε τώρα",
    contactWhatsApp: "Στείλτε WhatsApp",
    contactRowPhone: "Τηλέφωνο",
    contactRowEmail: "Email",
    contactRowWhatsApp: "WhatsApp",
    contactRowWhatsAppValue: "Στείλτε μήνυμα",
    contactRowAddress: "Διεύθυνση",
    contactHoursLabel: "Ωράριο",
    contactOnlinePayment: "Κάντε online πληρωμή",
    // Therapies page
    therapiesConditionsTitle: "Παθήσεις & καταστάσεις",
    therapiesConditionsIntro:
      "Εξατομικευμένο πρωτόκολλο αποκατάστασης για κάθε περιστατικό — με τον ίδιο φυσικοθεραπευτή σε κάθε συνεδρία.",
    therapiesAllServices1: "Όλες οι ",
    therapiesAllServicesAccent: "υπηρεσίες",
    therapiesCtaTitle: "Δεν είστε σίγουρος ποια ταιριάζει;",
    therapiesCtaAccent: "ποια",
    therapiesCtaLead:
      "Καλέστε για μια σύντομη τηλεφωνική αξιολόγηση — θα σας προτείνουμε την κατάλληλη θεραπεία πριν καν κλείσετε ραντεβού.",
    // Lymphatic page
    lymphaticBenefitsIntro:
      "Εξατομικευμένο πρόγραμμα παροχέτευσης ανάλογα με την επέμβαση ή την κατάστασή σας.",
    lymphaticWhyIntro:
      "Πιο δυναμική και πιο αποτελεσματική από την κλασική ευρωπαϊκή λεμφική παροχέτευση — ειδικά μετά από αισθητικές επεμβάσεις.",
    lymphaticCtaTitle: "Έτοιμοι για ταχύτερη αποκατάσταση;",
    lymphaticCtaAccent: "ταχύτερη αποκατάσταση;",
    lymphaticCtaLead:
      "Άμεση εκτίμηση του περιστατικού σας. Ραντεβού ίδια μέρα — διακριτικά στο σπίτι σας.",
    // Clinical Pilates page
    clinicalPilatesCtaTitle: "Ξεκινήστε σήμερα. Στο σπίτι σας.",
    clinicalPilatesCtaAccent: "Στο σπίτι σας.",
    clinicalPilatesCtaLead:
      "Άμεση κράτηση. Ραντεβού ίδια μέρα, εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα και Άλιμο.",
    // Home-care page
    homeCareHeroTitle1: "Φυσικοθεραπεία & αποκατάσταση ",
    homeCareHeroTitleAccent: "κατ' οίκον",
    homeCareHeroTitle2: " στη Βούλα",
    homeCareHeroLeadSuffix:
      " Πλήρης φορητός εξοπλισμός — η ίδια ποιότητα κλινικής, στο σπίτι σας.",
    homeCareHeroForm: "Φόρμα επικοινωνίας",
    homeCareMethodsIntro:
      "Όλος ο εξοπλισμός που χρειάζεται μια ολοκληρωμένη συνεδρία — έρχεται σε σας.",
    // Chiropractic page
    chiropracticConditionsIntro:
      "Οι πιο συχνές περιπτώσεις που αντιμετωπίζει η χειροπρακτική παρέμβαση — με συνδυαστική προσέγγιση και έμφαση στη διαρκή αποκατάσταση.",
    chiropracticIndicationsIntro:
      "Αν αναγνωρίζετε κάποια από τις παρακάτω καταστάσεις, η χειροπρακτική κατ' οίκον είναι κατάλληλη επιλογή.",
    chiropracticMethodIntro:
      "Τέσσερα βήματα — από την επιστημονική αξιολόγηση μέχρι το πρόγραμμα συντήρησης στο σπίτι.",
    chiropracticConditionPagesTitle: "Σελίδες ανά πάθηση.",
    chiropracticCondNeck: "Αυχεναλγία",
    chiropracticCondLowBack: "Οσφυαλγία",
    chiropracticCondHip: "Ισχιαλγία",
    chiropracticCtaTitle: "Η ανακούφιση ξεκινά εδώ.",
    chiropracticCtaAccent: "ανακούφιση",
    chiropracticCtaLead:
      "Ραντεβού δίνονται έως αυθημερόν, εφόσον υπάρχει διαθεσιμότητα. Καλύπτουμε Βούλα, Βουλιαγμένη, Βάρη, Γλυφάδα, Άλιμο.",
    // Process component (home page)
    processEyebrow: "ΔΙΑΔΙΚΑΣΙΑ",
    processTitle1: "Πώς ",
    processTitleAccent: "λειτουργεί.",
    processIntro:
      "Από το πρώτο τηλέφωνο μέχρι την ανακούφισή σας, σε 4 απλά βήματα.",
    processStep1Title: "Άμεση εκτίμηση",
    processStep1Desc:
      "Καλέστε ή στείλτε WhatsApp. Συζητάμε το περιστατικό σας με τον φυσικοθεραπευτή.",
    processStep2Title: "Ραντεβού στο σπίτι σας",
    processStep2Desc:
      "Σας επισκεπτόμαστε με όλο τον φορητό εξοπλισμό. Ίδια ή επόμενη μέρα.",
    processStep3Title: "Εξατομικευμένο πλάνο",
    processStep3Desc:
      "Συνδυασμός manual therapy, μηχανημάτων και ασκήσεων προσαρμοσμένων σε εσάς.",
    processStep4Title: "Επιστροφή στη ζωή σας",
    processStep4Desc:
      "Παρακολούθηση προόδου, σταδιακή αυτονομία και πρόληψη υποτροπής.",
  },
  en: {
    book: "Book appointment",
    callNow: "Call now",
    contactForm: "Contact form",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openSubmenu: "Open submenu",
    homeAria: "PhysioDanali — Home",
    langLabel: "Language",
    // Footer
    footerLine1: "Pain doesn't wait.",
    footerLine2: "Neither do we.",
    footerTagline:
      "Physiotherapy and chiropractic at home in Voula, Vouliagmeni, Vari and Glyfada.",
    colNavigation: "Navigation",
    colContact: "Contact",
    colSocial: "Social",
    // Site facts that contain words
    hoursShort: "Daily 10:00 — 22:00 · Weekends & holidays",
    address: "58 Agiou Nektariou St., 16562, Glyfada",
    // Article cards
    readArticle: "Read article",
    allArticles: "All articles",
    // Home hero headline (hardcoded in the Hero component)
    heroTitle1: "Chiropractic & Physiotherapy",
    heroTitleAccent: "at home",
    heroTitle2: "in Voula and Glyfada.",
    submitting: "Submitting...",
    // Shared section labels (hardcoded in templates/pages)
    faqTitle: "Everything you want to know.",
    faqHeading: "Frequently asked questions",
    condSymptomsIntro:
      "See whether your symptoms match — early intervention brings faster relief.",
    condFaqIntro:
      "If your question isn't answered here, call or send a message — we reply soon.",
    condCtaTitle: "Assessment appointment. Right away.",
    condCtaAccent: "Right away.",
    condCtaLead:
      "Same-day appointments subject to availability. We cover Voula, Vouliagmeni, Vari, Glyfada, Alimos.",
    // Article detail page
    authorName: "Konstantinos Danalis",
    keepReading: "Keep reading.",
    articleCtaText:
      "Book an assessment and find the approach that fits your case.",
    articleFinalTitle: "Ready when you are.",
    articleFinalAccent: "Ready",
    articleFinalLead:
      "From assessment to a complete rehabilitation programme — at home or at the practice.",
    articleMetaFallback: "Article",
    // Practitioner card / FinalCTA / RelatedServices (shared primitives)
    practitionerName: "Konstantinos Danalis, PT, OMT",
    practitionerRole: "Physiotherapist · Chiropractor",
    practitionerAlt: "Konstantinos Danalis, Physiotherapist - Chiropractor",
    practitionerBio:
      "Licensed physiotherapist, member of the Panhellenic Association of Physiotherapists and a graduate of the University of West Attica. Combines chiropractic, neurodynamics and therapeutic exercise within evidence-based protocols.",
    finalCtaTitle: "Ready when you are.",
    finalCtaAccent: "Ready",
    finalCtaLead:
      "Get in touch today — same-day appointments subject to availability.",
    relatedHeading: "Continue",
    relatedTitle: "See also.",
    relatedIntro: "The rest of our services — all with the same physiotherapist.",
    // BookingBand (home) + ArticleGrid + contact extras
    bookingTitle: "Book your appointment.",
    bookingAccent: "Right away.",
    bookingLead:
      "Reach us by phone or WhatsApp. We reply the same day — and appointments are available even same-day, subject to availability.",
    latestTitle1: "The ",
    latestTitleAccent: "latest posts",
    latestTitle2: " on the blog.",
    latestIntro:
      "Evidence-based information from Konstantinos Danalis — written in plain language, for patients who want to understand what is happening in their body.",
    latestSeeAll: "See all articles",
    // Services default header (home)
    servicesTitle1: "Immediate care for urgent cases.",
    servicesTitleAccent: "Evidence-based interventions.",
    // Why-us
    whyHeading: "Why",
    whyBioLink: "Full CV",
    // Bio (home)
    bioAlt: "Konstantinos Danalis, Physiotherapist - Chiropractor",
    bioCred1Abbr: "PAP",
    bioCred1Label: "Association member",
    bioCred2Abbr: "UNIWA",
    bioCred2Label: "Graduate",
    bioSpecialties: "Specialisations",
    bioFullCv: "Full CV",
    // Testimonials
    testimonialsTitle1: "What ",
    testimonialsAccent: "our patients say",
    testimonialsRole: "Patient",
    testimonialsPrev: "Previous testimonial",
    testimonialsNext: "Next testimonial",
    // Contact form
    cfSubjectPrefix: "Appointment — ",
    cfBodyName: "Name",
    cfBodyPhone: "Phone",
    cfSuccessTitle: "Thank you for reaching out.",
    cfSuccessBody1: "We received your message and will reply soon — for an immediate appointment call",
    cfError: "Something went wrong sending your message. Please try again or call us at",
    cfCaptcha: "Please complete the security check and try again.",
    cfPlaceholderName: "Your name",
    cfPlaceholderMessage: "Briefly describe your condition.",
    cfConsent1: "I have read and accept the",
    cfPrivacy: "Privacy Policy",
    cfConsent2: "and consent to the processing of my details in order to respond to my request.",
    cfFootnote: "We reply soon. Free phone assessment.",
    scrollTop: "Back to top",
    // About page
    aboutPractitionerName: "Konstantinos Danalis, PT, OMT",
    aboutPractitionerRole: "Physiotherapist · Chiropractor",
    aboutPortraitAlt: "Konstantinos Danalis, Physiotherapist - Chiropractor",
    aboutEducationLabel: "Education",
    aboutSpecialtiesLabel: "Specialties",
    aboutMembershipsLabel: "Memberships",
    aboutTestimonialsTitle1: "What ",
    aboutTestimonialsTitleAccent: "patients say",
    aboutCtaTitle: "Ready for the next step.",
    aboutCtaLead:
      "Book an assessment or appointment — same-day subject to availability. We cover Voula, Vouliagmeni, Vari, Glyfada and Alimos.",
    aboutCtaForm: "Contact form",
    // Contact page
    contactCallNow: "Call now",
    contactWhatsApp: "Send a WhatsApp",
    contactRowPhone: "Phone",
    contactRowEmail: "Email",
    contactRowWhatsApp: "WhatsApp",
    contactRowWhatsAppValue: "Send a message",
    contactRowAddress: "Address",
    contactHoursLabel: "Hours",
    contactOnlinePayment: "Make an online payment",
    // Therapies page
    therapiesConditionsTitle: "Conditions & cases",
    therapiesConditionsIntro:
      "A personalised rehabilitation protocol for every case — with the same physiotherapist at every session.",
    therapiesAllServices1: "All ",
    therapiesAllServicesAccent: "services",
    therapiesCtaTitle: "Not sure which one fits?",
    therapiesCtaAccent: "which",
    therapiesCtaLead:
      "Call for a short phone assessment — we'll recommend the right treatment before you even book an appointment.",
    // Lymphatic page
    lymphaticBenefitsIntro:
      "A drainage programme tailored to your procedure or condition.",
    lymphaticWhyIntro:
      "More dynamic and more effective than classic European lymphatic drainage — especially after cosmetic surgery.",
    lymphaticCtaTitle: "Ready for a faster recovery?",
    lymphaticCtaAccent: "faster recovery?",
    lymphaticCtaLead:
      "Immediate assessment of your case. Same-day appointment — discreetly, at your home.",
    // Clinical Pilates page
    clinicalPilatesCtaTitle: "Start today. In your own home.",
    clinicalPilatesCtaAccent: "In your own home.",
    clinicalPilatesCtaLead:
      "Book instantly. Same-day appointments subject to availability. We cover Voula, Vouliagmeni, Vari, Glyfada and Alimos.",
    // Home-care page
    homeCareHeroTitle1: "Physiotherapy & rehabilitation ",
    homeCareHeroTitleAccent: "at home",
    homeCareHeroTitle2: " in Voula",
    homeCareHeroLeadSuffix:
      " Full portable equipment — the same clinical quality, in your home.",
    homeCareHeroForm: "Contact form",
    homeCareMethodsIntro:
      "All the equipment a complete session needs — it comes to you.",
    // Chiropractic page
    chiropracticConditionsIntro:
      "The most common cases that chiropractic treatment addresses — with a combined approach and a focus on lasting recovery.",
    chiropracticIndicationsIntro:
      "If you recognise any of the conditions below, at-home chiropractic is a suitable choice.",
    chiropracticMethodIntro:
      "Four steps — from a scientific assessment to a maintenance programme at home.",
    chiropracticConditionPagesTitle: "Pages by condition.",
    chiropracticCondNeck: "Neck pain",
    chiropracticCondLowBack: "Low back pain",
    chiropracticCondHip: "Hip pain",
    chiropracticCtaTitle: "Relief starts here.",
    chiropracticCtaAccent: "Relief",
    chiropracticCtaLead:
      "Appointments available up to the same day, subject to availability. We cover Voula, Vouliagmeni, Vari, Glyfada, Alimos.",
    // Process component (home page)
    processEyebrow: "PROCESS",
    processTitle1: "How ",
    processTitleAccent: "it works.",
    processIntro:
      "From the first phone call to your relief, in 4 simple steps.",
    processStep1Title: "Immediate assessment",
    processStep1Desc:
      "Call or send a WhatsApp. We discuss your case with the physiotherapist.",
    processStep2Title: "Appointment at your home",
    processStep2Desc:
      "We visit you with all the portable equipment. Same or next day.",
    processStep3Title: "Personalised plan",
    processStep3Desc:
      "A combination of manual therapy, machines and exercises tailored to you.",
    processStep4Title: "Back to your life",
    processStep4Desc:
      "Progress tracking, gradual independence and relapse prevention.",
  },
} as const;

// Booking page + form strings — kept outside the `as const` STRINGS so
// values widen to string/string[] and el/en share one shape (tBooking).
const BOOKING = {
  el: {
      metaTitle: "Κλείστε ραντεβού",
      metaDesc:
        "Κλείστε online ραντεβού για φυσικοθεραπεία & χειροπρακτική κατ' οίκον σε Γλυφάδα, Βούλα, Βουλιαγμένη, Βάρη, Άλιμο. Επιλέξτε υπηρεσία, περιοχή και ώρα.",
      crumb: "Ραντεβού",
      eyebrow: "Online κράτηση",
      title: "Κλείστε ραντεβού.",
      titleAccent: "ραντεβού",
      lead: "Επιλέξτε υπηρεσία, περιοχή και ώρα — έρχομαι σπίτι σας σε Γλυφάδα, Βούλα, Βουλιαγμένη, Βάρη και Άλιμο. Το ραντεβού επιβεβαιώνεται από εμένα.",
      callNow: "Καλέστε τώρα",
      whatsapp: "Στείλτε WhatsApp",
      areas: ["Γλυφάδα", "Βούλα", "Βουλιαγμένη", "Βάρη", "Άλιμο"],
      svc: "Υπηρεσία",
      duration: "Διάρκεια & κόστος",
      cashCard: "Δεκτά μετρητά & κάρτα.",
      area: "Περιοχή",
      dateTime: "Ημέρα & ώρα",
      pickAll: "Διαλέξτε υπηρεσία, περιοχή και ημέρα για να δείτε ώρες.",
      loading: "Φόρτωση διαθέσιμων ωρών…",
      noSlots: "Δεν υπάρχουν διαθέσιμες ώρες αυτή την ημέρα. Δοκιμάστε άλλη.",
      details: "Τα στοιχεία σας",
      name: "Ονοματεπώνυμο*",
      phone: "Τηλέφωνο*",
      email: "Email (για επιβεβαίωση)",
      address: "Διεύθυνση (για το κατ' οίκον)",
      notes: "Σύντομη περιγραφή του προβλήματος",
      consentPre:
        "Αποδέχομαι την επεξεργασία των στοιχείων μου για το ραντεβού, σύμφωνα με την ",
      consentLink: "Πολιτική Απορρήτου",
      consentPost: ".",
      submit: "Αίτημα ραντεβού",
      submitting: "Αποστολή…",
      confirmNote:
        "Το ραντεβού επιβεβαιώνεται από τον φυσικοθεραπευτή — θα ειδοποιηθείτε.",
      successTitle: "Λάβαμε το αίτημά σας!",
      successPre: "Θα επικοινωνήσουμε σύντομα για ",
      successBold: "επιβεβαίωση",
      successMid: " του ραντεβού. Για άμεση εξυπηρέτηση καλέστε ",
      depositPre: "Εξασφαλίστε το ραντεβού με προκαταβολή €",
      depositPost: "",
      depositLoading: "Μεταφορά…",
      errTaken: "Η ώρα μόλις κλείστηκε — διαλέξτε άλλη.",
      errConsent: "Παρακαλώ αποδεχθείτε την επεξεργασία δεδομένων.",
      errCaptcha: "Ο έλεγχος ασφαλείας απέτυχε. Δοκιμάστε ξανά.",
      errIncomplete: "Παρακαλώ ολοκληρώστε τον έλεγχο ασφαλείας.",
      errGeneric: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας.",
  },
  en: {
      metaTitle: "Book an appointment",
      metaDesc:
        "Book an online appointment for at-home physiotherapy & chiropractic care in Glyfada, Voula, Vouliagmeni, Vari, Alimos. Choose a service, area and time.",
      crumb: "Booking",
      eyebrow: "Online booking",
      title: "Book an appointment.",
      titleAccent: "appointment",
      lead: "Choose a service, area and time — I come to your home in Glyfada, Voula, Vouliagmeni, Vari and Alimos. The appointment is confirmed by me.",
      callNow: "Call now",
      whatsapp: "Send a WhatsApp",
      areas: ["Glyfada", "Voula", "Vouliagmeni", "Vari", "Alimos"],
      svc: "Service",
      duration: "Duration & price",
      cashCard: "Cash & card accepted.",
      area: "Area",
      dateTime: "Day & time",
      pickAll: "Choose a service, area and day to see available times.",
      loading: "Loading available times…",
      noSlots: "No available times on this day. Try another.",
      details: "Your details",
      name: "Full name*",
      phone: "Phone*",
      email: "Email (for confirmation)",
      address: "Address (for the home visit)",
      notes: "Brief description of the problem",
      consentPre:
        "I consent to the processing of my data for the appointment, in accordance with the ",
      consentLink: "Privacy Policy",
      consentPost: ".",
      submit: "Request appointment",
      submitting: "Sending…",
      confirmNote:
        "The appointment is confirmed by the physiotherapist — you'll be notified.",
      successTitle: "We got your request!",
      successPre: "We'll contact you shortly to ",
      successBold: "confirm",
      successMid: " the appointment. For immediate service call ",
      depositPre: "Secure your appointment with a €",
      depositPost: " deposit",
      depositLoading: "Redirecting…",
      errTaken: "That time was just taken — pick another.",
      errConsent: "Please accept the data processing.",
      errCaptcha: "Security check failed. Please try again.",
      errIncomplete: "Please complete the security check.",
      errGeneric: "Something went wrong. Try again or call us.",
  },
};

export type UIStrings = Record<keyof (typeof STRINGS)["el"], string>;

export function t(locale: Locale): UIStrings {
  return STRINGS[locale];
}

export function tBooking(locale: Locale) {
  return BOOKING[locale];
}

// ─────────────────────────────────────────────────────────────────────
// Navigation — labels + dropdown descriptions per locale.
// ─────────────────────────────────────────────────────────────────────

const NAV: Record<Locale, NavItem[]> = {
  el: [
    { href: "/", label: "Αρχική" },
    {
      href: "/therapies",
      label: "Θεραπείες",
      children: [
        {
          href: "/chiropractic",
          label: "Χειροπρακτική",
          description: "Χειροπρακτική ανάταξη, manual therapy.",
        },
        {
          href: "/lymphatic",
          label: "Λεμφικό",
          description: "Brazilian lymphatic drainage — αποτοξίνωση, σύσφιξη.",
        },
        {
          href: "/clinical-pilates",
          label: "Clinical Pilates",
          description: "Θεραπευτική άσκηση εδάφους, εξατομικευμένη.",
        },
      ],
    },
    { href: "/home-care", label: "Κατ' οίκον", shortLabel: "Κατ' οίκον" },
    { href: "/about", label: "Σχετικά" },
    { href: "/articles", label: "Άρθρα" },
    { href: "/contact", label: "Επικοινωνία" },
  ],
  en: [
    { href: "/", label: "Home" },
    {
      href: "/therapies",
      label: "Therapies",
      children: [
        {
          href: "/chiropractic",
          label: "Chiropractic",
          description: "Chiropractic adjustment, manual therapy.",
        },
        {
          href: "/lymphatic",
          label: "Lymphatic",
          description: "Brazilian lymphatic drainage — detox, toning.",
        },
        {
          href: "/clinical-pilates",
          label: "Clinical Pilates",
          description: "Personalised therapeutic mat exercise.",
        },
      ],
    },
    { href: "/home-care", label: "At home", shortLabel: "At home" },
    { href: "/about", label: "About" },
    { href: "/articles", label: "Articles" },
    { href: "/contact", label: "Contact" },
  ],
};

export function getNav(locale: Locale): NavItem[] {
  const nav = NAV[locale];
  if (locale !== "en") return nav;
  // Keep English navigation on the crawlable /en/* URLs.
  return nav.map((item) => ({
    ...item,
    href: localeHref(item.href, locale),
    children: item.children?.map((c) => ({
      ...c,
      href: localeHref(c.href, locale),
    })),
  }));
}

