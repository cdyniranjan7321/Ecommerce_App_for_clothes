
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, type Product } from "@/data/products";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Get display title
  const getTitle = (cat: string) => {
    const titles: Record<string, string> = {
      women: "Women's Collection",
      men: "Men's Collection",
      kids: "Kids' Collection",
      new: "New Arrivals",
      sale: "Sale",
    };
    return titles[cat.toLowerCase()] || cat;
  };

  // Get breadcrumb text
  const getBreadcrumbText = (cat: string) => {
    const texts: Record<string, string> = {
      women: "Women",
      men: "Men",
      kids: "Kids",
      new: "New Arrivals",
      sale: "Sale",
    };
    return texts[cat.toLowerCase()] || cat;
  };

  useEffect(() => {
    // Simulate loading delay for smoother UX
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = [...products];
      
      if (category === "new") {
        filteredProducts = products.filter(p => p.isNew === true);
      } 
      else if (category === "sale") {
        filteredProducts = products.filter(p => p.originalPrice !== undefined);
      } 
      else {
        const categoryMap: Record<string, "Women" | "Men" | "Kids"> = {
          women: "Women",
          men: "Men",
          kids: "Kids"
        };
        const mappedCategory = categoryMap[category?.toLowerCase() || ""];
        if (mappedCategory) {
          filteredProducts = products.filter(p => p.category === mappedCategory);
        }
      }
      
      setCategoryProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [category]);

  const title = getTitle(category || "");
  const breadcrumbText = getBreadcrumbText(category || "");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">{breadcrumbText}</span>
        </div>
        
        {/* Page Title with count */}
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <h1 className="font-heading text-3xl md:text-5xl font-semibold text-foreground">
            {title}
          </h1>
          <p className="font-body text-muted-foreground">
            {categoryProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
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
        ) : categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-muted-foreground mb-4">
              No products found in this category yet.
            </p>
            <Link 
              to="/" 
              className="inline-block px-6 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {categoryProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  category={product.category}
                  isNew={product.isNew}
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