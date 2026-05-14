// Screenshot da rota /cinema para QA visual rápido.
// Tira full-page screenshot + viewport top em desktop e mobile.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME_MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.argv[2] || 'http://localhost:3000/cinema';
const outDir = process.argv[3] || '/tmp';

const executablePath = existsSync(CHROME_MAC) ? CHROME_MAC : process.env.CHROME_PATH;
if (!executablePath) throw new Error('Chrome not found');

const browser = await puppeteer.launch({ executablePath, headless: 'new' });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `${outDir}/cinema-hero-desktop.png` });
  console.log(`saved ${outDir}/cinema-hero-desktop.png`);

  await page.screenshot({ path: `${outDir}/cinema-full-desktop.png`, fullPage: true });
  console.log(`saved ${outDir}/cinema-full-desktop.png`);

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await new Promise((r) => setTimeout(r, 2500));
  await page.screenshot({ path: `${outDir}/cinema-hero-mobile.png` });
  console.log(`saved ${outDir}/cinema-hero-mobile.png`);
} finally {
  await browser.close();
}
