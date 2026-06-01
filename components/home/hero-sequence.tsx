"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 100;
const PRELOAD_FRAMES = true;
const R2_BUCKET_URL = "https://pub-731a48c3160243f6a21049d8bb21b75b.r2.dev";

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, "0");
  return `${R2_BUCKET_URL}/ezgif-frame-${paddedIndex}.png`;
};

export function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const text5Ref = useRef<HTMLDivElement>(null);
  
  const vitalsCardRef = useRef<HTMLDivElement>(null);
  const targetDotRef = useRef<HTMLDivElement>(null);
  const connectorLineRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [vitals, setVitals] = useState({ hr: 72, spo2: 98, resp: 16, temp: 36.6 });

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals({
        hr: Math.round(70 + Math.random() * 5),
        spo2: Math.round(97 + Math.random() * 2),
        resp: Math.round(15 + Math.random() * 2),
        temp: 36.5 + Math.random() * 0.3,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!PRELOAD_FRAMES) {
      setImagesLoaded(true);
      return;
    }
    
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !containerRef.current || !canvasRef.current) return;

    const isMobile = window.innerWidth < 768;

    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    
    const frameObj = { frame: 1, xShift: 0.15, zoom: 1.0 };
    
    const renderFrame = (f: number, xShift: number, zoom: number) => {
      if (!context || !canvasRef.current) return;
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      
      context.clearRect(0, 0, w, h);
      
      const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(f)));
      const img = imagesRef.current[frameIndex - 1];
      
      if (img && img.complete) {
        // Crop the source image to hide the Veo watermark at the bottom edge
        const sx = img.width * 0.02; // Crop 2% from left
        const sy = img.height * 0.02; // Crop 2% from top
        const sWidth = img.width * 0.96; // 4% total width crop
        const sHeight = img.height * 0.82; // Crop 16% from the bottom to hide watermark

        const baseScale = Math.max(w / sWidth, h / sHeight);
        const scale = (isMobile ? baseScale * 1.08 : baseScale * 1.05) * zoom;

        const drawWidth = sWidth * scale;
        const drawHeight = sHeight * scale;

        const baseOffsetX = (w - drawWidth) / 2;
        const zoomBiasY = (zoom - 1.0) * (h * (isMobile ? 0.20 : 0.15)); 
        const offsetY = ((h - drawHeight) / 2) + zoomBiasY;

        const actualShift = isMobile ? xShift * 0.5 : xShift;
        let offsetX = baseOffsetX + (w * actualShift);

        offsetX = Math.min(0, Math.max(w - drawWidth, offsetX));

        context.drawImage(
          img, 
          sx, sy, sWidth, sHeight, 
          offsetX, offsetY, drawWidth, drawHeight
        );
      }
    };

    const resizeCanvas = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      renderFrame(frameObj.frame, frameObj.xShift, frameObj.zoom);
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=400%",
        scrub: 0.5,
        pin: true,
      }
    });

    tl.to(frameObj, {
      frame: TOTAL_FRAMES,
      snap: "frame",
      ease: "none",
      duration: 1,
      onUpdate: () => renderFrame(frameObj.frame, frameObj.xShift, frameObj.zoom),
    }, 0);

    // Cinematic Zoom sequence: stay at 1.4x from 20% to 40%, zoom out to 1.0x over remaining
    tl.to(frameObj, {
      zoom: 1.4,
      ease: "power1.inOut",
      duration: 0.2
    }, 0);

    tl.to(frameObj, {
      zoom: 1.0,
      ease: "power2.out",
      duration: 0.6
    }, 40 / 100);

    // Image shifts: align opposite to text overlays to maximize layout spacing
    tl.to(frameObj, { xShift: -0.15, duration: 0.1, ease: "power1.inOut" }, 15 / 100); // text2 (Right)
    tl.to(frameObj, { xShift: 0.15, duration: 0.1, ease: "power1.inOut" }, 35 / 100);  // text3 (Left)
    tl.to(frameObj, { xShift: -0.15, duration: 0.1, ease: "power1.inOut" }, 75 / 100); // text5 (Right)

    // Text Orchestration configured using autoAlpha for visibility & click protection
    
    // text1: Frames 1-20
    tl.to(text1Ref.current, { autoAlpha: 0, x: -40, duration: 0.15 }, 15 / 100);
    
    // text2: Frames 21-80 (Beyond Traditional Monitoring) - remains fixed & visible
    tl.fromTo(text2Ref.current, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 20 / 100);
    tl.to(text2Ref.current, { autoAlpha: 0, x: 40, duration: 0.1 }, 80 / 100);

    // Vitals HUD Card animation:
    // 1. Appears floating beside the heart (frame 20 to 40)
    tl.fromTo(vitalsCardRef.current, 
      { autoAlpha: 0, scale: 0.9, x: 0, y: 0, filter: "blur(0px)" }, 
      { autoAlpha: 1, scale: 1, duration: 0.08, ease: "power1.out" }, 
      20 / 100
    );
    
    // 2. Target Dot and Connector Line appear at 20% scroll
    tl.fromTo(targetDotRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 20 / 100);
    tl.fromTo(connectorLineRef.current, { autoAlpha: 0 }, { autoAlpha: 0.6, duration: 0.08 }, 20 / 100);

    // 3. Ambient Vitals transformation (from 40% to 80% scroll):
    // HUD Card moves behind the text (translates, scales up, blurs, and fades to 0.15 opacity)
    tl.to(vitalsCardRef.current, {
      x: isMobile ? 0 : 80,
      y: isMobile ? 80 : 120,
      scale: isMobile ? 1.15 : 1.7,
      opacity: 0.15,
      filter: "blur(2px)",
      ease: "power2.inOut",
      duration: 0.4
    }, 40 / 100);

    // 4. Target Dot and Connector Line fade out completely at 40% scroll
    tl.to(targetDotRef.current, { autoAlpha: 0, duration: 0.1, ease: "power1.inOut" }, 40 / 100);
    tl.to(connectorLineRef.current, { autoAlpha: 0, duration: 0.1, ease: "power1.inOut" }, 40 / 100);

    // 5. HUD Card fades out completely at 85% scroll
    tl.to(vitalsCardRef.current, { autoAlpha: 0, duration: 0.05 }, 85 / 100);

    // Scroll-synchronized pulse on the glow container (underneath text2)
    tl.fromTo(glowRef.current, { scale: 0.8, opacity: 0.2 }, { scale: 1.25, opacity: 0.6, duration: 0.05, ease: "power1.out" }, 20 / 100);
    tl.to(glowRef.current, { scale: 0.95, opacity: 0.3, duration: 0.03, ease: "power1.inOut" }, 24 / 100);
    tl.to(glowRef.current, { scale: 1.3, opacity: 0.7, duration: 0.03, ease: "power1.out" }, 28 / 100);
    tl.to(glowRef.current, { scale: 1.0, opacity: 0.4, duration: 0.04, ease: "power1.inOut" }, 31 / 100);
    tl.to(glowRef.current, { scale: 0.8, opacity: 0.2, duration: 0.04 }, 35 / 100);

    // text3: Frames 41-60 (Anatomy Informed)
    tl.fromTo(text3Ref.current, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 40 / 100);
    tl.to(text3Ref.current, { autoAlpha: 0, x: -40, duration: 0.1 }, 55 / 100);

    // text4: Frames 61-80 (Infrastructure Ready)
    tl.fromTo(text4Ref.current, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 60 / 100);
    tl.to(text4Ref.current, { autoAlpha: 0, x: -40, duration: 0.1 }, 75 / 100);

    // text5: Frames 81-100 (Final CTA Moment)
    tl.fromTo(text5Ref.current, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 80 / 100);

    // Seamless unpin transition: fade canvas out to black from frame 90 to 100
    tl.to(canvasRef.current, { opacity: 0, duration: 0.1 }, 90 / 100);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [imagesLoaded]);

  return (
    <section id="home-hero" ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden pointer-events-auto">
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full object-cover" />
      
      {/* Target Dot on Chest */}
      <div 
        ref={targetDotRef} 
        className="absolute left-[45%] top-[52%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center md:flex hidden z-10 pointer-events-none opacity-0"
      >
        <span className="absolute inline-flex h-6 w-6 rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 animate-pulse"></span>
      </div>

      {/* Dotted Connector Line */}
      <svg 
        ref={connectorLineRef} 
        className="absolute inset-0 w-full h-full md:block hidden z-10 pointer-events-none opacity-0" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <line 
          x1="45%" y1="52%" 
          x2="60%" y2="28%" 
          stroke="#22d3ee" 
          strokeWidth="1.5" 
          strokeDasharray="4 4" 
          className="opacity-60"
        />
      </svg>

      {/* Vitals HUD Card (floating HUD connecting to the heart, morphs to large backdrop telemetry) */}
      <div 
        ref={vitalsCardRef} 
        className="absolute md:left-[60%] md:top-[28%] left-1/2 top-[18%] -translate-x-1/2 md:translate-x-0 w-[90%] max-w-[340px] bg-slate-950/60 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-5 shadow-[0_0_30px_rgba(6,182,212,0.15)] flex flex-col gap-3 animate-hud-pulse z-10 pointer-events-none opacity-0"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Vitals Connection
          </span>
          <span className="text-[10px] font-mono text-white/40">Patient: Twin-01</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Heart Rate */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/50 uppercase">Heart Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-semibold text-white tracking-tight">
                {vitals.hr}
              </span>
              <span className="text-xs font-mono text-cyan-400">BPM</span>
            </div>
          </div>

          {/* SpO2 */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/50 uppercase">O₂ Saturation</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-semibold text-white tracking-tight">
                {vitals.spo2}
              </span>
              <span className="text-xs font-mono text-emerald-400">%</span>
            </div>
          </div>

          {/* Respiration */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/50 uppercase">Respiration</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-semibold text-white tracking-tight">
                {vitals.resp}
              </span>
              <span className="text-xs font-mono text-amber-400">/min</span>
            </div>
          </div>

          {/* Temperature */}
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-white/50 uppercase">Temperature</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-heading font-semibold text-white tracking-tight">
                {vitals.temp.toFixed(1)}
              </span>
              <span className="text-xs font-mono text-rose-400">°C</span>
            </div>
          </div>
        </div>

        {/* ECG Waveform panel */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider">ECG Real-time Pulse</span>
            <span className="text-[9px] font-mono text-cyan-400 animate-pulse">II-Lead Active</span>
          </div>
          <div className="h-12 w-full bg-black/40 border border-white/5 rounded-lg overflow-hidden relative">
            <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
              <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                <path
                  d="M 0 50 L 20 50 Q 25 40 30 50 L 33 50 L 38 10 L 43 90 L 48 50 L 53 50 Q 58 40 63 50 L 80 50 L 100 50 M 100 50 L 120 50 Q 125 40 130 50 L 133 50 L 138 10 L 143 90 L 148 50 L 153 50 Q 158 40 163 50 L 180 50 L 200 50"
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_3px_rgba(34,211,238,0.8)]"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Frames 1-20: Center/Left - SafeVitals XR Introduction */}
      <div ref={text1Ref} className="absolute inset-x-0 md:inset-x-auto md:left-24 top-1/3 z-20 flex flex-col items-start px-6">
        <div className="space-y-4 max-w-3xl bg-black/10 backdrop-blur-[2px] p-6 rounded-2xl border border-white/5">
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm font-semibold select-none">
            SafeVitals XR
          </h1>
          <h2 className="font-heading text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 font-medium select-none">
            The Spatial Clinical Monitor
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 max-w-xl font-light select-none">
            Connect patient telemetry to the spatial computing network instantly. Real-time medical-grade rendering.
          </p>
        </div>
      </div>

      {/* Frames 21-80: Right Aligned - Heart/Chest Focus, Vitals Ambient Background behind text */}
      <div ref={text2Ref} className="absolute inset-x-0 md:inset-x-auto md:right-24 top-[35%] z-20 flex flex-col items-end text-right px-6 opacity-0 translate-x-10 pointer-events-none drop-shadow-2xl">
        <div ref={glowRef} className="absolute -inset-20 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10 animate-heart-pulse" />
        <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-tight text-white mb-6 font-semibold bg-clip-text text-transparent bg-gradient-to-l from-white to-white/70 select-none">
          Beyond<br />Traditional<br />Monitoring.
        </h2>
        <p className="font-sans text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed select-none">
          Traditional monitoring displays numbers. SafeVitals XR transforms patient data into an immersive real-time digital twin, helping clinicians understand health status instantly.
        </p>
      </div>

      {/* Frames 41-60: Left Aligned - Anatomy Informed */}
      <div ref={text3Ref} className="absolute inset-x-0 md:inset-x-auto md:left-24 top-[35%] z-20 flex flex-col items-start px-6 opacity-0 -translate-x-10 pointer-events-none drop-shadow-2xl">
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-12 max-w-2xl shadow-2xl">
          <p className="font-mono text-sm md:text-base tracking-[0.2em] text-cyan-400 mb-6 uppercase font-semibold">
            Spatial Precision
          </p>
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight text-white mb-6 font-semibold select-none">
            Anatomy<br />Informed.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 font-light leading-relaxed select-none">
            Instantly locate vitals anomalies mapped onto the patient&apos;s digital skeleton and vascular structures.
          </p>
        </div>
      </div>

      {/* Frames 61-80: Left Aligned - Infrastructure Ready */}
      <div ref={text4Ref} className="absolute inset-x-0 md:inset-x-auto md:left-24 top-[35%] z-20 flex flex-col items-start px-6 opacity-0 -translate-x-10 pointer-events-none drop-shadow-2xl">
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-12 max-w-2xl shadow-2xl">
          <p className="font-mono text-sm md:text-base tracking-[0.2em] text-cyan-400 mb-6 uppercase font-semibold">
            Infrastructure Ready
          </p>
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight text-white mb-6 font-semibold select-none">
            Powered by<br />SafeVitals Bridge.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 font-light leading-relaxed select-none">
            Instantly connect existing hospital monitoring systems into our unified, secure spatial computing architecture.
          </p>
        </div>
      </div>

      {/* Frames 81-100: Right Aligned - Final CTA */}
      <div ref={text5Ref} className="absolute inset-x-0 md:inset-x-auto md:right-24 top-[35%] z-20 flex flex-col items-end text-right px-6 opacity-0 translate-x-10 drop-shadow-2xl">
        <div className="space-y-6 max-w-3xl flex flex-col items-end">
          <h2 className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-none text-white mb-8 font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 select-none">
            The Future<br />Is Here.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/50 mb-12 max-w-xl font-light select-none">
            Enter the next generation of healthcare operations with real-time immersive visualization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/platform" className="rounded-full bg-white px-10 py-5 font-semibold text-black transition-all hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3">
              Explore Platform
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
