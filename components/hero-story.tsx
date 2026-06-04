"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Cpu, DatabaseZap, Eye, HeartPulse, MonitorDot, RadioTower } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const scenes = [
  {
    icon: MonitorDot,
    label: "ICU Monitor",
    title: "Healthcare data is trapped inside machines.",
    copy: "Critical signals live across bedside hardware, hall displays, and legacy exports while teams make decisions under pressure.",
  },
  {
    icon: Cpu,
    label: "SafeVitals Bridge",
    title: "SafeVitals Bridge securely captures patient data.",
    copy: "The bridge connects current hospital monitors into a modern data path without asking teams to replace infrastructure.",
  },
  {
    icon: DatabaseZap,
    label: "Cloud Intelligence",
    title: "Streaming vitals into a unified intelligence layer.",
    copy: "Vitals, trends, events, and alerts become one clinically readable stream for the hospital.",
  },
  {
    icon: Eye,
    label: "XR Dashboard",
    title: "One dashboard. Every patient.",
    copy: "Doctors see the ward as a living system, moving from unit status to patient-level urgency in seconds.",
  },
  {
    icon: HeartPulse,
    label: "Digital Twin",
    title: "See patient health in real time.",
    copy: "Digital twins turn raw telemetry into spatial context: perfusion, oxygenation, risk, and intervention history.",
  },
  {
    icon: RadioTower,
    label: "VR Doctor Interface",
    title: "The future of critical care is immersive.",
    copy: "SafeVitals XR makes hospital intelligence visible, navigable, and immediately actionable.",
  },
];

export function HeroStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rail = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [1, 1, 1, 0.35]);

  return (
    <section ref={ref} className="relative min-h-[300vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden pt-24">
        <motion.div style={{ opacity }} className="section-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow mb-5">Immersive critical care platform</p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.02] md:text-7xl">
              See Patient Health. Not Just Numbers.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              SafeVitals XR converts fragmented ICU monitoring into a real-time XR experience
              powered by digital twins, AI insights, and SafeVitals Bridge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reserve" className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#00D4FF]">
                Reserve Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <Link href="/platform" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#00D4FF]/50 hover:bg-[#00D4FF]/10">
                Watch Platform
              </Link>
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <motion.div
              style={{ scale: glowScale }}
              className="absolute inset-8 rounded-full bg-[conic-gradient(from_180deg,#00e5ff,#2563ff,#7c3aed,#00ff9d,#00e5ff)] opacity-20 blur-3xl"
            />
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.035]" />
            <motion.div style={{ x: rail }} className="absolute left-8 top-16 flex w-[360%] gap-5">
              {scenes.map((scene, index) => {
                const Icon = scene.icon;
                return (
                  <article key={scene.title} className="w-[23rem] shrink-0 rounded border border-white/12 bg-surface/80 p-5 shadow-2xl backdrop-blur md:w-[27rem]">
                    <div className="mb-16 flex items-center justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded bg-cyan-400/10 text-cyan-400">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs text-muted">0{index + 1} / 06</span>
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">{scene.label}</p>
                    <h2 className="mt-4 text-2xl font-semibold leading-tight">{scene.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-muted">{scene.copy}</p>
                    <div className="mt-8 h-1 overflow-hidden rounded-full bg-white/10">
                      <div className="vital-line h-full w-2/3" />
                    </div>
                  </article>
                );
              })}
            </motion.div>
            <div className="absolute bottom-8 left-8 right-8 rounded border border-cyan-400/20 bg-black/80 p-4 backdrop-blur">
              <div className="grid grid-cols-3 gap-3 font-mono text-xs text-muted">
                <span className="text-cyan-400">Bridge online</span>
                <span>184k signals/min</span>
                <span className="text-emerald-400">Twin sync 99.9%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
