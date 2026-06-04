"use client";

import { ReserveForm } from "../reserve-form";

export function ReserveSection() {
  return (
    <section className="bg-surface py-40 border-t border-border/50">
      <div className="section-shell max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl mb-16 text-text">Reserve Demo</h2>
        
        <div className="rounded border border-white/10 bg-surface-alt/45 p-6 md:p-10">
          <ReserveForm />
        </div>
      </div>
    </section>
  );
}
