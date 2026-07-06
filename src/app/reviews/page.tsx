import type { Metadata } from "next";
import { Star } from "lucide-react";
import { getLocale } from "@/lib/i18n-server";
import { localeHref } from "@/lib/i18n";
import { PageHero, FinalCTA } from "@/components/site/page-primitives";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

// Patient reviews — migrated from the old site's testimonials page (real
// quotes, kept anonymous as originally published). The 5.0★ aggregate lives
// on Google Business Profile (121 reviews); the sitewide LocalBusiness schema
// already carries the aggregateRating, so this page renders content only.

const QUOTES_EL = [
  "Η κύφωσή μου με απασχολούσε χρόνια. Ο κ. Δανάλης με 20 συνεδρίες κατάφερε να τη διορθώσει ώστε να είμαι έτοιμη για τις φωτογραφίες του γάμου μου! Τον συστήνω ανεπιφύλακτα!",
  "Είχα διαγνωστεί με μεγάλη κύφωση αυχένα και θώρακα. Ο κ. Δανάλης με έχει βοηθήσει να δω σημαντική βελτίωση στη στάση του σώματος και στην απελευθέρωση της κίνησης του αυχένα μου.",
  "Υπέφερα από έντονους πόνους σε αυχένα, πλάτη, μέση και λεκάνη. Η θεραπεία ξεπέρασε και την πιο αισιόδοξη προσδοκία μου — το Σάββατο οι πόνοι είχαν εξαφανιστεί.",
  "Εξαιρετικός χειροπράκτης, με βοήθησε με τον πόνο στον ώμο. Η θεραπεία ήταν αποτελεσματική και ολοκληρωμένη. Ένας επαγγελματίας που εμπνέει σίγουρα εμπιστοσύνη!",
  "Είχα χρόνιους πόνους στον αυχένα που δεν μπορούσα να αντιμετωπίσω. Διέγνωσε ότι είχα αυχενικό πόνο με ελλείμματα συντονισμού, μου έδωσε εξειδικευμένη θεραπεία και είμαι πλέον πολύ καλύτερα!",
  "Έπαθα στραμπούληγμα μέσα στο Σαββατοκύριακο — ήρθε αμέσως ο κύριος Δανάλης. Βοήθεια εκπληκτική, με καθημερινό ενδιαφέρον για την κατάστασή μου. Επαγγελματίας!",
  "Η αποκατάσταση μετά από χειρουργείο για κάταγμα ισχίου της μητέρας μου ήταν απροβλημάτιστη. Περπάτησε σε σύντομο χρονικό διάστημα και το πόδι ήταν καλύτερα από πριν.",
  "Ήμουν 2 εβδομάδες στο κρεβάτι από πόνο στη μέση — και με 2 συνεδρίες πήγα στη δουλειά μου.",
  "Ήταν αδύνατον να κινηθώ και να λειτουργήσω από τον πόνο στον αυχένα. Σε 3 συνεδρίες μπορούσα να επιστρέψω στη δουλειά μου χωρίς πρόβλημα.",
  "Ο σύζυγός μου δεν μπορούσε να σταθεί όρθιος λόγω ξαφνικής οσφυαλγίας. Με 4 μόνο επισκέψεις είχε ξεπεράσει το πρόβλημα. Τον συστήνουμε ανεπιφύλακτα!",
  "Επαγγελματισμός, συνέπεια, υπευθυνότητα, άρτια γνώση του αντικειμένου, άμεση ανταπόκριση, ευγένεια και εξαιρετική συνεργασία με τον ασθενή χαρακτηρίζουν τον κύριο Δανάλη.",
  "Βρήκε αμέσως τα trigger points που μου δημιουργούσαν απίστευτο πόνο στην πλάτη — από την πρώτη συνεδρία είχα ήδη μεγάλη διαφορά.",
  "Με βοήθησε πολύ κατ' οίκον σε οξύ επεισόδιο ισχιαλγίας — και βοηθώντας με να καταλάβω την αιτία και πώς να προλάβω αντίστοιχο επεισόδιο στο μέλλον.",
];

