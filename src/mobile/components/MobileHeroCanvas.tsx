"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_HERO_FRAMES = 100;
const R2_BUCKET_URL = "https://pub-731a48c3160243f6a21049d8bb21b75b.r2.dev";

const getHeroFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, "0");
  return `${R2_BUCKET_URL}/ezgif-frame-${paddedIndex}.webp`;
};

interface MobileCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export function MobileHeroCanvas({ scrollYProgress }: MobileCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Opacity: fully visible from 0.0 to 0.35, then fades out from 0.35 to 0.42
  const opacity = useTransform(scrollYProgress, [0.0, 0.35, 0.42], [1, 1, 0]);

  // Frame index: maps scroll from 0.0 to 0.38 onto frame numbers 1 to 100
  const frameIndexValue = useTransform(scrollYProgress, [0.0, 0.38], [1, 100]);

  // Zoom: starts at 1.3 for close-up chest focus, zoom out to 0.95 to show the full twin
  const zoom = useTransform(
    scrollYProgress,
    [0.0, 0.12, 0.28, 0.38],
    [1.3, 1.3, 0.95, 0.95]
  );

  // Preload images on mount
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_HERO_FRAMES; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = getHeroFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_HERO_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  const renderFrame = (f: number, zVal: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const w = canvas.width;
    const h = canvas.height;
    context.clearRect(0, 0, w, h);

    const idx = Math.max(1, Math.min(TOTAL_HERO_FRAMES, Math.round(f)));
    const img = imagesRef.current[idx - 1];

    if (img && img.complete) {
      // Crop 2% left/top, 4% width, 16% bottom (hides watermark)
      const sx = img.width * 0.02;
      const sy = img.height * 0.02;
      const sWidth = img.width * 0.96;
      const sHeight = img.height * 0.82;

      // Fit to portrait screen (object-cover style scaling)
      const baseScale = Math.max(w / sWidth, h / sHeight);
      const scale = baseScale * 1.08 * zVal;

      const drawWidth = sWidth * scale;
      const drawHeight = sHeight * scale;

      const offsetX = (w - drawWidth) / 2;
      
      // Calculate Y offset with zoom bias: shift lower part up when zooming in
      const zoomBiasY = (zVal - 1.0) * (h * 0.18);
      const offsetY = ((h - drawHeight) / 2) + zoomBiasY;

      context.drawImage(img, sx, sy, sWidth, sHeight, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndexValue.get(), zoom.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, frameIndexValue, zoom]);

  // Listen to frame and zoom changes to redraw the canvas
  useMotionValueEvent(frameIndexValue, "change", (latestFrame) => {
    renderFrame(latestFrame, zoom.get());
  });

  useMotionValueEvent(zoom, "change", (latestZoom) => {
    renderFrame(frameIndexValue.get(), latestZoom);
  });

  return (
    <motion.div
      style={{ opacity, pointerEvents: "none" }}
      className="absolute inset-0 w-full h-full z-10"
    >
      {!imagesLoaded && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas ref={canvasRef} className="w-full h-full object-cover" />
    </motion.div>
  );
}
