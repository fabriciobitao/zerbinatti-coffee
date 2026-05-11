import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
const d = await b.newPage();
await d.setViewport({ width: 1440, height: 1100 });
await d.goto('http://localhost:3000/export', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3500));
await d.evaluate(() => {
  const el = document.getElementById('galleria');
  if (el) window.scrollTo(0, el.offsetTop - 30);
});
await new Promise(r => setTimeout(r, 800));
await d.screenshot({ path: 'C:/Users/fabio/AppData/Local/Temp/export-galleria.png' });
console.log('done');
await b.close();
