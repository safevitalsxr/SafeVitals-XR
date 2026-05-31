"use client";

export function ReserveSection() {
  return (
    <section className="bg-surface py-40 border-t border-border/50">
      <div className="section-shell max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl mb-16 text-text">Reserve Demo</h2>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Hospital Name</label>
            <input type="text" className="bg-background border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors" />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Doctor Name</label>
            <input type="text" className="bg-background border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Email</label>
            <input type="email" className="bg-background border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-text-secondary">Department</label>
            <input type="text" className="bg-background border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors" />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary">Hospital Size</label>
            <select className="bg-background border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors appearance-none">
              <option>1-50 Beds</option>
              <option>51-200 Beds</option>
              <option>201-500 Beds</option>
              <option>500+ Beds</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-text-secondary">Message</label>
            <textarea rows={4} className="bg-background border border-border rounded px-4 py-3 text-text focus:outline-none focus:border-accent transition-colors resize-none" />
          </div>

          <div className="md:col-span-2 mt-4">
            <button type="button" className="w-full rounded bg-white text-background font-medium py-4 transition-colors hover:bg-accent hover:text-white">
              Reserve Demo
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
