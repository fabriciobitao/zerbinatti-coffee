import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
const d = await b.newPage();
await d.setViewport({ width: 1440, height: 1100 });
await d.goto('http://localhost:3000/export', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3500));
await d.screenshot({ path: 'C:/Users/fabio/AppData/Local/Temp/export-hero-v3.png', clip: { x: 0, y: 0, width: 1440, height: 1100 } });
// logistics pull-quote
await d.evaluate(() => {
  const el = document.getElementById('logistics');
  if (el) window.scrollTo(0, el.offsetTop - 50);
});
await new Promise(r => setTimeout(r, 700));
await d.screenshot({ path: 'C:/Users/fabio/AppData/Local/Temp/export-logistics-quote.png' });
await b.close();
console.log('done');
