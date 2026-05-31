export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-24">
      <div className="section-shell grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-sans text-text-secondary text-sm">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-lg font-medium text-text mb-2">SafeVitals XR</span>
          <p>Immersive healthcare monitoring.</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Contact</span>
          <a href="mailto:hello@safevitals XR" className="hover:text-text transition-colors">hello@safevitalsxr.com</a>
          <a href="tel:+18005551234" className="hover:text-text transition-colors">+1 (800) 555-1234</a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Social</span>
          <a href="#" className="hover:text-text transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-text transition-colors">Twitter</a>
        </div>

        <div className="flex flex-col gap-4">
          <span className="font-mono text-accent mb-2 uppercase tracking-widest text-xs">Location</span>
          <p>100 Clinical Way<br/>San Francisco, CA 94105</p>
        </div>
      </div>
    </footer>
  );
}
