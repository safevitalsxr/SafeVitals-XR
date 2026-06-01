"use client";

import { Linkedin, Github, Globe } from "lucide-react";

const TEAM = [
  {
    name: "Rahul Mamidi",
    role: "Founder & CEO",
    image: "/founder.jpg",
    bio: "IoT, Embedded Systems, and 3D simulation researcher leading SafeVitals XR.",
    linkedin: "https://linkedin.com/in/karuna-rahul-mamidi",
    github: "https://github.com/Karunarahul",
    portfolio: "https://karunarahul.netlify.app/",
    skills: ["IoT Systems", "Embedded Systems", "UE5", "Blender 3D", "5G/6G Research"],
  },
  {
    name: "Rakesh",
    role: "Co-Founder",
    image: "/co-founder.jpg",
    bio: "Co-founder leading clinical operations, strategy, and hospital deployments.",
    linkedin: "",
    github: "",
    portfolio: "",
    skills: ["Operations", "Healthcare IT", "Hospital Strategy", "Business Dev"],
  },
  {
    name: "Ch. Balaram",
    role: "Tech Head",
    image: "/Technical-lead.jpg",
    bio: "Full-stack developer and network engineer managing the telemetry infrastructure.",
    linkedin: "https://linkedin.com/in/chbalarm",
    github: "https://github.com/balaram753",
    portfolio: "https://balaram.me",
    skills: ["Web Dev", "Python/JS", "Networking", "Linux", "Claude Code"],
  },
];

export function AboutSection() {
  return (
    <section className="bg-background py-40 border-t border-border/50">
      <div className="section-shell">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-4xl mb-12 text-text">About Us</h2>
          
          <div className="font-sans text-2xl text-text-secondary leading-relaxed mb-24">
            SafeVitals XR is a healthcare intelligence platform that connects existing hospital monitoring systems through the SafeVitals Bridge, enabling real-time patient monitoring, cloud analytics, mobile access, and immersive XR visualization.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-border/50 pt-16">
            <div>
              <h3 className="font-mono text-sm text-accent mb-8 uppercase tracking-widest">Roadmap</h3>
              <ul className="flex flex-col gap-6 font-sans text-lg text-text">
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  Hospital Integration
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-border" />
                  Cloud Diagnostics
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full border border-border" />
                  Predictive AI
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full border border-border" />
                  Global Scale
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-sm text-accent mb-8 uppercase tracking-widest">Mission</h3>
              <p className="font-sans text-lg text-text-secondary">
                To eliminate data fragmentation in critical care by building an immersive, unified visualization platform that works seamlessly alongside existing hospital infrastructure.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-24 pt-24 border-t border-border/50">
            <h3 className="font-mono text-sm text-accent mb-12 uppercase tracking-widest">Meet the Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM.map((member) => (
                <div 
                  key={member.name} 
                  className="relative group overflow-hidden rounded-2xl bg-white/[0.01] border border-white/[0.04] p-5 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.08)] hover:scale-[1.02] flex flex-col justify-between"
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
                      <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full w-fit">
                        {member.role}
                      </span>
                      {/* Social Links */}
                      <div className="flex items-center gap-2.5 text-white/40">
                        {member.linkedin && (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition-colors"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.github && (
                          <a 
                            href={member.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.portfolio && (
                          <a 
                            href={member.portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h4 className="font-heading text-lg font-bold text-white mb-2 tracking-tight">
                      {member.name}
                    </h4>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  </div>
                  
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/[0.04]">
                    {member.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="text-[9px] font-mono bg-white/[0.02] border border-white/[0.06] text-white/50 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
