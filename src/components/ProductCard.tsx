import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ name, price, originalPrice, image, category, isNew }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary mb-3">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width={640}
          height={800}
        />
        {isNew && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] font-body font-semibold tracking-widest uppercase px-3 py-1 rounded-sm">
            New
          </span>
        )}
        {originalPrice && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-[10px] font-body font-semibold tracking-widest uppercase px-3 py-1 rounded-sm">
            Sale
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background"
          aria-label="Add to wishlist"
        >
          <Heart size={16} className={liked ? "fill-accent text-accent" : "text-foreground"} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button className="w-full bg-foreground text-background font-body text-xs tracking-widest uppercase py-3 rounded-sm hover:bg-foreground/90 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
      <p className="font-body text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-1">{category}</p>
      <h3 className="font-heading text-lg font-medium text-foreground leading-snug mb-1">{name}</h3>
      <div className="flex items-center gap-2">
        <span className="font-body text-sm font-semibold text-foreground">${price.toFixed(2)}</span>
        {originalPrice && (
          <span className="font-body text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
