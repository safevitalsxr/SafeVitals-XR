
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
          <a href="#" className="hover:text-text transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-text transition-colors">Twitter</a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Location</span>
          <p>RTIH <br />Vijayawada, AP 521108</p>
        </div>
      </div>
    </footer>
  );
}
