"use client";

export function AboutSection() {
  return (
    <section className="bg-background py-40 border-t border-border/50">
      <div className="section-shell">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl mb-12 text-text">About Us</h2>
          
          <div className="font-sans text-2xl text-text-secondary leading-relaxed mb-24">
            SafeVitals XR maps the human system into an immersive visual layer, allowing critical care teams to perceive data intuitively, reduce cognitive load, and make faster, more accurate decisions.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border/50 pt-16">
            <div>
              <h3 className="font-mono text-sm text-accent mb-8 uppercase tracking-widest">Roadmap</h3>
              <ul className="flex flex-col gap-6 font-sans text-lg text-text">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  Hospital Integration
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  Cloud Diagnostics
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full border border-border" />
                  Predictive AI
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full border border-border" />
                  Global Scale
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm text-accent mb-8 uppercase tracking-widest">Mission</h3>
              <p className="font-sans text-lg text-text-secondary">
                To eliminate data fragmentation in critical care by building an immersive, unified visualization platform that works seamlessly alongside existing hospital infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
