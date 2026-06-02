"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function PatientScene({ scrollProgress }: SceneProps) {
  // Scene 2 & 3 Range: 0.10 -> 0.28
  // 1. Overall Scene Visibility
  const sceneOpacity = useTransform(scrollProgress, [0.10, 0.12, 0.26, 0.28], [0, 1, 1, 0]);
  
  // 2. Patient Body Silhouette (Fades out earlier than vitals to symbolize "only seeing numbers")
  const bodyOpacity = useTransform(scrollProgress, [0.10, 0.13, 0.20, 0.23], [0, 0.55, 0.55, 0]);
  
  // 3. Vitals Nodes (Fade in at 0.16, stay visible till 0.28)
  const vitalsOpacity = useTransform(scrollProgress, [0.15, 0.18, 0.26, 0.28], [0, 1, 1, 0]);

  // 4. Headline 1: "Every patient is generating data." (Visible: 0.11 -> 0.18)
  const text1Opacity = useTransform(scrollProgress, [0.10, 0.12, 0.16, 0.18], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollProgress, [0.10, 0.12, 0.16, 0.18], [20, 0, 0, -20]);

  // 5. Headline 2: "But hospitals only see numbers." (Visible: 0.19 -> 0.27)
  const text2Opacity = useTransform(scrollProgress, [0.18, 0.20, 0.25, 0.27], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollProgress, [0.18, 0.20, 0.25, 0.27], [20, 0, 0, -20]);

  // Parallax shifts
  const bodyY = useTransform(scrollProgress, [0.10, 0.28], [20, -20]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity }}
      className="absolute inset-0 w-full h-full bg-black flex flex-col justify-between px-6 py-20 z-30 pointer-events-none"
    >
      {/* Top Narrative Copy Panel */}
      <div className="relative w-full h-20 flex items-center justify-center text-center">
        {/* Text 1 */}
        <motion.p
          style={{ opacity: text1Opacity, y: text1Y }}
          className="absolute font-sans text-lg sm:text-xl font-light text-white/90 max-w-xs leading-relaxed"
        >
          Every patient is generating data.
        </motion.p>

        {/* Text 2 */}
        <motion.p
          style={{ opacity: text2Opacity, y: text2Y }}
          className="absolute font-sans text-lg sm:text-xl font-light text-[#FF8A8A] max-w-xs leading-relaxed"
        >
          But hospitals only see numbers.
        </motion.p>
      </div>

      {/* Silhouette & Vitals Mapping Center */}
      <motion.div
        style={{ y: bodyY }}
        className="relative flex-grow flex items-center justify-center"
      >
        {/* Torso Silhouette Graphic */}
        <motion.svg
          style={{ opacity: bodyOpacity }}
          className="w-full h-full max-h-[320px] max-w-[280px]"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Glowing human vector line */}
          <path
            d="M 60 180 C 60 180, 75 140, 75 110 L 80 50 C 80 25, 120 25, 120 50 L 125 110 C 125 140, 140 180, 140 180"
            stroke="rgba(0, 212, 255, 0.5)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Ribs / Lungs structure */}
          <path d="M 83 95 Q 100 90 117 95" stroke="rgba(0, 212, 255, 0.25)" strokeWidth="1" />
          <path d="M 80 110 Q 100 105 120 110" stroke="rgba(0, 212, 255, 0.25)" strokeWidth="1" />
          <path d="M 78 125 Q 100 120 122 125" stroke="rgba(0, 212, 255, 0.25)" strokeWidth="1" />

          {/* Beating cardiac center */}
          <motion.circle
            cx="93"
            cy="95"
            r="5"
            fill="#00D4FF"
            animate={{ scale: [1, 1.35, 1.05, 1.45, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.svg>

        {/* Floating Vitals HUD Markers (Overlay) */}
        <motion.div
          style={{ opacity: vitalsOpacity }}
          className="absolute inset-0 w-full h-full z-20"
        >
          {/* Heart Rate: Top Left */}
          <div className="absolute left-[8%] top-[25%] flex flex-col items-start">
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">HR</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-extrabold text-[#00D4FF] animate-pulse">72</span>
              <span className="text-[9px] font-mono text-white/50">BPM</span>
            </div>
            <svg width="60" height="20" className="opacity-40 mt-1">
              <line x1="0" y1="5" x2="45" y2="5" stroke="#00D4FF" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="45" y1="5" x2="55" y2="15" stroke="#00D4FF" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* SpO2: Top Right */}
          <div className="absolute right-[8%] top-[25%] flex flex-col items-end text-right">
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">SpO₂</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-extrabold text-[#10B981]">98</span>
              <span className="text-[9px] font-mono text-white/50">%</span>
            </div>
            <svg width="60" height="20" className="opacity-40 mt-1 flex justify-end">
              <line x1="60" y1="5" x2="15" y2="5" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="15" y1="5" x2="5" y2="15" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* BP: Bottom Left */}
          <div className="absolute left-[8%] bottom-[25%] flex flex-col items-start">
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">BP</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-heading font-extrabold text-white">120/80</span>
              <span className="text-[8px] font-mono text-white/40">mmHg</span>
            </div>
            <svg width="60" height="20" className="opacity-40 mt-1">
              <line x1="0" y1="15" x2="45" y2="15" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="45" y1="15" x2="55" y2="5" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Temp: Bottom Right */}
          <div className="absolute right-[8%] bottom-[25%] flex flex-col items-end text-right">
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">TEMP</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-heading font-extrabold text-white">36.8</span>
              <span className="text-[9px] font-mono text-white/50">°C</span>
            </div>
            <svg width="60" height="20" className="opacity-40 mt-1">
              <line x1="60" y1="15" x2="15" y2="15" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="15" y1="15" x2="5" y2="5" stroke="white" strokeWidth="0.8" strokeDasharray="3 3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>

      {/* Empty space matching footer spacing */}
      <div className="h-6" />
    </motion.div>
  );
}
