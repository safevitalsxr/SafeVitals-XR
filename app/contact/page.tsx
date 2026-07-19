import type { Metadata } from "next";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SafeVitals XR. Start a clinical XR conversation about hospital monitoring, ICU visualization, and healthcare innovation pilots.",
  openGraph: {
    title: "Contact SafeVitals XR",
    description:
      "Start a clinical XR conversation. Reach out for hospital pilots, partnerships, and innovation collaborations.",
    url: "https://safevitals.in/contact",
  },
  alternates: {
    canonical: "https://safevitals.in/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="pt-32">
      <section className="section-shell grid gap-12 pb-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="text-balance text-5xl font-semibold leading-tight md:text-7xl">Start a clinical XR conversation.</h1>
          <div className="mt-10 grid gap-5 text-muted">
            <p className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-cyan-400" />
              <a href="mailto:safevitals.xr@gmail.com" className="hover:text-text transition-colors">safevitals.xr@gmail.com</a>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-cyan-400" />
              <div className="flex flex-col sm:flex-row sm:gap-3">
                <a href="tel:+917989639799" className="hover:text-text transition-colors">+91 7989639799</a>
                <span className="hidden sm:inline text-white/30">|</span>
                <a href="tel:+919989359799" className="hover:text-text transition-colors">+91 9989359799</a>
              </div>
            </p>
            <p className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-cyan-400" />
              <a href="https://linkedin.com/in/karuna-rahul-mamidi" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">linkedin.com/in/karuna-rahul-mamidi</a>
            </p>
            <p className="flex items-center gap-3">
              <span className="h-5 w-5 font-mono font-bold text-cyan-400 flex items-center justify-center text-sm">𝕏</span>
              <a href="https://x.com/SafeVitalsXR" target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">x.com/SafeVitalsXR</a>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=2nd+Floor,+5-24,+THOTA+STREET,+NEAR+KANAKA+DURGA+TEMPLE,+Yerravaram,+East+Godavari,+Andhra+Pradesh,+533435"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text transition-colors leading-relaxed"
              >
                2nd Floor, 5-24, THOTA STREET,<br />
                NEAR KANAKA DURGA TEMPLE,<br />
                Yerravaram, East Godavari,<br />
                Andhra Pradesh, 533435
              </a>
            </p>
          </div>
        </div>
        <div className="rounded border border-white/10 bg-surface/60 p-5 md:p-8">
          <ContactForm />
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="relative h-[400px] overflow-hidden rounded-xl border border-white/10">
          <iframe
            title="SafeVitals Location Map"
            width="100%"
            height="100%"
            src="https://www.openstreetmap.org/export/embed.html?bbox=82.0200%2C17.2850%2C82.0300%2C17.2950&amp;layer=mapnik&amp;marker=17.2900%2C82.0250"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(10%) contrast(120%)" }}
          />
          {/* Floating Address Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm rounded-lg border border-white/10 bg-background/95 p-4 backdrop-blur-md shadow-lg">
            <h3 className="font-heading text-sm font-semibold text-text mb-1">SafeVitals Technologies Pvt Ltd</h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              2nd Floor, 5-24, THOTA STREET,<br />
              NEAR KANAKA DURGA TEMPLE,<br />
              Yerravaram, East Godavari, AP - 533435
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=2nd+Floor,+5-24,+THOTA+STREET,+NEAR+KANAKA+DURGA+TEMPLE,+Yerravaram,+East+Godavari,+Andhra+Pradesh,+533435"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 inline-block text-xs font-mono text-[#00D4FF] hover:underline"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
