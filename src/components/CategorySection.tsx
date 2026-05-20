
import { Link } from "react-router-dom";
import categoryWomen from "@/assets/category-women.jpg";
import categoryMen from "@/assets/category-men.jpg";
import categoryKids from "@/assets/category-kids.jpg";

const categories = [
  { name: "Women", image: categoryWomen, href: "/women" },
  { name: "Men", image: categoryMen, href: "/men" },
  { name: "Kids", image: categoryKids, href: "/kids" },
];

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 px-4 lg:px-8">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-foreground mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.href}
              className="group relative overflow-hidden aspect-[3/4] rounded-sm"
            >
              <img
                src={cat.image}
                alt={`${cat.name} fashion collection`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                width={800}
                height={1024}
              />
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/25 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-primary-foreground tracking-wide">
                  {cat.name}
                </h3>
                <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/80 mt-2 inline-block border-b border-primary-foreground/50 pb-0.5 group-hover:border-primary-foreground transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
