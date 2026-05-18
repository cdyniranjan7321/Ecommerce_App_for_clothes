import { Truck, RotateCcw, Shield, HeadphonesIcon } from "lucide-react";

const features = [
  { icon: Truck, label: "Free Shipping", desc: "On orders over $100" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day return policy" },
  { icon: Shield, label: "Secure Payment", desc: "100% protected" },
  { icon: HeadphonesIcon, label: "24/7 Support", desc: "Always here for you" },
];

const PromoStrip = () => (
  <section className="py-12 md:py-16 px-4 border-y border-border">
    <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
      {features.map((f) => (
        <div key={f.label} className="flex flex-col items-center text-center gap-2">
          <f.icon size={24} className="text-accent" strokeWidth={1.5} />
          <h4 className="font-body text-sm font-semibold text-foreground">{f.label}</h4>
          <p className="font-body text-xs text-muted-foreground">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PromoStrip;
