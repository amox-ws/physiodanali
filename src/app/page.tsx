import { Hero } from "@/components/site/hero";
import { TrustBar } from "@/components/site/trust-bar";
import { Services } from "@/components/site/services";
import { WhyUs } from "@/components/site/why-us";
import { Testimonials } from "@/components/site/testimonials";
import { Bio } from "@/components/site/bio";
import { BookingBand } from "@/components/site/booking-band";
import { Coverage } from "@/components/site/coverage";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Testimonials />
      <Bio />
      <BookingBand />
      <Coverage />
    </>
  );
}
