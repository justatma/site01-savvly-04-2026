import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'temp_screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Auto-incrementing screenshot filename
function nextFilename(label = 'screenshot') {
  const files = fs.readdirSync(SCREENSHOTS_DIR)
    .filter(f => f.endsWith('.png'))
    .map(f => parseInt(f.match(/^(\d+)/)?.[1] ?? '0', 10))
    .sort((a, b) => b - a);
  const next = (files[0] ?? 0) + 1;
  return path.join(SCREENSHOTS_DIR, `${String(next).padStart(3, '0')}_${label}.png`);
}

async function screenshot(urlPath = '/', label = 'page', viewport = { width: 1440, height: 900 }) {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport(viewport);

  const fullUrlPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
  const url = `${BASE_URL}${fullUrlPath}`;
  console.log(`Screenshotting ${url} …`);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });

  // Derive label from urlPath if not provided
  if (label === 'page') {
    label = path.basename(urlPath, '.html');
  }

  // Force all animated elements visible for screenshot (animations run in-browser only)
  await page.addStyleTag({ content: `
    .fade-up, .scroll-fade {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
  `});
  // Small settle time for layout
  await new Promise(r => setTimeout(r, 300));

  // Also take a mobile screenshot
  const desktopPath = nextFilename(`${label}_desktop`);
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log(`  → ${desktopPath}`);

  await page.setViewport({ width: 390, height: 844 });
  const mobilePath = nextFilename(`${label}_mobile`);
  await page.screenshot({ path: mobilePath, fullPage: true });
  console.log(`  → ${mobilePath}`);

  await browser.close();
  return { desktopPath, mobilePath };
}

// CLI usage: node screenshot.mjs [urlPath] [label]
const [, , urlPath = '/', label = 'page'] = process.argv;
screenshot(urlPath, label).catch(err => {
  console.error(err);
  process.exit(1);
});
