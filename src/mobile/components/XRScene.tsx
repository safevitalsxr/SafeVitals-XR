"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Sparkles, Target, Heart } from "lucide-react";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function XRScene({ scrollProgress }: SceneProps) {
  // Scene 9 Range: 0.82 -> 0.92
  const sceneOpacity = useTransform(scrollProgress, [0.78, 0.82, 0.88, 0.92], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.78, 0.82, 0.88, 0.92], [0.96, 1, 1, 0.96]);
  const y = useTransform(scrollProgress, [0.78, 0.82, 0.88, 0.92], [25, 0, 0, -25]);

  // Rotations mimicking spatial tilt
  const rotateY = useTransform(scrollProgress, [0.78, 0.92], [10, -10]);
  const rotateX = useTransform(scrollProgress, [0.78, 0.92], [-8, 8]);

  // Text 1: "See beyond numbers."
  const text1Opacity = useTransform(scrollProgress, [0.78, 0.82, 0.85, 0.87], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollProgress, [0.78, 0.82, 0.85, 0.87], [15, 0, 0, -15]);

  // Text 2: "See the patient."
  const text2Opacity = useTransform(scrollProgress, [0.85, 0.87, 0.88, 0.92], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollProgress, [0.85, 0.87, 0.88, 0.92], [15, 0, 0, -15]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity, scale, y, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col justify-between px-6 py-20 z-30 pointer-events-none perspective-[1000px]"
    >
      {/* HUD spatial visor screen boundary indicators */}
      <div className="absolute inset-4 border border-white/[0.03] pointer-events-none z-10 rounded-2xl">
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20" />
      </div>

      {/* Dynamic Narrative Header */}
      <div className="relative w-full h-20 flex items-center justify-center text-center">
        {/* Text 1 */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute space-y-1 max-w-xs"
        >
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
            See Beyond Numbers.
          </h2>
          <p className="font-sans text-xs text-white/55 font-light">
            Anatomical telemetry overlay maps vitals where they belong.
          </p>
        </motion.div>

        {/* Text 2 */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute space-y-1 max-w-xs"
        >
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#00D4FF] tracking-tight leading-none">
            See the Patient.
          </h2>
          <p className="font-sans text-xs text-[#00D4FF]/70 font-light">
            Hands-free spatial diagnosis at bedside.
          </p>
        </motion.div>
      </div>

      {/* Spatial XR Environment Visualizer */}
      <div className="relative flex-grow flex items-center justify-center">
        {/* Background visionOS radial grid mapping */}
        <div className="absolute w-[85%] h-[85%] rounded-full border border-dashed border-[#00D4FF]/5 z-0 pointer-events-none flex items-center justify-center">
          <div className="w-[70%] h-[70%] rounded-full border border-dashed border-white/5" />
        </div>

        {/* Holographic patient silhouette torso */}
        <svg
          className="w-full h-full max-h-[220px] z-10 select-none opacity-40 animate-pulse"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M 70 170 C 70 170, 80 145, 80 115 L 85 60 C 85 40, 115 40, 115 60 L 120 115 C 120 145, 130 170, 130 170"
            stroke="rgba(0, 212, 255, 0.4)"
            strokeWidth="1.2"
            fill="none"
          />
          <circle cx="98" cy="98" r="4" fill="#00D4FF" />
          {/* Target reticle dot on chest */}
          <motion.circle
            cx="98"
            cy="98"
            r="12"
            stroke="#00D4FF"
            strokeWidth="0.8"
            fill="none"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Floating spatial glass panels surrounding body */}
        <div className="absolute inset-0 w-full h-full z-20">
          {/* Spatial Card 1: Live HR (Tethered to chest) */}
          <motion.div
            className="absolute left-[3%] top-[25%] bg-white/[0.04] border border-white/15 px-3 py-2 rounded-2xl backdrop-blur-xl flex flex-col justify-between shadow-[0_15px_35px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.15)] select-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-[#00D4FF] animate-pulse" />
              <span className="text-[6px] font-mono text-white/50 tracking-wider">HR SPATIAL</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-heading font-extrabold text-[#00D4FF] tracking-tight">72</span>
              <span className="text-[8px] font-mono text-white/40">BPM</span>
            </div>
          </motion.div>

          {/* Spatial Card 2: Live Respiration (Tethered to lungs) */}
          <motion.div
            className="absolute right-[3%] top-[30%] bg-white/[0.04] border border-white/15 px-3 py-2 rounded-2xl backdrop-blur-xl flex flex-col justify-between shadow-[0_15px_35px_rgba(255,255,255,0.05),inset_0_1px_1px_rgba(255,255,255,0.15)] select-none"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <div className="flex items-center gap-1.5">
              <Target className="w-3 h-3 text-white/60" />
              <span className="text-[6px] font-mono text-white/50 tracking-wider">RESP TETHER</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-heading font-extrabold text-white tracking-tight">14</span>
              <span className="text-[8px] font-mono text-white/40">RPM</span>
            </div>
          </motion.div>

          {/* Spatial Gestures Indicator: Pinch Gesture Glow Dot (represents clinician interaction) */}
          <div className="absolute left-[30%] bottom-[20%] flex items-center justify-center pointer-events-none">
            {/* Gesture pinch indicator ring */}
            <motion.div
              className="absolute w-8 h-8 rounded-full border border-dashed border-[#00D4FF]/40"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Pinch dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
            <span className="text-[7px] font-mono text-[#00D4FF] ml-2 tracking-wider whitespace-nowrap bg-black/40 px-2 py-0.5 rounded border border-cyan-500/10">
              PINCH ROTATE ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Floating Sparkle HUD footer */}
      <div className="w-full flex items-center justify-center gap-1.5 text-[8px] font-mono text-[#00D4FF]/55 tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-[#00D4FF] animate-pulse" />
        <span>VISIONOS CLINICAL ENGINE CALIBRATED</span>
      </div>
    </motion.div>
  );
}

