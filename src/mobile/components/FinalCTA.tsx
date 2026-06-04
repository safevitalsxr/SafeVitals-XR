"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, MotionValue, useTransform } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Globe, ArrowUpRight } from "lucide-react";


interface SceneProps {
  scrollProgress: MotionValue<number>;
}

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  hospital: z.string().min(2, "Hospital name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(1, "Please select your clinical role"),
});

type FormValues = z.infer<typeof schema>;

export function FinalCTA({ scrollProgress }: SceneProps) {
  // Scene 10 Range: 0.92 -> 1.0 (End of page)
  const sceneOpacity = useTransform(scrollProgress, [0.88, 0.92, 1.0], [0, 1, 1]);
  const y = useTransform(scrollProgress, [0.88, 0.92], [25, 0]);

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctor_name: data.name,
          hospital_name: data.hospital,
          email: data.email,
          department: data.role,
          hospital_size: "Not specified",
          message: "Cinematic Mobile Reservation",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to reserve early access");
      }
      setStatus("success");
      setStatusMessage("Early access reservation confirmed. Our clinical integration team will contact you shortly.");
      reset();
    } catch {
      setStatus("error");
      setStatusMessage("Unable to save reservation. Please verify your connection and try again.");
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-white outline-none transition-all duration-300 bg-white/[0.02] placeholder:text-white/25 focus:bg-[#0A1221] ${
      hasError
        ? "border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
        : "border-white/10 focus:border-[#00D4FF] focus:shadow-[0_0_15px_rgba(0,212,255,0.1)]"
    }`;

  return (
    <motion.div
      style={{ opacity: sceneOpacity, y }}
      className="absolute inset-0 w-full h-full bg-[#030712]/95 flex flex-col justify-between overflow-y-auto px-6 pt-16 pb-8 z-40 pointer-events-auto"
    >
      {/* Narrative Header */}
      <div className="text-center space-y-3 max-w-sm mx-auto">
        <h1 className="font-heading text-3xl font-extrabold tracking-widest text-[#F9FAFB] uppercase">
          SafeVitals <span className="text-[#00D4FF] drop-shadow-[0_0_10px_rgba(0,212,255,0.3)]">XR</span>
        </h1>
        <p className="font-sans text-xs text-white/55 font-light leading-relaxed">
          Building the future of patient monitoring.
        </p>
      </div>


      {/* Interactive CRM Form Card */}
      <div className="w-full max-w-[360px] mx-auto rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] my-6">
        <div className="text-center text-[9px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold mb-4">
          Reserve Early Access Slot
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <input
            type="text"
            placeholder="Dr. Alexander Wright"
            className={inputClasses(!!errors.name)}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-[9px] font-mono text-red-400 flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {errors.name.message}
            </p>
          )}

          <input
            type="text"
            placeholder="Mayo Clinic ICU"
            className={inputClasses(!!errors.hospital)}
            {...register("hospital")}
          />
          {errors.hospital && (
            <p className="text-[9px] font-mono text-red-400 flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {errors.hospital.message}
            </p>
          )}

          <input
            type="email"
            placeholder="wright@mayo.edu"
            className={inputClasses(!!errors.email)}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[9px] font-mono text-red-400 flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {errors.email.message}
            </p>
          )}

          <select className={inputClasses(!!errors.role)} {...register("role")} defaultValue="">
            <option value="" disabled className="bg-[#030712]">
              Select Clinical Role
            </option>
            <option value="Chief Medical Officer" className="bg-[#030712]">CMO / Director</option>
            <option value="ICU Head / Specialist" className="bg-[#030712]">ICU Head / Intensivist</option>
            <option value="Registered Nurse / ICU Lead" className="bg-[#030712]">ICU Charge Nurse</option>
            <option value="Clinical IT Administrator" className="bg-[#030712]">Clinical IT / Systems Lead</option>
            <option value="Other" className="bg-[#030712]">Other Healthcare</option>
          </select>
          {errors.role && (
            <p className="text-[9px] font-mono text-red-400 flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              {errors.role.message}
            </p>
          )}

          {status === "error" && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-[10px] font-sans text-red-300 leading-normal flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-sans text-emerald-300 leading-normal flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex gap-2 pt-1.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-grow py-3 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#2563EB] hover:from-[#00e1ff] hover:to-[#1d4ed8] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_15px_rgba(0,212,255,0.15)] flex items-center justify-center gap-1.5 disabled:opacity-50 active:scale-[0.98] transition-transform"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? "Reserving..." : "Reserve Access"}
            </button>
            <a
              href="mailto:safevitals.xr@gmail.com"
              className="px-3.5 py-3 rounded-xl bg-[#0A1221] border border-white/10 hover:border-white/20 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center active:scale-[0.98] transition-transform"
            >
              Contact Team
            </a>
          </div>
        </form>
      </div>

      {/* Mobile Footer Area */}
      <div className="w-full max-w-[360px] mx-auto border-t border-white/5 pt-6 flex flex-col gap-6 text-[10px] text-white/40 font-sans">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="font-heading text-xs font-bold text-white tracking-wider">SafeVitals XR</span>
            <p className="text-[9px] leading-relaxed text-white/30 max-w-[160px] font-light">
              Under incubation of <b>Ratan Tata Innovation Hub (RTIH)</b>
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right font-mono text-[9px]">
            <a href="mailto:safevitals.xr@gmail.com" className="hover:text-white transition-colors">safevitals.xr@gmail.com</a>
            <a href="tel:+919989359799" className="hover:text-white transition-colors">+91 9989359799</a>
          </div>
        </div>

        {/* Manual Redirect Switch */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <a
            href="https://safevitals.in?desktop=true"
            className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] text-white text-[10px] font-semibold font-mono tracking-wider uppercase text-center flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          >
            <Globe className="w-3.5 h-3.5 text-[#00D4FF]" />
            View Desktop Site
            <ArrowUpRight className="w-3 h-3 opacity-60" />
          </a>
        </div>

        {/* Legal & Privacy */}
        <div className="flex justify-between items-center text-[9px] font-mono text-white/20 border-t border-white/5 pt-4">
          <span>© {new Date().getFullYear()} SAFEVITALS XR.</span>
          <div className="flex gap-2.5">
            <a href="https://github.com/safevitalsxr" className="hover:text-white transition-colors">GITHUB</a>
            <span>•</span>
            <a
              href="https://www.instagram.com/safevitals_xr?igsh=MWtvcmgzbmJuemYzag=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
