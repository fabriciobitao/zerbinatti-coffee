// Hero-only viewport screenshot for direct visual QA
import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://localhost:3000/';
const out = process.argv[3] || 'C:/Users/fabio/AppData/Local/Temp/zrb-hero.png';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--disable-gpu'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: out });
  console.log('saved', out);
} finally {
  await browser.close();
}
