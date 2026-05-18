import heroBanner from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";

const HeroBanner = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      <img
        src={heroBanner}
        alt="Spring Summer Collection featuring elegant fashion"
        className="w-full h-full object-cover object-center"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-foreground/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-4">
          Spring / Summer 2026
        </p>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6">
          New Collection
        </h1>
        <p className="font-body text-sm md:text-base text-primary-foreground/90 max-w-md mb-8">
          Discover timeless elegance crafted for the modern wardrobe
        </p>
        <Button variant="hero" size="lg">
          Shop Now
        </Button>
      </div>
    </section>
  );
};

export default HeroBanner;
