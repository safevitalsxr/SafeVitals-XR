"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function HeroScene({ scrollProgress }: SceneProps) {
  // Sync page scroll directly to this scene's container transformations
  const opacity = useTransform(scrollProgress, [0.0, 0.08, 0.12], [1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.0, 0.12], [1, 0.95]);
  const y = useTransform(scrollProgress, [0.0, 0.12], [0, -30]);
  const filter = useTransform(scrollProgress, [0.0, 0.08, 0.12], ["blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      style={{ opacity, scale, y, filter }}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-transparent px-6 z-40 overflow-hidden pointer-events-none"
    >


      {/* Cyber Corner Metadata Annotations */}
      <div className="absolute inset-x-6 top-16 flex justify-between font-mono text-[7px] text-white/30 tracking-[0.2em] z-10">
        <span>SYS // TELEMETRY // XR-01</span>
        <span>LATENCY // 4.2MS</span>
      </div>
      <div className="absolute inset-x-6 bottom-16 flex justify-between font-mono text-[7px] text-white/20 tracking-[0.2em] z-10">
        <span>PATIENT_NET // V3.90</span>
        <span>INCUBATION // RTIH</span>
      </div>

      {/* Center Storytelling Card */}
      <div className="text-center space-y-6 w-full max-w-[310px] z-10 relative rounded-[32px] bg-white/[0.02] border border-white/10 p-7 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)]">
        {/* Massive Luxury Titanium Typography */}
        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-[0.22em] uppercase leading-none select-none bg-clip-text text-transparent bg-gradient-to-b from-[#F9FAFB] via-[#E2E8F0] to-[#94A3B8]">
          SafeVitals <span className="text-[#00D4FF] drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">XR</span>
        </h1>

        {/* Custom Telemetry ECG Wave Widget */}
        <div className="h-8 w-40 mx-auto overflow-hidden relative opacity-70 bg-white/[0.02] border border-white/10 rounded-full flex items-center px-4 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
          <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
            <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path
                d="M 0 50 L 20 50 Q 25 35 30 50 L 33 50 L 38 10 L 43 90 L 48 50 L 53 50 Q 58 35 63 50 L 80 50 L 100 50 M 100 50 L 120 50 Q 125 35 130 50 L 133 50 L 138 10 L 143 90 L 148 50 L 153 50 Q 158 35 163 50 L 180 50 L 200 50"
                fill="none"
                stroke="#00D4FF"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_8px_rgba(0,212,255,0.7)]"
              />
            </svg>
          </div>
        </div>

        {/* Minimal Subtitle */}
        <p className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/45 font-semibold leading-relaxed pl-0.5 select-none">
          Real-Time Healthcare Intelligence
        </p>
      </div>

      {/* Floating scroll indicator at bottom */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 opacity-40 z-10">
        <span className="text-[8px] font-mono tracking-[0.25em] uppercase text-white/60">Scroll to begin</span>
        <div className="w-1.5 h-4 bg-white/10 rounded-full relative overflow-hidden flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[#00D4FF] absolute top-1"
          />
        </div>
      </div>
    </motion.div>
  );
}
