"use client";

export function ProblemSection() {
  return (
    <section className="bg-background py-40">
      <div className="section-shell grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
        <div>
          <h2 className="font-heading text-4xl leading-tight text-text md:text-6xl sticky top-40">
            Healthcare<br />Monitoring<br />Is Fragmented
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-16 font-sans text-xl md:text-3xl text-text-secondary">
          <p>Doctors navigate disconnected systems.</p>
          <p>Critical insights remain hidden behind screens.</p>
          <p>Emergencies demand clarity.</p>
          <p className="text-text font-medium border-l-2 border-accent pl-6 py-2">
            Current systems deliver numbers.<br />Not understanding.
          </p>
        </div>
      </div>
    </section>
  );
}
