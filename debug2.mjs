import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Log console errors
page.on('console', msg => {
  if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
});
page.on('response', res => {
  if (res.url().includes('style')) console.log('RESOURCE:', res.status(), res.url());
});

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

const info = await page.evaluate(() => {
  // Check stylesheets
  const sheets = Array.from(document.styleSheets).map(s => {
    try {
      return { href: s.href, rules: s.cssRules?.length };
    } catch(e) {
      return { href: s.href, error: e.message };
    }
  });

  // Check if btn-demo has any matching rules
  const btn = document.querySelector('.btn-demo');
  const computed = btn ? {
    display: getComputedStyle(btn).display,
    background: getComputedStyle(btn).backgroundColor,
    padding: getComputedStyle(btn).paddingTop,
    fontFamily: getComputedStyle(btn).fontFamily,
  } : null;

  // Check body font-family to confirm custom CSS is loading
  const bodyFont = getComputedStyle(document.body).fontFamily;

  return { sheets, computed, bodyFont };
});

console.log('Stylesheets:', JSON.stringify(info.sheets, null, 2));
console.log('\nbtn-demo computed:', info.computed);
console.log('\nbody font-family:', info.bodyFont);

await browser.close();
