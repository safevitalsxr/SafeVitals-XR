"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/#products", label: "Products" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      // Only apply the scroll-hide logic on the home page
      if (pathname === "/") {
        // The hero ScrollTrigger is set to end at +=400% 
        const heroEnd = window.innerHeight * 3.9;
        
        // Hide if we have scrolled past the initial top bar but have not finished the hero
        if (currentScrollY > 50 && currentScrollY < heroEnd) {
          setHidden(true);
        } else {
          setHidden(false);
        }
      } else {
        setHidden(false);
      }
    };
    
    // Initial check
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        hidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${
        scrolled 
          ? "border-b border-border bg-background/60 backdrop-blur-md" 
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="section-shell flex h-24 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="SafeVitals XR home">
          <span className="font-heading text-lg font-medium tracking-wide text-text">SafeVitals XR</span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-sans font-medium text-text-secondary transition-colors hover:text-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reserve"
            className="rounded border border-border bg-surface-alt px-5 py-2.5 text-sm font-sans font-medium text-text transition-colors hover:bg-white hover:text-background"
          >
            Reserve Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded border border-border bg-surface-alt lg:hidden text-text"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background/95 backdrop-blur-md lg:hidden">
          <div className="section-shell py-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-sm font-sans text-text-secondary hover:text-text hover:bg-surface-alt rounded"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reserve"
              onClick={() => setOpen(false)}
              className="mt-4 block rounded border border-border bg-surface-alt px-4 py-3 text-center text-sm font-sans font-medium text-text hover:bg-white hover:text-background"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
