# SafeVitals XR — Mobile App Design & APK Packaging Guide

This document details the architecture, design specifications, and step-by-step procedures for packaging the **SafeVitals XR** interactive clinical intelligence platform into a high-performance, lightweight Android Application Package (APK).

---

## 📱 1. Architecture Strategy

Since SafeVitals XR is built on **Next.js 15 (App Router)** and relies on high-fidelity animations, 3D WebGL canvases, and dynamic database interactions, we have two primary paths to wrap this web application into a mobile APK.

### Option A: Capacitor Static Export (Recommended)
Capacitor (by Ionic) is a modern runtime that wraps a statically exported web application into a native WebView shell.

*   **How it Works:** Next.js is configured for static export (`output: 'export'`), generating static HTML/JS/CSS assets in the `/out` directory. These assets are compiled directly into the APK assets.
*   **Pros:** Native performance, instant load times (files are local), offline capability for static assets, access to native device APIs.
*   **Cons:** Next.js Server-Side API Routes (such as `/api/contact` and `/api/reserve` using Nodemailer/Supabase server-side actions) cannot be statically exported.
*   **Workaround:** Rewrite contact/reservation requests to call external REST APIs (e.g., Supabase Edge Functions, Cloudflare Workers, or the hosted production URL).

### Option B: Capacitor Remote Web Wrapper (Live Stream)
A wrapper configuration that loads the production-hosted website (e.g., `https://safevitals-xr.com`) inside the APK.

*   **How it Works:** Capacitor's configuration file (`capacitor.config.ts`) points the web source directly to the hosted server URL.
*   **Pros:** APK size is under 5MB; updates to the website instantly appear in the app without rebuilding/redeploying the APK; fully supports dynamic Next.js Server-Side API routes.
*   **Cons:** Requires an active internet connection to load; cold starts show a blank screen if connection is poor; lacks offline-fallback capabilities.

---

## 🎨 2. Mobile Design System & UX Standards

The mobile app must maintain the cinematic, premium aesthetic of SafeVitals XR (similar to Apple Vision Pro spatial UI) while adhering to mobile ergonomics.

### Color Palette (Cinematic Dark Mode)
*   **Primary Background:** `#020617` (Slate 950) with radial glow elements
*   **Ambient Glow:** `#00D4FF` (Volumetric medical cyan blur)
*   **Primary Accent/Text:** `#0891B2` (Teal 600)
*   **Interactive Call-To-Action (CTA):** `#22C55E` (Health green)
*   **Body Copy:** `#E2E8F0` (Slate 200)

