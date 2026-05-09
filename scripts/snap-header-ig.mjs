import puppeteer from 'puppeteer-core';

const URL = 'http://localhost:3001/';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

try {
  // Desktop (header transparente, top da pagina)
  const d = await b.newPage();
  await d.setViewport({ width: 1440, height: 900 });
  await d.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  await new Promise(r => setTimeout(r, 800));
  await d.screenshot({ path: `${OUT}/zrb-header-desktop-top.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });

  // Desktop scrolled (header com bg coffee-950)
  await d.evaluate(() => window.scrollTo(0, 400));
  await new Promise(r => setTimeout(r, 800));
  await d.screenshot({ path: `${OUT}/zrb-header-desktop-scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 100 } });

  // Footer: progressive scroll triggers lazy-loads, then anchor to footer element
  await d.setViewport({ width: 1440, height: 900 });
  for (let y = 0; y < 12000; y += 800) {
    await d.evaluate((yy) => window.scrollTo(0, yy), y);
    await new Promise(r => setTimeout(r, 250));
  }
  await d.evaluate(() => {
    const f = document.querySelector('footer.footer') || document.querySelector('footer');
    f?.scrollIntoView({ block: 'end' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await d.screenshot({ path: `${OUT}/zrb-footer.png`, fullPage: false });

  // Mobile
  const m = await b.newPage();
  await m.setViewport({ width: 414, height: 896, isMobile: true, deviceScaleFactor: 2 });
  await m.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  await new Promise(r => setTimeout(r, 800));
  await m.screenshot({ path: `${OUT}/zrb-header-mobile-top.png`, clip: { x: 0, y: 0, width: 414, height: 90 } });

  await m.evaluate(() => window.scrollTo(0, 400));
  await new Promise(r => setTimeout(r, 800));
  await m.screenshot({ path: `${OUT}/zrb-header-mobile-scrolled.png`, clip: { x: 0, y: 0, width: 414, height: 70 } });

  console.log('saved screenshots in', OUT);
} finally {
  await b.close();
}
