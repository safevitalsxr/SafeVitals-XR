"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Layout, Activity, AlertTriangle, ShieldCheck } from "lucide-react";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function DashboardScene({ scrollProgress }: SceneProps) {
  // Scene 8 Range: 0.70 -> 0.82
  const sceneOpacity = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], [0.96, 1, 1, 0.96]);
  const rotateX = useTransform(scrollProgress, [0.66, 0.82], [10, -10]);
  const y = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], [25, 0, 0, -25]);

  // Headline animation - active throughout the scene's visibility
  const textOpacity = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], [0, 1, 1, 0]);
  const textY = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], [15, 0, 0, -15]);
  const textScale = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], [0.92, 1, 1, 1.05]);
  const textFilter = useTransform(scrollProgress, [0.66, 0.70, 0.78, 0.82], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity, scale, rotateX, y, transformStyle: "preserve-3d" }}
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col justify-between px-6 py-20 z-30 pointer-events-none perspective-[1000px]"
    >
      {/* Narrative Header */}
      <div className="text-center h-16 flex items-center justify-center">
        <motion.div style={{ opacity: textOpacity, y: textY, scale: textScale, filter: textFilter }} className="space-y-1">
          <h2 className="font-heading text-lg font-extrabold text-white tracking-tight">
            Actionable Healthcare Intelligence.
          </h2>
          <p className="font-sans text-xs text-white/55 font-light">
            Unified telemetry consoles for care teams.
          </p>
        </motion.div>
      </div>

      {/* Central Station Console Mockup */}
      <div className="relative w-full max-w-[320px] mx-auto aspect-[1.3] rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-hidden flex flex-col justify-between font-mono p-2">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/5 pb-1.5 text-[7px] text-white/50 select-none">
          <div className="flex items-center gap-1">
            <Layout className="w-2.5 h-2.5 text-[#00D4FF]" />
            <span className="font-bold text-white tracking-wider">SV CENTRAL STATION V3</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[6px] text-emerald-400 font-bold uppercase tracking-widest">GATEWAY LINK ACTIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="flex-grow grid grid-cols-5 gap-1.5 pt-1.5">
          {/* Left Mini Sidebar */}
          <div className="col-span-1 border-r border-white/5 pr-1 flex flex-col gap-2 pt-1 select-none">
            <div className="w-5 h-5 rounded bg-white/5 border border-white/10 flex items-center justify-center">
              <Activity className="w-3 h-3 text-[#00D4FF]" />
            </div>
            <div className="w-5 h-5 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-3 h-3 text-red-400" />
            </div>
            <div className="w-5 h-5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-center">
              <span className="text-[8px] font-bold text-white/40">AN</span>
            </div>
          </div>

          {/* Main Panel grid */}
          <div className="col-span-4 grid grid-rows-3 gap-1.5">
            {/* Row 1: Bed 01 Patient Cell (Stable) */}
            <div className="row-span-1 rounded bg-white/[0.02] border border-[#00D4FF]/25 p-1.5 flex items-center justify-between select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex flex-col">
                <span className="text-[6px] text-white/40">BED 01</span>
                <span className="text-[8px] font-bold text-white leading-tight">Sarah J.</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Micro ECG wave */}
                <svg width="45" height="12" className="opacity-50">
                  <path d="M 0 6 L 10 6 Q 12 0 15 6 L 17 6 L 20 2 L 23 10 L 25 6 L 28 6 Q 30 0 32 6 L 45 6" fill="none" stroke="#10B981" strokeWidth="1" />
                </svg>
                <div className="flex flex-col items-end">
                  <span className="text-[5px] text-white/40">HR</span>
                  <span className="text-[9px] font-bold text-emerald-400 animate-pulse">72</span>
                </div>
              </div>
            </div>

            {/* Row 2: Bed 02 Patient Cell (Critical Warning) */}
            <div className="row-span-1 rounded bg-red-950/15 border border-red-500/35 backdrop-blur-md p-1.5 flex items-center justify-between select-none shadow-[inset_0_0_10px_rgba(239,68,68,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="flex flex-col">
                <span className="text-[6px] text-red-400 font-bold">BED 02 [CRIT]</span>
                <span className="text-[8px] font-bold text-white leading-tight">Robert C.</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Tachycardia Wave */}
                <svg width="45" height="12" className="opacity-75">
                  <path d="M 0 6 L 8 6 L 11 0 L 14 12 L 17 6 L 23 6 L 26 0 L 29 12 L 32 6 L 38 6 L 41 0 L 45 12" fill="none" stroke="#EF4444" strokeWidth="1" />
                </svg>
                <div className="flex flex-col items-end">
                  <span className="text-[5px] text-red-400">HR</span>
                  <span className="text-[9px] font-bold text-red-500 animate-pulse">112</span>
                </div>
              </div>
            </div>

            {/* Row 3: Live Ward Alert Triage Log */}
            <div className="row-span-1 rounded bg-white/[0.01] border border-white/10 p-1.5 flex flex-col justify-between select-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <span className="text-[6px] text-white/30 block">SYSTEM STATUS SUMMARY LOGS</span>
              <div className="flex items-center justify-between text-[7px] leading-none">
                <span className="text-[#00D4FF] font-semibold">&gt; INCOMING PATIENT BEDS: OK</span>
                <span className="text-white/40">WARD B</span>
              </div>
              <div className="flex items-center justify-between text-[7px] leading-none">
                <span className="text-red-400 font-semibold animate-pulse">&gt; ALARM TRIG: 1 CONSOLE ACTIVE</span>
                <span className="text-red-500 font-semibold">U-ALERT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Console Status Footer */}
        <div className="border-t border-white/5 pt-1 mt-1 text-[6px] text-white/30 select-none flex justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
            SECURE ACCESS AUTHORIZED
          </span>
          <span>SESS: 884-X</span>
        </div>
      </div>

      <div className="h-6" />
    </motion.div>
  );
}
