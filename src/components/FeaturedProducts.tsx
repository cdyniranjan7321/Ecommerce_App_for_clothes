import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const fallbackProducts = [
  { name: "Linen Tailored Blazer", price: 189, image: product1, category: "Women", isNew: true },
  { name: "Navy Pleated Trousers", price: 129, image: product2, category: "Men" },
  { name: "Wrap Evening Dress", price: 245, originalPrice: 320, image: product3, category: "Women" },
  { name: "Essential Cotton Tee", price: 49, image: product5, category: "Men", isNew: true },
  { name: "Rainbow Color Block Hoodie", price: 59, image: product6, category: "Kids" },
  { name: "Olive Bomber Jacket", price: 175, image: product7, category: "Men" },
  { name: "Floral Garden Dress", price: 45, image: product8, category: "Kids", isNew: true },
  { name: "Classic White Tee", price: 39, originalPrice: 55, image: product5, category: "Women" },
];

const FeaturedProducts = () => {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(8)
      .then(({ data }) => {
        setDbProducts(data || []);
        setLoaded(true);
      });
  }, []);

  const useDb = loaded && dbProducts.length > 0;

  return (
    <section className="py-16 md:py-24 px-4 lg:px-8 bg-secondary/40">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-center text-foreground mb-4">
          Featured Pieces
        </h2>
        <p className="font-body text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Curated selections from our latest collections, designed to elevate every moment
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {useDb
            ? dbProducts.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`}>
                  <ProductCard
                    name={p.name}
                    price={Number(p.price)}
                    originalPrice={p.original_price ? Number(p.original_price) : undefined}
                    image={p.image_url || "/placeholder.svg"}
                    category={p.category}
                    isNew={p.is_new}
                  />
                </Link>
              ))
            : fallbackProducts.map((product, i) => (
                <ProductCard key={i} {...product} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
