"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  Heart, 
  AlertTriangle, 
  LogOut, 
  TrendingUp, 
  Search,
  CheckCircle2
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  bed: string;
  hr: number;
  spo2: number;
  rr: number;
  bp: string;
  riskScore: number;
  status: "stable" | "critical" | "warning";
  condition: string;
}

export default function DoctorPortal() {
  const [patients, setPatients] = useState<Patient[]>([
    { id: "PT-01", name: "Helena Rostova", age: 64, bed: "Bed A-02", hr: 72, spo2: 98, rr: 16, bp: "122/81", riskScore: 12, status: "stable", condition: "Post-op Recovery" },
    { id: "PT-02", name: "Devon Miller", age: 45, bed: "Bed A-05", hr: 98, spo2: 91, rr: 22, bp: "140/95", riskScore: 68, status: "critical", condition: "Acute Respiratory Distress" },
    { id: "PT-03", name: "Clara Oswald", age: 29, bed: "Bed B-01", hr: 84, spo2: 96, rr: 18, bp: "110/72", riskScore: 32, status: "warning", condition: "Sepsis Surveillance" },
    { id: "PT-04", name: "Marcus Aurelius", age: 78, bed: "Bed B-04", hr: 64, spo2: 99, rr: 14, bp: "115/75", riskScore: 8, status: "stable", condition: "Observation" },
    { id: "PT-05", name: "Selene Galloway", age: 52, bed: "Bed C-01", hr: 110, spo2: 94, rr: 24, bp: "135/88", riskScore: 54, status: "warning", condition: "Tachycardia Monitoring" },
  ]);

  const [selectedPatientId, setSelectedPatientId] = useState<string>("PT-02");
  const [searchTerm, setSearchTerm] = useState("");
  const [alertFilter, setAlertFilter] = useState<string>("all");

  // Simulate real-time data changes for active patients
  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => 
        prev.map(p => {
          // Add random slight modifications to vital stats
          const hrDelta = Math.round((Math.random() - 0.5) * 4);
          const spo2Delta = Math.random() > 0.75 ? Math.round((Math.random() - 0.5) * 2) : 0;
          
          const newHr = Math.min(160, Math.max(40, p.hr + hrDelta));
          const newSpo2 = Math.min(100, Math.max(75, p.spo2 + spo2Delta));

          // Set status based on thresholds
          let status: "stable" | "warning" | "critical" = "stable";
          let riskScore = p.riskScore;

          if (newHr > 115 || newSpo2 < 92) {
            status = "critical";
            riskScore = Math.min(99, riskScore + 2);
          } else if (newHr > 95 || newSpo2 < 95) {
            status = "warning";
            riskScore = Math.max(15, Math.min(65, riskScore + (Math.random() > 0.5 ? 1 : -1)));
          } else {
            status = "stable";
            riskScore = Math.max(5, riskScore - 1);
          }

          return {
            ...p,
            hr: newHr,
            spo2: newSpo2,
            status,
            riskScore
          };
        })
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      const port = window.location.port ? `:${window.location.port}` : "";
      window.location.href = `${window.location.protocol}//localhost${port}/dashboard`;
    }
  };

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  const filteredPatients = patients.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.bed.toLowerCase().includes(searchTerm.toLowerCase());
    if (alertFilter === "all") return matchesSearch;
    return matchesSearch && p.status === alertFilter;
  });

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-x-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#00D4FF]" />
          <span className="font-heading text-lg font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            SafeVitals Clinician Dashboard
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-white">Dr. Sarah Jenkins, MD</span>
            <span className="text-[10px] text-white/40 font-mono">ID: SV-MD-0821 · Critical Care</span>
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

      {/* Main Workspace */}
      <div className="flex-1 w-full max-w-[1500px] mx-auto p-6 flex flex-col gap-6 lg:flex-row">
        
        {/* Ward Overview Column (Left) */}
        <div className="w-full lg:w-[420px] flex flex-col gap-4 flex-shrink-0">
          
          {/* Controls Card */}
          <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl flex flex-col gap-4">
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Search bed or patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-white/5 border border-white/5 text-sm placeholder-white/20 focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all text-white"
              />
            </div>

            <div className="flex gap-2 text-xs font-mono">
              <button 
                onClick={() => setAlertFilter("all")}
                className={`flex-1 py-2 rounded-lg border font-semibold ${alertFilter === "all" ? "bg-white text-black border-white" : "border-white/5 hover:bg-white/5 text-white/60"}`}
              >
                All ({patients.length})
              </button>
              <button 
                onClick={() => setAlertFilter("critical")}
                className={`flex-1 py-2 rounded-lg border font-semibold ${alertFilter === "critical" ? "bg-red-500/20 text-red-300 border-red-500/35 animate-pulse" : "border-white/5 hover:bg-white/5 text-white/60"}`}
              >
                Critical ({patients.filter(p => p.status === "critical").length})
              </button>
              <button 
                onClick={() => setAlertFilter("warning")}
                className={`flex-1 py-2 rounded-lg border font-semibold ${alertFilter === "warning" ? "bg-amber-500/20 text-amber-300 border-amber-500/35" : "border-white/5 hover:bg-white/5 text-white/60"}`}
              >
                Alert ({patients.filter(p => p.status === "warning").length})
              </button>
            </div>

          </div>

          {/* Ward Patient List Grid */}
          <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredPatients.map((p) => {
              const isSelected = p.id === selectedPatientId;
              let borderClass = "border-white/5 hover:border-white/10";
              let statusBg = "bg-white/10";
              let statusText = "text-white/60";

              if (p.status === "critical") {
                borderClass = isSelected ? "border-red-500" : "border-red-500/30";
                statusBg = "bg-red-500/15";
                statusText = "text-red-400";
              } else if (p.status === "warning") {
                borderClass = isSelected ? "border-amber-500" : "border-amber-500/30";
                statusBg = "bg-amber-500/15";
                statusText = "text-amber-400";
              } else if (isSelected) {
                borderClass = "border-[#00D4FF]";
              }

              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-4 rounded-2xl bg-slate-950/40 backdrop-blur-xl border ${borderClass} flex flex-col gap-3 transition-all cursor-pointer ${isSelected ? "bg-slate-950/80 shadow-lg" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-white">{p.name}</span>
                      <span className="text-[10px] text-white/40 font-mono mt-0.5">{p.bed} · Age {p.age}</span>
                    </div>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${statusBg} ${statusText}`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-mono text-white/35 uppercase">Pulse</span>
                      <span className={`text-sm font-bold font-mono ${p.status === "critical" && p.hr > 115 ? "text-red-400 animate-pulse" : "text-white"}`}>
                        {p.hr} <span className="text-[9px] font-light text-white/40">bpm</span>
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-mono text-white/35 uppercase">SpO₂</span>
                      <span className={`text-sm font-bold font-mono ${p.status === "critical" && p.spo2 < 92 ? "text-red-400 animate-pulse" : "text-emerald-400"}`}>
                        {p.spo2}%
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] font-mono text-white/35 uppercase">Risk</span>
                      <span className={`text-sm font-bold font-mono ${p.riskScore > 60 ? "text-red-400" : p.riskScore > 30 ? "text-amber-400" : "text-cyan-400"}`}>
                        {p.riskScore}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Patient Detail Panel (Right / Center) */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Core Info Header */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-3">
                <span className="text-2xl md:text-3xl font-bold tracking-tight text-white">{selectedPatient.name}</span>
                <span className="text-xs font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/50">
                  {selectedPatient.id}
                </span>
              </div>
              <p className="text-sm text-[#00D4FF] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full animate-pulse" />
                Condition: {selectedPatient.condition}
              </p>
              <div className="flex flex-wrap gap-4 text-[10px] font-mono text-white/40 mt-1 uppercase">
                <span>Bed Allocation: {selectedPatient.bed}</span>
                <span>·</span>
                <span>Age: {selectedPatient.age} years</span>
                <span>·</span>
                <span>BP: {selectedPatient.bp} mmHg</span>
                <span>·</span>
                <span>RR: {selectedPatient.rr} /min</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex-shrink-0">
              <div className="flex flex-col text-right">
                <span className="text-[9px] font-mono text-white/40 uppercase">AI Deterioration Risk</span>
                <span className="text-3xl font-bold font-mono text-white tracking-tight mt-0.5">
                  {selectedPatient.riskScore}%
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center">
                {selectedPatient.riskScore > 50 ? (
                  <TrendingUp className="w-6 h-6 text-red-400" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-[#00D4FF]" />
                )}
              </div>
            </div>
          </section>

          {/* Interactive telemetry streams */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Vital panel 1: ECG Waveform */}
            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-white/50 uppercase flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                  ECG Stream (II-Lead)
                </span>
                <span className="text-lg font-bold font-mono text-white">{selectedPatient.hr} <span className="text-[10px] text-white/40">BPM</span></span>
              </div>
              
              <div className="h-28 w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden relative">
                <div className="w-[200%] h-full flex items-center absolute left-0 top-0 animate-ecg-scroll">
                  <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                    <path
                      d="M 0 50 L 40 50 Q 50 40 60 50 L 66 50 L 76 10 L 86 90 L 96 50 L 106 50 Q 116 40 126 50 L 160 50 L 200 50 M 200 50 L 240 50 Q 250 40 260 50 L 266 50 L 276 10 L 286 90 L 296 50 L 306 50 Q 316 40 326 50 L 360 50 L 400 50"
                      fill="none"
                      stroke={selectedPatient.status === "critical" ? "#ef4444" : "#00D4FF"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_0_6px_rgba(0,212,255,0.4)]"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Vital panel 2: SpO2 Trend */}
            <div className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-white/50 uppercase flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  SpO₂ Pulse Oximetry
                </span>
                <span className="text-lg font-bold font-mono text-emerald-400">{selectedPatient.spo2}%</span>
              </div>
              
              <div className="h-28 w-full bg-black/40 border border-white/5 rounded-xl p-4 flex items-end gap-1.5">
                {[94, 95, 96, 95, 96, 97, 98, 97, 96, 98, 97, selectedPatient.spo2].map((s, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 justify-end h-full">
                    <div 
                      className={`w-full rounded-sm ${s < 93 ? "bg-red-500/40" : "bg-emerald-500/40"}`} 
                      style={{ height: `${s - 50}%` }} 
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Clinical Alert & History panel */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h3 className="text-sm font-mono text-white/50 uppercase border-b border-white/5 pb-4">
              Diagnostic & Telemetry Log
            </h3>
            
            <div className="flex flex-col gap-3.5">
              
              {selectedPatient.status === "critical" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 flex items-start gap-3 text-red-300 animate-pulse">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase font-mono">Deterioration Alert</span>
                    <p className="text-xs text-red-200/70 leading-relaxed">
                      AI agent detected blood oxygen drops under 92% alongside breathing acceleration. Verify Bridge feed immediately.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Latest Vascular Lab Report</span>
                  <span className="text-[10px] text-white/30 font-mono mt-1 uppercase">Uploaded 10 hours ago by Lab-Staff</span>
                </div>
                <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-[#00D4FF]/10 border border-white/10 hover:border-[#00D4FF]/20 text-[10px] font-mono font-semibold transition-all cursor-pointer">
                  Inspect Report
                </button>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">Active Bridge Hardware Feed</span>
                  <span className="text-[10px] text-white/30 font-mono mt-1 uppercase">Twin-01 Gateway · Uptime 99.9%</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold uppercase">
                  Online
                </span>
              </div>

            </div>
          </section>

        </div>

      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-[10px] text-white/20 font-mono">
        SafeVitals Clinical Command Central v1.0.0 · HIPAA Compliant · Audit Logged
      </footer>
    </div>
  );
}
