import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import AmenitiesSection from "@/components/home/AmenitiesSection";
import LifestyleSection from "@/components/home/LifestyleSection";
import PlanSection from "@/components/home/PlanSection";
import PlanInteractive from "@/components/home/PlanInteractive";
import NewsSection from "@/components/home/NewsSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <AmenitiesSection />
      <LifestyleSection />
      <PlanSection />
      {/*<PlanInteractive />*/}
      <NewsSection />
      <ContactSection />
    </>
  );
}