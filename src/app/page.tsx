import Navbar from "@/components/navbar";
import HeroScroll from "@/components/hero-scroll";
import { SectionPersonas } from "@/components/section-personas";
import { SectionFeatures } from "@/components/section-features";
import HowItWorks from "@/components/how-it-works";
import RagRecommendation from "@/components/rag-recommendation";
import Faq from "@/components/faq";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroScroll />
      <SectionPersonas />
      <SectionFeatures />
      <HowItWorks />
      <Faq />
      <SiteFooter />
    </div>
  );
}