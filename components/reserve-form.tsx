"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitDemoRequest } from "@/lib/supabase";

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
  "w-full rounded border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted/60 focus:border-cyan/60 focus:bg-cyan/5";

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
      await submitDemoRequest(values);
      setStatus("success");
      reset();
    } catch {
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
        <select className={inputClass} defaultValue="" {...register("hospital_size")}>
          <option value="" disabled>
            Select size
          </option>
          <option>Under 100 beds</option>
          <option>100-500 beds</option>
          <option>500-1,000 beds</option>
          <option>1,000+ beds</option>
        </select>
      </Field>
      <Field label="Message" error={errors.message?.message} wide>
        <textarea className={`${inputClass} min-h-32 resize-y`} placeholder="Tell us which monitoring systems you use today." {...register("message")} />
      </Field>
      <div className="flex flex-wrap items-center gap-4 lg:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-void transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? "Reserving..." : "Reserve Demo"}
        </button>
        {status === "success" ? (
          <p className="text-sm text-mint">Request captured. Supabase storage is used when configured.</p>
        ) : null}
        {status === "error" ? <p className="text-sm text-danger">The request could not be stored. Check Supabase settings.</p> : null}
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
