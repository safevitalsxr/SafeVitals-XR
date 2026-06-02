"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Calendar, X, Activity, Heart } from "lucide-react";

export function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleReserveClick = () => {
    const el = document.getElementById("reserve-demo");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full bg-[#030712] overflow-hidden flex flex-col justify-between px-6 py-8">
      {/* Background Holographic Patient Graphic (High Performance vector outline) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-45 pointer-events-none">
        {/* Glowing radial backdrops */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px]" />

        <svg
          className="w-full h-full max-w-[420px] max-h-[85vh] select-none"
          viewBox="0 0 400 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Scanning horizontal grid lines */}
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 212, 255, 0.04)" strokeWidth="0.8" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />

          {/* Glowing laser scanning bar */}
          <motion.line
            x1="20"
            y1="50"
            x2="380"
            y2="50"
            stroke="rgba(0, 212, 255, 0.45)"
            strokeWidth="2"
            className="drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
            animate={{
              y: [120, 580, 120],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Wireframe Patient Outline */}
          <g className="stroke-[#00D4FF]/25" strokeWidth="1" fill="none">
            {/* Head and Neck */}
            <circle cx="200" cy="140" r="30" className="stroke-[#00D4FF]/40" />
            <path d="M 190 168 L 190 185 M 210 168 L 210 185" />
            {/* Torso */}
            <path d="M 160 185 C 160 185, 200 180, 240 185 L 250 330 C 250 330, 200 340, 150 330 Z" className="stroke-[#00D4FF]/30" strokeWidth="1.5" />
            {/* Shoulders & Arms */}
            <path d="M 160 185 L 120 220 L 95 320" />
            <path d="M 240 185 L 280 220 L 305 320" />
            {/* Legs */}
            <path d="M 165 330 L 155 480 L 140 610" />
            <path d="M 235 330 L 245 480 L 260 610" />
          </g>

          {/* Interactive telemetry nodes */}
          {/* Heart Node */}
          <g>
            <motion.circle
              cx="200"
              cy="230"
              r="8"
              fill="#00D4FF"
              className="opacity-70"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.circle
              cx="200"
              cy="230"
              r="20"
              stroke="#00D4FF"
              strokeWidth="1"
              fill="none"
              animate={{ scale: [1, 2.2, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            {/* ECG wave connection */}
            <path d="M 200 230 L 250 250 M 250 250 H 310" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <foreignObject x="315" y="235" width="80" height="30">
              <span className="text-[9px] font-mono text-[#00D4FF] bg-[#0A1221]/90 border border-[#00D4FF]/30 px-1 py-0.5 rounded backdrop-blur-sm block">
                HR: 76 bpm
              </span>
            </foreignObject>
          </g>

          {/* Brain Node */}
          <g>
            <motion.circle
              cx="200"
              cy="135"
              r="4"
              fill="#2563EB"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <path d="M 200 135 L 140 120 M 140 120 H 90" stroke="rgba(37, 99, 235, 0.4)" strokeWidth="1" strokeDasharray="3 3" />
            <foreignObject x="35" y="105" width="50" height="30">
              <span className="text-[9px] font-mono text-blue-400 bg-[#0A1221]/90 border border-blue-500/20 px-1 py-0.5 rounded backdrop-blur-sm block text-right">
                EEG: OK
              </span>
            </foreignObject>
          </g>

          {/* Limb Telemetry */}
          <g>
            <circle cx="95" cy="320" r="3" fill="#00D4FF" />
            <path d="M 95 320 L 50 340 H 15" stroke="rgba(0, 212, 255, 0.3)" strokeWidth="0.8" />
            <foreignObject x="15" y="343" width="70" height="30">
              <span className="text-[8px] font-mono text-white/50 block">
                SPO2: 99%
              </span>
            </foreignObject>
          </g>
        </svg>
      </div>

      {/* Header Bar */}
      <div className="z-10 flex items-center justify-between w-full border-b border-white/5 pb-4 bg-gradient-to-b from-[#030712] via-[#030712]/90 to-transparent">
        <span className="font-heading text-base font-semibold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70">
          SafeVitals XR
        </span>
        <button
          onClick={handleReserveClick}
          className="px-4 py-1.5 rounded-full border border-[#00D4FF]/40 bg-[#00D4FF]/5 hover:bg-[#00D4FF]/10 text-xs text-[#00D4FF] font-medium tracking-wide transition-all shadow-[0_0_10px_rgba(0,212,255,0.15)] flex items-center gap-1 active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5" />
          Reserve
        </button>
      </div>

      {/* Main Copy Overlay */}
      <div className="z-10 flex flex-col justify-end gap-5 mb-8 mt-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-3"
        >
          {/* Neon cyan badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,212,255,0.05)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
              Spatial Clinical Telemetry
            </span>
          </div>

          <h1 className="font-heading text-5xl font-extrabold tracking-tighter text-[#F9FAFB] leading-[1.05] drop-shadow-sm select-none">
            SafeVitals <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-blue-500">XR</span>
          </h1>

          <h2 className="font-heading text-xl text-white/90 font-medium tracking-tight">
            Real-Time Healthcare Intelligence
          </h2>

          <p className="font-sans text-sm text-white/60 leading-relaxed font-light pr-2 select-none">
            Connect existing hospital monitoring systems and visualize patient health through cloud, mobile and XR.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-3.5 w-full pt-2"
        >
          <button
            onClick={handleReserveClick}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#2563EB] hover:from-[#00e1ff] hover:to-[#1d4ed8] text-white font-semibold text-sm shadow-[0_0_30px_rgba(0,212,255,0.25)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Calendar className="w-4 h-4" />
            Reserve Demo
          </button>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-full py-4 rounded-xl bg-[#0A1221]/80 hover:bg-[#0A1221] border border-white/10 backdrop-blur-md text-white font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Play className="w-4 h-4 text-[#00D4FF] fill-[#00D4FF]" />
            Watch Video
          </button>
        </motion.div>
      </div>

      {/* Floating telemetry HUD bar at bottom */}
      <div className="z-10 w-full border-t border-white/5 pt-4 flex justify-between items-center bg-gradient-to-t from-[#030712] via-[#030712]/90 to-transparent">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00D4FF] animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 tracking-wider">SECURE TELEMETRY LINK</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[10px] font-mono text-emerald-400 font-medium">ONLINE</span>
        </div>
      </div>

      {/* Full-screen Video/Demo Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg p-4"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-[480px] aspect-[9/16] bg-[#0A1221] border border-white/10 rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,212,255,0.15)] flex flex-col justify-between p-6"
            >
              {/* Fake Interactive Demo Screen */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00D4FF] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  DEMO RUNTIME
                </span>
                <span className="text-xs font-mono text-white/50">SECURE SHELL</span>
              </div>

              {/* Holographic Video Placeholder representing a glowing digital heart and vascular systems */}
              <div className="flex-grow flex flex-col justify-center items-center gap-6">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#00D4FF]/20 animate-spin" style={{ animationDuration: "12s" }} />
                  <div className="absolute w-36 h-36 rounded-full border border-dashed border-blue-500/20 animate-spin" style={{ animationDuration: "8s", animationDirection: "reverse" }} />
                  
                  {/* Floating particles */}
                  <motion.div 
                    className="absolute bg-cyan-400 w-1 h-1 rounded-full"
                    animate={{ y: [-40, -100], x: [-10, 10], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                  />
                  <motion.div 
                    className="absolute bg-blue-400 w-1 h-1 rounded-full"
                    animate={{ y: [-30, -80], x: [10, -10], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, delay: 0.8 }}
                  />

                  <Heart className="w-16 h-16 text-[#00D4FF] drop-shadow-[0_0_15px_rgba(0,212,255,0.8)] animate-pulse" />
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-white font-heading">
                    Immersive Spatial Telemetry System
                  </p>
                  <p className="text-xs font-mono text-white/40 max-w-xs mx-auto">
                    Real-time mapping of patient parameters into spatial environment coordinates.
                  </p>
                </div>
              </div>

              {/* Console log outputs */}
              <div className="space-y-1 font-mono text-[9px] text-[#00D4FF]/70 bg-black/40 p-3 rounded-lg border border-white/5">
                <div>&gt; CONNECTING SECURE GATEWAY (safevitals-rt)...</div>
                <div>&gt; DECRYPTING CLINICAL DATA SHELL... OK</div>
                <div>&gt; INJECTING XR TELEMETRY STREAM V3...</div>
                <div className="text-emerald-400">&gt; PIPELINE STATUS: ACTIVE [60 FPS]</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
