// Screenshot de cada seção do /cinema scrollando até elas.
// Útil pra QA visual das reveals + animações ScrollTrigger.
import puppeteer from 'puppeteer-core';
import { existsSync } from 'node:fs';

const CHROME_MAC = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.argv[2] || 'http://localhost:3000/cinema';
const outDir = process.argv[3] || '/tmp';

const executablePath = existsSync(CHROME_MAC) ? CHROME_MAC : process.env.CHROME_PATH;
if (!executablePath) throw new Error('Chrome not found');

const browser = await puppeteer.launch({
  executablePath,
  headless: 'new',
  args: ['--no-sandbox'],
});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 45000 });
  await wait(2000);

  const sections = [
    { sel: '[data-cinema="hero"], #cinema-hero, .cn-hero', name: 'hero' },
    { sel: '[data-cinema="manifesto"], .cn-manifesto', name: 'manifesto' },
    { sel: '[data-cinema="linhagem"], .cn-linhagem', name: 'linhagem' },
    { sel: '[data-cinema="mapa"], .cn-mapa', name: 'mapa' },
    { sel: '[data-cinema="notas"], .cn-notas', name: 'notas' },
    { sel: '[data-cinema="outro"], .cn-outro', name: 'outro' },
  ];

  // fallback: scroll por porcentagens se data attrs não existirem
  const heights = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('scrollHeight:', heights);

  const stops = [0, 0.12, 0.30, 0.48, 0.66, 0.84, 0.95];
  for (let i = 0; i < stops.length; i++) {
    const y = Math.round(stops[i] * heights);
    await page.evaluate((Y) => window.scrollTo({ top: Y, behavior: 'instant' }), y);
    await wait(1800);
    const name = `cinema-scroll-${String(i).padStart(2, '0')}-${Math.round(stops[i] * 100)}pct`;
    await page.screenshot({ path: `${outDir}/${name}.png` });
    console.log(`saved ${outDir}/${name}.png  (y=${y})`);
  }
} finally {
  await browser.close();
}
