"use client";

import { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_BRIDGE_FRAMES = 25;
const R2_BUCKET_URL = "https://pub-731a48c3160243f6a21049d8bb21b75b.r2.dev";

const getBridgeFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, "0");
  return `${R2_BUCKET_URL}/bridge-scroll/ezgif-frame-${paddedIndex}.webp`;
};

interface MobileCanvasProps {
  scrollYProgress: MotionValue<number>;
}

export function MobileBridgeCanvas({ scrollYProgress }: MobileCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Opacity: fades in between 0.38 and 0.42, stays 1 until 0.52, then fades out from 0.52 to 0.58
  const opacity = useTransform(
    scrollYProgress,
    [0.35, 0.38, 0.42, 0.52, 0.58, 0.61],
    [0, 0, 1, 1, 0, 0]
  );

  // Frame index: maps scroll from 0.38 to 0.56 onto frame numbers 1 to 25
  const frameIndexValue = useTransform(scrollYProgress, [0.38, 0.56], [1, 25]);

  // Preload images on mount
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_BRIDGE_FRAMES; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = getBridgeFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_BRIDGE_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  const renderFrame = (f: number) => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const w = canvas.width;
    const h = canvas.height;
    context.clearRect(0, 0, w, h);

    const idx = Math.max(1, Math.min(TOTAL_BRIDGE_FRAMES, Math.round(f)));
    const img = imagesRef.current[idx - 1];

    if (img && img.complete) {
      // Crop 2% left/top, 4% width, 16% bottom (hides watermark)
      const sx = img.width * 0.02;
      const sy = img.height * 0.02;
      const sWidth = img.width * 0.96;
      const sHeight = img.height * 0.82;

      // Fit to portrait screen (object-cover style scaling)
      const scale = Math.max(w / sWidth, h / sHeight);
      const drawWidth = sWidth * scale;
      const drawHeight = sHeight * scale;

      const offsetX = (w - drawWidth) / 2;
      const offsetY = (h - drawHeight) / 2;

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
      renderFrame(frameIndexValue.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, frameIndexValue]);

  // Listen to frame changes to redraw the canvas
  useMotionValueEvent(frameIndexValue, "change", (latestFrame) => {
    renderFrame(latestFrame);
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
