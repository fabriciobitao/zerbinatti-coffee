import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3000';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--hide-scrollbars'],
});

try {
  const d = await b.newPage();
  await d.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await d.goto(`${BASE}/export`, { waitUntil: 'networkidle0', timeout: 90000 });
  await new Promise(r => setTimeout(r, 3000));

  // Pega altura total
  const total = await d.evaluate(() => document.body.scrollHeight);
  console.log(`total height: ${total}px`);

  // Fatia em pedaços de 1000px usando window.scrollTo
  const CHUNK = 1000;
  let y = 0;
  let idx = 0;
  while (y < Math.min(total, 8000)) {
    await d.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
    await new Promise(r => setTimeout(r, 600));
    await d.screenshot({
      path: `${OUT}/export-en-slice-${String(idx).padStart(2, '0')}.png`,
      clip: { x: 0, y: 0, width: 1440, height: CHUNK },
    });
    console.log(`slice ${idx} at scrollTop=${y}`);
    y += CHUNK;
    idx++;
  }
} finally {
  await b.close();
}
