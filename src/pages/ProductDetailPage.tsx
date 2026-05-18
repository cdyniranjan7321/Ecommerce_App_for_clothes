import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations_supabase/client";
import { ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import type { Database } from "@/integrations_supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const { data } = await supabase.from("products").select("*").eq("id", id).single();
      setProduct(data);
      if (data?.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-secondary rounded-sm" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded w-1/4" />
              <div className="h-8 bg-secondary rounded w-3/4" />
              <div className="h-6 bg-secondary rounded w-1/4" />
              <div className="h-20 bg-secondary rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <p className="font-body text-muted-foreground">Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
            <img
              src={product.image_url || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">{product.category}</p>
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-body text-2xl font-semibold text-foreground">${Number(product.price).toFixed(2)}</span>
              {product.original_price && (
                <span className="font-body text-lg text-muted-foreground line-through">${Number(product.original_price).toFixed(2)}</span>
              )}
            </div>

            {product.description && (
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-foreground mb-3">Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-body text-xs px-4 py-2 border rounded-sm transition-colors ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-foreground mb-3">Colors</p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <span key={color} className="font-body text-xs px-3 py-1 border border-border rounded-sm bg-secondary">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-4 border border-border rounded-sm w-fit">
                <button className="p-3 hover:bg-secondary transition-colors" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus size={14} />
                </button>
                <span className="font-body text-sm font-medium w-8 text-center">{quantity}</span>
                <button className="p-3 hover:bg-secondary transition-colors" onClick={() => setQuantity(quantity + 1)}>
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 rounded-sm gap-2" onClick={() => toast.success("Added to cart!")}>
                <ShoppingBag size={16} />
                Add to Cart
              </Button>
              <Button variant="outline" className="rounded-sm px-4" onClick={() => toast.success("Added to wishlist!")}>
                <Heart size={16} />
              </Button>
            </div>

            <p className="font-body text-xs text-muted-foreground mt-4">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
