"use client";

import React, { useState, useEffect, useRef } from "react";
import { Linkedin, Github, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TEAM, TeamMember } from "@/lib/team";

export function TeamCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Responsive items per page listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, TEAM.length - itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isPaused]);

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="font-mono text-xs text-cyan-400/80 uppercase tracking-widest block mb-1">
            Core Roster ({TEAM.length} Members)
          </span>
          <p className="text-sm text-white/50">
            Swipe or use controls to view our team
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Team Member"
            className="p-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-white/70 hover:text-cyan-400 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Team Member"
            className="p-3 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-white/70 hover:text-cyan-400 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track Container */}
      <div className="overflow-hidden rounded-2xl py-2 px-1">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `-${currentIndex * (100 / itemsPerPage + (itemsPerPage > 1 ? 1.5 : 0))}%`,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          {TEAM.map((member: TeamMember) => (
            <div
              key={member.name}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <div className="relative group overflow-hidden rounded-2xl bg-white/[0.01] border border-white/[0.05] p-6 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_50px_rgba(6,182,212,0.1)] hover:scale-[1.01] flex flex-col justify-between h-full min-h-[460px]">
                <div>
                  {/* Image Container */}
                  <div className="relative overflow-hidden rounded-xl aspect-[4/5] mb-5 bg-white/5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-cover w-full h-full filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  <div className="flex flex-col gap-2.5 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full w-fit font-semibold whitespace-nowrap">
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

                  <h4 className="font-heading text-xl font-bold text-white mb-2 tracking-tight">
                    {member.name}
                  </h4>
                  <p className="font-sans text-[0.925rem] text-white/60 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/[0.04]">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono bg-white/[0.03] border border-white/[0.08] text-white/60 px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx
                ? "w-8 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
