"use client";

import { Hero } from "@/src/mobile/components/Hero";
import { ProductCards } from "@/src/mobile/components/ProductCards";
import { Timeline } from "@/src/mobile/components/Timeline";
import { DigitalTwin } from "@/src/mobile/components/DigitalTwin";
import { DashboardShowcase } from "@/src/mobile/components/DashboardShowcase";
import { ReserveDemo } from "@/src/mobile/components/ReserveDemo";
import { Globe, ArrowUpRight } from "lucide-react";

export default function MobilePage() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#030712] text-[#F9FAFB] min-h-screen flex flex-col font-sans select-none overflow-x-hidden">
      {/* Sections layout with smooth transitions */}
      <main className="flex-grow flex flex-col">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Product Ecosystem horizontal cards */}
        <div id="products">
          <ProductCards />
        </div>

        {/* 3. How It Works vertical timeline */}
        <div id="how-it-works">
          <Timeline />
        </div>

        {/* 4. Digital Twin outline showcase */}
        <div id="digital-twin">
          <DigitalTwin />
        </div>

        {/* 5. Dashboard Phone Mockup Carousel */}
        <div id="showcase">
          <DashboardShowcase />
        </div>

        {/* 6. Reserve Demo Contact Form */}
        <ReserveDemo />
      </main>

      {/* 7. Mobile Footer */}
      <footer className="bg-[#0A1221] border-t border-white/5 py-12 px-6 flex flex-col gap-8 text-sm text-white/50 font-sans">
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-white tracking-wider">
            SafeVitals XR
          </h3>
          <p className="text-xs leading-relaxed max-w-xs font-light">
            Real-Time Healthcare Intelligence through cloud, mobile and spatial computing.
          </p>
          <p className="text-[10px] leading-relaxed text-white/35 font-light">
            Under the Incubation of <b>Ratan Tata Innovation Hub (RTIH)</b>
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-mono text-[#00D4FF] uppercase tracking-widest font-semibold mb-1">
              Products
            </span>
            <a href="#products" className="text-xs text-white/60 hover:text-white transition-colors">
              Platform Modules
            </a>
            <a href="#how-it-works" className="text-xs text-white/60 hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#showcase" className="text-xs text-white/60 hover:text-white transition-colors">
              Live Mockups
            </a>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[9px] font-mono text-[#00D4FF] uppercase tracking-widest font-semibold mb-1">
              Connect
            </span>
            <a href="mailto:safevitals.xr@gmail.com" className="text-xs text-white/60 hover:text-white transition-colors">
              Email Support
            </a>
            <a href="tel:+919989359799" className="text-xs text-white/60 hover:text-white transition-colors">
              +91 9989359799
            </a>
            <div className="flex gap-3 pt-1">
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors font-mono">
                LinkedIn
              </a>
              <span className="text-white/10">|</span>
              <a href="#" className="text-xs text-white/40 hover:text-white transition-colors font-mono">
                Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Manual Desktop Site Trigger */}
        <div className="border-t border-white/5 pt-6 flex flex-col items-center gap-3">
          <a
            href="https://safevitals.in?desktop=true"
            className="w-full py-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] text-white text-xs font-semibold font-mono tracking-wider uppercase text-center flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          >
            <Globe className="w-4 h-4 text-[#00D4FF]" />
            View Desktop Site
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>

          <button
            onClick={handleScrollToTop}
            className="text-[10px] font-mono text-[#00D4FF] hover:underline uppercase tracking-wider mt-2"
          >
            Back to Top ↑
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center text-[10px] text-white/20 font-mono border-t border-white/5 pt-6">
          © {new Date().getFullYear()} SafeVitals XR. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
