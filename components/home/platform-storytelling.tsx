"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════════
   ECG Polyline Generator — Creates a realistic PQRST waveform
   ═══════════════════════════════════════════════════════════════ */
function generateEcgPolyline(
  totalWidth: number,
  height: number,
  cycles: number,
): string {
  const pts: string[] = [];
  const cw = totalWidth / cycles;
  const mid = height / 2;

  for (let c = 0; c < cycles; c++) {
    const x0 = c * cw;
    pts.push(
      `${x0},${mid}`,
      `${x0 + cw * 0.12},${mid}`,
      // P wave
      `${x0 + cw * 0.16},${mid - height * 0.09}`,
      `${x0 + cw * 0.20},${mid}`,
      // PR segment
      `${x0 + cw * 0.26},${mid}`,
      // Q dip
      `${x0 + cw * 0.29},${mid + height * 0.06}`,
      // R spike
      `${x0 + cw * 0.32},${mid - height * 0.42}`,
      // S dip
      `${x0 + cw * 0.35},${mid + height * 0.15}`,
      // Return to baseline
      `${x0 + cw * 0.38},${mid}`,
      // ST segment
      `${x0 + cw * 0.44},${mid}`,
      // T wave
      `${x0 + cw * 0.50},${mid - height * 0.13}`,
      `${x0 + cw * 0.56},${mid}`,
      // Baseline
      `${x0 + cw},${mid}`,
    );
  }
  return pts.join(" ");
}

/* ═══════════════════════════════════════════════════════════════
   Pre-generated particle & stream data — CSS animated
   ═══════════════════════════════════════════════════════════════ */
const STREAM_LINES = Array.from({ length: 8 }, (_, i) => ({
  left: `${18 + i * 9}%`,
  height: `${30 + Math.random() * 20}vh`,
  duration: 3 + Math.random() * 3,
  delay: Math.random() * 4,
  opacity: 0.12 + Math.random() * 0.12,
}));

const PARTICLE_DOTS = Array.from({ length: 28 }, () => ({
  left: `${10 + Math.random() * 80}%`,
  size: 2 + Math.random() * 2.5,
  duration: 5 + Math.random() * 6,
  delay: Math.random() * 10,
  opacity: 0.25 + Math.random() * 0.45,
}));

/* ═══════════════════════════════════════════════════════════════
   Static data for dashboard modules
   ═══════════════════════════════════════════════════════════════ */
const PATIENTS = [
  { id: "P-01", hr: 72, spo2: 98, status: "bg-emerald-400" },
  { id: "P-02", hr: 85, spo2: 96, status: "bg-emerald-400" },
  { id: "P-03", hr: 91, spo2: 94, status: "bg-amber-400" },
  { id: "P-04", hr: 68, spo2: 99, status: "bg-emerald-400" },
  { id: "P-05", hr: 110, spo2: 88, status: "bg-red-400" },
  { id: "P-06", hr: 77, spo2: 97, status: "bg-emerald-400" },
];

const ALERTS = [
  {
    text: "Bed 4 · SpO₂ Below 92%",
    classes: "bg-red-500/15 border-red-500/25 text-red-300",
    time: "12s",
  },
  {
    text: "Bed 7 · Heart Rate Elevated",
    classes: "bg-amber-500/15 border-amber-500/25 text-amber-300",
    time: "2m",
  },
  {
    text: "Bed 2 · Medication Schedule",
    classes: "bg-blue-500/15 border-blue-500/25 text-blue-300",
    time: "8m",
  },
];

const BARS = [35, 52, 45, 68, 42, 78, 55, 90, 65, 48, 72, 58];

/* ═══════════════════════════════════════════════════════════════
   PlatformStorytelling Component
   ═══════════════════════════════════════════════════════════════ */
