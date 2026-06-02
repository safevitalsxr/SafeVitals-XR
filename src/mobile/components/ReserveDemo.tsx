"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, ShieldCheck } from "lucide-react";
import { submitDemoRequest } from "@/lib/supabase";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  hospital: z.string().min(2, "Hospital name is required"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(1, "Please select your clinical role"),
});

type FormValues = z.infer<typeof schema>;

export function ReserveDemo() {
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
      // Map mobile form fields to Supabase schema:
      // doctor_name -> data.name
      // hospital_name -> data.hospital
      // email -> data.email
      // department -> data.role (Role)
      // hospital_size -> "Not specified" (required field)
      await submitDemoRequest({
        doctor_name: data.name,
        hospital_name: data.hospital,
        email: data.email,
        department: data.role,
        hospital_size: "Not specified",
        message: "Mobile Reservation Request",
      });
      setStatus("success");
      setStatusMessage("Early access reservation confirmed. Our clinical integration team will contact you shortly.");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setStatusMessage("Unable to save reservation. Please verify your connection and try again.");
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 bg-white/[0.03] placeholder:text-white/35 focus:bg-[#0A1221] ${
      hasError
        ? "border-red-500/50 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
        : "border-white/10 focus:border-[#00D4FF] focus:shadow-[0_0_15px_rgba(0,212,255,0.15)]"
    }`;

  return (
    <section id="reserve-demo" className="bg-[#030712] px-6 py-20 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute left-1/2 bottom-[-10%] -translate-x-1/2 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="space-y-3 mb-10 text-center max-w-sm mx-auto">
        <span className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-bold">
          Early Access Program
        </span>
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white leading-tight">
          The Future of Patient Monitoring Starts Here
        </h2>
        <p className="font-sans text-xs text-white/50 leading-relaxed font-light">
          Reserve early access slots for your facility. Connect with our technical integration experts.
        </p>
      </div>

      <div className="max-w-[420px] mx-auto rounded-2xl bg-[#0A1221]/45 border border-white/5 p-6 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.3)]">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center py-8 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                Reservation Confirmed
              </h3>
              <p className="font-sans text-xs text-white/60 leading-relaxed max-w-xs mx-auto">
                {statusMessage}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Dr. Alexander Wright"
                  className={inputClasses(!!errors.name)}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Hospital */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                  Hospital / Facility
                </label>
                <input
                  type="text"
                  placeholder="Mayo Clinic ICU"
                  className={inputClasses(!!errors.hospital)}
                  {...register("hospital")}
                />
                {errors.hospital && (
                  <p className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.hospital.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                  Professional Email
                </label>
                <input
                  type="email"
                  placeholder="wright@mayo.edu"
                  className={inputClasses(!!errors.email)}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Clinical Role */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                  Clinical Role
                </label>
                <select className={inputClasses(!!errors.role)} {...register("role")} defaultValue="">
                  <option value="" disabled className="bg-[#030712]">
                    Select your role
                  </option>
                  <option value="Chief Medical Officer" className="bg-[#030712]">
                    Chief Medical Officer / Director
                  </option>
                  <option value="ICU Head / Specialist" className="bg-[#030712]">
                    ICU Head / Intensivist
                  </option>
                  <option value="Consulting Physician" className="bg-[#030712]">
                    Consulting Physician
                  </option>
                  <option value="Registered Nurse / ICU Lead" className="bg-[#030712]">
                    ICU Charge Nurse
                  </option>
                  <option value="Clinical IT Administrator" className="bg-[#030712]">
                    Clinical IT / Systems Lead
                  </option>
                  <option value="Other" className="bg-[#030712]">
                    Other Healthcare Professional
                  </option>
                </select>
                {errors.role && (
                  <p className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Status alerts */}
              {status === "error" && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-sans text-red-300 leading-relaxed font-light">
                    {statusMessage}
                  </p>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#2563EB] hover:from-[#00e1ff] hover:to-[#1d4ed8] text-white font-semibold text-sm shadow-[0_0_20px_rgba(0,212,255,0.15)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform pt-1"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Reserve Early Access"}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-white/35 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>SECURE CLINICAL REGISTRATION DATA</span>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
