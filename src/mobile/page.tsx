"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, motion } from "framer-motion";
import { HeroScene } from "@/src/mobile/components/HeroScene";
import { PatientScene } from "@/src/mobile/components/PatientScene";
import { MonitorScene } from "@/src/mobile/components/MonitorScene";
import { BridgeScene } from "@/src/mobile/components/BridgeScene";
import { CloudScene } from "@/src/mobile/components/CloudScene";
import { DashboardScene } from "@/src/mobile/components/DashboardScene";
import { XRScene } from "@/src/mobile/components/XRScene";
import { FinalCTA } from "@/src/mobile/components/FinalCTA";

const SCENE_INDICES = [
  { label: "Intro", progress: 0.0, activeRange: [0.0, 0.119] },
  { label: "Patient", progress: 0.16, activeRange: [0.12, 0.259] },
  { label: "Monitor", progress: 0.31, activeRange: [0.26, 0.379] },
  { label: "Bridge", progress: 0.47, activeRange: [0.38, 0.539] },
  { label: "Cloud", progress: 0.60, activeRange: [0.54, 0.679] },
  { label: "Dashboard", progress: 0.74, activeRange: [0.68, 0.799] },
  { label: "XR Layer", progress: 0.86, activeRange: [0.80, 0.919] },
  { label: "Reserve", progress: 0.96, activeRange: [0.92, 1.0] },
];

export default function MobilePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [currentProgress, setCurrentProgress] = useState(0);

  // Sync scrollYProgress to local state to drive the indicator highlight
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setCurrentProgress(latest);
    });
  }, [scrollYProgress]);

  const handleNavClick = (targetPercent: number) => {
    if (!containerRef.current) return;
    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: scrollHeight * targetPercent,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative w-full h-[1000vh] bg-black">
      {/* Sticky Narrative Screen Frame */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black select-none">
        
        {/* Layer 1: Background Global Grids */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(10,18,33,0.8),black_70%)] z-0 pointer-events-none" />

        {/* Layer 2: Seamlessly Morphing Scenes */}
        <HeroScene scrollProgress={scrollYProgress} />
        <PatientScene scrollProgress={scrollYProgress} />
        <MonitorScene scrollProgress={scrollYProgress} />
        <BridgeScene scrollProgress={scrollYProgress} />
        <CloudScene scrollProgress={scrollYProgress} />
        <DashboardScene scrollProgress={scrollYProgress} />
        <XRScene scrollProgress={scrollYProgress} />
        <FinalCTA scrollProgress={scrollYProgress} />

        {/* Layer 3: Interactive Right-Side Navigation Dots Timeline */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-5 z-50 pointer-events-auto">
          {SCENE_INDICES.map((scene) => {
            const isActive =
              currentProgress >= scene.activeRange[0] &&
              currentProgress <= scene.activeRange[1];

            return (
              <button
                key={scene.label}
                onClick={() => handleNavClick(scene.progress)}
                className="group flex items-center gap-2.5 text-right outline-none cursor-pointer"
                aria-label={`Jump to ${scene.label}`}
              >
                {/* Horizontal label appearing on hover or active */}
                <motion.span
                  initial={{ opacity: 0, x: 5 }}
                  animate={{
                    opacity: isActive ? 0.75 : 0,
                    x: isActive ? 0 : 5,
                  }}
                  className="font-mono text-[7px] tracking-wider uppercase text-white/95 group-hover:opacity-60 transition-opacity pr-0.5"
                >
                  {scene.label}
                </motion.span>

                {/* Glowing navigation bullet dot */}
                <div className="relative flex items-center justify-center w-3 h-3">
                  {isActive && (
                    <motion.div
                      layoutId="activeGlowDot"
                      className="absolute w-2 h-2 rounded-full bg-[#00D4FF]/40 blur-[2px]"
                      transition={{ type: "spring", damping: 12 }}
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.3 : 1,
                      backgroundColor: isActive ? "#00D4FF" : "rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Global Progress Track Line (Top Screen Overlay) */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-white/5 z-50 pointer-events-none">
          <motion.div
            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
            className="w-full h-full bg-gradient-to-r from-[#00D4FF] via-blue-500 to-[#F43F5E]"
          />
        </div>
      </div>
    </div>
  );
}
