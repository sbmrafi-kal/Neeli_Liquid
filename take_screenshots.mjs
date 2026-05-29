// Simple screenshot script using Puppeteer
import puppeteer from 'puppeteer';

const TARGET_URL = 'http://127.0.0.1:9292/products/neelibhringadi-keram';
const DESKTOP_PATH = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/current_desktop.png';
const MOBILE_PATH = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/current_mobile.png';

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Desktop screenshot
  console.log('Taking desktop screenshot at 1440px...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: DESKTOP_PATH, fullPage: true });
  console.log(`Desktop screenshot saved to ${DESKTOP_PATH}`);

  // Mobile screenshot
  console.log('Taking mobile screenshot at 390px...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: MOBILE_PATH, fullPage: true });
  console.log(`Mobile screenshot saved to ${MOBILE_PATH}`);

  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
