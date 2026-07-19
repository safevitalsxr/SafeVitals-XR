"use client";

import { useState } from "react";
import { Lock, User, ShieldAlert, Activity, ArrowRight } from "lucide-react";

type Role = "patient" | "doctor" | "staff";

export default function CentralLogin() {
  const [role, setRole] = useState<Role>("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const getDemoCredentials = () => {
    switch (role) {
      case "patient":
        return { username: "PAT-912", password: "patient123" };
      case "doctor":
        return { username: "doctor@safevitals.in", password: "doctor123" };
      case "staff":
        return { username: "staff@safevitals.in", password: "staff123" };
    }
  };

  const autofillDemo = () => {
    const creds = getDemoCredentials();
    setUsername(creds.username);
    setPassword(creds.password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      // Simulate successful login redirection to the respective subdomain
      if (typeof window !== "undefined") {
        const port = window.location.port ? `:${window.location.port}` : "";
        const hostname = window.location.hostname;
        
        let targetUrl = "";
        if (hostname.includes("localhost") || hostname.includes("127.0.0.1")) {
          // Dev redirect: e.g. http://patient.localhost:3000
          targetUrl = `${window.location.protocol}//${role}.localhost${port}`;
        } else {
          // Prod redirect: e.g. https://patient.dashboard.safevitals.in
          const baseDomain = hostname.replace("dashboard.", "");
          targetUrl = `${window.location.protocol}//${role}.${baseDomain}`;
        }

        window.location.href = targetUrl;
      }
    }, 1200);
  };

  return (
    <main className="min-h-screen w-full bg-black relative flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#00D4FF]/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative w-full max-w-[500px] bg-slate-950/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl flex flex-col gap-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00D4FF] to-blue-600 p-[1px] flex items-center justify-center shadow-[0_0_20px_rgba(0,212,255,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-[#00D4FF] animate-pulse" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mt-4">SafeVitals Command</h1>
          <p className="text-sm text-white/50 max-w-xs">
            Access secure patient records, clinical overlays, and device gateway configurations.
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
          {(["patient", "doctor", "staff"] as Role[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase font-semibold transition-all duration-300 ${
                role === r
                  ? "bg-gradient-to-r from-[#00D4FF] to-blue-600 text-white shadow-md"
                  : "text-white/40 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
              Username or ID
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === "patient" ? "Patient ID (e.g. PAT-912)" : "Professional Email"}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
              />
            </div>
          </div>

          {/* Quick Access / Demo Credentials */}
          <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] font-mono text-white/40 font-semibold uppercase tracking-wider">Demo Credentials</span>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col font-mono text-[11px] text-white/60 gap-0.5">
                <span>ID/Email: <code className="text-[#00D4FF] font-semibold">{getDemoCredentials().username}</code></span>
                <span>Password: <code className="text-[#00D4FF] font-semibold">{getDemoCredentials().password}</code></span>
              </div>
              <button
                type="button"
                onClick={autofillDemo}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-mono text-white font-medium transition-all cursor-pointer border border-white/5 active:scale-95"
              >
                Autofill
              </button>
            </div>
          </div>

          {/* Alert Note */}
          <div className="flex gap-3 items-start bg-[#00D4FF]/5 border border-[#00D4FF]/15 p-4 rounded-xl">
            <ShieldAlert className="w-4 h-4 text-[#00D4FF] flex-shrink-0 mt-0.5" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-mono text-white/70 font-semibold uppercase">Security Note</span>
              <p className="text-[10px] text-white/40 leading-relaxed">
                You will be redirected securely to <code className="text-[#00D4FF]">{role}.dashboard.safevitals.in</code>.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#00D4FF] hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Sign In to {role.charAt(0).toUpperCase() + role.slice(1)} Portal
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-[10px] text-center text-white/20 font-mono">
          SafeVitals Healthcare Operations Gateway v1.0.0 · HIPAA Certified
        </p>

      </div>
    </main>
  );
}
