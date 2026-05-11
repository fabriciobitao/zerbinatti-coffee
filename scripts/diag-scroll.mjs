import puppeteer from 'puppeteer-core';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
const d = await b.newPage();
await d.setViewport({ width: 1440, height: 1000 });
await d.goto('http://localhost:3000/export', { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 2500));

for (const y of [0, 1000, 2000, 3000, 4000]) {
  await d.evaluate(yy => window.scrollTo(0, yy), y);
  await new Promise(r => setTimeout(r, 600));
  const info = await d.evaluate(() => ({
    scrollY: window.scrollY,
    bodyOverflow: getComputedStyle(document.body).overflow,
    htmlOverflow: getComputedStyle(document.documentElement).overflow,
    bodyHeight: document.body.scrollHeight,
    visibleH1: document.querySelector('h1.export-hero-title-v2')?.getBoundingClientRect(),
    visibleOrigin: document.getElementById('origin')?.getBoundingClientRect(),
  }));
  console.log('requested', y, JSON.stringify(info));
}
await b.close();
