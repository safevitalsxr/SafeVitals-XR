import type { Metadata } from "next";
import { BrainCircuit, Cloud, Cpu, Eye, HeartPulse } from "lucide-react";
import { XrVisual } from "@/components/xr-visual";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Explore the SafeVitals XR platform architecture — Bridge hardware connector, cloud analytics, XR dashboard, digital twins, and AI-powered clinical intelligence for hospitals.",
  openGraph: {
    title: "SafeVitals XR Platform Architecture",
    description:
      "A clinical intelligence stack: bridge connectors, cloud layer, XR dashboard, digital twins, and AI triage — all in one immersive interface.",
    url: "https://safevitals.in/platform",
  },
  alternates: {
    canonical: "https://safevitals.in/platform",
  },
};

const layers = [
  {
    title: "Bridge",
    icon: Cpu,
    copy: "A hospital-edge connector for monitor feeds, device streams, and ward-level telemetry. It preserves current investments while making data XR-ready.",
  },
  {
    title: "Cloud Layer",
    icon: Cloud,
    copy: "A normalized clinical event stream with audit-aware data routing, analytics, and deployment controls for multi-hospital scale.",
  },
  {
    title: "XR Dashboard",
    icon: Eye,
    copy: "A spatial operations interface for clinicians to see patient state, ward pressure, triage changes, and alert context.",
  },
  {
    title: "Digital Twin",
    icon: HeartPulse,
    copy: "A real-time patient model that translates vitals into anatomy-informed visual patterns and interpretable risk markers.",
  },
  {
    title: "AI Engine",
    icon: BrainCircuit,
    copy: "Signal interpretation for early warning, trend summaries, and ranked intervention priorities.",
  },
];

export default function PlatformPage() {
  return (
    <main className="pt-32">
      <section className="section-shell grid gap-10 pb-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Platform architecture</p>
          <h1 className="text-balance text-5xl font-semibold leading-tight md:text-7xl">A clinical intelligence stack for immersive care.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            SafeVitals XR connects monitor hardware, cloud analytics, AI triage, and digital twins into one real-time doctor interface.
          </p>
        </div>
        <XrVisual compact />
      </section>

      <section className="border-y border-white/10 bg-surface/35 py-20">
        <div className="section-shell grid gap-8">
          {layers.map((layer, index) => {
            const Icon = layer.icon;
            return (
              <article key={layer.title} className="grid gap-6 border-b border-white/10 pb-8 last:border-b-0 last:pb-0 md:grid-cols-[.2fr_.8fr_1.3fr] md:items-start">
                <span className="font-mono text-sm text-cyan">0{index + 1}</span>
                <div className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded border border-cyan/25 bg-cyan/10 text-cyan">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-2xl font-semibold">{layer.title}</h2>
                </div>
                <p className="text-lg leading-8 text-muted">{layer.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="rounded border border-white/10 bg-white/[0.035] p-6 md:p-10">
          <p className="eyebrow mb-4">Deployment model</p>
          <h2 className="max-w-3xl text-3xl font-semibold md:text-5xl">Pilot one department, then scale across the hospital network.</h2>
          <div className="mt-10 grid gap-3 font-mono text-sm text-muted md:grid-cols-4">
            {["Device ingestion", "Clinical review", "XR operations", "Network rollout"].map((step) => (
              <div key={step} className="rounded border border-white/10 bg-void/60 p-4">{step}</div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
