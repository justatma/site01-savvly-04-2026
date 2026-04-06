import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

// Nav
await page.screenshot({
  path: 'temp_screenshots/011_nav_crop.png',
  clip: { x: 0, y: 0, width: 1440, height: 64 }
});

// Footer CTA
const footerCta = await page.$('#demo');
const box = await footerCta.boundingBox();
await page.screenshot({
  path: 'temp_screenshots/012_footer_cta_crop.png',
  clip: { x: box.x, y: box.y, width: box.width, height: box.height }
});

// Cards grid
const cards = await page.$('.grid');
const cardBox = await cards.boundingBox();
await page.screenshot({
  path: 'temp_screenshots/013_cards_crop.png',
  clip: { x: cardBox.x, y: cardBox.y, width: cardBox.width, height: cardBox.height }
});

await browser.close();
console.log('done');
