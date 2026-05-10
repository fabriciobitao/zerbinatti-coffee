import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3001';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

async function newPage(viewport, accept) {
  const p = await b.newPage();
  if (viewport) await p.setViewport(viewport);
  if (accept) await p.setExtraHTTPHeaders({ 'Accept-Language': accept });
  await p.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch {} });
  return p;
}

async function check(label, fn) {
  console.log(`\n[${label}]`);
  try { await fn(); } catch (e) { console.log('  ERRO:', e.message); }
}

try {
  // ─── DESKTOP ───
  // 1) Em /en, click na bandeira PT do .lang-switch -> deve ir pra /
  await check('Desktop /en -> click PT no .lang-switch', async () => {
    const p = await newPage({ width: 1440, height: 900 });
    await p.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    await p.click('.lang-switch button[data-lang="pt"]');
    await new Promise(r => setTimeout(r, 1500));
    const url = p.url();
    const lang = await p.evaluate(() => document.documentElement.lang);
    const ls = await p.evaluate(() => localStorage.getItem('zerbinatti.locale'));
    console.log(' ', { url, lang, ls });
    await p.close();
  });

  // 2) Em /en, click ES -> deve ir pra / e renderizar em ES
  await check('Desktop /en -> click ES no .lang-switch', async () => {
    const p = await newPage({ width: 1440, height: 900 });
    await p.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    await p.click('.lang-switch button[data-lang="es"]');
    await new Promise(r => setTimeout(r, 1500));
    const url = p.url();
    const lang = await p.evaluate(() => document.documentElement.lang);
    const h1 = await p.evaluate(() => document.querySelector('h1.hero-title')?.textContent?.slice(0, 80));
    console.log(' ', { url, lang, h1 });
    await p.close();
  });

  // 3) Em /, click EN -> deve ir pra /en
  await check('Desktop / -> click EN no .lang-switch', async () => {
    const p = await newPage({ width: 1440, height: 900 });
    await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    await p.click('.lang-switch button[data-lang="en"]');
    await new Promise(r => setTimeout(r, 1500));
    const url = p.url();
    const lang = await p.evaluate(() => document.documentElement.lang);
    console.log(' ', { url, lang });
    await p.close();
  });

  // ─── MOBILE DRAWER ───
  // 4) Em /en mobile, abrir drawer e clicar PT -> ir pra /
  await check('Mobile /en drawer -> click PT', async () => {
    const p = await newPage({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
    await p.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    await p.click('.menu-btn');
    await new Promise(r => setTimeout(r, 800));
    await p.click('.menu-lang button[data-lang="pt"]');
    await new Promise(r => setTimeout(r, 1500));
    const url = p.url();
    const lang = await p.evaluate(() => document.documentElement.lang);
    console.log(' ', { url, lang });
    await p.close();
  });

  // 5) Em /en mobile, abrir drawer e clicar ES -> ir pra / e renderizar em ES
  await check('Mobile /en drawer -> click ES', async () => {
    const p = await newPage({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
    await p.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    await p.click('.menu-btn');
    await new Promise(r => setTimeout(r, 800));
    await p.click('.menu-lang button[data-lang="es"]');
    await new Promise(r => setTimeout(r, 1500));
    const url = p.url();
    const lang = await p.evaluate(() => document.documentElement.lang);
    const h1 = await p.evaluate(() => document.querySelector('h1.hero-title')?.textContent?.slice(0, 80));
    console.log(' ', { url, lang, h1 });
    await p.close();
  });

  // 6) Em /, click ES no drawer -> in-page (sem trocar URL)
  await check('Mobile / drawer -> click ES (in-page, sem nav)', async () => {
    const p = await newPage({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
    await p.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(r => setTimeout(r, 2500));
    await p.click('.menu-btn');
    await new Promise(r => setTimeout(r, 800));
    await p.click('.menu-lang button[data-lang="es"]');
    await new Promise(r => setTimeout(r, 1500));
    const url = p.url();
    const lang = await p.evaluate(() => document.documentElement.lang);
    const h1 = await p.evaluate(() => document.querySelector('h1.hero-title')?.textContent?.slice(0, 80));
    console.log(' ', { url, lang, h1 });
    await p.close();
  });
} finally {
  await b.close();
}
