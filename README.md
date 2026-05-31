# SafeVitals XR

> **Cinematic Software & Support for Next-Generation Medical Telemetry**
> A premium, scroll-driven interactive clinical intelligence platform built with Next.js, Tailwind CSS, GSAP, and React Three Fiber.

---

## 🌟 Overview

SafeVitals XR provides state-of-the-art software and service support for real-time patient telemetry visualization and XR healthcare integration. This repository hosts our high-performance interactive web experience, showcasing our clinical platforms, data bridges, and XR support interfaces with industry-leading visual storytelling.

---

## ✨ Features

- 🎧 **Hero Headset Sequence**: A scroll-driven, frame-by-frame 3D animation showcasing the SafeVitals XR Headset interface and service ergonomics.
- 🌉 **SafeVitals Bridge**: An interactive visualization of real-time patient telemetry streams (ECG, SpO₂, respiration, temperature, blood pressure) flowing from hardware to the cloud.
- 🖥️ **Sequential Platform Reveal**: A GSAP ScrollTrigger-driven sequential dashboard materialization showing system activation and clinical modules booting up live.
- 📈 **Real-Time Visualization**: Smooth glassmorphism widgets, high-fidelity live charts, alert indicators, and clinical metrics.
- ⚡ **Optimized Performance**: Pure CSS/HTML layouts and GSAP animations, optimized to load under 3kB bundle sizes for fast response.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Vanilla CSS
- **Animations**: [GSAP](https://greensock.com/gsap/) + [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **3D Renderers**: React Three Fiber (R3F) & Three.js

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have Node.js installed (v18+ recommended) and `npm`.

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/balaram753/SafeVitals-XR.git
   cd SafeVitals-XR
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```
├── app/                     # Next.js App Router pages and global layouts
├── components/              # React components
│   ├── home/                # Homepage animation sequences & sections
│   │   ├── hero-sequence.tsx     # Scroll-driven XR Headset sequence
│   │   ├── bridge-scroll.tsx     # Telemetry data stream connection
│   │   └── platform-storytelling.tsx # Sequential dashboard boot-up
├── public/                  # Static assets (telemetry frames & sequence images)
├── design-system/           # Unified theme variables and styling guides
└── tailwind.config.ts       # Tailwind CSS configuration
```

---

## 🔒 License

This project is proprietary. All rights reserved. SafeVitals Platform & SafeVitals XR.
