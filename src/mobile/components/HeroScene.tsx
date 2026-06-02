"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function HeroScene({ scrollProgress }: SceneProps) {
  // Scene 1 Active Range: 0.0 -> 0.12
  // It starts fully visible and fades/blurs out as we scroll past 0.08 towards 0.12
  const opacity = useTransform(scrollProgress, [0, 0.08, 0.12], [1, 1, 0]);
  const scale = useTransform(scrollProgress, [0, 0.12], [1, 1.08]);
  const blurValue = useTransform(scrollProgress, [0, 0.08, 0.12], ["blur(0px)", "blur(0px)", "blur(12px)"]);
  const y = useTransform(scrollProgress, [0, 0.12], [0, -50]);

  return (
    <motion.div
      style={{ opacity, scale, filter: blurValue, y }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black px-6 z-40 pointer-events-none"
    >
      <div className="text-center space-y-6 max-w-xs md:max-w-md">
        {/* Massive Typography */}
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-[#F9FAFB] uppercase leading-none select-none">
          SafeVitals <span className="text-[#00D4FF]">XR</span>
        </h1>

        {/* Animated ECG Pulse Line Container */}
        <div className="h-10 w-44 mx-auto overflow-hidden relative opacity-70">
          <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
            <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path
                d="M 0 50 L 20 50 Q 25 35 30 50 L 33 50 L 38 10 L 43 90 L 48 50 L 53 50 Q 58 35 63 50 L 80 50 L 100 50 M 100 50 L 120 50 Q 125 35 130 50 L 133 50 L 138 10 L 143 90 L 148 50 L 153 50 Q 158 35 163 50 L 180 50 L 200 50"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_5px_rgba(0,212,255,0.8)]"
              />
            </svg>
          </div>
        </div>

        {/* Minimal Subtitle */}
        <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/45 font-semibold leading-relaxed pl-1 select-none">
          Real-Time Healthcare Intelligence
        </p>
      </div>

      {/* Floating scroll indicator at bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[8px] font-mono tracking-widest uppercase">Scroll to begin</span>
        <motion.div
          className="w-1 h-3 bg-white rounded-full"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
