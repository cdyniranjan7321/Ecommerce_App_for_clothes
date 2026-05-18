import { useState } from "react";
import { Button } from "@/components/ui/button";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="py-16 md:py-24 px-4 bg-foreground text-primary-foreground">
      <div className="container mx-auto text-center max-w-xl">
        <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">
          Stay in the Loop
        </h2>
        <p className="font-body text-sm text-primary-foreground/70 mb-8">
          Subscribe for exclusive access to new collections, special offers and style inspiration.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm font-body text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
          />
          <Button variant="accent" className="rounded-sm">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
