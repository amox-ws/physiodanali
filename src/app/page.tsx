import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Testimonials } from "@/components/site/testimonials";
import { Bio } from "@/components/site/bio";
import { Process } from "@/components/site/process";
import { BookingBand } from "@/components/site/booking-band";
import { LatestArticles } from "@/components/site/latest-articles";
import { getPublishedArticles } from "@/lib/articles";
import { getLocale } from "@/lib/i18n-server";

export const revalidate = 3600;

export default async function Home() {
  const latest = await getPublishedArticles(await getLocale(), 3);
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Testimonials />
      <Bio />
      <Process />
      <BookingBand />
      <LatestArticles posts={latest} />
    </>
  );
}
