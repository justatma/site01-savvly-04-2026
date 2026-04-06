import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

const info = await page.evaluate(() => {
  const btnDemo  = document.querySelector('.btn-demo');
  const btnGhost = document.querySelector('.btn-demo-ghost');
  const btnNav   = document.querySelector('.btn-nav');
  const footerDiv = document.querySelector('#demo > div');

  const cs = el => el ? {
    background: getComputedStyle(el).background,
    color:      getComputedStyle(el).color,
    opacity:    getComputedStyle(el).opacity,
    display:    getComputedStyle(el).display,
    visibility: getComputedStyle(el).visibility,
    border:     getComputedStyle(el).border,
    padding:    getComputedStyle(el).padding,
  } : 'NOT FOUND';

  return {
    btnDemo:    cs(btnDemo),
    btnGhost:   cs(btnGhost),
    btnNav:     cs(btnNav),
    footerDiv:  cs(footerDiv),
    footerDivOpacity: footerDiv ? getComputedStyle(footerDiv).opacity : 'n/a',
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
