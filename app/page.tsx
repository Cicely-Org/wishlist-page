import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import ProblemsSection from "@/components/ProblemsSection";
import FeaturesSection from "@/components/FeaturesSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProductSection />
      <ProblemsSection />
      <FeaturesSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}
