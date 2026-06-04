"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const schema = z.object({
  hospital_name: z.string().min(2, "Hospital name is required"),
  doctor_name: z.string().min(2, "Doctor name is required"),
  email: z.string().email("Use a valid email"),
  department: z.string().min(2, "Department is required"),
  hospital_size: z.string().min(1, "Select hospital size"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const inputClass =
  "w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted/60 focus:border-cyan-400/60 focus:bg-cyan-400/5";

const selectClass =
  "w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239AA4B2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_16px_center] bg-no-repeat focus:border-cyan-400/60 focus:bg-cyan-400/5";

export function ReserveForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("idle");
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to reserve demo");
      }
      setStatus("success");
      reset();
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`grid gap-4 ${compact ? "" : "lg:grid-cols-2"}`}>
      <Field label="Hospital Name" error={errors.hospital_name?.message}>
        <input className={inputClass} placeholder="Aster Critical Care" {...register("hospital_name")} />
      </Field>
      <Field label="Doctor Name" error={errors.doctor_name?.message}>
        <input className={inputClass} placeholder="Dr. Maya Rao" {...register("doctor_name")} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input className={inputClass} placeholder="maya@hospital.org" type="email" {...register("email")} />
      </Field>
      <Field label="Department" error={errors.department?.message}>
        <input className={inputClass} placeholder="ICU, Emergency, Cardiology" {...register("department")} />
      </Field>
      <Field label="Hospital Size" error={errors.hospital_size?.message}>
        <select className={selectClass} defaultValue="" {...register("hospital_size")}>
          <option className="bg-[#12161F] text-white" value="" disabled>
            Select size
          </option>
          <option className="bg-[#12161F] text-white">Under 100 beds</option>
          <option className="bg-[#12161F] text-white">100-500 beds</option>
          <option className="bg-[#12161F] text-white">500-1,000 beds</option>
          <option className="bg-[#12161F] text-white">1,000+ beds</option>
        </select>
      </Field>
      <Field label="Message" error={errors.message?.message} wide>
        <textarea className={`${inputClass} min-h-32 resize-y`} placeholder="Tell us which monitoring systems you use today." {...register("message")} />
      </Field>
      <div className="flex flex-wrap items-center gap-4 lg:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-cyan-400 hover:text-black hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Reserving..." : "Reserve Demo"}
        </button>
        {status === "success" ? (
          <p className="text-sm text-mint">Demo request submitted successfully. Our team will contact you shortly.</p>
        ) : null}
        {status === "error" ? <p className="text-sm text-danger">Failed to submit demo request. Please try again.</p> : null}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  wide,
  children,
}: {
  label: string;
  error?: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-2 ${wide ? "lg:col-span-2" : ""}`}>
      <span className="font-mono text-xs uppercase tracking-widest text-muted">{label}</span>
      {children}
      {error ? <span className="text-xs text-danger">{error}</span> : null}
    </label>
  );
}
