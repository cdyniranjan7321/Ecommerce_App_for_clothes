
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-primary-foreground/70 pt-16 pb-8 px-4">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div>
          <h4 className="font-heading text-xl font-semibold text-primary-foreground mb-4">MAISON</h4>
          <p className="font-body text-xs leading-relaxed">
            Timeless fashion for the modern family. Quality craftsmanship meets contemporary design.
          </p>
        </div>
        <div>
          <h5 className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground mb-4">Shop</h5>
          <ul className="space-y-2">
            {["Women", "Men", "Kids", "New Arrivals", "Sale"].map((l) => (
              <li key={l}><Link to={`/${l.toLowerCase().replace(" ", "-")}`} className="font-body text-xs hover:text-primary-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground mb-4">Help</h5>
          <ul className="space-y-2">
            {["Contact Us", "Shipping", "Returns", "FAQ", "Size Guide"].map((l) => (
              <li key={l}><Link to="#" className="font-body text-xs hover:text-primary-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-body text-xs font-semibold tracking-widest uppercase text-primary-foreground mb-4">Company</h5>
          <ul className="space-y-2">
            {["About Us", "Careers", "Sustainability", "Press", "Stores"].map((l) => (
              <li key={l}><Link to="#" className="font-body text-xs hover:text-primary-foreground transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-body text-xs">© 2026 MAISON. All rights reserved.</p>
        <div className="flex gap-6">
          {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((l) => (
            <Link key={l} to="#" className="font-body text-xs hover:text-primary-foreground transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
