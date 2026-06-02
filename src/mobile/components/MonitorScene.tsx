"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { WifiOff } from "lucide-react";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function MonitorScene({ scrollProgress }: SceneProps) {
  // Scene 4 Range: 0.28 -> 0.42
  const sceneOpacity = useTransform(scrollProgress, [0.24, 0.28, 0.38, 0.42], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.24, 0.28, 0.38, 0.42], [0.96, 1, 1, 0.96]);
  const rotateX = useTransform(scrollProgress, [0.24, 0.42], [10, -10]);
  const y = useTransform(scrollProgress, [0.24, 0.28, 0.38, 0.42], [25, 0, 0, -25]);

  // Headline opacity - stays active throughout the scene visibility peak
  const textOpacity = useTransform(scrollProgress, [0.24, 0.28, 0.38, 0.42], [0, 1, 1, 0]);
  const textY = useTransform(scrollProgress, [0.24, 0.28, 0.38, 0.42], [15, 0, 0, -15]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity, scale, rotateX, y, transformStyle: "preserve-3d" }}
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col justify-between px-6 py-20 z-30 pointer-events-none perspective-[1000px]"
    >
      {/* Narrative Headline */}
      <div className="text-center h-16 flex items-center justify-center">
        <motion.p
          style={{ opacity: textOpacity, y: textY }}
          className="font-sans text-base sm:text-lg font-light text-white/80 max-w-xs leading-relaxed"
        >
          Existing monitoring systems were never built for immersive care.
        </motion.p>
      </div>

      {/* Bedside ICU Monitor Bezel */}
      <div className="relative w-full max-w-[320px] mx-auto aspect-[4/3] rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-col justify-between overflow-hidden">
        {/* Anti-glare layer reflection sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.045] pointer-events-none z-20" />

        {/* Neon warning light at the top of the monitor */}
        <div className="absolute top-0 inset-x-0 h-1 bg-[#EF4444]/65 animate-pulse z-10" />

        {/* Monitor Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-1 z-10 text-[7px] font-mono text-white/40">
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
            <span className="font-bold tracking-wider text-amber-500">ALARM SYSTEM OK // ONLINE</span>
          </div>
          <span className="tracking-widest">SV-TELEMETRY B-MOCK</span>
        </div>

        {/* Core Monitor Panel (Internal CRT Grid Pattern) */}
        <div className="flex-grow grid grid-cols-4 gap-2 pt-2 z-10 font-mono relative bg-black/60 border border-white/5 rounded-lg p-1.5 overflow-hidden">
          {/* Glowing Grid Matrix Backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.035)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-0" />

          {/* Waveforms Column (3/4 width) */}
          <div className="col-span-3 space-y-1.5 select-none z-10">
            {/* Wave 1: ECG (Green) */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[6px] text-emerald-400 font-bold">
                <span>ECG II (1.0x)</span>
                <span>LIVE</span>
              </div>
              <div className="h-6 w-full overflow-hidden relative bg-black/20 border border-white/5 rounded">
                <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll" style={{ animationDuration: "2.4s" }}>
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path
                      d="M 0 50 L 20 50 Q 25 35 30 50 L 33 50 L 38 15 L 43 85 L 48 50 L 53 50 Q 58 35 63 50 L 80 50 L 100 50 M 100 50 L 120 50 Q 125 35 130 50 L 133 50 L 138 15 L 143 85 L 148 50 L 153 50 Q 158 35 163 50 L 180 50 L 200 50"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Wave 2: Arterial Pulse (Cyan) */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[6px] text-[#00D4FF] font-bold">
                <span>ART (mmHG)</span>
                <span>120 / 80</span>
              </div>
              <div className="h-6 w-full overflow-hidden relative bg-black/20 border border-white/5 rounded">
                <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll" style={{ animationDuration: "3.2s" }}>
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path
                      d="M 0 60 Q 15 20 30 50 T 60 70 T 80 40 T 100 60 M 100 60 Q 115 20 130 50 T 160 70 T 180 40 T 200 60"
                      fill="none"
                      stroke="#00D4FF"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Wave 3: Respiration (Yellow) */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-[6px] text-amber-400 font-bold">
                <span>RESP (rpm)</span>
                <span>14</span>
              </div>
              <div className="h-6 w-full overflow-hidden relative bg-black/20 border border-white/5 rounded">
                <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll" style={{ animationDuration: "5.5s" }}>
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path
                      d="M 0 50 Q 25 20 50 50 T 100 50 M 100 50 Q 125 20 150 50 T 200 50"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Numerical Parameters Column (1/4 width) */}
          <div className="col-span-1 flex flex-col justify-between py-0.5 select-none z-10 border-l border-white/5 pl-1.5">
            {/* HR block */}
            <div className="flex flex-col items-end border-b border-white/5 pb-0.5">
              <span className="text-[5px] text-emerald-400 font-bold">HR</span>
              <span className="text-base font-bold text-[#10B981] leading-none animate-pulse">72</span>
            </div>
            {/* SpO2 block */}
            <div className="flex flex-col items-end border-b border-white/5 pb-0.5">
              <span className="text-[5px] text-[#00D4FF] font-bold">SPO2</span>
              <span className="text-base font-bold text-[#00D4FF] leading-none">98</span>
            </div>
            {/* Temp block */}
            <div className="flex flex-col items-end">
              <span className="text-[5px] text-amber-500 font-bold">TEMP</span>
              <span className="text-sm font-bold text-amber-400 leading-none">36.8</span>
            </div>
          </div>
        </div>

        {/* Monitor Footer */}
        <div className="border-t border-white/5 pt-1 mt-1.5 flex items-center justify-between text-[6px] font-mono text-red-400/80 z-10">
          <div className="flex items-center gap-1.5">
            <WifiOff className="w-2.5 h-2.5 animate-pulse" />
            <span>WARD NET BRIDGE NOT DETECTED</span>
          </div>
          <span>BATTERY: 100%</span>
        </div>
      </div>

      <div className="h-6" />
    </motion.div>
  );
}

