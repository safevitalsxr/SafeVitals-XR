# Plan: Cloudflare CDN Integration (plan-cloudflare-cdn.md)

This plan details the steps to upload the 100 high-resolution headset rendering frames (approx. 200MB, located in `/public/hero-xr/`) to a Cloudflare R2 bucket and serve them to the web application via Cloudflare's CDN.

## 📋 Table of Contents
1. [Prerequisites & Authentication](#1-prerequisites--authentication)
2. [Task List](#2-task-list)
3. [Step-by-Step Implementation](#3-step-by-step-implementation)
4. [Verification & Fallback](#4-verification--fallback)

---

## 1. Prerequisites & Authentication

To execute the automation script, the following credentials are required:
*   **Account ID:** Loaded from `.env.local` (CLOUDFLARE_ACCOUNT_ID)
*   **Global API Key:** Loaded from `.env.local` (CLOUDFLARE_API_KEY)
*   **Account Email:** Loaded from `.env.local` (CLOUDFLARE_EMAIL)

---

## 2. Task List

- [ ] **Task 1:** Obtain correct Cloudflare email from the user.
- [ ] **Task 2:** Create the R2 Bucket (`safevitals-xr-hero-sequence`) programmatically.
- [ ] **Task 3:** Enable Public R2 Access (`r2.dev` subdomain or custom domain) on the Cloudflare Dashboard.
- [ ] **Task 4:** Run upload script `scripts/upload_to_r2.js` to transfer all 100 PNG frames.
- [ ] **Task 5:** Update `hero-sequence.tsx` to point to the new R2 public URL.
- [ ] **Task 6:** Update `.gitignore` and clean up local heavy assets.

---

## 3. Step-by-Step Implementation

### Step 3.1: Create Upload Script (`scripts/upload_to_r2.js`)
We will create a Node.js upload script that uses the Cloudflare REST API to:
1. Create the bucket if it doesn't exist:
   `PUT /accounts/{account_id}/r2/buckets/safevitals-xr-hero-sequence`
2. Loop over files `001.png` to `100.png` and upload them using PUT stream requests:
   `PUT /accounts/{account_id}/r2/buckets/safevitals-xr-hero-sequence/objects/{filename}`
3. Handle concurrency to avoid rate limits while maintaining high speeds.

### Step 3.2: Configure Cloudflare Public Domain
Since R2 buckets are secure by default:
1. Go to **Cloudflare Dashboard** > **R2** > **safevitals-xr-hero-sequence** > **Settings**.
2. Under **Public Development URL**, click **Enable**.
3. Copy the URL (e.g., `https://pub-xxx.r2.dev`).

### Step 3.3: Update Frontend
In `components/home/hero-sequence.tsx`:
```typescript
const R2_BUCKET_URL = "https://pub-xxx.r2.dev"; // Replace with your enabled URL

const getFramePath = (index: number) => {
  const paddedIndex = String(index).padStart(3, "0");
  return `${R2_BUCKET_URL}/ezgif-frame-${paddedIndex}.png`;
};
```

---

## 4. Verification & Fallback

### Verification Steps
*   **Asset Check:** Execute `node scripts/verify_r2.js` to check that all 100 URLs return status `200` and are loaded successfully.
*   **Animation Test:** Open the browser local port to ensure frames load and scrub seamlessly with GSAP `ScrollTrigger`.

### Fallback
*   If Cloudflare has any issues, the code can fall back to local assets by commenting out the R2 URL path prefix.
