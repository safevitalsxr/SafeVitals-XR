import { createClient } from "@supabase/supabase-js";

export type DemoSubmission = {
  hospital_name: string;
  doctor_name: string;
  email: string;
  department: string;
  hospital_size: string;
  message?: string;
};

export async function submitDemoRequest(payload: DemoSubmission) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return { stored: false };
  }

  const supabase = createClient(url, anonKey);
  const { error } = await supabase.from("demo_requests").insert(payload);

  if (error) {
    throw error;
  }

  return { stored: true };
}
