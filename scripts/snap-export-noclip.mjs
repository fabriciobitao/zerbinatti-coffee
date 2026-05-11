import puppeteer from 'puppeteer-core';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
const d = await b.newPage();
await d.setViewport({ width: 1440, height: 1000 });
await d.goto('http://localhost:3000/export', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3000));

for (const y of [1000, 2200, 3500, 5000, 6500]) {
  await d.evaluate(yy => window.scrollTo(0, yy), y);
  await new Promise(r => setTimeout(r, 800));
  // sem clip — captura o viewport todo
  await d.screenshot({ path: `C:/Users/fabio/AppData/Local/Temp/export-en-at${y}.png` });
  console.log('at', y);
}
await b.close();
