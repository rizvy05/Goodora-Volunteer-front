import Hero from "@/components/goodora/home/hero";
import ProgramsSection from "@/components/goodora/home/programs-section";
import AboutIntro from "@/components/goodora/home/about-intro";
import WhyChoose from "@/components/goodora/home/why-choose";
import ImpactStats from "@/components/goodora/home/impact-stats";
import HowItWorks from "@/components/goodora/home/how-it-works";
import UpcomingEvents from "@/components/goodora/home/upcoming-events";
import Testimonials from "@/components/goodora/home/testimonials";
import FinalCta from "@/components/goodora/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramsSection />
      <AboutIntro />
      <WhyChoose />
      <ImpactStats />
      <HowItWorks />
      <UpcomingEvents />
      <Testimonials />
      <FinalCta />
    </>
  );
}
