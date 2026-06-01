"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 25;
const PRELOAD_FRAMES = true;
const R2_BUCKET_URL = "https://pub-731a48c3160243f6a21049d8bb21b75b.r2.dev";

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, "0");
  return `${R2_BUCKET_URL}/bridge-scroll/ezgif-frame-${paddedIndex}.webp`;
};

export function BridgeScrollFullscreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!PRELOAD_FRAMES) {
      setImagesLoaded(true);
      return;
    }
    
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
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
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;
    const text3 = text3Ref.current;

    if (!imagesLoaded || !container || !canvas || !text1 || !text2 || !text3) return;

    const context = canvas.getContext("2d");
    if (!context) return;
    
    const frameObj = { frame: 1 };
    
    const renderFrame = (f: number) => {
      if (!context || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;
      
      context.clearRect(0, 0, w, h);
      
      const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(f)));
      const img = imagesRef.current[frameIndex - 1];
      
      if (img && img.complete) {
        // Crop the source image to hide the Veo watermark at the bottom edge
        const sx = img.width * 0.02; // Crop 2% from left
        const sy = img.height * 0.02; // Crop 2% from top
        const sWidth = img.width * 0.96; // 4% total width crop
        const sHeight = img.height * 0.82; // Crop 16% from the bottom to hide watermark

        const scale = Math.max(w / sWidth, h / sHeight);
        const drawWidth = sWidth * scale;
        const drawHeight = sHeight * scale;

        const offsetX = (w - drawWidth) / 2;
        const offsetY = (h - drawHeight) / 2;

        context.drawImage(
          img, 
          sx, sy, sWidth, sHeight, 
          offsetX, offsetY, drawWidth, drawHeight
        );
      }
    };

    const resizeCanvas = () => {
      if (!canvas || !container) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameObj.frame);
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=250%",
        scrub: 0.5,
        pin: true,
      }
    });

    // Frame sequence scrub
    tl.to(frameObj, {
      frame: TOTAL_FRAMES,
      snap: "frame",
      ease: "none",
      onUpdate: () => renderFrame(frameObj.frame),
      duration: 1,
    }, 0);

    // Text Orchestration using autoAlpha for visibility & layout fade shifts

    // Scene 1: Visible from start to 30% scroll
    tl.to(text1, { autoAlpha: 0, x: -40, duration: 0.15 }, 25 / 100);

    // Scene 2: Visible from 35% to 65% scroll
    tl.fromTo(text2, { autoAlpha: 0, x: 40 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 32 / 100);
    tl.to(text2, { autoAlpha: 0, x: 40, duration: 0.15 }, 65 / 100);

    // Scene 3: Visible from 70% to 100% scroll
    tl.fromTo(text3, { autoAlpha: 0, x: -40 }, { autoAlpha: 1, x: 0, duration: 0.1 }, 72 / 100);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars.trigger === container) t.kill();
      });
    };
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden pointer-events-auto border-b border-white/5">
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full object-cover" />
      
      {/* Scene 1: Frames 1-8: Left Aligned */}
      <div ref={text1Ref} className="absolute inset-x-0 md:inset-x-auto md:left-24 top-[30%] md:top-[35%] z-20 flex flex-col items-start px-6">
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl shadow-2xl">
          <span className="font-mono text-sm tracking-[0.2em] text-cyan-400 mb-4 block uppercase font-semibold">01 / Connection</span>
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight text-white mb-6 font-semibold select-none leading-tight">
            SafeVitals Bridge.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 font-light leading-relaxed select-none">
            Plug directly into existing hospital monitoring hardware. No expensive replacement or proprietary vendor lock-in required.
          </p>
        </div>
      </div>

      {/* Scene 2: Frames 9-16: Right Aligned */}
      <div ref={text2Ref} className="absolute inset-x-0 md:inset-x-auto md:right-24 top-[30%] md:top-[35%] z-20 flex flex-col items-end text-right px-6 opacity-0 translate-x-10 pointer-events-none drop-shadow-2xl">
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl shadow-2xl flex flex-col items-end">
          <span className="font-mono text-sm tracking-[0.2em] text-cyan-400 mb-4 block uppercase font-semibold">02 / Extraction</span>
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight text-white mb-6 font-semibold select-none leading-tight">
            Raw Clinical Data.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 font-light leading-relaxed select-none">
            Extract high-frequency telemetry—including ECG waveforms, SpO₂, respiration, and temperature streams—directly from ICU hardware.
          </p>
        </div>
      </div>

      {/* Scene 3: Frames 17-25: Left Aligned */}
      <div ref={text3Ref} className="absolute inset-x-0 md:inset-x-auto md:left-24 top-[30%] md:top-[35%] z-20 flex flex-col items-start px-6 opacity-0 -translate-x-10 pointer-events-none drop-shadow-2xl">
        <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-2xl shadow-2xl">
          <span className="font-mono text-sm tracking-[0.2em] text-cyan-400 mb-4 block uppercase font-semibold">03 / Synthesis</span>
          <h2 className="font-heading text-4xl md:text-6xl tracking-tight text-white mb-6 font-semibold select-none leading-tight">
            The Digital Twin.
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/60 font-light leading-relaxed select-none">
            Bedside clinical signals are parsed instantly and streamed directly into the spatial rendering layer, fueling the real-time virtual patient twin.
          </p>
        </div>
      </div>
    </section>
  );
}
