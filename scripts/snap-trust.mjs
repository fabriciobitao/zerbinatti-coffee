import puppeteer from 'puppeteer-core';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
const d = await b.newPage();
await d.setViewport({ width: 1440, height: 1000 });
await d.goto('http://localhost:3000/export', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));
const h = await d.evaluate(() => document.body.scrollHeight);
await d.evaluate(yy => window.scrollTo(0, yy), h - 1000);
await new Promise(r => setTimeout(r, 800));
await d.screenshot({ path: 'C:/Users/fabio/AppData/Local/Temp/export-en-trust2.png' });
console.log('done', h);
await b.close();
