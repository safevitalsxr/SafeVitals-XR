
export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-24">
      <div className="section-shell grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-sans text-text-secondary text-sm">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-lg font-medium text-text mb-2">SafeVitals XR</span>
          <p>Immersive healthcare monitoring.</p>
          <p>Under the Incubation of <b>Ratan Tata Innovation Hub (RTIH)</b></p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Contact</span>
          <a href="mailto:safevitals.xr@gmail.com" className="hover:text-text transition-colors">safevitals.xr@gmail.com</a>
          <a href="tel:+919989359799" className="hover:text-text transition-colors">+91 9989359799</a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Social</span>
          <a
            href="https://www.instagram.com/safevitals_xr?igsh=MWtvcmgzbmJuemYzag=="
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors"
          >
            Instagram
          </a>
          <a
            href="https://mobile.safevitals.in"
            className="hover:text-text text-xs text-[#00D4FF] border border-[#00D4FF]/25 px-3.5 py-1.5 rounded bg-[#00D4FF]/5 mt-2 transition-all inline-flex items-center gap-1.5 w-fit"
          >
            View Mobile Site
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Location</span>
          <a
            href="https://www.openstreetmap.org/?mlat=16.518514&mlon=80.697937#map=17/16.518514/80.697937"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text transition-colors leading-relaxed mb-1"
          >
            632 Eluru Road, Enikepadu,<br />
            Vijayawada Rural,<br />
            AP - 521108, India
          </a>
          <div className="w-full h-32 rounded-xl overflow-hidden border border-white/10 relative">
            <iframe
              title="SafeVitals Location Map"
              width="100%"
              height="100%"
              src="https://www.openstreetmap.org/export/embed.html?bbox=80.694937%2C16.515514%2C80.700937%2C16.521514&amp;layer=mapnik&amp;marker=16.518514%2C80.697937"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(10%) contrast(120%)" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
