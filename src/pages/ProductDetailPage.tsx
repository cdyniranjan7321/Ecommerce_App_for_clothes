
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { products, type Product } from "@/data/products";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    // Simulate loading delay for smoother UX
    setLoading(true);
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === id);
      setProduct(foundProduct || null);
      
      // Set default size if available
      if (foundProduct?.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      
      // Set default color if available
      if (foundProduct?.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} × ${product?.name} to cart!`, {
      description: selectedSize || selectedColor ? `Size: ${selectedSize}, Color: ${selectedColor}` : undefined,
    });
  };

  const handleAddToWishlist = () => {
    toast.success(`${product?.name} added to wishlist!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 animate-pulse">
            <div className="aspect-square bg-secondary rounded-sm" />
            <div className="space-y-4">
              <div className="h-4 bg-secondary rounded w-1/4" />
              <div className="h-8 bg-secondary rounded w-3/4" />
              <div className="h-6 bg-secondary rounded w-1/3" />
              <div className="h-24 bg-secondary rounded" />
              <div className="h-10 bg-secondary rounded w-1/2" />
              <div className="h-12 bg-secondary rounded" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 px-4">
          <p className="font-body text-muted-foreground text-lg mb-4">Product not found.</p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-accent text-accent-foreground font-body text-sm tracking-wider uppercase hover:bg-accent/90 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-8 flex-wrap">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/${product.category.toLowerCase()}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <div key={idx} className="aspect-square bg-secondary rounded-sm overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-6">
              <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-body text-2xl md:text-3xl font-semibold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-body text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="font-body text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 border-b border-border pb-8">
                  {product.description}
                </p>
              )}
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-body text-xs font-semibold tracking-widest uppercase text-foreground">
                    Size
                  </p>
                  <button className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`font-body text-xs md:text-sm px-4 py-2 border rounded-sm transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground hover:bg-secondary"
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
              <div className="mb-6">
                <p className="font-body text-xs font-semibold tracking-widest uppercase text-foreground mb-3">
                  Color
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`font-body text-xs px-4 py-2 border rounded-sm transition-all duration-200 ${
                        selectedColor === color
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-foreground border-border hover:border-foreground hover:bg-secondary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-body text-xs font-semibold tracking-widest uppercase text-foreground mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4 border border-border rounded-sm w-fit">
                <button 
                  className="p-3 hover:bg-secondary transition-colors disabled:opacity-50" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="font-body text-sm font-medium w-12 text-center">
                  {quantity}
                </span>
                <button 
                  className="p-3 hover:bg-secondary transition-colors" 
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <Button 
                className="flex-1 rounded-sm gap-2 h-12" 
                onClick={handleAddToCart}
                disabled={!selectedSize && product.sizes?.length > 0}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="rounded-sm px-6 h-12" 
                onClick={handleAddToWishlist}
              >
                <Heart size={18} />
              </Button>
            </div>

            {/* Stock Info */}
            <div className="space-y-3">
              <p className="font-body text-xs text-muted-foreground">
                {product.stock !== undefined ? (
                  product.stock > 0 ? (
                    <span className="text-green-600">✓ {product.stock} in stock</span>
                  ) : (
                    <span className="text-red-600">Out of stock</span>
                  )
                ) : (
                  <span className="text-green-600">✓ In stock</span>
                )}
              </p>
              
              {/* Shipping Info */}
              <div className="border-t border-border pt-4 mt-4">
                <p className="font-body text-xs text-muted-foreground">
                  Free shipping on orders over $100
                </p>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  30-day easy returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;