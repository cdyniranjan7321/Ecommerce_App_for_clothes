import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Women", href: "/women" },
  { label: "Men", href: "/men" },
  { label: "Kids", href: "/kids" },
  { label: "New Arrivals", href: "/new" },
  { label: "Sale", href: "/sale" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <button className="lg:hidden p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link to="/" className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
          MAISON
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="text-sm font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden md:block text-foreground hover:text-accent transition-colors" aria-label="Search"><Search size={20} /></button>
          {isAdmin && (
            <Link to="/admin" className="text-accent hover:text-accent/80 transition-colors" aria-label="Admin"><Shield size={20} /></Link>
          )}
          {user ? (
            <button onClick={signOut} className="text-foreground hover:text-accent transition-colors font-body text-xs tracking-widest uppercase hidden md:block">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="text-foreground hover:text-accent transition-colors" aria-label="Account"><User size={20} /></Link>
          )}
          <button className="relative text-foreground hover:text-accent transition-colors" aria-label="Cart">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="lg:hidden border-t border-border bg-background px-4 pb-4">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="block py-3 text-sm font-body font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-border last:border-0" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          {user ? (
            <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-left py-3 text-sm font-body font-medium tracking-widest uppercase text-muted-foreground">
              Logout
            </button>
          ) : (
            <Link to="/auth" className="block py-3 text-sm font-body font-medium tracking-widest uppercase text-muted-foreground" onClick={() => setMobileOpen(false)}>
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
