import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SafeVitals XR — our mission to transform critical-care monitoring into immersive clinical intelligence using XR, digital twins, and AI-powered analytics.",
  openGraph: {
    title: "About SafeVitals XR",
    description:
      "Our mission: make critical-care data understandable at a glance through immersive spatial visualization.",
    url: "https://safevitals.in/about",
  },
  alternates: {
    canonical: "https://safevitals.in/about",
  },
};

const roadmap = ["Hospital Integration", "Cloud Diagnostics", "AI Prediction Models", "Global Accessibility"];

export default function AboutPage() {
  return (
    <main className="pt-32">
      <section className="section-shell pb-20">
        <p className="eyebrow mb-4">About SafeVitals XR</p>
        <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
          We are building the interface hospitals need when seconds matter.
        </h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Mission</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Make critical-care data understandable at a glance by transforming fragmented monitor signals into immersive clinical intelligence.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Vision</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              A future where every hospital can see patient risk, ward pressure, and intervention impact in a single real-time spatial view.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-surface/35 py-20">
        <div className="section-shell">
          <p className="eyebrow mb-4">Roadmap</p>
          <div className="relative border-l border-cyan/25 pl-7">
            {roadmap.map((item, index) => (
              <div key={item} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.18rem] top-1 h-4 w-4 rounded-full border border-cyan bg-void" />
                <p className="font-mono text-xs text-cyan">PHASE 0{index + 1}</p>
                <h2 className="mt-2 text-3xl font-semibold">{item}</h2>
                <p className="mt-3 max-w-2xl text-muted">
                  Each phase advances the same principle: preserve existing hospital workflows while making clinical state more visible.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="max-w-4xl">
          <p className="eyebrow mb-4">Founder story</p>
          <h2 className="text-3xl font-semibold md:text-5xl">Built from the belief that doctors should not have to decode a room of disconnected screens.</h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            SafeVitals XR is shaped around the clinical reality of monitoring overload: too many numbers, too many places to look, and too little contextual time during emergencies.
          </p>
        </div>
      </section>
    </main>
  );
}
