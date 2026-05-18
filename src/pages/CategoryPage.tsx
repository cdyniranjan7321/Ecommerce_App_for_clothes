import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations_supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import type { Database } from "@/integrations_supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryLabel = category ? category.charAt(0).toUpperCase() + category.slice(1) : "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      let query = supabase.from("products").select("*").order("created_at", { ascending: false });
      if (category && category !== "new" && category !== "sale") {
        query = query.eq("category", categoryLabel);
      }
      if (category === "new") {
        query = query.eq("is_new", true);
      }
      if (category === "sale") {
        query = query.not("original_price", "is", null);
      }
      const { data } = await query;
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, [category, categoryLabel]);

  const title = category === "new" ? "New Arrivals" : category === "sale" ? "Sale" : categoryLabel;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{title}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground mb-8">{title}</h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-secondary rounded-sm mb-3" />
                <div className="h-3 bg-secondary rounded w-1/3 mb-2" />
                <div className="h-4 bg-secondary rounded w-2/3 mb-2" />
                <div className="h-3 bg-secondary rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="font-body text-muted-foreground text-center py-20">No products found in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard
                  name={product.name}
                  price={Number(product.price)}
                  originalPrice={product.original_price ? Number(product.original_price) : undefined}
                  image={product.image_url || "/placeholder.svg"}
                  category={product.category}
                  isNew={product.is_new}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
