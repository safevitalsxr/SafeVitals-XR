# 🌀 Universal AI Assistant Prompt for Scroll-Scrub Canvas Sequence

This file contains the **Universal Prompts** you can copy and paste into any AI Assistant (like ChatGPT, Claude, Gemini) to:
1. **Generate the code** for a scroll-scrubbing sequence on any website/framework.
2. **Generate the video assets** via AI video generators (Google Veo, Runway, Luma, etc.).

---

## 💻 1. The Code Generation Prompt (For AI Coder Assistants)

Copy and paste this prompt into Claude/Gemini/GPT to write the complete components/modules for any web project. Fill in the bracketed variables (`[...]`) to customize it.

```text
Build a high-performance, scroll-driven interactive image sequence component in React/Next.js (using Tailwind CSS and GSAP ScrollTrigger) to display a [PRODUCT/THEME, e.g., VR Headset / Digital Twin / Sports Car] sequence.

The component must satisfy the following technical requirements:
1. Canvas Rendering: Use an HTML5 <canvas> to render the frames. Calculate the scaling dynamically on window resize so that the frame sequence behaves like CSS 'object-fit: cover' (fully responsive on both desktop and mobile, centering the focus area).
2. Asynchronous Preloading: Preload the image frames (total: [TOTAL_FRAMES, e.g., 100]) asynchronously from the CDN folder [CDN_PATH, e.g., https://your-cdn.com/frames/] using 3-digit padded indices (e.g., frame-001.webp). Display a sleek loading spinner until all frames are loaded to avoid visual flashing.
3. Smooth GSAP ScrollTrigger:
   - Pin the parent container when it enters the viewport (top top) and keep it pinned for a scroll duration of [SCROLL_DEPTH, e.g., 300%].
   - Scrub the image frame index from 1 to [TOTAL_FRAMES] smoothly (using scrub: 0.5 or 1).
   - Mapping from the scrub timeline to canvas redraws must run on requestAnimationFrame updates.
4. Text Overlay Orchestration:
   - Layer multiple text content blocks on top of the canvas absolute-positioned.
   - Fade them in and out sequentially using GSAP timeline and ScrollTrigger based on the scroll progress (e.g., Text 1 visible from 0% to 20%, Text 2 from 25% to 50%, etc.). Use autoAlpha (opacity + visibility) to prevent overlay blocks from blocking user clicks when invisible.
5. Optimization & Cleanliness:
   - Pre-bind event listeners for window resize.
   - Clean up GSAP instances, ScrollTrigger, and window resize event listeners on component unmount to prevent memory leaks.
```

---

## 🎥 2. The Video Generation Prompt (For AI Video Generators)

Copy and paste this prompt into AI video generators (such as Google Veo, Runway Gen-3, Luma Dream Machine, or Sora) to produce the clean source video sequence:

```text
A cinematic 3D studio showcase of a [PRODUCT/SUBJECT, e.g., VR headset / skeletal anatomy / concept car]. The background is a clean, uniform, solid [BACKGROUND_COLOR, e.g., black / slate gray] studio space. The [PRODUCT/SUBJECT] is rendered with premium [STYLE/MATERIAL, e.g., matte carbon-fiber / glowing holographic nodes]. The camera performs a slow, perfectly smooth, linear, and constant tracking [CAMERA_MOVEMENT, e.g., zoom-in / 360-degree rotation] directly towards the [ZOOM_TARGET/DETAIL]. Studio lighting wraps around the model dynamically as the camera moves. Extremely clean details, 8k resolution, photorealistic rendering, stable motion, no random camera shakes, no cuts, constant frame rate.
```

---

## 🛠️ 3. The Extraction & Optimization Pipeline

To convert the generated video into high-performance web assets, run these steps:

### Step A: Extract Frames from Video
Using `ffmpeg` in your terminal:
```bash
ffmpeg -i input.mp4 -vf "fps=30" -q:v 2 frames/frame-%03d.png
```
*Tip: Keep the frame count between 80 and 240 frames for the optimal performance/quality ratio.*

### Step B: Batch Convert to WebP
Run this Node.js script using `sharp` to shrink your file sizes by 80%+ while preserving transparency/gradients:
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convert() {
  const dir = './frames';
  const out = './webp-frames';
  if (!fs.existsSync(out)) fs.mkdirSync(out);
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
  for (const file of files) {
    const name = file.split('.')[0];
    await sharp(path.join(dir, file))
      .webp({ quality: 80 }) // 80% quality hits the sweet spot
      .toFile(path.join(out, `${name}.webp`));
  }
}
convert();
```
