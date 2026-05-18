const puppeteer = require('/Users/said/Projets/prospectplus/scraper-worker/node_modules/puppeteer');
const path = require('path');

const files = [
  { file: 'screenshot-1-popup-active.html', width: 1280, height: 800 },
  { file: 'screenshot-2-popup-add.html',    width: 1280, height: 800 },
  { file: 'screenshot-3-options.html',      width: 1280, height: 800 },
  { file: 'screenshot-4-architecture.html', width: 1280, height: 800 },
  { file: 'promo-small.html',               width: 440,  height: 280 },
  { file: 'promo-marquee.html',             width: 1400, height: 560 },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const { file, width, height } of files) {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    const url = 'file://' + path.resolve(__dirname, file);
    await page.goto(url, { waitUntil: 'networkidle0' });
    const out = path.resolve(__dirname, file.replace('.html', '.png'));
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width, height } });
    console.log(`✓ ${file.replace('.html', '.png')} (${width}×${height})`);
    await page.close();
  }

  await browser.close();
  console.log('\nDone — PNG files in store-assets/');
})();
