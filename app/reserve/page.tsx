import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { ReserveForm } from "@/components/reserve-form";

export const metadata: Metadata = {
  title: "Reserve Demo",
  description:
    "Reserve a SafeVitals XR demo for your hospital. Designed for clinical leaders, innovation teams, and hospital executives exploring XR-powered patient monitoring.",
  openGraph: {
    title: "Reserve a SafeVitals XR Demo",
    description:
      "See how SafeVitals XR fits your hospital pilot. Demo designed for clinical leaders and hospital innovation teams.",
    url: "https://safevitals.in/reserve",
  },
  alternates: {
    canonical: "https://safevitals.in/reserve",
  },
};

export default function ReservePage() {
  return (
    <main className="pt-32">
      <section className="section-shell grid min-h-[calc(100vh-8rem)] gap-12 pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="eyebrow mb-4">Reserve demo</p>
          <h1 className="text-balance text-5xl font-semibold leading-tight md:text-7xl">See how SafeVitals XR can fit your hospital pilot.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            Share your department context and current monitoring environment. The demo flow is designed for clinical leaders, innovation teams, and hospital executives.
          </p>
          <div className="mt-8 flex gap-3 text-sm text-muted">
            <ShieldCheck className="h-5 w-5 text-mint" />
            <span>Submissions store in Supabase when project keys are configured.</span>
          </div>
        </div>
        <div className="rounded border border-white/10 bg-surface/70 p-5 shadow-2xl md:p-8">
          <ReserveForm />
        </div>
      </section>
    </main>
  );
}
