"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ProblemSection } from "@/components/home/problem";
import { AboutSection } from "@/components/home/about";
import { PricingSection } from "@/components/home/pricing";
import { ReserveSection } from "@/components/home/reserve";

const HeroSequence = dynamic(
  () => import("@/components/home/hero-sequence").then((mod) => mod.HeroSequence),
  { ssr: false }
);

const BridgeScrollFullscreen = dynamic(
  () => import("@/components/home/bridge-scroll-fullscreen").then((mod) => mod.BridgeScrollFullscreen),
  { ssr: false }
);

const PlatformStorytelling = dynamic(
  () => import("@/components/home/platform-storytelling").then((mod) => mod.PlatformStorytelling),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="bg-background text-text">
      {mounted ? (
        <>
          <HeroSequence />
          <BridgeScrollFullscreen />
          <PlatformStorytelling />
        </>
      ) : (
        <div className="h-screen bg-black w-full" />
      )}
      <ProblemSection />
      <AboutSection />
      <PricingSection />
      <ReserveSection />
    </main>
  );
}

