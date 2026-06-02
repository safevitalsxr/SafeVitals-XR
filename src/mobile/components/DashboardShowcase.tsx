"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Wifi, Battery } from "lucide-react";

const SLIDES = [
  {
    id: "icu",
    label: "ICU Monitoring",
    title: "Bedside Telemetry",
    component: function IcuSlide() {
      return (
        <div className="flex flex-col h-full bg-[#030712] p-4 text-white font-mono space-y-4 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Bed 12-A</span>
            <span className="text-[9px] text-white/40">Patient: M. Kaelen</span>
          </div>

          {/* Vitals Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#0A1221] border border-cyan-500/10 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[8px] text-white/50">HEART RATE</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-white tracking-tight animate-pulse">76</span>
                <span className="text-[9px] text-cyan-400">BPM</span>
              </div>
            </div>
            <div className="bg-[#0A1221] border border-emerald-500/10 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[8px] text-white/50">O₂ SAT</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-[#10B981] tracking-tight">98</span>
                <span className="text-[9px] text-emerald-400">%</span>
              </div>
            </div>
            <div className="bg-[#0A1221] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[8px] text-white/50">BLOOD TEMP</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-white tracking-tight">36.8</span>
                <span className="text-[9px] text-white/40">°C</span>
              </div>
            </div>
            <div className="bg-[#0A1221] border border-white/5 rounded-xl p-3 flex flex-col justify-between">
              <span className="text-[8px] text-white/50">SYS / DIA</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xl font-bold text-white tracking-tight leading-none">118/79</span>
                <span className="text-[8px] text-white/40">mmHg</span>
              </div>
            </div>
          </div>

          {/* Scrolling ECG Waveform */}
          <div className="bg-[#000000] border border-white/5 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between text-[8px] text-white/40">
              <span>ECG WAVEFORM (II-LEAD)</span>
              <span className="text-cyan-400 animate-pulse">● LIVE</span>
            </div>
            <div className="h-10 w-full overflow-hidden relative">
              <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
                <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path
                    d="M 0 50 L 20 50 Q 25 35 30 50 L 33 50 L 38 15 L 43 85 L 48 50 L 53 50 Q 58 35 63 50 L 80 50 L 100 50 M 100 50 L 120 50 Q 125 35 130 50 L 133 50 L 138 15 L 143 85 L 148 50 L 153 50 Q 158 35 163 50 L 180 50 L 200 50"
                    fill="none"
                    stroke="#00D4FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_2px_rgba(0,212,255,0.7)]"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    id: "alerts",
    label: "Emergency Alerts",
    title: "Critical Telemetry Alerts",
    component: function AlertsSlide() {
      return (
        <div className="flex flex-col h-full bg-[#030712] p-4 text-white font-mono space-y-4 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
            <span className="text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              ALERT CENTER
            </span>
            <span className="text-[9px] text-red-500/60 animate-pulse">CRITICAL</span>
          </div>

          {/* Alarm Card */}
          <div className="bg-red-500/5 border border-red-500/25 rounded-xl p-4 space-y-3 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
            <div className="flex items-center justify-between">
              <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">
                ICU WARD B
              </span>
              <span className="text-[9px] text-white/50">2 mins ago</span>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-bold text-white leading-snug">
                Sepsis Risk Spike detected in Bed 04
              </h4>
              <p className="text-[10px] text-white/55 leading-relaxed font-light">
                Model SV-Neural flags risk level increase from 32% to 84%. Core temp elevated to 38.9°C.
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <span className="text-[9px] text-white/40">Patient: A. Henderson</span>
              <span className="text-[10px] font-bold text-red-400">84% RISK</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-[10px] uppercase text-center tracking-wider transition-colors">
              Dispatch ICU
            </button>
            <button className="py-2.5 rounded-lg bg-[#0A1221] border border-white/10 text-white font-semibold text-[10px] uppercase text-center tracking-wider transition-colors">
              Dismiss
            </button>
          </div>
        </div>
      );
    },
  },
  {
    id: "multi",
    label: "Multi Patient View",
    title: "Ward Bed Roster",
    component: function MultiSlide() {
      return (
        <div className="flex flex-col h-full bg-[#030712] p-4 text-white font-mono space-y-3.5 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">WARD OVERVIEW</span>
            <span className="text-[9px] text-white/40">Active: 4 beds</span>
          </div>

          {/* Patient bed rows */}
          <div className="space-y-2">
            {[
              { bed: "Bed 01", name: "Sarah J.", hr: "82", color: "text-[#10B981]", status: "STABLE" },
              { bed: "Bed 02", name: "Robert C.", hr: "118", color: "text-red-400", status: "TACHY" },
              { bed: "Bed 03", name: "Elena R.", hr: "74", color: "text-[#10B981]", status: "STABLE" },
              { bed: "Bed 04", name: "Marcus V.", hr: "94", color: "text-amber-400", status: "WARN" },
            ].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-[#0A1221] border border-white/5 rounded-lg p-2.5 hover:border-white/10 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/40">{p.bed}</span>
                  <span className="text-xs font-bold text-white tracking-tight">{p.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] text-white/40">HR (BPM)</span>
                    <span className={`text-xs font-bold ${p.color}`}>{p.hr}</span>
                  </div>
                  <span
                    className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      p.status === "STABLE"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : p.status === "TACHY"
                        ? "bg-red-500/10 text-red-400 animate-pulse"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Clinical Trend Analytics",
    component: function AnalyticsSlide() {
      return (
        <div className="flex flex-col h-full bg-[#030712] p-4 text-white font-mono space-y-4 select-none">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">ICU TRENDS</span>
            <span className="text-[9px] text-white/40">Interval: 12h</span>
          </div>

          {/* Mini analytics graph using raw SVG */}
          <div className="bg-[#000000] border border-white/5 rounded-xl p-3 space-y-2">
            <span className="text-[8px] text-white/40 block">AVERAGE HEART RATE TREND</span>
            <div className="h-16 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                {/* Grid lines */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

                {/* Trend line path */}
                <path
                  d="M 0 30 Q 15 25 30 15 T 60 22 T 80 8 T 100 18"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                {/* Glow overlay */}
                <path
                  d="M 0 30 Q 15 25 30 15 T 60 22 T 80 8 T 100 18 L 100 40 L 0 40 Z"
                  fill="url(#analytics-glow)"
                  opacity="0.15"
                />
                <defs>
                  <linearGradient id="analytics-glow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Health Stats */}
          <div className="space-y-1 font-sans">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/50">Discharge Readiness</span>
              <span className="font-mono text-emerald-400 font-semibold">92%</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/50">Avg Sepsis Alert Risk</span>
              <span className="font-mono text-white">12.4%</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/50">Alert Response Latency</span>
              <span className="font-mono text-cyan-400 font-semibold">18s</span>
            </div>
          </div>
        </div>
      );
    },
  },
];

export function DashboardShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const ActiveComponent = SLIDES[activeIndex].component;

  return (
    <section className="bg-[#030712] px-6 py-20 border-b border-white/5 relative overflow-hidden">
      {/* Background visual flare */}
      <div className="absolute right-[-10%] bottom-[10%] w-80 h-80 rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="space-y-2 mb-12">
        <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
          Dashboard Showcase
        </span>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white leading-tight">
          Clinical Telemetry In Your Pocket
        </h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed font-light">
          Real-time patient updates and alarms wherever you are. Designed to keep doctors and care teams connected instantly.
        </p>
      </div>

      {/* Slide Navigation Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(idx)}
            className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-wider uppercase font-semibold transition-all duration-300 ${
              idx === activeIndex
                ? "bg-[#00D4FF]/10 border-[#00D4FF] text-[#00D4FF] shadow-[0_0_15px_rgba(0,212,255,0.1)]"
                : "bg-white/5 border-white/5 text-white/40 hover:text-white hover:border-white/20"
            }`}
          >
            {slide.label}
          </button>
        ))}
      </div>

      {/* Phone Mockup Frame */}
      <div className="relative w-full max-w-[290px] mx-auto aspect-[9/18.5] bg-black border-[7px] border-slate-900 rounded-[42px] shadow-[0_25px_60px_rgba(0,0,0,0.6)] outline outline-1 outline-white/10 flex flex-col justify-between overflow-hidden">
        {/* Notch / Dynamic Island */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-2xl z-40 flex items-center justify-between px-3">
          {/* Subtle green active camera dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-black" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Mock Status Bar */}
        <div className="h-10 pt-4 px-6 flex justify-between items-center text-[10px] font-mono text-white/80 z-30 select-none bg-[#030712]">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Mock Screen Content (sliding animation frame) */}
        <div className="flex-grow overflow-hidden relative bg-[#030712]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mock Home Indicator Bar */}
        <div className="h-6 flex justify-center items-center bg-[#030712] z-30 select-none">
          <div className="w-24 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </section>
  );
}