const QUOTES_EN = [
  "My kyphosis had troubled me for years. In 20 sessions Mr. Danalis corrected it in time for my wedding photos! I recommend him without reservation!",
  "Diagnosed with severe neck and thoracic kyphosis — he has helped me see real improvement in my posture and freedom of neck movement.",
  "I suffered intense pain in my neck, back and lower back. The treatment exceeded my most optimistic expectations — by Saturday the pain was gone.",
  "An excellent chiropractor — he helped me with my shoulder pain. Effective, thorough treatment from a professional who inspires trust.",
  "Chronic neck pain I couldn't manage — he diagnosed coordination deficits, gave me specialised treatment, and I am now much better!",
  "I sprained my back over the weekend and Mr. Danalis came immediately. Amazing help, with daily follow-up on my condition.",
  "My mother's rehabilitation after hip-fracture surgery was seamless. She walked again in a short time and the leg is better than before.",
  "I had been bed-bound for 2 weeks with lower-back pain — after 2 sessions I was back at work.",
  "I couldn't move or function because of neck pain. Within 3 sessions I returned to work without any problem.",
  "My husband couldn't stand upright from sudden lower-back pain. In just 4 visits the problem was gone. We recommend him unreservedly!",
  "Professionalism, consistency, deep knowledge, immediate response, kindness and outstanding collaboration with the patient.",
  "He immediately found the trigger points causing my back pain — a huge difference from the very first session.",
  "He helped me at home through an acute sciatica episode — and taught me the cause and how to prevent the next one.",
];

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return locale === "en"
    ? {
        title: "Patient Reviews — PhysioDanali",
        description:
          "What patients say about at-home physiotherapy and chiropractic care with Konstantinos Danalis — 5.0★ on Google with 121 reviews.",
      }
    : {
        title: "Αξιολογήσεις ασθενών — PhysioDanali",
        description:
          "Τι λένε οι ασθενείς για τη φυσικοθεραπεία και χειροπρακτική κατ' οίκον με τον Κωνσταντίνο Δανάλη — 5.0★ στο Google με 121 αξιολογήσεις.",
      };
}

export default async function ReviewsPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const quotes = en ? QUOTES_EN : QUOTES_EL;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: en ? "Home" : "Αρχική", url: "/" },
            { name: en ? "Reviews" : "Αξιολογήσεις", url: "/reviews" },
          ]),
        ]}
      />
      <PageHero
        breadcrumb={en ? "Reviews" : "Αξιολογήσεις"}
        eyebrow={en ? "Patient reviews" : "Αξιολογήσεις ασθενών"}
        title={en ? "What patients say." : "Τι λένε οι ασθενείς."}
        titleAccent={en ? "patients say." : "οι ασθενείς."}
        lead={
          en
            ? "5.0★ on Google from 121 reviews. Real experiences from home-visit physiotherapy and chiropractic care across Athens' southern suburbs."
            : "5.0★ στο Google από 121 αξιολογήσεις. Πραγματικές εμπειρίες από φυσικοθεραπεία και χειροπρακτική κατ' οίκον στα νότια προάστια."
        }
        primaryCta={{
          label: en ? "Book an appointment" : "Κλείστε ραντεβού",
          href: localeHref("/booking", locale),
        }}
        secondaryCta={{
          label: en ? "Call now" : "Καλέστε τώρα",
          href: "tel:+306944344342",
        }}
      />

      <section className="bg-snow py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <div className="mb-12 flex items-center gap-3">
              <span className="flex gap-1" aria-label="5 από 5 αστέρια">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-gold text-gold" strokeWidth={1} />
                ))}
              </span>
              <span className="text-sm text-ink-muted">
                {en ? "5.0 · 121 Google reviews" : "5.0 · 121 αξιολογήσεις Google"}
              </span>
            </div>
          </Reveal>
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {quotes.map((q) => (
              <Reveal key={q.slice(0, 24)} className="mb-6 break-inside-avoid">
                <figure className="rounded-[20px] border border-stone bg-porcelain p-6">
                  <blockquote className="text-base leading-relaxed text-ink">
                    “{q}”
                  </blockquote>
                  <figcaption className="mt-4 text-xs uppercase tracking-[0.18em] text-ink-muted">
                    {en ? "PhysioDanali patient" : "Ασθενής PhysioDanali"}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
