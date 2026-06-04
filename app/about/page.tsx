import type { Metadata } from "next";
import { Linkedin, Github, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SafeVitals XR — our mission to transform critical-care monitoring into immersive clinical intelligence using XR, digital twins, and AI-powered analytics.",
  openGraph: {
    title: "About SafeVitals XR",
    description:
      "Our mission: make critical-care data understandable at a glance through immersive spatial visualization.",
    url: "https://safevitals.in/about",
  },
  alternates: {
    canonical: "https://safevitals.in/about",
  },
};

const roadmap = ["Hospital Integration", "Cloud Diagnostics", "AI Prediction Models", "Global Accessibility"];

const TEAM = [
  {
    name: "Karuna Rahul Mamidi",
    role: "Founder & CEO",
    image: "/founder.jpg",
    bio: "IoT and XR researcher building the future of immersive patient monitoring.",
    linkedin: "https://linkedin.com/in/karuna-rahul-mamidi",
    github: "https://github.com/Karunarahul",
    portfolio: "https://karunarahul.netlify.app/",
    skills: ["IoT Systems", "Embedded Systems", "XR/VR", "Product Strategy"],
  },
  {
    name: "Rakesh Yarabolu",
    role: "Co-Founder",
    image: "/co-founder.jpg",
    bio: "Operations lead driving clinical integrations, workflow design, and strategy.",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: ["Operations", "Clinical Workflows", "Strategy", "Coordination"],
  },
  {
    name: "Chillagundla Balaram",
    role: "Tech Head & Hardware Eng",
    image: "/Technical-lead.jpg",
    bio: "Full-stack developer and hardware architect building our real-time telemetry systems.",
    linkedin: "https://linkedin.com/in/chbalarm",
    github: "https://github.com/balaram753",
    portfolio: "https://balaram.me",
    skills: ["Hardware Architecture", "Full-Stack Dev", "Telemetry", "Linux"],
  },
  {
    name: "Kalyani Akshita",
    role: "Operations Lead & Bio Med Eng",
    image: "/image.png",
    bio: "Biomedical engineer translating complex biomarker data into clinical insights.",
    linkedin: "https://www.linkedin.com/in/akshita-kalyani-487203288",
    github: "",
    portfolio: "",
    skills: ["Biomedical Eng", "Bioinformatics", "Data Analysis", "Quality Control"],
  },
];

export default function AboutPage() {
  return (
    <main className="pt-32">
      <section className="section-shell pb-20">
        <p className="eyebrow mb-4">About SafeVitals XR</p>
        <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-tight md:text-7xl">
          We are building the interface hospitals need when seconds matter.
        </h1>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Mission</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Make critical-care data understandable at a glance by transforming fragmented monitor signals into immersive clinical intelligence.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Vision</h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              A future where every hospital can see patient risk, ward pressure, and intervention impact in a single real-time spatial view.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-surface/35 py-20">
        <div className="section-shell">
          <p className="eyebrow mb-4">Roadmap</p>
          <div className="relative border-l border-cyan/25 pl-7">
            {roadmap.map((item, index) => (
              <div key={item} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[2.18rem] top-1 h-4 w-4 rounded-full border border-cyan bg-void" />
                <p className="font-mono text-xs text-cyan">PHASE 0{index + 1}</p>
                <h2 className="mt-2 text-3xl font-semibold">{item}</h2>
                <p className="mt-3 max-w-2xl text-muted">
                  Each phase advances the same principle: preserve existing hospital workflows while making clinical state more visible.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="max-w-4xl">
          <p className="eyebrow mb-4">Founder story</p>
          <h2 className="text-3xl font-semibold md:text-5xl">Built from the belief that doctors should not have to decode a room of disconnected screens.</h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            SafeVitals XR is shaped around the clinical reality of monitoring overload: too many numbers, too many places to look, and too little contextual time during emergencies.
          </p>
        </div>
      </section>

      <section className="section-shell py-20 border-t border-white/10">
        <p className="eyebrow mb-4">Meet the Team</p>
        <h2 className="text-3xl font-semibold md:text-5xl mb-12">The minds behind the technology.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <div 
              key={member.name} 
              className="relative group overflow-hidden rounded-2xl bg-white/[0.01] border border-white/[0.04] p-6 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.08)] hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                {/* Image container with 4:5 aspect ratio */}
                <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-5 bg-white/5">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="object-cover w-full h-full filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  {/* Shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" />
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-cyan bg-cyan/10 px-2.5 py-1 rounded-full w-fit font-medium">
                    {member.role}
                  </span>
                  {/* Social Links */}
                  <div className="flex items-center gap-2.5 text-white/40">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-cyan transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.github && (
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-cyan transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {member.portfolio && (
                      <a 
                        href={member.portfolio} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-cyan transition-colors"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                  {member.name}
                </h4>
                <p className="text-[0.925rem] text-muted leading-relaxed mb-4">
                  {member.bio}
                </p>
              </div>
              
              {/* Skills tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/[0.04]">
                {member.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="text-[10px] font-mono bg-white/[0.02] border border-white/[0.06] text-white/50 px-2 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
