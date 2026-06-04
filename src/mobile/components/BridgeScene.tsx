"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function BridgeScene({ scrollProgress }: SceneProps) {
  // Scene 5 & 6 Range: 0.42 -> 0.56
  const sceneOpacity = useTransform(scrollProgress, [0.38, 0.42, 0.52, 0.56], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.38, 0.42, 0.52, 0.56], [0.96, 1, 1, 0.96]);


  // Text 1: Reveal the Bridge product
  const text1Opacity = useTransform(scrollProgress, [0.38, 0.42, 0.47, 0.49], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollProgress, [0.38, 0.42, 0.47, 0.49], [15, 0, 0, -15]);
  const text1Scale = useTransform(scrollProgress, [0.38, 0.42, 0.47, 0.49], [0.92, 1, 1, 1.05]);
  const text1Filter = useTransform(scrollProgress, [0.38, 0.42, 0.47, 0.49], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Text 2: Transmit data stats
  const text2Opacity = useTransform(scrollProgress, [0.47, 0.49, 0.52, 0.56], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollProgress, [0.47, 0.49, 0.52, 0.56], [15, 0, 0, -15]);
  const text2Scale = useTransform(scrollProgress, [0.47, 0.49, 0.52, 0.56], [0.92, 1, 1, 1.05]);
  const text2Filter = useTransform(scrollProgress, [0.47, 0.49, 0.52, 0.56], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // Data transmission particles opacity (emitted upwards starting at 0.42)
  const streamOpacity = useTransform(scrollProgress, [0.42, 0.46, 0.54], [0, 1, 0]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity, scale, transformStyle: "preserve-3d" }}
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col justify-between px-6 py-20 z-30 pointer-events-none perspective-[1000px]"
    >
      {/* Dynamic Copy Panel */}
      <div className="relative w-full h-24 flex items-center justify-center text-center">
        {/* Text 1: Introducing */}
        <motion.div
          style={{ opacity: text1Opacity, y: text1Y, scale: text1Scale, filter: text1Filter }}
          className="absolute space-y-2 max-w-xs"
        >
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#00D4FF] uppercase font-bold">
            Hardware Integration
          </p>
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
            Introducing SafeVitals Bridge.
          </h2>
          <p className="font-sans text-xs text-white/55 font-light">
            Connect. Capture. Transform.
          </p>
        </motion.div>

        {/* Text 2: Transmit */}
        <motion.div
          style={{ opacity: text2Opacity, y: text2Y, scale: text2Scale, filter: text2Filter }}
          className="absolute space-y-2 max-w-xs"
        >
          <p className="font-mono text-[9px] tracking-[0.25em] text-blue-400 uppercase font-bold">
            Secure Edge Link
          </p>
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight">
            One Bridge. Every Monitor.
          </h2>
          <p className="font-sans text-xs text-white/55 font-light">
            Secure telemetry pipeline bridging existing ward hardware with zero layout lag.
          </p>
        </motion.div>
      </div>

      {/* Hero Product Hardware Reveal Center */}
      <div className="relative flex-grow flex items-center justify-center">
        {/* Data Stream vertical rays (emerging out from Bridge to top screen) */}
        <motion.div
          style={{ opacity: streamOpacity }}
          className="absolute inset-x-0 bottom-[55%] top-0 flex justify-around pointer-events-none z-10"
        >
          {/* Vertical beam 1 */}
          <motion.div
            className="w-0.5 bg-gradient-to-t from-[#00D4FF]/80 to-transparent relative"
            animate={{ height: ["0%", "100%", "0%"], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"
              animate={{ y: [150, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          {/* Vertical beam 2 */}
          <motion.div
            className="w-0.5 bg-gradient-to-t from-[#2563EB]/80 to-transparent relative"
            animate={{ height: ["0%", "100%", "0%"], opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.4 }}
          >
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#2563EB]"
              animate={{ y: [150, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 0.4 }}
            />
          </motion.div>

          {/* Vertical beam 3 */}
          <motion.div
            className="w-0.5 bg-gradient-to-t from-[#00D4FF]/80 to-transparent relative"
            animate={{ height: ["0%", "100%", "0%"], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
          >
            <motion.span
              className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]"
              animate={{ y: [150, 0] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "linear", delay: 0.8 }}
            />
          </motion.div>
        </motion.div>

        {/* 3D Hardware Bezel is now rendered in high fidelity via MobileBridgeCanvas */}
      </div>

      {/* Bottom Secure Certification Footer */}
      <div className="w-full flex items-center justify-center gap-1.5 text-[8px] font-mono text-white/30 tracking-wider">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/80" />
        <span>MILITARY-GRADE HARDWARE ACCESS SHIELD</span>
      </div>
    </motion.div>
  );
}

