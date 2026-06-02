"use client";

import { motion } from "framer-motion";
import { Monitor, Cpu, Server, Layout, Eye } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Hospital Monitor",
    description: "Physical bedside patient monitors collect raw telemetry data directly from the patient in real time.",
    icon: Monitor,
    color: "#00D4FF",
    details: "Reads ECG waveforms, blood pressure intervals, oxygen saturation, and body temperatures.",
  },
  {
    number: "02",
    title: "SafeVitals Bridge",
    description: "Our compact IoT gateway translates raw machine signals into high-security, low-latency digital streams.",
    icon: Cpu,
    color: "#3B82F6",
    details: "Encrypts streams locally using advanced medical encryption protocols with under 10ms processing time.",
  },
  {
    number: "03",
    title: "Cloud Platform",
    description: "The secure medical cloud processes pipelines, manages alerts, and feeds predictive AI models.",
    icon: Server,
    color: "#7C3AED",
    details: "HIPAA-compliant hosting detects patient sepsis risk levels and vital trend anomalies automatically.",
  },
  {
    number: "04",
    title: "Doctor Dashboard",
    description: "Clinicians view live telemetry feeds on responsive dashboards, tablets, and phones.",
    icon: Layout,
    color: "#10B981",
    details: "Features smart notifications, custom vitals alarm thresholds, and multi-patient ward overviews.",
  },
  {
    number: "05",
    title: "XR Visualization",
    description: "Live telemetry is rendered into spatial patient digital twins inside Apple Vision Pro or Meta Quest.",
    icon: Eye,
    color: "#F43F5E",
    details: "Projects real-time holographic data panels directly beside the patient, allowing hands-free checks.",
  },
];

export function Timeline() {
  return (
    <section className="bg-[#030712] px-6 py-20 border-b border-white/5 relative overflow-hidden">
      {/* Glow background accents */}
      <div className="absolute left-[-30%] top-[30%] w-96 h-96 rounded-full bg-violet-600/5 blur-[150px] pointer-events-none" />

      <div className="space-y-2 mb-16">
        <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
          Data Pipeline
        </span>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white leading-tight">
          How SafeVitals XR Works
        </h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed font-light">
          A seamless flow of clinical telemetry from the patient&apos;s physical bedside monitor to virtual interfaces.
        </p>
      </div>

      <div className="relative pl-10 pr-2">
        {/* Vertical line through timeline */}
        <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00D4FF] via-[#7C3AED] to-[#F43F5E] opacity-25" />

        {/* Dynamic moving glow on line */}
        <motion.div
          className="absolute left-[19px] w-[3px] h-32 bg-gradient-to-b from-[#00D4FF] to-blue-500 rounded-full"
          animate={{
            y: [0, 480, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Timeline Steps */}
        <div className="space-y-12">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative flex flex-col gap-4">
                {/* Glowing Left Node */}
                <motion.div
                  className="absolute left-[-34px] top-1.5 w-7 h-7 rounded-full flex items-center justify-center border font-mono text-[10px] font-bold z-10"
                  style={{
                    backgroundColor: "#030712",
                    borderColor: step.color,
                    boxShadow: `0 0 10px ${step.color}44`,
                    color: step.color,
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", damping: 15, delay: 0.1 }}
                >
                  {step.number}
                </motion.div>

                {/* Content Card */}
                <motion.div
                  className="rounded-2xl bg-[#0A1221]/40 border border-white/5 p-5 relative overflow-hidden backdrop-blur-md"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Subtle corner card glow */}
                  <div
                    className="absolute -top-6 -right-6 w-16 h-16 rounded-full blur-[25px]"
                    style={{ backgroundColor: step.color, opacity: 0.1 }}
                  />

                  <div className="flex items-center gap-3 mb-2.5">
                    <div
                      className="p-1.5 rounded-lg border"
                      style={{
                        borderColor: `${step.color}22`,
                        backgroundColor: `${step.color}11`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: step.color }} />
                    </div>
                    <h3 className="font-heading text-base font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs text-white/70 leading-relaxed font-light mb-3">
                    {step.description}
                  </p>

                  <div className="border-t border-white/5 pt-2.5 mt-2.5">
                    <p className="font-mono text-[9px] text-white/40 leading-relaxed uppercase tracking-wider">
                      Technical Spec
                    </p>
                    <p className="font-sans text-[11px] text-white/50 leading-relaxed mt-0.5">
                      {step.details}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
