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
import dynamic from "next/dynamic";

const MobileHeroCanvas = dynamic(
  () => import("@/src/mobile/components/MobileHeroCanvas").then((mod) => mod.MobileHeroCanvas),
  { ssr: false }
);

const MobileBridgeCanvas = dynamic(
  () => import("@/src/mobile/components/MobileBridgeCanvas").then((mod) => mod.MobileBridgeCanvas),
  { ssr: false }
);

const SCENES = [
  { label: "Intro", progress: 0.0, component: HeroScene },
  { label: "Patient", progress: 0.16, component: PatientScene },
  { label: "Monitor", progress: 0.31, component: MonitorScene },
  { label: "Bridge", progress: 0.47, component: BridgeScene },
  { label: "Cloud", progress: 0.60, component: CloudScene },
  { label: "Dashboard", progress: 0.74, component: DashboardScene },
  { label: "XR Layer", progress: 0.86, component: XRScene },
  { label: "Reserve", progress: 0.96, component: FinalCTA },
];

export default function MobilePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Route scroll percentage to active scene index
      let index = 0;
      if (latest < 0.12) index = 0;
      else if (latest < 0.28) index = 1;
      else if (latest < 0.42) index = 2;
      else if (latest < 0.56) index = 3;
      else if (latest < 0.70) index = 4;
      else if (latest < 0.82) index = 5;
      else if (latest < 0.92) index = 6;
      else index = 7;

      setActiveScene(index);
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
    <div ref={containerRef} className="relative w-full h-[800vh] bg-black">
      {/* Sticky Screen Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black select-none flex items-center justify-center">
        
        {/* Volumetric Dark Ambient Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(10,18,33,0.95),black_75%)] z-0 pointer-events-none" />

        {/* High-Fidelity Scroll-Driven Background Canvases */}
        <MobileHeroCanvas scrollYProgress={scrollYProgress} />
        <MobileBridgeCanvas scrollYProgress={scrollYProgress} />

        {/* Stacked Scene Containers */}
        {SCENES.map((scene, idx) => {
          const SceneComponent = scene.component;
          const isActive = idx === activeScene;

          return (
            <div
              key={scene.label}
              style={{
                pointerEvents: isActive ? "auto" : "none",
              }}
              className="absolute inset-0 w-full h-full"
            >
              <SceneComponent scrollProgress={scrollYProgress} />
            </div>
          );
        })}

        {/* Interactive Indicator Timeline Panel */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 z-50 pointer-events-auto">
          {SCENES.map((scene, idx) => {
            const isActive = idx === activeScene;

            return (
              <button
                key={scene.label}
                onClick={() => handleNavClick(scene.progress)}
                className="group flex items-center gap-3 text-right outline-none cursor-pointer"
                aria-label={`Show ${scene.label}`}
              >
                <motion.span
                  initial={{ opacity: 0, x: 5 }}
                  animate={{
                    opacity: isActive ? 0.8 : 0,
                    x: isActive ? 0 : 5,
                  }}
                  className="font-mono text-[8px] tracking-widest uppercase text-white/90 pr-0.5"
                >
                  {scene.label}
                </motion.span>

                <div className="relative flex items-center justify-center w-3.5 h-3.5">
                  {isActive && (
                    <motion.div
                      layoutId="activeSceneIndicatorRing"
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#00D4FF]/25 blur-[1.5px]"
                      transition={{ type: "spring", damping: 14 }}
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      backgroundColor: isActive ? "#00D4FF" : "rgba(255, 255, 255, 0.15)",
                    }}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Top Progress Tracker Bar */}
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
