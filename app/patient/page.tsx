"use client";

import { useState, useEffect } from "react";
import { 
  Heart, 
  Activity, 
  FileText, 
  Download, 
  DollarSign, 
  ShieldCheck, 
  LogOut,
  Pill,
  TrendingUp,
  Microscope
} from "lucide-react";

export default function PatientPortal() {
  const [vitals, setVitals] = useState({ hr: 72, spo2: 98, bp: "120/80", rr: 16 });
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);

  // Simulate real-time vitals updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(prev => ({
        hr: Math.round(70 + Math.random() * 6),
        spo2: Math.round(97 + Math.random() * 2),
        bp: Math.random() > 0.8 ? `118/${Math.round(78 + Math.random() * 4)}` : prev.bp,
        rr: Math.round(15 + Math.random() * 2),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      const port = window.location.port ? `:${window.location.port}` : "";
      window.location.href = `${window.location.protocol}//localhost${port}/dashboard`;
    }
  };

  const records = [
    { id: "REC-901", name: "Full Blood Chemistry Count", date: "June 08, 2026", doctor: "Dr. Sarah Jenkins", size: "1.4 MB" },
    { id: "REC-844", name: "Cardiac Vascular CT Scan (Contrast)", date: "May 28, 2026", doctor: "Dr. Marcus Vance", size: "22.5 MB" },
    { id: "REC-721", name: "Discharge & Recovery Summary", date: "April 15, 2026", doctor: "Dr. Jenkins & Team", size: "840 KB" },
  ];

  const medications = [
    { name: "Lisinopril", dosage: "10mg", schedule: "Once daily (Morning)", purpose: "Blood Pressure" },
    { name: "Atorvastatin", dosage: "20mg", schedule: "Once daily (Night)", purpose: "Cholesterol Control" },
    { name: "Metoprolol", dosage: "25mg", schedule: "Twice daily", purpose: "Heart Rate Stability" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-x-hidden">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-[-30%] right-[-20%] w-[70%] h-[70%] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full bg-purple-600/5 blur-[150px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#00D4FF]" />
          <span className="font-heading text-lg font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            SafeVitals Patient
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-white">Alexander Thorne</span>
            <span className="text-[10px] text-white/40 font-mono">Patient ID: SV-PT-9082</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-xs font-mono text-white/70 hover:text-red-400 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Content Grid */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Column: Vitals Stream & Waveform */}
        <div className="flex flex-col gap-6">
          
          {/* Real-time vitals card */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00D4FF]" />
                Live Vitals Stream
              </h2>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#00D4FF] bg-[#00D4FF]/10 px-2.5 py-1 rounded-full uppercase font-bold animate-pulse">
                <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
                Telemetry Linked
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* HR */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col gap-1.5 relative overflow-hidden">
                <Heart className="absolute right-3 top-3 w-4 h-4 text-rose-500/40 animate-pulse" />
                <span className="text-[10px] font-mono text-white/40 uppercase">Heart Rate</span>
                <span className="text-3xl font-bold tracking-tight text-white">{vitals.hr}</span>
                <span className="text-[10px] font-mono text-[#00D4FF]">BPM</span>
              </div>
              
              {/* SpO2 */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col gap-1.5 relative overflow-hidden">
                <Activity className="absolute right-3 top-3 w-4 h-4 text-emerald-500/40" />
                <span className="text-[10px] font-mono text-white/40 uppercase">SpO₂ Level</span>
                <span className="text-3xl font-bold tracking-tight text-white">{vitals.spo2}</span>
                <span className="text-[10px] font-mono text-emerald-400">%</span>
              </div>

              {/* BP */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col gap-1.5 relative overflow-hidden">
                <ShieldCheck className="absolute right-3 top-3 w-4 h-4 text-cyan-500/40" />
                <span className="text-[10px] font-mono text-white/40 uppercase">Blood Pressure</span>
                <span className="text-3xl font-bold tracking-tight text-white">{vitals.bp}</span>
                <span className="text-[10px] font-mono text-cyan-400">mmHg</span>
              </div>

              {/* Respiration */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col gap-1.5 relative overflow-hidden">
                <span className="text-[10px] font-mono text-white/40 uppercase">Respiration</span>
                <span className="text-3xl font-bold tracking-tight text-white">{vitals.rr}</span>
                <span className="text-[10px] font-mono text-amber-500">breaths/min</span>
              </div>
            </div>

            {/* Simulated ECG Panel */}
            <div className="flex flex-col gap-2 bg-black/40 border border-white/5 rounded-xl p-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>ECG II-Lead wave</span>
                <span className="text-[#00D4FF]">Active Stream</span>
              </div>
              <div className="h-24 w-full bg-slate-950/20 border border-white/5 rounded-lg overflow-hidden relative">
                <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d="M 0 50 L 40 50 Q 50 40 60 50 L 66 50 L 76 10 L 86 90 L 96 50 L 106 50 Q 116 40 126 50 L 160 50 L 200 50 M 200 50 L 240 50 Q 250 40 260 50 L 266 50 L 276 10 L 286 90 L 296 50 L 306 50 Q 316 40 326 50 L 360 50 L 400 50"
                      fill="none"
                      stroke="#00D4FF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_0_6px_rgba(0,212,255,0.7)]"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Medical Records Section */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <Microscope className="w-4 h-4 text-purple-400" />
              Medical Documents & Lab Results
            </h2>
            <div className="flex flex-col gap-3">
              {records.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] hover:border-white/10 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mt-0.5">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{rec.name}</span>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[10px] font-mono text-white/40">
                        <span>Date: {rec.date}</span>
                        <span>·</span>
                        <span>By: {rec.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedRecord(rec.id);
                      setTimeout(() => setSelectedRecord(null), 1500);
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-[#00D4FF]/10 border border-white/10 hover:border-[#00D4FF]/20 text-[10px] font-mono font-semibold transition-all cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    {selectedRecord === rec.id ? "Downloading..." : rec.size}
                  </button>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column: Medications & Billing */}
        <div className="flex flex-col gap-6">

          {/* Medications Checklist */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <Pill className="w-4 h-4 text-emerald-400" />
              Prescribed Medications
            </h2>
            <div className="flex flex-col gap-3">
              {medications.map((med) => (
                <div 
                  key={med.name} 
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-white">{med.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase font-bold">
                      {med.dosage}
                    </span>
                  </div>
                  <span className="text-xs text-white/60 font-light mt-1">{med.schedule}</span>
                  <span className="text-[10px] text-white/30 font-mono mt-1 uppercase tracking-wider">{med.purpose}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Billing & Insurance Summary */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <DollarSign className="w-4 h-4 text-amber-400" />
              Billing & Operations
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col">
                <span className="text-[10px] font-mono text-white/40 uppercase">Outstanding Balance</span>
                <span className="text-2xl font-bold tracking-tight text-white mt-1">$412.50</span>
                <span className="text-[9px] text-amber-400 font-mono mt-1">Due Date: June 25, 2026</span>
              </div>
              
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col">
                <span className="text-[10px] font-mono text-white/40 uppercase">Insurer Coverage</span>
                <span className="text-2xl font-bold tracking-tight text-white mt-1">85%</span>
                <span className="text-[9px] text-emerald-400 font-mono mt-1">Aetna Healthcare</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-3 mt-2">
              <button className="flex-1 py-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-[#00D4FF] hover:text-black transition-all cursor-pointer">
                Process Outstanding Pay
              </button>
              <button className="py-3 px-4 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold transition-all cursor-pointer">
                Claims PDF
              </button>
            </div>
          </section>

        </div>

      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-[10px] text-white/20 font-mono mt-auto">
        SafeVitals HIPAA Patient Portal v1.0.0 · Encrypted TLS Connection
      </footer>
    </div>
  );
}
