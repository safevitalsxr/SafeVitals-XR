import type { Metadata } from "next";
import { Briefcase, Mail, Sparkles, Send } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at SafeVitals XR. Join our team building spatial clinical intelligence for critical care.",
  openGraph: {
    title: "Careers | SafeVitals XR",
    description:
      "Join SafeVitals XR. We are transforming hospital patient monitoring with spatial computing and real-time telemetry.",
    url: "https://safevitals.in/careers",
  },
  alternates: {
    canonical: "https://safevitals.in/careers",
  },
};

const FUTURE_ROLES = [
  {
    title: "Embedded Systems & Firmware Engineer",
    department: "Hardware & IoT",
    location: "Yerravaram / Remote",
    type: "Full-Time",
    skills: ["C/C++", "RTOS", "Microcontrollers", "Hardware Telemetry"],
  },
  {
    title: "Spatial Computing & XR Developer",
    department: "XR & Visualization",
    location: "Remote / Hybrid",
    type: "Full-Time",
    skills: ["Unity", "WebGL", "Three.js", "Spatial UI/UX"],
  },
  {
    title: "Biomedical Data & ML Specialist",
    department: "Clinical Intelligence",
    location: "Remote / Hybrid",
    type: "Full-Time",
    skills: ["Biomarkers", "Python", "Signal Processing", "Predictive AI"],
  },
  {
    title: "Full-Stack Cloud & Telemetry Engineer",
    department: "Software Engineering",
    location: "Remote / Hybrid",
    type: "Full-Time",
    skills: ["Next.js", "WebSockets", "Supabase", "TypeScript"],
  },
];

export default function CareersPage() {
  return (
    <main className="pt-32 pb-24">
      {/* Hero Section */}
      <section className="section-shell pb-16">
        <div className="max-w-4xl">
          {/* Active Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Notice: Currently No Open Roles</span>
          </div>

          <h1 className="text-4xl font-semibold leading-tight md:text-6xl text-white tracking-tight mb-6">
            Help Us Shape the Future of Spatial Healthcare
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-3xl">
            At SafeVitals XR, we are replacing fragmented hospital display monitors with real-time, spatial clinical intelligence. While we don&apos;t have immediate job openings, we are always looking to connect with visionary talent for upcoming engineering cohorts.
          </p>
        </div>
      </section>

      {/* No Current Jobs Banner */}
      <section className="section-shell mb-20">
        <div className="rounded-3xl bg-white/[0.01] border border-white/[0.08] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
                <Briefcase className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">0 Open Positions Right Now</h3>
                <p className="text-white/60 text-base max-w-xl">
                  Our core engineering and clinical research team is fully staffed for current project milestones. Submit your details below to join our Talent Network for priority consideration on future openings.
                </p>
              </div>
            </div>

            <a
              href="mailto:careers@safevitals.in?subject=Talent%20Network%20Interest%20-%20SafeVitals%20XR"
              className="rounded-full bg-white text-black px-6 py-3.5 font-semibold text-sm hover:bg-gray-100 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            >
              <Mail className="w-4 h-4" />
              Email Resume Directly
            </a>
          </div>
        </div>
      </section>

      {/* Typical Roles We Hire For */}
      <section className="section-shell py-12 border-t border-white/10">
        <div className="mb-12">
          <p className="eyebrow mb-3">Future Opportunities</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Roles We Routinely Explore</h2>
          <p className="text-white/50 text-sm mt-2 max-w-2xl">
            When positions open, these are the primary disciplines we recruit for across hardware, firmware, and spatial visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FUTURE_ROLES.map((role) => (
            <div
              key={role.title}
              className="rounded-2xl bg-white/[0.01] border border-white/[0.05] p-6 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                    {role.department}
                  </span>
                  <span className="text-xs font-mono text-white/40">{role.type}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                <p className="text-xs font-mono text-white/50 mb-6">{role.location}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.04]">
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono bg-white/[0.03] border border-white/[0.08] text-white/60 px-2.5 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Talent Network Form */}
      <section className="section-shell pt-16">
        <div className="rounded-3xl bg-slate-950/80 border border-cyan-500/20 p-8 md:p-12 relative overflow-hidden max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold">
              Talent Network Registration
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay on Our Radar</h3>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Submit your profile to be considered as soon as a matching position opens up at SafeVitals XR.
          </p>

          <form
            action="mailto:careers@safevitals.in"
            method="post"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-2">Full Name</label>
                <input
                  type="text"
                  name="Name"
                  required
                  placeholder="Jane Doe"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-2">Email Address</label>
                <input
                  type="email"
                  name="Email"
                  required
                  placeholder="jane@example.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-white/60 mb-2">Area of Expertise / Preferred Role</label>
              <select
                name="Role Focus"
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="Embedded Systems & Firmware">Embedded Systems & Firmware</option>
                <option value="Spatial Computing & XR">Spatial Computing & XR Developer</option>
                <option value="Biomedical Data & ML">Biomedical Data & ML Specialist</option>
                <option value="Full-Stack Cloud & Telemetry">Full-Stack Cloud & Telemetry</option>
                <option value="Other">Other / Operations</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-white/60 mb-2">LinkedIn or Portfolio URL</label>
              <input
                type="url"
                name="Portfolio"
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-white/60 mb-2">Short Introduction / Note</label>
              <textarea
                name="Introduction"
                rows={3}
                placeholder="Tell us briefly about your background and what excites you about spatial critical care..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3.5 px-6 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <Send className="w-4 h-4" />
              Submit Application to Talent Network
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
