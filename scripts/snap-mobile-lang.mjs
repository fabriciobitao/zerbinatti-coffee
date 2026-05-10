import puppeteer from 'puppeteer-core';

const URL = 'http://localhost:3001/';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

async function shot(page, file, clip) {
  await page.screenshot({ path: `${OUT}/${file}`, clip });
}

try {
  // 1) Mobile pt-BR (default): header deve ter EN flag visivel + IG fora; hero IG abaixo dos selos
  const m = await b.newPage();
  await m.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9' });
  await m.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'language', { get: () => 'pt-BR' });
    Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt'] });
    try { localStorage.clear(); } catch {}
  });
  await m.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await m.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  await shot(m, 'lang-mobile-pt-header.png', { x: 0, y: 0, width: 390, height: 100 });
  // hero seals + IG: rolar pra encontrar
  await m.evaluate(() => document.querySelector('.hero-seals')?.scrollIntoView({ block: 'center' }));
  await new Promise(r => setTimeout(r, 800));
  await m.screenshot({ path: `${OUT}/lang-mobile-pt-hero.png`, fullPage: false });

  // 2) Mobile en-US (visitante US): auto-detect deve trocar pra EN
  const m2 = await b.newPage();
  await m2.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
  await m2.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'language', { get: () => 'en-US' });
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
    try { localStorage.clear(); } catch {}
  });
  await m2.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await m2.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 3000));
  await shot(m2, 'lang-mobile-en-header.png', { x: 0, y: 0, width: 390, height: 100 });
  // captura H1 pra confirmar idioma EN
  const h1Text = await m2.evaluate(() => document.querySelector('h1.hero-title')?.textContent?.trim().slice(0, 200));
  const htmlLang = await m2.evaluate(() => document.documentElement.lang);
  console.log('EN check ->', { htmlLang, h1Text });

  // 3) Desktop pt: confirmar que IG continua no header e bandeira mobile-only fica oculta
  const d = await b.newPage();
  await d.setViewport({ width: 1440, height: 900 });
  await d.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  await shot(d, 'lang-desktop-header.png', { x: 0, y: 0, width: 1440, height: 110 });

  console.log('saved screenshots in', OUT);
} finally {
  await b.close();
}
