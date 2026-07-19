const https = require('https');

const DOMAIN = 'pub-731a48c3160243f6a21049d8bb21b75b.r2.dev';

function checkUrl(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, error: e.message });
    }).end();
  });
}

async function verifyHero() {
  console.log('Verifying 100 hero frames...');
  let failed = 0;
  for (let i = 1; i <= 100; i++) {
    const paddedIndex = String(i).padStart(3, '0');
    const url = `https://${DOMAIN}/ezgif-frame-${paddedIndex}.webp`;
    const res = await checkUrl(url);
    if (res.status !== 200) {
      console.log(`❌ Hero frame ${i} failed: ${url} (Status: ${res.status || 'ERROR'})`);
      failed++;
    }
  }
  console.log(`Hero verification complete. Failed: ${failed}/100\n`);
  return failed;
}

async function verifyBridge() {
  console.log('Verifying 25 bridge frames...');
  let failed = 0;
  for (let i = 1; i <= 25; i++) {
    const paddedIndex = String(i).padStart(3, '0');
    const url = `https://${DOMAIN}/bridge-scroll/ezgif-frame-${paddedIndex}.webp`;
    const res = await checkUrl(url);
    if (res.status !== 200) {
      console.log(`❌ Bridge frame ${i} failed: ${url} (Status: ${res.status || 'ERROR'})`);
      failed++;
    }
  }
  console.log(`Bridge verification complete. Failed: ${failed}/25\n`);
  return failed;
}

async function run() {
  const heroFailed = await verifyHero();
  const bridgeFailed = await verifyBridge();
  if (heroFailed > 0 || bridgeFailed > 0) {
    console.log('❌ R2 assets verification failed!');
    process.exit(1);
  } else {
    console.log('🎉 All 125 WebP frames are present and returning 200 OK on R2!');
  }
}

run();
