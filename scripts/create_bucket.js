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

function createBucket() {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: BUCKET_NAME
    });

    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${ACCOUNT_ID}/r2/buckets`,
      method: 'POST',
      headers: {
        'X-Auth-Email': AUTH_EMAIL,
        'X-Auth-Key': AUTH_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (err) {
          resolve({ status: res.statusCode, error: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log(`Creating R2 Bucket "${BUCKET_NAME}"...`);
  try {
    const res = await createBucket();
    console.log("Response Status:", res.status);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));
    if (res.body && res.body.success) {
      console.log(`\n🎉 Success! Bucket "${BUCKET_NAME}" created successfully.`);
    } else if (res.body && res.body.errors && res.body.errors.some(e => e.message.includes('already exists'))) {
      console.log(`\nℹ️ Info: Bucket "${BUCKET_NAME}" already exists or you already own it.`);
    } else {
      console.log(`\n❌ Failed to create bucket.`);
    }
  } catch (err) {
    console.error("Error creating bucket:", err);
  }
}

run();
