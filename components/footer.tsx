
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Footer() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Server-side check
  const isPortalPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/patient") ||
    pathname.startsWith("/doctor") ||
    pathname.startsWith("/staff");

  // Client-side check including subdomain
  let isSubdomain = false;
  if (mounted && typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");
    const isLocal = hostname.includes("localhost") || hostname.includes("127.0.0.1");

    if (isLocal) {
      isSubdomain = parts.length > 1 && parts[0] !== "localhost" && parts[0] !== "127";
    } else {
      isSubdomain = parts.length >= 3 && parts[0] !== "www";
    }
  }

  if (isPortalPath || isSubdomain) {
    return null;
  }

  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="section-shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-sans text-text-secondary text-sm">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src="/Logos/SV_logo_V2.png" alt="SafeVitals Logo" className="h-8 w-auto object-contain" />
              <span className="font-heading text-lg font-semibold text-text">SafeVitals Technologies Pvt Ltd</span>
            </div>
            <p>Immersive healthcare monitoring.</p>
            <p>Under the Incubation of <b>Ratan Tata Innovation Hub (RTIH)</b></p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Contact</span>
            <a href="mailto:safevitals.xr@gmail.com" className="hover:text-text transition-colors">safevitals.xr@gmail.com</a>
            <a href="tel:+917989639799" className="hover:text-text transition-colors">+91 7989639799</a>
            <a href="tel:+919989359799" className="hover:text-text transition-colors">+91 9989359799</a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Social</span>
            <a
              href="https://x.com/SafeVitalsXR"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors flex items-center gap-2"
            >
              X (Twitter)
            </a>
            <a
              href="https://www.instagram.com/safevitals_xr?igsh=MWtvcmgzbmJuemYzag=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors"
            >
              Instagram
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Location</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=2nd+Floor,+5-24,+THOTA+STREET,+NEAR+KANAKA+DURGA+TEMPLE,+Yerravaram,+East+Godavari,+Andhra+Pradesh,+533435"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text transition-colors leading-relaxed mb-1 text-xs"
            >
              2nd Floor, 5-24, THOTA STREET,<br />
              NEAR KANAKA DURGA TEMPLE,<br />
              Yerravaram, East Godavari,<br />
              Andhra Pradesh, 533435
            </a>
            <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 relative">
              <iframe
                title="SafeVitals Location Map"
                width="100%"
                height="100%"
                src="https://www.openstreetmap.org/export/embed.html?bbox=82.0200%2C17.2850%2C82.0300%2C17.2950&amp;layer=mapnik&amp;marker=17.2900%2C82.0250"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(10%) contrast(120%)" }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar with Logos and Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-4">
            <img src="/Logos/Horizontal_White_V2.png" alt="SafeVitals Technologies Logo" className="h-8 w-auto object-contain opacity-90" />
          </div>
          <p>© {new Date().getFullYear()} SafeVitals Technologies Pvt Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
