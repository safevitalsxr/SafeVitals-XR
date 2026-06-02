"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Cloud, LayoutDashboard, Smartphone, Glasses, ChevronRight } from "lucide-react";

const CARDS_DATA = [
  {
    id: "bridge",
    title: "SafeVitals Bridge",
    subtitle: "Hardware IoT Integrator",
    description: "Plug-and-play IoT gateway connecting physical patient monitors (HL7/serial) to secure cloud telemetry streams with <10ms delay.",
    icon: Cpu,
    color: "#00D4FF",
    bgGlow: "rgba(0, 212, 255, 0.15)",
    specs: ["HL7 V2/V3 compliant", "Serial / LAN / WiFi", "Zero-config pairing"],
  },
  {
    id: "cloud",
    title: "Cloud Infrastructure",
    subtitle: "Secure Telemetry Hub",
    description: "Medical-grade cloud pipeline providing HIPAA-compliant data routing, continuous analytics, and instantly scalable database nodes.",
    icon: Cloud,
    color: "#2563EB",
    bgGlow: "rgba(37, 99, 235, 0.15)",
    specs: ["End-to-end AES-256", "99.99% ICU uptime SLA", "FHIR data schema"],
  },
  {
    id: "dashboard",
    title: "Medical Dashboard",
    subtitle: "Central Station Console",
    description: "Multi-patient centralized control board for desktop web. Provides telemetry charting, alert escalation trees, and vital trend overlays.",
    icon: LayoutDashboard,
    color: "#7C3AED",
    bgGlow: "rgba(124, 58, 237, 0.15)",
    specs: ["Sub-second updates", "Custom triage layouts", "EHR integrations"],
  },
  {
    id: "app",
    title: "Mobile App",
    subtitle: "Pocket Vitals & Alerts",
    description: "Real-time companion app for iOS & Android. Receive push alerts, check patient metrics on the go, and securely share updates.",
    icon: Smartphone,
    color: "#10B981",
    bgGlow: "rgba(16, 185, 129, 0.15)",
    specs: ["iOS Live Activities", "Wearable sync", "Critical alert bypass"],
  },
  {
    id: "xr",
    title: "XR Spatial Layer",
    subtitle: "Immersive Clinical Environment",
    description: "Immersive diagnostic environment built for Apple Vision Pro and Meta Quest. Projects patient vitals directly over physical rooms.",
    icon: Glasses,
    color: "#F43F5E",
    bgGlow: "rgba(244, 63, 94, 0.15)",
    specs: ["VisionOS optimized", "Spatial layout grid", "Gesture tethers"],
  },
];

export function ProductCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.clientWidth - 48; // accounting for padding
    const index = Math.round(scrollLeft / width);
    if (index >= 0 && index < CARDS_DATA.length) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll, { passive: true });
    }
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="bg-[#030712] px-6 py-20 border-b border-white/5 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute right-[-20%] top-[10%] w-72 h-72 rounded-full bg-blue-600/5 blur-[120px]" />
      <div className="absolute left-[-20%] bottom-[10%] w-72 h-72 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="space-y-2 mb-10">
        <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
          Platform Ecosystem
        </span>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white leading-tight">
          Unified Spatial Health Architecture
        </h2>
        <p className="font-sans text-sm text-white/50 leading-relaxed font-light">
          Swipe to explore the modules powering real-time healthcare monitoring from hospital bed to virtual reality.
        </p>
      </div>

      {/* Swipe Indicator Tip */}
      <div className="flex items-center gap-1.5 text-xs text-white/30 font-mono mb-4 animate-pulse">
        <span>Swipe left/right</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>

      {/* Horizontal Swipe Container */}
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 pr-12 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {CARDS_DATA.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              className="min-w-[85vw] sm:min-w-[320px] snap-center rounded-2xl bg-[#0A1221]/45 border border-white/10 p-6 flex flex-col justify-between h-[380px] relative overflow-hidden backdrop-blur-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              {/* Top ambient color spot inside card */}
              <div
                className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-[40px] pointer-events-none"
                style={{ backgroundColor: card.color, opacity: 0.15 }}
              />

              {/* Card Header */}
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    borderColor: `${card.color}33`,
                    backgroundColor: `${card.color}11`,
                    boxShadow: `0 0 15px ${card.color}22`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex-grow my-4">
                <p className="font-sans text-xs text-white/70 leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {/* Technical specs at bottom */}
              <div className="border-t border-white/5 pt-4">
                <ul className="grid grid-cols-1 gap-1.5">
                  {card.specs.map((spec, specIdx) => (
                    <li key={specIdx} className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                      <span className="w-1 h-1 rounded-full" style={{ backgroundColor: card.color }} />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Swipe Progress Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-2">
        {CARDS_DATA.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (containerRef.current) {
                const width = containerRef.current.clientWidth - 48;
                containerRef.current.scrollTo({
                  left: idx * width,
                  behavior: "smooth",
                });
              }
            }}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width: idx === activeIndex ? "24px" : "6px",
              backgroundColor: idx === activeIndex ? "#00D4FF" : "rgba(255, 255, 255, 0.15)",
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
