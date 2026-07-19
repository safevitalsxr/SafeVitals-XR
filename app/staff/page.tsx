"use client";

import { useState } from "react";
import { 
  Activity, 
  UserPlus, 
  Upload, 
  DollarSign, 
  LogOut, 
  CheckCircle2, 
  Plus, 
  Database,
  ArrowRight,
  FileCheck
} from "lucide-react";

export default function StaffPortal() {
  // Onboarding Form States
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [assignedDoctor, setAssignedDoctor] = useState("Dr. Sarah Jenkins");
  const [bedAssignment, setBedAssignment] = useState("Bed A-01");
  const [condition, setCondition] = useState("");
  const [onboardingSuccess, setOnboardingSuccess] = useState(false);

  // Document Upload States
  const [selectedPatientId, setSelectedPatientId] = useState("PT-02");
  const [docType, setDocType] = useState("blood_report");
  const [docName, setDocName] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Mock Onboard Action
  const handleOnboard = (e: React.FormEvent) => {
    e.preventDefault();
    setOnboardingSuccess(true);
    setTimeout(() => {
      setOnboardingSuccess(false);
      setPatientName("");
      setPatientAge("");
      setCondition("");
    }, 2500);
  };

  // Mock Upload Action
  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setDocName("");
    }, 2500);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      const port = window.location.port ? `:${window.location.port}` : "";
      window.location.href = `${window.location.protocol}//localhost${port}/dashboard`;
    }
  };

  const recentInvoices = [
    { id: "INV-9021", patient: "Helena Rostova", date: "June 10, 2026", amount: "$1,280.00", status: "Paid" },
    { id: "INV-8411", patient: "Devon Miller", date: "June 08, 2026", amount: "$3,450.00", status: "Pending" },
    { id: "INV-7312", patient: "Clara Oswald", date: "June 05, 2026", amount: "$940.00", status: "Paid" },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col relative overflow-x-hidden">
      {/* Backdrop Gradients */}
      <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full bg-cyan-600/5 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/60 backdrop-blur-md border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#00D4FF]" />
          <span className="font-heading text-lg font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            SafeVitals Hospital Operations
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-sm font-medium text-white">Aditi Sharma</span>
            <span className="text-[10px] text-white/40 font-mono">Operations Administrator · Ward 3A</span>
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

      {/* Grid Content */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto p-6 md:p-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        
        {/* Left Column: Forms */}
        <div className="flex flex-col gap-6">
          
          {/* Patient Onboarding */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <UserPlus className="w-4 h-4 text-[#00D4FF]" />
              New Patient Onboarding
            </h2>

            <form onSubmit={handleOnboard} className="grid md:grid-cols-2 gap-4">
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                  Age
                </label>
                <input
                  type="number"
                  required
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  placeholder="e.g. 54"
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                  Assigned Clinician
                </label>
                <select
                  value={assignedDoctor}
                  onChange={(e) => setAssignedDoctor(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                >
                  <option value="Dr. Sarah Jenkins">Dr. Sarah Jenkins (Cardiology)</option>
                  <option value="Dr. Marcus Vance">Dr. Marcus Vance (Pulmonology)</option>
                  <option value="Dr. James Carter">Dr. James Carter (ICU Medicine)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                  Bed Assignment
                </label>
                <select
                  value={bedAssignment}
                  onChange={(e) => setBedAssignment(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                >
                  <option value="Bed A-01">Bed A-01 (ICU Pod 1)</option>
                  <option value="Bed A-02">Bed A-02 (ICU Pod 1)</option>
                  <option value="Bed B-01">Bed B-01 (ICU Pod 2)</option>
                  <option value="Bed C-01">Bed C-01 (Overflow)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                  Primary Admitting Diagnosis / Condition
                </label>
                <input
                  type="text"
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g. Sepsis, Post-OP Valve Bypass"
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                />
              </div>

              <div className="md:col-span-2 mt-2">
                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-white text-black hover:bg-[#00D4FF] hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {onboardingSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Patient Successfully Enrolled & Telemetry Synced!
                    </>
                  ) : (
                    <>
                      Onboard Patient to SafeVitals Bridge
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </section>

          {/* Document Ingestion */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <Upload className="w-4 h-4 text-purple-400" />
              Secure Document Upload Portal
            </h2>

            <form onSubmit={handleUpload} className="flex flex-col gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                    Associate Patient ID
                  </label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                  >
                    <option value="PT-01">Helena Rostova (PT-01)</option>
                    <option value="PT-02">Devon Miller (PT-02)</option>
                    <option value="PT-03">Clara Oswald (PT-03)</option>
                    <option value="PT-04">Marcus Aurelius (PT-04)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                    Document Category
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                  >
                    <option value="blood_report">Blood Chemistry / Lab Report</option>
                    <option value="scan_imaging">CT / MRI Scans Imaging</option>
                    <option value="billing_invoice">Billing Statement</option>
                  </select>
                </div>

              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-mono tracking-widest text-[#00D4FF] uppercase font-semibold">
                  Document Title / Filename
                </label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Metabolic Panel Lab Results June-2026"
                  className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#00D4FF] transition-all text-white"
                />
              </div>

              <div className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center gap-2 bg-white/[0.01] hover:bg-white/[0.02] transition-all">
                <Upload className="w-8 h-8 text-white/30" />
                <span className="text-xs font-semibold text-white/70">Select medical file to upload</span>
                <span className="text-[9px] text-white/30 font-mono">PDF, PNG, JPG, or DICOM files accepted (Max 50MB)</span>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {uploadSuccess ? (
                  <>
                    <FileCheck className="w-4 h-4 text-white" />
                    Document Securely Encrypted & Linked to Patient Chart!
                  </>
                ) : (
                  <>
                    Decrypt & Upload File to Patient EHR
                    <Upload className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </section>

        </div>

        {/* Right Column: Billing & Audits */}
        <div className="flex flex-col gap-6">
          
          {/* Operations Billing Portal */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <DollarSign className="w-4 h-4 text-amber-400" />
              Recent Billing Transactions
            </h2>

            <div className="flex flex-col gap-3">
              {recentInvoices.map((inv) => (
                <div 
                  key={inv.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{inv.patient}</span>
                    <div className="flex gap-2 text-[10px] font-mono text-white/40 mt-1">
                      <span>{inv.id}</span>
                      <span>·</span>
                      <span>{inv.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-sm font-bold text-white">{inv.amount}</span>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold ${inv.status === "Paid" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-3.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer">
              <Plus className="w-4 h-4" />
              Generate New Billing Claim Invoice
            </button>
          </section>

          {/* Database System Health */}
          <section className="bg-slate-950/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
              <Database className="w-4 h-4 text-emerald-400" />
              Cloud Server Connection Status
            </h2>

            <div className="flex flex-col gap-3 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-white/60">FHIR Server Gateway</span>
                <span className="text-emerald-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-white/5">
                <span className="text-white/60">HL7 Engine Listener</span>
                <span className="text-emerald-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Connected
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-t border-white/5">
                <span className="text-white/60">Audit Log File Integrity</span>
                <span className="text-emerald-400 font-mono font-bold uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Verified
                </span>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-white/5 text-center text-[10px] text-white/20 font-mono">
        SafeVitals Hospital Operations Admin Central v1.0.0 · HIPAA Verified
      </footer>
    </div>
  );
}
