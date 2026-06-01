import type { Metadata } from "next";
import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ReserveForm } from "@/components/reserve-form";

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
            <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-cyan" /> hello@safevitalsxr.com</p>
            <p className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan" /> +1 (415) 555-0198</p>
            <p className="flex items-center gap-3"><Linkedin className="h-5 w-5 text-cyan" /> linkedin.com/company/safevitals-xr</p>
            <p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-cyan" /> San Francisco, CA</p>
          </div>
        </div>
        <div className="rounded border border-white/10 bg-surface/60 p-5 md:p-8">
          <ReserveForm />
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="relative h-[360px] overflow-hidden rounded border border-white/10 bg-[#07111f]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,229,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="absolute left-[22%] top-[42%] h-3 w-3 rounded-full bg-cyan shadow-glow" />
          <div className="absolute left-[48%] top-[34%] h-3 w-3 rounded-full bg-mint shadow-glow" />
          <div className="absolute left-[68%] top-[51%] h-3 w-3 rounded-full bg-xr shadow-violet" />
          <p className="absolute bottom-5 left-5 font-mono text-xs uppercase tracking-widest text-muted">Pilot conversations open across North America, Europe, and Asia-Pacific</p>
        </div>
      </section>
    </main>
  );
}
