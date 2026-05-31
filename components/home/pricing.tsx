"use client";

import Link from "next/link";

export function PricingSection() {
  return (
    <section id="pricing" className="bg-background py-40 border-t border-border/50">
      <div className="section-shell flex flex-col items-center text-center max-w-3xl mx-auto">
        <h2 className="font-heading text-5xl md:text-6xl text-text mb-8">
          Pricing Will Be Revealed Soon
        </h2>
        <div className="font-sans text-xl text-text-secondary leading-relaxed mb-12 flex flex-col gap-4">
          <p>SafeVitals XR is currently preparing for pilot deployments.</p>
          <p>Enterprise licensing details will be announced soon. Stay in touch for updates.</p>
        </div>
        <Link 
          href="/contact"
          className="rounded border border-border bg-surface px-8 py-4 text-base font-medium text-text transition-colors hover:bg-white hover:text-background"
        >
          Notify Me
        </Link>
      </div>
    </section>
  );
}
