const https = require('https');

const DOMAIN = 'pub-731a48c3160243f6a21049d8bb21b75b.r2.dev';
const TEST_KEYS = [
  'ezgif-frame-001.png',
  'ezgif-frame-050.png',
  'ezgif-frame-100.png'
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.request(url, { method: 'HEAD' }, (res) => {
      resolve({ url, status: res.statusCode, headers: res.headers });
    }).on('error', (e) => {
      resolve({ url, error: e.message });
    }).end();
  });
}

async function run() {
  console.log(`Verifying public accessibility on R2 CDN domain: https://${DOMAIN}\n`);
  let allOk = true;

  for (const key of TEST_KEYS) {
    const url = `https://${DOMAIN}/${key}`;
    console.log(`Checking ${url}...`);
    const res = await checkUrl(url);
    if (res.status === 200) {
      console.log(`✅ Success! Status: 200 OK. File size: ${res.headers['content-length']} bytes.`);
    } else {
      console.log(`❌ Failed! Status: ${res.status || 'ERROR'}. Details: ${res.error || ''}`);
      allOk = false;
    }
  }

  if (allOk) {
    console.log(`\n🎉 All verified frames are publicly accessible and healthy!`);
  } else {
    console.log(`\n❌ Some frames could not be verified.`);
    process.exit(1);
  }
}

run();
