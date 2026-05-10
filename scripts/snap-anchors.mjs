import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3001';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

async function check(url, expectedSectionIds, expectedHrefs) {
  console.log(`\n=== ${url} ===`);
  const p = await b.newPage();
  await p.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch {} });
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(`${BASE}${url}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));

  for (const id of expectedSectionIds) {
    const found = await p.evaluate((sid) => !!document.getElementById(sid), id);
    console.log(`  section #${id}:`, found ? 'OK' : 'MISSING');
  }

  const hrefs = await p.evaluate(() =>
    Array.from(document.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(h => h && (h.includes('#cafes') || h.includes('#processo') || h.includes('#assinatura') || h.includes('#historia') || h.includes('#coffees') || h.includes('#process') || h.includes('#subscription') || h.includes('#story')))
  );
  const uniq = [...new Set(hrefs)].sort();
  console.log('  hrefs:', uniq);

  for (const h of expectedHrefs) {
    console.log(`  expected ${h}:`, uniq.includes(h) ? 'OK' : 'MISSING');
  }
  await p.close();
}

try {
  await check('/', ['cafes', 'processo', 'assinatura', 'historia'], [
    '/#cafes', '/#processo', '/#assinatura', '/#historia',
  ]);
  await check('/en', ['coffees', 'process', 'subscription', 'story'], [
    '/en/#coffees', '/en/#process', '/en/#subscription', '/en/#story',
    '#coffees', '#subscription', // hero CTA
  ]);
} finally {
  await b.close();
}
