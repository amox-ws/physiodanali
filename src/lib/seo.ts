import { site } from "./content";

export const SITE_URL = "https://physiodanali.gr";

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Physiotherapist", "LocalBusiness"],
  "@id": `${SITE_URL}/#business`,
  name: site.name,
  alternateName: "Κωνσταντίνος Δανάλης Φυσικοθεραπευτής",
  description:
    "Χειροπρακτική και Φυσικοθεραπεία κατ' οίκον. Επιστημονική αντιμετώπιση πόνου και αποκατάσταση.",
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: site.phone,
  email: site.email,
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Αγίου Νεκταρίου 58",
    postalCode: "16562",
    addressLocality: "Γλυφάδα",
    addressRegion: "Αττική",
    addressCountry: "GR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.8649,
    longitude: 23.7536,
  },
  areaServed: [
    { "@type": "City", name: "Βούλα" },
    { "@type": "City", name: "Βουλιαγμένη" },
    { "@type": "City", name: "Βάρη" },
    { "@type": "City", name: "Γλυφάδα" },
    { "@type": "City", name: "Άλιμος" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "10:00",
    closes: "22:00",
  },
  sameAs: [
    site.social.instagram,
    site.social.facebook,
    site.social.youtube,
    site.social.tiktok,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "100",
    bestRating: "5",
    worstRating: "1",
  },
};

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#practitioner`,
  name: "Κωνσταντίνος Δανάλης",
  alternateName: "Konstantinos Danalis",
  jobTitle: "Φυσικοθεραπευτής · Χειροπρακτικός",
  description:
    "Αδειούχος Φυσικοθεραπευτής, μέλος του Πανελλήνιου Συλλόγου Φυσικοθεραπευτών, απόφοιτος του Πανεπιστημίου Δυτικής Αττικής.",
  image: `${SITE_URL}/logo.png`,
  url: `${SITE_URL}/about`,
  telephone: site.phone,
  email: site.email,
  worksFor: { "@id": `${SITE_URL}/#business` },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Πανεπιστήμιο Δυτικής Αττικής",
  },
  knowsAbout: [
    "Φυσικοθεραπεία",
    "Χειροπρακτική",
    "Νευροδυναμική",
    "Λεμφικό σύστημα",
    "Brazilian Lymphatic Drainage",
    "Αυχεναλγία",
    "Οσφυαλγία",
    "Ισχιαλγία",
    "TECAR",
    "Manual therapy",
  ],
};

export function medicalProcedureSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name,
    description,
    url: `${SITE_URL}${url}`,
    procedureType: "PhysiologicalProcedure",
    bodyLocation: "Musculoskeletal system",
    relevantSpecialty: "Physiotherapy",
    provider: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };
}

export function articleSchema({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalScholarlyArticle",
    headline: title,
    description,
    url: `${SITE_URL}/articles/${slug}`,
    author: { "@id": `${SITE_URL}/#practitioner` },
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "el-GR",
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
}
