"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const steps = ["Monitor", "Bridge", "Cloud", "Dashboard", "Digital Twin", "VR"];

function StepItem({ step, index, totalSteps, scrollYProgress }: { step: string, index: number, totalSteps: number, scrollYProgress: MotionValue<number> }) {
  const stepProgress = index / (totalSteps - 1);
  const active = useTransform(scrollYProgress, [stepProgress - 0.1, stepProgress], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [stepProgress - 0.2, stepProgress], [0.3, 1]);

  return (
    <div className="flex flex-col items-center gap-6 group">
      <div className="relative flex items-center justify-center">
        <div className="w-4 h-4 bg-background border border-border rounded-full z-10" />
        <motion.div 
          style={{ opacity: active, scale: active }} 
          className="w-4 h-4 bg-accent rounded-full absolute z-20 shadow-[0_0_10px_rgba(122,162,255,1)]" 
        />
      </div>
      <motion.span 
        style={{ opacity: textOpacity }}
        className="font-mono text-sm font-medium text-text-secondary whitespace-nowrap absolute mt-8"
      >
        {step}
      </motion.span>
    </div>
  );
}

export function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="bg-background py-40 border-t border-border/50">
      <div className="section-shell">
        <h2 className="font-heading text-4xl mb-32 text-center text-text">How It Works</h2>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2" />
          <motion.div 
            style={{ scaleX: pathLength }}
            className="absolute top-1/2 left-0 right-0 h-[2px] bg-accent origin-left -translate-y-1/2 shadow-[0_0_15px_rgba(122,162,255,0.5)]" 
          />

          <div className="relative flex justify-between items-center z-10 w-full">
             {steps.map((step, index) => (
               <StepItem 
                 key={step} 
                 step={step} 
                 index={index} 
                 totalSteps={steps.length} 
                 scrollYProgress={scrollYProgress} 
               />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
