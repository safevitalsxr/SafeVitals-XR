"use client";

import { motion } from "framer-motion";

const products = [
  {
    num: "01",
    title: "SafeVitals Bridge",
    desc: "Connect existing hospital hardware.",
  },
  {
    num: "02",
    title: "Cloud Intelligence",
    desc: "Unified healthcare data layer.",
  },
  {
    num: "03",
    title: "XR Dashboard",
    desc: "Immersive patient monitoring.",
  },
  {
    num: "04",
    title: "Digital Twin",
    desc: "Real-time virtual patient visualization.",
  },
];

export function ProductsSection() {
  return (
    <section id="products" className="bg-background py-40 border-t border-border/50 overflow-hidden">
      <div className="section-shell flex flex-col gap-32">
        {products.map((p, i) => {
          const isEven = i % 2 !== 0;
          return (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center gap-16 ${isEven ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full md:w-1/2 min-h-[400px] bg-surface border border-border flex items-center justify-center rounded overflow-hidden relative">
                 <div className="absolute top-4 left-4 font-mono text-text-secondary opacity-50 text-sm z-10">OBJ_{p.num}</div>
                 <div className="w-48 h-48 border border-white/5 bg-background mix-blend-screen scale-110 rounded-full blur-3xl opacity-20" />
                 <div className="text-4xl font-mono text-border/40 select-none pointer-events-none">VISUAL</div>
              </div>
              <div className={`w-full md:w-1/2 flex flex-col justify-center ${isEven ? "md:items-end md:text-right" : ""}`}>
                <span className="font-mono text-sm text-accent mb-4 block">PRODUCT {p.num}</span>
                <h3 className="font-heading text-4xl md:text-5xl text-text mb-6">{p.title}</h3>
                <p className="font-sans text-xl text-text-secondary max-w-sm">{p.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