### Typography & Hierarchy
*   **Headings:** **Figtree** (300/400/500/600/700) for a clean, technical, high-performance look.
*   **Body Copy:** **Noto Sans** (300/400/500/700) for excellent readability on high-density mobile screens.
*   **Google Fonts Link:** [Figtree + Noto Sans](https://fonts.google.com/share?selection.family=Figtree:wght@300;400;500;600;700|Noto+Sans:wght@300;400;500;700)

### Mobile Ergonomics & Checklist
*   **Touch Targets:** All interactive elements, buttons, and timeline triggers must have a minimum size of **44x44px** to ensure tap accuracy.
*   **Hover States:** Remove desktop mouse-hover scale modifications that cause layout shifts on tap. Use instant opacity transitions (`transition-colors duration-200`) instead.
*   **Cursor Pointer:** Add `cursor-pointer` to cards and triggers to maintain proper web preview behaviors.
*   **A11y:** Maintain a **4.5:1** contrast ratio for secondary texts. Respect the `prefers-reduced-motion` media queries for animations.

---

## ⚡ 3. High-Performance Mobile Animations & Canvas

SafeVitals XR's signature element is the scroll-driven headset sequence and the telemetry bridge. To run these smoothly at 60 FPS on mobile processors:

1.  **Serve Frames via CDN (Cloudflare R2):**
    The 100 high-resolution PNG frames for the headset sequence weigh over **200MB**.
    *   **Do NOT bundle these files in the APK**, as Google Play/Android limits store uploads and users will experience huge download times.
    *   Serve them from the configured Cloudflare R2 bucket. The mobile canvas loads these frames dynamically over HTTPS using a lightweight loading screen callback.
2.  **Volumetric Scales (`MobileHeroCanvas`):**
    On portrait screens, scaling the canvas with standard mathematical cover algorithms (`object-fit: cover`) is crucial. The panning offsets (`xShift`) must be scaled down (`xShift * 0.7`) to prevent panning details from falling off the screen.
3.  **Prevent Rubber-Banding Scroll Artifacts:**
    Android WebViews are prone to vertical rubber-banding. Apply `.overflow-hidden` to the root view and manage page progression through framer-motion's dynamic scroll wrappers as done in [src/mobile/page.tsx](file:///c:/Users/xoker/projects/SafeVitals-XR/src/mobile/page.tsx).

---

## 🛠️ 4. Step-by-Step APK Packaging Guide

Follow these steps to wrap the project using **Capacitor**:

### Step 4.1: Install Capacitor Dependencies
Install the Capacitor core library, CLI, and the Android platform helper:
```powershell
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android
```

### Step 4.2: Configure Next.js for Static Export
If choosing **Option A (Static Export)**, modify `next.config.ts` to output static pages.
Open [next.config.ts](file:///c:/Users/xoker/projects/SafeVitals-XR/next.config.ts) and add the `output` property:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // <-- Enable static HTML export
  images: {
    unoptimized: true, // <-- Next.js image optimization is incompatible with static exports
  },
};

export default nextConfig;
```

### Step 4.3: Initialize Capacitor Config
Initialize the configuration inside the project root:
```powershell
npx cap init "SafeVitals XR" "com.safevitals.xr" --web-dir=out
```

This creates a `capacitor.config.json` (or `capacitor.config.ts`) file.
*   For **Option A (Static local APK)**, use:
    ```json
    {
      "appId": "com.safevitals.xr",
      "appName": "SafeVitals XR",
      "webDir": "out",
      "bundledWebRuntime": false
    }
    ```
*   For **Option B (Remote Wrapper)**, add a server property:
    ```json
    {
      "appId": "com.safevitals.xr",
      "appName": "SafeVitals XR",
      "webDir": "out",
      "server": {
        "url": "https://safevitals-xr.com",
        "cleartext": true
      }
    }
    ```

### Step 4.4: Redirect Dynamic API Calls
Since static builds cannot execute Node.js files locally:
1.  Locate references to `/api/contact` and `/api/reserve`.
2.  Change fetch targets to your production host domain (e.g., `https://safevitals-xr.com/api/contact`) or directly hook them up to Supabase Client-side SDK calls (e.g., inserting reservations directly into the Supabase database table using public tokens).

### Step 4.5: Add Android Platform & Sync
Build the Next.js project to generate the static files:
```powershell
npm run build
```

Then, add the Android native directory to your workspace:
```powershell
npx cap add android
```

Sync your exported files into the native Android assets:
```powershell
npx cap sync
```

### Step 4.6: Compile the APK using Android Studio / Gradle
Once Capacitor is synced:
1.  Open the newly created `android` directory in **Android Studio**.
2.  Wait for Gradle sync to complete.
3.  Go to **Build** > **Build Bundle(s) / APK(s)** > **Build APK(s)**.
4.  Android Studio will generate the debug APK at:
    `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🧪 5. Testing & Verification

1.  **Emulator deployment:** Use Android Studio's virtual device manager (AVD) or connect a physical device via USB debugging and run `npx cap run android`.
2.  **Inspect WebGL Performance:**
    *   Open **Chrome DevTools** on your desktop.
    *   Navigate to `chrome://inspect`.
    *   Inspect your running Android app to check the console logs for WebGL context losses or image frame load timeouts.
3.  **Scroll scrub accuracy:** Swipe repeatedly down the viewport to make sure `scrollYProgress` reacts predictably without lagging or frame drops.
