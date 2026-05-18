import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoStrip from "@/components/PromoStrip";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroBanner />
    <CategorySection />
    <FeaturedProducts />
    <PromoStrip />
    <NewsletterSection />
    <Footer />
  </div>
);

export default Index;
