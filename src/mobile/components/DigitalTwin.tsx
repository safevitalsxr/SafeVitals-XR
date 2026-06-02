"use client";

import { motion } from "framer-motion";
import { Heart, Activity, Sparkles } from "lucide-react";

export function DigitalTwin() {
  return (
    <section className="bg-[#030712] px-6 py-20 border-b border-white/5 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />

      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <Sparkles className="w-3 h-3 text-[#00D4FF]" />
          <span className="text-[9px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
            Immersive Telemetry
          </span>
        </div>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white">
          See Beyond Numbers
        </h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed font-light max-w-sm mx-auto">
          Visualize live patient health in immersive XR environments. Move from static telemetry grids to spatial anatomical twin models.
        </p>
      </div>

      {/* Holographic Twin Display */}
      <div className="relative w-full max-w-[340px] mx-auto aspect-square rounded-3xl bg-[#0A1221]/30 border border-white/5 backdrop-blur-md p-6 overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.3)]">
        {/* Decorative Radar Sweep Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="#00D4FF" strokeWidth="0.2" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="30" stroke="#00D4FF" strokeWidth="0.2" />
            <circle cx="50" cy="50" r="15" stroke="#00D4FF" strokeWidth="0.2" strokeDasharray="2 2" />
            <line x1="50" y1="5" x2="50" y2="95" stroke="#00D4FF" strokeWidth="0.2" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="#00D4FF" strokeWidth="0.2" />
          </svg>
        </div>

        {/* Rotating Circular Calibration Rings */}
        <motion.div
          className="absolute w-[80%] h-[80%] rounded-full border border-dashed border-[#00D4FF]/10 z-0 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[60%] h-[60%] rounded-full border border-[#00D4FF]/10 z-0 pointer-events-none"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Holographic torso vector graphic */}
        <svg
          className="w-full h-full max-h-[220px] z-10 select-none opacity-60"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Patient silhouette contour */}
          <path
            d="M 60 170 C 60 170, 75 140, 75 110 L 80 50 C 80 30, 120 30, 120 50 L 125 110 C 125 140, 140 170, 140 170"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="1.2"
            fill="none"
          />

          {/* Ribcage arcs */}
          <path d="M 85 90 Q 100 85 115 90" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.8" />
          <path d="M 82 105 Q 100 100 118 105" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.8" />
          <path d="M 80 120 Q 100 115 120 120" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="0.8" />

          {/* Heart beating pulse effect */}
          <g>
            {/* Cardiac double-pulse waves */}
            <motion.circle
              cx="95"
              cy="90"
              r="6"
              fill="#00D4FF"
              className="opacity-80"
              animate={{ scale: [1, 1.35, 1.05, 1.45, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="95"
              cy="90"
              r="16"
              stroke="#00D4FF"
              strokeWidth="0.8"
              fill="none"
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="95"
              cy="90"
              r="28"
              stroke="#00D4FF"
              strokeWidth="0.5"
              fill="none"
              animate={{ scale: [1, 3.2], opacity: [0.4, 0] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
            />
          </g>

          {/* Head calibration dot */}
          <circle cx="100" cy="40" r="2" fill="#2563EB" />
          <motion.circle
            cx="100"
            cy="40"
            r="6"
            stroke="#2563EB"
            strokeWidth="0.5"
            fill="none"
            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Dotted HUD connectors */}
          <path d="M 95 90 L 45 75 H 20" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="0.8" strokeDasharray="2 2" />
          <path d="M 120 120 L 155 135 H 180" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="0.8" strokeDasharray="2 2" />
        </svg>

        {/* Floating HTML Telemetry Readouts over image */}
        <div className="absolute top-4 left-4 font-mono text-[9px] text-[#00D4FF] bg-black/50 border border-[#00D4FF]/20 px-2 py-1 rounded backdrop-blur">
          GRID LOCK: TRUE
        </div>

        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-emerald-400 bg-black/50 border border-emerald-500/20 px-2 py-1 rounded backdrop-blur flex items-center gap-1">
          <Heart className="w-2.5 h-2.5 animate-pulse" />
          SYS: 120/80
        </div>

        <div className="absolute top-4 right-4 font-mono text-[9px] text-white/50 bg-black/50 border border-white/10 px-2 py-1 rounded backdrop-blur">
          TWIN ID: SV-08
        </div>

        <div className="absolute bottom-4 right-4 font-mono text-[9px] text-[#00D4FF] bg-black/50 border border-[#00D4FF]/20 px-2 py-1 rounded backdrop-blur flex items-center gap-1">
          <Activity className="w-2.5 h-2.5" />
          SPO2: 98%
        </div>
      </div>

      {/* Accompanying benefits cards */}
      <div className="grid grid-cols-2 gap-3 mt-8 max-w-[340px] mx-auto">
        <div className="bg-[#0A1221]/50 border border-white/5 p-4 rounded-xl backdrop-blur-md">
          <h4 className="font-heading text-xs font-bold text-white mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
            Spatial Vitals
          </h4>
          <p className="font-sans text-[10px] text-white/50 leading-relaxed font-light">
            Patient telemetry is overlaid in spatial coordinates, helping clinicians check status hands-free.
          </p>
        </div>

        <div className="bg-[#0A1221]/50 border border-white/5 p-4 rounded-xl backdrop-blur-md">
          <h4 className="font-heading text-xs font-bold text-white mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Active Warning
          </h4>
          <p className="font-sans text-[10px] text-white/50 leading-relaxed font-light">
            Color-coded alerts draw attention to organ anomaly centers before vital indexes drop.
          </p>
        </div>
      </div>
    </section>
  );
}