export function PlatformStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Module frame refs
  const sidebarRef = useRef<HTMLDivElement>(null);
  const ecgRef = useRef<HTMLDivElement>(null);
  const patientRef = useRef<HTMLDivElement>(null);
  const alertsRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);

  // Module inner-content refs
  const sidebarCRef = useRef<HTMLDivElement>(null);
  const ecgCRef = useRef<HTMLDivElement>(null);
  const patientCRef = useRef<HTMLDivElement>(null);
  const alertsCRef = useRef<HTMLDivElement>(null);
  const analyticsCRef = useRef<HTMLDivElement>(null);

  // Text overlay refs
  const t1Ref = useRef<HTMLDivElement>(null);
  const t2Ref = useRef<HTMLDivElement>(null);
  const t3Ref = useRef<HTMLDivElement>(null);
  const t4Ref = useRef<HTMLDivElement>(null);
  const t5Ref = useRef<HTMLDivElement>(null);

  // ECG waveform polyline
  const ecgPoints = useMemo(() => generateEcgPolyline(1600, 50, 16), []);

  useEffect(() => {
    /* Inject CSS keyframes for particle/stream animations */
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      @keyframes svpf-stream {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(calc(100vh + 100%)); }
      }
      @keyframes svpf-dot {
        0% { transform: translateY(-30px); opacity: 0; }
        12% { opacity: var(--dot-op, 0.4); }
        82% { opacity: var(--dot-op, 0.4); }
        100% { transform: translateY(calc(100vh + 30px)); opacity: 0; }
      }
    `;
    document.head.appendChild(styleEl);

    const container = containerRef.current;
    if (!container) return;

    /* ─── GSAP Timeline (continuous — no dead zones) ─── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        refreshPriority: -10,
      },
    });

    /* Helper: activate a single dashboard module */
    const activate = (
      frame: HTMLDivElement | null,
      content: HTMLDivElement | null,
      at: number,
    ) => {
      if (!frame || !content) return;
      tl.to(
        frame,
        {
          borderColor: "rgba(0, 229, 255, 0.22)",
          backgroundColor: "rgba(6, 12, 28, 0.82)",
          boxShadow:
            "0 0 40px rgba(0, 229, 255, 0.06), inset 0 1px 0 rgba(0, 229, 255, 0.1)",
          duration: 0.10,
        },
        at,
      );
      tl.fromTo(
        content,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.08 },
        at + 0.03,
      );
    };

    // ═══ Phase 1: Ghost Dashboard Materializes (0%–10%) ═══
    tl.fromTo(
      dashRef.current,
      { autoAlpha: 0, scale: 0.88, y: 50 },
      { autoAlpha: 1, scale: 1, y: 0, duration: 0.10, ease: "power2.out" },
      0,
    );

    // ═══ Phase 2: Sequential Module Activation (10%–55%) ═══
    activate(ecgRef.current, ecgCRef.current, 0.10);
    activate(patientRef.current, patientCRef.current, 0.20);
    activate(alertsRef.current, alertsCRef.current, 0.30);
    activate(analyticsRef.current, analyticsCRef.current, 0.40);
    activate(sidebarRef.current, sidebarCRef.current, 0.48);

    // Full-frame glow after all modules active
    tl.to(
      dashRef.current,
      {
        boxShadow:
          "0 0 80px rgba(0, 229, 255, 0.08), 0 0 200px rgba(0, 229, 255, 0.03)",
        duration: 0.05,
      },
      0.55,
    );

    // Fade data-stream particles
    tl.to(particlesRef.current, { autoAlpha: 0, duration: 0.08 }, 0.52);

    // ═══ Phase 3: Zoom Sequence (58%–92%) ═══
    // Into ECG (bottom-left)
    tl.to(
      dashRef.current,
      { scale: 2.2, xPercent: 22, yPercent: -25, duration: 0.10, ease: "power2.inOut" },
      0.58,
    );
    // Into Patient Cards (top-left)
    tl.to(
      dashRef.current,
      { scale: 2.2, xPercent: 22, yPercent: 25, duration: 0.10, ease: "power2.inOut" },
      0.70,
    );
    // Into Alerts (top-right)
    tl.to(
      dashRef.current,
      { scale: 2.2, xPercent: -22, yPercent: 25, duration: 0.10, ease: "power2.inOut" },
      0.80,
    );
    // Pull back + CTA reveal
    tl.to(
      dashRef.current,
      {
        scale: 0.78,
        xPercent: 0,
        yPercent: -10,
        duration: 0.10,
        ease: "power2.inOut",
      },
      0.90,
    );

    // ═══ Text Overlay Transitions ═══
    // Text 1: visible from start → fades at 12%
    tl.to(t1Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.12);

    // Text 2: 16%→30%
    tl.fromTo(
      t2Ref.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.06 },
      0.16,
    );
    tl.to(t2Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.30);

    // Text 3: 34%→52%
    tl.fromTo(
      t3Ref.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.06 },
      0.34,
    );
    tl.to(t3Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.52);

    // Text 4: 54%→62%
    tl.fromTo(
      t4Ref.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.06 },
      0.54,
    );
    tl.to(t4Ref.current, { autoAlpha: 0, y: -30, duration: 0.06 }, 0.62);

    // Text 5 (CTA): appears at 92%
    tl.fromTo(
      t5Ref.current,
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.08 },
      0.92,
    );

    return () => {
      if (document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
      ScrollTrigger.getAll().forEach((t) => {
        if (t && t.vars && t.vars.trigger === container) {
          t.kill();
        }
      });
    };
  }, []);

  /* ═══════════════════════════════════════════════════════════
     JSX — Render
     ═══════════════════════════════════════════════════════════ */
  return (
    <div
      ref={containerRef}
      className="relative h-[450vh] w-full bg-black select-none"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {/* ─── Ambient Glow ─── */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,229,255,0.035)_0%,transparent_60%)]" />

        {/* ─── Data Stream Particles ─── */}
        <div
          ref={particlesRef}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          {/* Vertical data-stream lines */}
          {STREAM_LINES.map((s, i) => (
            <div
              key={`s-${i}`}
              className="absolute rounded-full"
              style={{
                left: s.left,
                top: 0,
                width: "1px",
                height: s.height,
                background: `linear-gradient(to bottom, transparent, rgba(0, 229, 255, ${s.opacity}), transparent)`,
                animation: `svpf-stream ${s.duration}s ${s.delay}s linear infinite`,
              }}
            />
          ))}
          {/* Floating particle dots */}
          {PARTICLE_DOTS.map((d, i) => (
            <div
              key={`d-${i}`}
              className="absolute rounded-full"
              style={
                {
                  left: d.left,
                  top: 0,
                  width: d.size,
                  height: d.size,
                  backgroundColor: "rgba(0, 229, 255, 0.8)",
                  boxShadow: `0 0 ${d.size * 3}px rgba(0, 229, 255, 0.5)`,
                  animation: `svpf-dot ${d.duration}s ${d.delay}s linear infinite`,
                  "--dot-op": d.opacity,
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        {/* ─── Dashboard Wrapper (transform target for zoom) ─── */}
        <div
          ref={dashRef}
          className="relative z-10 w-[94vw] max-w-[980px] aspect-[16/10] opacity-0 rounded-2xl"
          style={{ willChange: "transform, opacity" }}
        >
          {/* Ghost outer frame */}
          <div className="absolute inset-0 rounded-2xl border border-white/[0.03]" />

          {/* Dashboard Grid */}
          <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-[48px_1fr_1fr] grid-rows-2 gap-1.5 md:gap-2 p-1.5 md:p-2">
            {/* ── Sidebar (desktop only) ── */}
            <div
              ref={sidebarRef}
              className="hidden md:block row-span-2 rounded-xl border border-white/5"
            >
              <div
                ref={sidebarCRef}
                className="opacity-0 h-full flex flex-col items-center gap-3 py-5"
              >
                {/* Logo */}
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center mb-2">
                  <span className="text-[8px] font-bold text-cyan-400 font-mono">
                    SV
                  </span>
                </div>
                {/* Nav indicators */}
                {[0, 1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      j === 0 ? "bg-cyan-400/80" : "bg-white/10"
                    }`}
                  />
                ))}
                <div className="flex-1" />
                <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
                </div>
              </div>
            </div>

            {/* ── Patient Cards (top-left) ── */}
            <div
              ref={patientRef}
              className="rounded-xl border border-white/5 overflow-hidden"
            >
              <div
                ref={patientCRef}
                className="opacity-0 h-full flex flex-col p-2.5 md:p-3.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider font-semibold">
                      ICU Overview
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[9px] font-mono text-white/25">
                    Ward 3A
                  </span>
                </div>
                {/* Patient grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-1.5 flex-1 content-start">
                  {PATIENTS.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white/[0.025] rounded-lg p-1.5 md:p-2 border border-white/[0.04] flex flex-col items-center justify-center gap-0.5"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${p.status}`}
                      />
                      <span className="text-[8px] md:text-[9px] font-mono text-white/40">
                        {p.id}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-mono text-white/70">
                        {p.hr}{" "}
                        <span className="text-white/25">bpm</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Alerts (top-right) ── */}
            <div
              ref={alertsRef}
              className="rounded-xl border border-white/5 overflow-hidden"
            >
              <div
                ref={alertsCRef}
                className="opacity-0 h-full flex flex-col p-2.5 md:p-3.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider font-semibold">
                      Active Alerts
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[9px] font-mono text-red-400/50">
                    3 Critical
                  </span>
                </div>
                {/* Alert items */}
                <div className="flex flex-col gap-1 md:gap-1.5 flex-1">
                  {ALERTS.map((a, i) => (
                    <div
                      key={i}
                      className={`rounded-lg px-2 md:px-3 py-1.5 md:py-2 border ${a.classes} text-[9px] md:text-[10px] font-mono flex items-center justify-between`}
                    >
                      <span className="truncate mr-2">{a.text}</span>
                      <span className="text-white/20 flex-shrink-0">
                        {a.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ECG Monitor (bottom-left) ── */}
            <div
              ref={ecgRef}
              className="rounded-xl border border-white/5 overflow-hidden"
            >
              <div
                ref={ecgCRef}
                className="opacity-0 h-full flex flex-col p-2.5 md:p-3.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-1.5 md:mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider font-semibold">
                      ECG Monitor
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[9px] font-mono text-white/25 hidden md:inline">
                      II-Lead
                    </span>
                    <span className="text-lg md:text-xl font-mono text-white font-bold leading-none">
                      72
                    </span>
                    <span className="text-[9px] font-mono text-cyan-400/50">
                      BPM
                    </span>
                  </div>
                </div>
                {/* Live ECG Waveform */}
                <div className="flex-1 relative overflow-hidden rounded-lg bg-black/40 border border-white/[0.04]">
                  <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 1600 50"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        points={ecgPoints}
                        fill="none"
                        stroke="#00ff9d"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          filter: "drop-shadow(0 0 4px rgba(0, 255, 157, 0.6))",
                        }}
                      />
                    </svg>
                  </div>
                  {/* Grid lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[0.25, 0.5, 0.75].map((f) => (
                      <div
                        key={f}
                        className="absolute w-full h-px bg-white/[0.04]"
                        style={{ top: `${f * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Analytics (bottom-right) ── */}
            <div
              ref={analyticsRef}
              className="rounded-xl border border-white/5 overflow-hidden"
            >
              <div
                ref={analyticsCRef}
                className="opacity-0 h-full flex flex-col p-2.5 md:p-3.5"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[9px] md:text-[10px] font-mono text-cyan-400/80 uppercase tracking-wider font-semibold">
                      Trend Analytics
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[9px] font-mono text-white/25">
                    24h
                  </span>
                </div>
                {/* Bar chart */}
                <div className="flex-1 flex items-end gap-[3px] md:gap-1 pb-1">
                  {BARS.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end">
                      <div
                        className="rounded-sm bg-gradient-to-t from-blue-500/50 to-cyan-400/30"
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
                {/* X-axis labels */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[7px] md:text-[8px] font-mono text-white/15">
                    00:00
                  </span>
                  <span className="text-[7px] md:text-[8px] font-mono text-white/15">
                    12:00
                  </span>
                  <span className="text-[7px] md:text-[8px] font-mono text-white/15">
                    24:00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Keynote Text Overlays ─── */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
          {/* Text 1 — System Activation (visible from start) */}
          <div
            ref={t1Ref}
            className="absolute left-4 md:left-16 lg:left-24 max-w-xs md:max-w-md bg-black/20 backdrop-blur-[3px] p-4 md:p-6 rounded-2xl border border-white/5"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] text-cyan-400 mb-2 md:mb-3 block uppercase font-semibold">
              01 / System Activation
            </span>
            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4 tracking-tight leading-tight">
              Intelligence
              <br />
              Initializing.
            </h2>
            <p className="font-sans text-sm md:text-base lg:text-lg text-white/45 leading-relaxed font-light">
              Healthcare data streams from SafeVitals Bridge converge into the
              platform core. Clinical intelligence systems begin initialization
              sequence.
            </p>
          </div>

          {/* Text 2 — ECG & Monitoring Online */}
          <div
            ref={t2Ref}
            className="absolute right-4 md:right-16 lg:right-24 max-w-xs md:max-w-md bg-black/20 backdrop-blur-[3px] p-4 md:p-6 rounded-2xl border border-white/5 opacity-0 flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] text-cyan-400 mb-2 md:mb-3 block uppercase font-semibold">
              02 / Real-Time Monitoring
            </span>
            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4 tracking-tight leading-tight">
              ECG Telemetry
              <br />
              Activated.
            </h2>
            <p className="font-sans text-sm md:text-base lg:text-lg text-white/45 leading-relaxed font-light">
              Live cardiac surveillance and patient vital signs populate across
              connected ICU beds with sub-second precision.
            </p>
          </div>

          {/* Text 3 — Alert Intelligence */}
          <div
            ref={t3Ref}
            className="absolute left-4 md:left-16 lg:left-24 max-w-xs md:max-w-md bg-black/20 backdrop-blur-[3px] p-4 md:p-6 rounded-2xl border border-white/5 opacity-0"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] text-cyan-400 mb-2 md:mb-3 block uppercase font-semibold">
              03 / Alert Intelligence
            </span>
            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4 tracking-tight leading-tight">
              Clinical Alert
              <br />
              Systems Online.
            </h2>
            <p className="font-sans text-sm md:text-base lg:text-lg text-white/45 leading-relaxed font-light">
              Critical notification systems and trend analytics engines come
              online, powered by continuous clinical data processing.
            </p>
          </div>

          {/* Text 4 — Full Platform Active */}
          <div
            ref={t4Ref}
            className="absolute right-4 md:right-16 lg:right-24 max-w-xs md:max-w-md bg-black/20 backdrop-blur-[3px] p-4 md:p-6 rounded-2xl border border-white/5 opacity-0 flex flex-col items-end text-right"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.22em] text-cyan-400 mb-2 md:mb-3 block uppercase font-semibold">
              04 / Full Platform Active
            </span>
            <h2 className="font-heading text-2xl md:text-4xl lg:text-5xl text-white font-bold mb-3 md:mb-4 tracking-tight leading-tight">
              All Systems
              <br />
              Operational.
            </h2>
            <p className="font-sans text-sm md:text-base lg:text-lg text-white/45 leading-relaxed font-light">
              Every module connected. Every signal processed. SafeVitals
              Platform delivers unified healthcare software and clinical support.
            </p>
          </div>

          {/* Text 5 — CTA (centered) */}
          <div
            ref={t5Ref}
            className="absolute inset-x-4 md:inset-x-16 lg:inset-x-24 text-center opacity-0 flex flex-col items-center z-30"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-cyan-400 mb-3 md:mb-4 block uppercase font-bold">
              SafeVitals Platform
            </span>
            <h1 className="font-heading text-3xl md:text-5xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 font-semibold tracking-tighter leading-none mb-4 md:mb-6 max-w-5xl">
              Real-Time Healthcare
              <br />
              Software & Support.
            </h1>
            <p className="font-sans text-sm md:text-lg text-white/45 leading-relaxed font-light mb-8 md:mb-12 max-w-3xl">
              Unify clinicians, patient monitors, and predictive cloud
              intelligence into a single connected platform. Experience
              clinical-grade security and instant patient twin virtualization.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pointer-events-auto">
              <Link
                href="/platform"
                className="rounded-full bg-white px-7 md:px-10 py-4 md:py-5 font-semibold text-black transition-all hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Explore Platform
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                href="/reserve"
                className="rounded-full border border-white/20 bg-black/20 backdrop-blur-xl px-7 md:px-10 py-4 md:py-5 font-medium text-white transition-all hover:bg-white/10 hover:border-white/40 flex items-center justify-center gap-2 text-sm md:text-base"
              >
                Request Demo
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
