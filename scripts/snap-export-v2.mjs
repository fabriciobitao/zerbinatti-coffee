import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3000';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--hide-scrollbars'],
});

try {
  for (const [route, name] of [
    ['/export', 'export-en'],
    ['/exportacao', 'export-pt'],
    ['/es/exportacion', 'export-es'],
  ]) {
    const d = await b.newPage();
    await d.setViewport({ width: 1440, height: 3600, deviceScaleFactor: 1 });
    await d.goto(`${BASE}${route}`, { waitUntil: 'networkidle0', timeout: 90000 });
    await new Promise(r => setTimeout(r, 1500));
    // Hero
    await d.screenshot({ path: `${OUT}/${name}-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
    // Full page (capped)
    const total = await d.evaluate(() => Math.min(document.body.scrollHeight, 6000));
    await d.setViewport({ width: 1440, height: total, deviceScaleFactor: 1 });
    await new Promise(r => setTimeout(r, 800));
    await d.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: false, clip: { x: 0, y: 0, width: 1440, height: total } });
    console.log(`${name}: hero + full (${total}px) saved`);
    await d.close();
  }
} finally {
  await b.close();
}
