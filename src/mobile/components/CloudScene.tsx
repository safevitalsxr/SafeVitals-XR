"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { Server, Users, Eye, Building2 } from "lucide-react";

interface SceneProps {
  scrollProgress: MotionValue<number>;
}

export function CloudScene({ scrollProgress }: SceneProps) {
  // Scene 7 Range: 0.56 -> 0.70
  const sceneOpacity = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], [0, 1, 1, 0]);
  const scale = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], [0.96, 1, 1, 0.96]);
  const y = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], [25, 0, 0, -25]);

  // Network path drawing transition (0.52 -> 0.60 draw lines, then hold)
  const lineDraw = useTransform(scrollProgress, [0.52, 0.60], [0, 1]);

  // Headline animation - active throughout the scene's visibility
  const textOpacity = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], [0, 1, 1, 0]);
  const textY = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], [15, 0, 0, -15]);
  const textScale = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], [0.92, 1, 1, 1.05]);
  const textFilter = useTransform(scrollProgress, [0.52, 0.56, 0.66, 0.70], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.div
      style={{ opacity: sceneOpacity, scale, y }}
      className="absolute inset-0 w-full h-full bg-transparent flex flex-col justify-between px-6 py-20 z-30 pointer-events-none"
    >
      {/* Narrative Header */}
      <div className="text-center h-16 flex items-center justify-center">
        <motion.div style={{ opacity: textOpacity, y: textY, scale: textScale, filter: textFilter }} className="space-y-1">
          <h2 className="font-heading text-lg font-extrabold text-white tracking-tight">
            One Infrastructure.
          </h2>
          <p className="font-sans text-xs text-white/55 font-light">
            Unlimited clinical visibility.
          </p>
        </motion.div>
      </div>

      {/* Connected Digital Hospital Node Network */}
      <div className="relative w-full max-w-[300px] mx-auto aspect-square flex items-center justify-center">
        {/* Glowing background hub cloud flare */}
        <div className="absolute w-36 h-36 rounded-full bg-violet-500/10 blur-[60px]" />

        {/* Vector network connection lines */}
        <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 200 200">
          {/* Orbital rings */}
          <circle cx="100" cy="100" r="60" stroke="rgba(124, 58, 237, 0.08)" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="35" stroke="rgba(0, 212, 255, 0.05)" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

          <g stroke="rgba(124, 58, 237, 0.25)" strokeWidth="1" strokeDasharray="3 3">
            {/* Central Cloud Node (100, 100) connections to outer nodes */}
            <motion.line x1="100" y1="100" x2="40" y2="50" style={{ pathLength: lineDraw }} />
            <motion.line x1="100" y1="100" x2="160" y2="50" style={{ pathLength: lineDraw }} />
            <motion.line x1="100" y1="100" x2="40" y2="150" style={{ pathLength: lineDraw }} />
            <motion.line x1="100" y1="100" x2="160" y2="150" style={{ pathLength: lineDraw }} />
          </g>

          {/* Animated data packet dots traveling along coordinates */}
          {/* Node 1 to Central */}
          <motion.circle
            cx={40}
            cy={50}
            r="2"
            fill="#00D4FF"
            animate={{ cx: [40, 100], cy: [50, 100], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Node 2 to Central */}
          <motion.circle
            cx={160}
            cy={50}
            r="2"
            fill="#F43F5E"
            animate={{ cx: [160, 100], cy: [50, 100], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
          {/* Central to Node 3 */}
          <motion.circle
            cx={100}
            cy={100}
            r="2"
            fill="#10B981"
            animate={{ cx: [100, 40], cy: [100, 150], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: 1.0 }}
          />
        </svg>

        {/* Outer Node 1: Hospital Gateway (Top Left) */}
        <div className="absolute left-[8%] top-[12%] flex flex-col items-center gap-1 z-10 text-center select-none">
          <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-[#00D4FF]/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(0,212,255,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Building2 className="w-4 h-4 text-[#00D4FF]" />
          </div>
          <span className="text-[7px] font-mono text-white/50 tracking-wider">VJ-ICU HUB</span>
          <span className="text-[6px] font-mono text-emerald-400 font-semibold uppercase">ONLINE</span>
        </div>

        {/* Outer Node 2: Alert Dispatcher (Top Right) */}
        <div className="absolute right-[8%] top-[12%] flex flex-col items-center gap-1 z-10 text-center select-none">
          <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-red-500/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.1),inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Users className="w-4 h-4 text-red-400" />
          </div>
          <span className="text-[7px] font-mono text-white/50 tracking-wider">TRIAGE CONSOLE</span>
          <span className="text-[6px] font-mono text-red-400 font-semibold uppercase animate-pulse">ALARM ACT</span>
        </div>

        {/* Central Node: SafeVitals Cloud Platform Core */}
        <div className="absolute flex flex-col items-center gap-1 z-20 text-center select-none">
          <motion.div
            className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-violet-500/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,0.25),inset_0_1px_1px_rgba(255,255,255,0.05)]"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Server className="w-6 h-6 text-violet-400" />
          </motion.div>
          <span className="text-[8px] font-mono text-white font-bold tracking-wider pt-0.5">SV-PLATFORM</span>
          <span className="text-[6px] font-mono text-violet-400 font-semibold tracking-widest uppercase">ENCRYPTED</span>
        </div>

        {/* Outer Node 3: Medical Dashboard Terminal (Bottom Left) */}
        <div className="absolute left-[8%] bottom-[12%] flex flex-col items-center gap-1 z-10 text-center select-none">
          <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Eye className="w-4 h-4 text-white/60" />
          </div>
          <span className="text-[7px] font-mono text-white/50 tracking-wider">WARD SCREEN</span>
          <span className="text-[6px] font-mono text-white/30 uppercase">IDLE</span>
        </div>

        {/* Outer Node 4: Mobile API Consumer (Bottom Right) */}
        <div className="absolute right-[8%] bottom-[12%] flex flex-col items-center gap-1 z-10 text-center select-none">
          <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
            <Server className="w-4 h-4 text-white/60" />
          </div>
          <span className="text-[7px] font-mono text-white/50 tracking-wider">MOBILE API</span>
          <span className="text-[6px] font-mono text-emerald-400 font-semibold uppercase">ACTIVE</span>
        </div>
      </div>

      {/* scrolling telemetry console logger */}
      <div className="w-full max-w-[280px] mx-auto rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-xl p-2.5 font-mono text-[7px] text-[#00D4FF]/80 space-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] z-10 select-none">
        <div className="flex items-center justify-between text-white/35 border-b border-white/5 pb-1 mb-1 text-[6px]">
          <span>SV-EDGE INSTANT SYNC FEED</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/40">10:04:12</span>
          <span className="truncate flex-grow text-left">&gt; [INGEST] INCOMING SIGNAL: HR=72 SPO2=98</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/40">10:04:13</span>
          <span className="text-violet-400 truncate flex-grow text-left">&gt; [SEC] SECURE SOCKET ACCESS GRANTED [AES]</span>
        </div>
        <div className="flex justify-between gap-2">
          <span className="text-white/40">10:04:13</span>
          <span className="text-emerald-400 truncate flex-grow text-left">&gt; [SYNC] TRANSMITTING CENTRAL CONSOLE [STABLE]</span>
        </div>
      </div>
    </motion.div>
  );
}

