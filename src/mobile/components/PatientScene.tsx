"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function PatientScene({ scrollProgress }: SceneProps) {
  // Patient Scene Range: 0.12 -> 0.28
  // Scene transitions
  const sceneOpacity = useTransform(scrollProgress, [0.08, 0.12, 0.24, 0.28], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.08, 0.12, 0.24, 0.28], [0.96, 1, 1, 0.96]);
  const y = useTransform(scrollProgress, [0.08, 0.12, 0.24, 0.28], [25, 0, 0, -25]);

  // Torso outline fades out at 0.20 to reveal only numbers
  const bodyOpacity = useTransform(scrollProgress, [0.08, 0.12, 0.19, 0.22], [0, 0.6, 0.6, 0]);
  const vitalsOpacity = useTransform(scrollProgress, [0.08, 0.12, 0.24, 0.28], [0, 1, 1, 0]);

  // Copy transitions (perfect handover, no dead zones)
  const text1Opacity = useTransform(scrollProgress, [0.08, 0.12, 0.18, 0.20], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollProgress, [0.08, 0.12, 0.18, 0.20], [15, 0, 0, -15]);

  const text2Opacity = useTransform(scrollProgress, [0.18, 0.20, 0.24, 0.28], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollProgress, [0.18, 0.20, 0.24, 0.28], [15, 0, 0, -15]);

  const bodyY = useTransform(scrollProgress, [0.12, 0.28], [15, -15]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity, scale, y }}
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col justify-between px-6 py-20 z-30 pointer-events-none"
    >
      {/* Top Narrative Copy */}
      <div className="relative w-full h-20 flex items-center justify-center text-center">
        <motion.p
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute font-sans text-lg sm:text-xl font-light text-white/90 max-w-xs leading-relaxed"
        >
          Every patient is generating data.
        </motion.p>

        <motion.p
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute font-sans text-lg sm:text-xl font-light text-[#FF8A8A] max-w-xs leading-relaxed"
        >
          But hospitals only see numbers.
        </motion.p>
      </div>

      {/* Torso Silhouette & Vitals Overlay */}
      <motion.div style={{ y: bodyY }} className="relative flex-grow flex items-center justify-center">
        {/* Holographic scanning bounding box */}
        <motion.div
          style={{ opacity: bodyOpacity }}
          className="absolute w-[240px] h-[240px] border border-white/[0.03] rounded-3xl flex items-center justify-center pointer-events-none"
        >
          {/* Scanning corners */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t border-l border-[#00D4FF]/40 rounded-tl" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t border-r border-[#00D4FF]/40 rounded-tr" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b border-l border-[#00D4FF]/40 rounded-bl" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b border-r border-[#00D4FF]/40 rounded-br" />

          {/* Micro HUD status overlay */}
          <div className="absolute top-4 left-4 font-mono text-[5px] text-[#00D4FF]/50 tracking-wider">
            FOCUS // GRID_S2
          </div>
          <div className="absolute bottom-4 right-4 font-mono text-[5px] text-[#00D4FF]/50 tracking-wider">
            ID: SV_PATIENT_992
          </div>
        </motion.div>

        {/* Silhouette Vector */}
        <motion.svg
          style={{ opacity: bodyOpacity }}
          className="w-full h-full max-h-[300px] max-w-[280px] z-10"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M 60 180 C 60 180, 75 140, 75 110 L 80 50 C 80 25, 120 25, 120 50 L 125 110 C 125 140, 140 180, 140 180"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="1.5"
            fill="none"
          />
          <path d="M 83 95 Q 100 90 117 95" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" />
          <path d="M 80 110 Q 100 105 120 110" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" />
          <path d="M 78 125 Q 100 120 122 125" stroke="rgba(0, 212, 255, 0.2)" strokeWidth="1" />

          {/* Heart beating dot */}
          <motion.circle
            cx="93"
            cy="95"
            r="4.5"
            fill="#00D4FF"
            animate={{ scale: [1, 1.4, 1.05, 1.5, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="drop-shadow-[0_0_8px_rgba(0,212,255,0.9)]"
          />
        </motion.svg>

        {/* Floating Vitals Panels */}
        <motion.div style={{ opacity: vitalsOpacity }} className="absolute inset-0 w-full h-full z-20">
          {/* Heart Rate: Top Left */}
          <div className="absolute left-[2%] top-[18%] flex flex-col items-start bg-[#0A1221]/40 border border-[#00D4FF]/20 px-3 py-2 rounded-2xl backdrop-blur-xl shadow-[0_8px_20px_rgba(0,212,255,0.06)] min-w-[90px]">
            <span className="text-[6px] font-mono text-white/40 uppercase tracking-widest">HR // BPM</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-heading font-extrabold text-[#00D4FF] animate-pulse">72</span>
              <span className="text-[8px] font-mono text-[#00D4FF]/60 font-bold">LNK</span>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#00D4FF]/50 to-transparent mt-1" />
          </div>

          {/* SpO2: Top Right */}
          <div className="absolute right-[2%] top-[18%] flex flex-col items-end text-right bg-[#0A1221]/40 border border-[#10B981]/20 px-3 py-2 rounded-2xl backdrop-blur-xl shadow-[0_8px_20px_rgba(16,185,129,0.06)] min-w-[90px]">
            <span className="text-[6px] font-mono text-white/40 uppercase tracking-widest">SpO₂ // %</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-heading font-extrabold text-[#10B981]">98</span>
              <span className="text-[8px] font-mono text-[#10B981]/60 font-bold">SYS</span>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-l from-[#10B981]/50 to-transparent mt-1" />
          </div>

          {/* BP: Bottom Left */}
          <div className="absolute left-[2%] bottom-[18%] flex flex-col items-start bg-[#0A1221]/40 border border-white/10 px-3 py-2 rounded-2xl backdrop-blur-xl shadow-[0_8px_20px_rgba(255,255,255,0.02)] min-w-[90px]">
            <span className="text-[6px] font-mono text-white/40 uppercase tracking-widest">BP // MMHG</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-heading font-extrabold text-white">120/80</span>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-r from-white/30 to-transparent mt-1.5" />
          </div>

          {/* Temp: Bottom Right */}
          <div className="absolute right-[2%] bottom-[18%] flex flex-col items-end text-right bg-[#0A1221]/40 border border-white/10 px-3 py-2 rounded-2xl backdrop-blur-xl shadow-[0_8px_20px_rgba(255,255,255,0.02)] min-w-[90px]">
            <span className="text-[6px] font-mono text-white/40 uppercase tracking-widest">TEMP // °C</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-xl font-heading font-extrabold text-white">36.8</span>
            </div>
            <div className="w-12 h-[2px] bg-gradient-to-l from-white/30 to-transparent mt-1.5" />
          </div>
        </motion.div>
      </motion.div>

      <div className="h-6" />
    </motion.div>
  );
}
