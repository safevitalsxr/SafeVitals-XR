const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Load environment variables
function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        process.env[key] = value.trim();
      }
    }
  }
}

loadEnv();

const AUTH_EMAIL = process.env.CLOUDFLARE_EMAIL;
const AUTH_KEY = process.env.CLOUDFLARE_API_KEY;
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET || 'safevitals-xr-hero-sequence';

const HERO_DIR = path.join(__dirname, '..', 'temp_hero');
const BRIDGE_DIR = path.join(__dirname, '..', 'temp_bridge_scroll');
const CONCURRENCY = 5;

// Helper to make PUT request for R2 upload using raw buffer
function uploadBuffer(objectKey, buffer) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${objectKey}`,
      method: 'PUT',
      headers: {
        'X-Auth-Email': AUTH_EMAIL,
        'X-Auth-Key': AUTH_KEY,
        'Content-Type': 'image/webp',
        'Content-Length': buffer.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(buffer);
    req.end();
  });
}

// Convert PNG to WebP buffer and upload it
async function processAndUpload(file, sourceDir, targetKey) {
  const filePath = path.join(sourceDir, file);
  
  // 1. Convert to WebP buffer in memory using sharp
  const webpBuffer = await sharp(filePath)
    .webp({ quality: 80 })
    .toBuffer();
    
  // 2. Upload WebP buffer to R2
  await uploadBuffer(targetKey, webpBuffer);
  
  return { originalSize: fs.statSync(filePath).size, newSize: webpBuffer.length };
}

async function uploadSequence(sourceDir, prefix = '') {
  if (!fs.existsSync(sourceDir)) {
    console.log(`Directory ${sourceDir} does not exist. Skipping.`);
    return;
  }

  const files = fs.readdirSync(sourceDir)
    .filter(file => file.endsWith('.png'))
    .sort();

  const totalFiles = files.length;
  console.log(`\nProcessing ${totalFiles} images in ${sourceDir}...`);

  let completed = 0;
  let totalSavedBytes = 0;
  const queue = [...files];
  const activeWorkers = [];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      const targetFilename = file.replace('.png', '.webp');
      const targetKey = prefix ? `${prefix}${targetFilename}` : targetFilename;
      let attempts = 3;
      let success = false;

      while (attempts > 0 && !success) {
        try {
          const stats = await processAndUpload(file, sourceDir, targetKey);
          success = true;
          completed++;
          const saved = stats.originalSize - stats.newSize;
          totalSavedBytes += saved;
          const percent = ((completed / totalFiles) * 100).toFixed(1);
          console.log(`[Success] ${targetKey} uploaded. Saved: ${Math.round(saved / 1024)} KB (${completed}/${totalFiles} - ${percent}%)`);
        } catch (err) {
          attempts--;
          console.error(`[Error] Failed to process ${file}. Attempts left: ${attempts}. Details: ${err.message}`);
          if (attempts === 0) {
            throw err;
          }
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }
  }

  for (let i = 0; i < Math.min(CONCURRENCY, queue.length); i++) {
    activeWorkers.push(worker());
  }

  await Promise.all(activeWorkers);
  console.log(`\nCompleted upload of sequence with prefix "${prefix}". Saved total of ${Math.round(totalSavedBytes / 1024 / 1024)} MB!`);
}

async function run() {
  console.log("Starting PNG to WebP conversion and Cloudflare R2 upload...");
  const startTime = Date.now();
  
  try {
    // 1. Process and upload hero frames
    await uploadSequence(HERO_DIR, '');
    
    // 2. Process and upload bridge scroll frames
    await uploadSequence(BRIDGE_DIR, 'bridge-scroll/');
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n🎉 Success! All sequences converted to WebP and uploaded to R2 in ${duration}s.`);
  } catch (err) {
    console.error("\n❌ Conversion/Upload task failed:", err);
    process.exit(1);
  }
}

run();
