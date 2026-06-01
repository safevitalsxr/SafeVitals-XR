const fs = require('fs');
const path = require('path');
const https = require('https');

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
const LOCAL_DIR = path.join(__dirname, '..', 'public', 'bridge-scroll');

const CONCURRENCY = 5;

function uploadFile(filename, filePath) {
  return new Promise((resolve, reject) => {
    const fileStats = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    // Upload with "bridge-scroll/" prefix
    const objectKey = `bridge-scroll/${filename}`;

    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${BUCKET_NAME}/objects/${objectKey}`,
      method: 'PUT',
      headers: {
        'X-Auth-Email': AUTH_EMAIL,
        'X-Auth-Key': AUTH_KEY,
        'Content-Type': 'image/png',
        'Content-Length': fileStats.size
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ success: true, data });
          }
        } else {
          reject(new Error(`Status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    fileStream.pipe(req);
  });
}

async function run() {
  console.log(`Starting upload of bridge-scroll images from ${LOCAL_DIR} to Cloudflare R2 bucket "${BUCKET_NAME}"...`);

  if (!fs.existsSync(LOCAL_DIR)) {
    console.error(`Error: Directory ${LOCAL_DIR} does not exist!`);
    process.exit(1);
  }

  const files = fs.readdirSync(LOCAL_DIR)
    .filter(file => file.endsWith('.png'))
    .sort();

  const totalFiles = files.length;
  console.log(`Found ${totalFiles} bridge-scroll frames to upload.`);

  let completed = 0;
  let failed = [];

  const queue = [...files];
  const activeWorkers = [];

  async function worker() {
    while (queue.length > 0) {
      const file = queue.shift();
      const filePath = path.join(LOCAL_DIR, file);
      let attempts = 3;
      let success = false;

      while (attempts > 0 && !success) {
        try {
          await uploadFile(file, filePath);
          success = true;
          completed++;
          const percent = ((completed / totalFiles) * 100).toFixed(1);
          console.log(`[Progress] Uploaded bridge-scroll/${file} successfully (${completed}/${totalFiles} - ${percent}%)`);
        } catch (err) {
          attempts--;
          console.error(`[Error] Failed to upload ${file}. Attempts left: ${attempts}. Details: ${err.message}`);
          if (attempts === 0) {
            failed.push({ file, error: err.message });
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }
    }
  }

  for (let i = 0; i < Math.min(CONCURRENCY, queue.length); i++) {
    activeWorkers.push(worker());
  }

  await Promise.all(activeWorkers);

  console.log(`\n--- Upload Summary ---`);
  console.log(`Total attempted: ${totalFiles}`);
  console.log(`Successfully uploaded: ${completed}`);
  console.log(`Failed: ${failed.length}`);

  if (failed.length > 0) {
    process.exit(1);
  } else {
    console.log(`\n🎉 All bridge-scroll files uploaded successfully!`);
  }
}

run();
