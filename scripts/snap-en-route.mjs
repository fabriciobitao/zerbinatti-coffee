import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3001';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

try {
  // 1) Visita /en sem localStorage — deve renderizar EN no SSR (titulo/H1)
  const p = await b.newPage();
  await p.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch {} });
  await p.setViewport({ width: 1440, height: 900 });

  // Captura HTML cru pre-hidratacao pra confirmar SSR EN
  const ssrRes = await fetch(`${BASE}/en`);
  const ssrHtml = await ssrRes.text();
  const titleMatch = ssrHtml.match(/<title>([^<]+)<\/title>/);
  const h1Match = ssrHtml.match(/<h1[^>]*hero-title[^>]*>([^<]+)<\/h1>/);
  const ogTitle = ssrHtml.match(/property="og:title" content="([^"]+)"/);
  const ogLocale = ssrHtml.match(/property="og:locale" content="([^"]+)"/);
  const canonical = ssrHtml.match(/rel="canonical" href="([^"]+)"/);
  const hreflangPt = ssrHtml.match(/hrefLang="pt-BR" href="([^"]+)"/);
  const hreflangEn = ssrHtml.match(/hrefLang="en" href="([^"]+)"/);
  console.log('SSR /en ->', {
    title: titleMatch?.[1],
    ogTitle: ogTitle?.[1],
    ogLocale: ogLocale?.[1],
    canonical: canonical?.[1],
    hreflangPt: hreflangPt?.[1],
    hreflangEn: hreflangEn?.[1],
  });

  // 2) Render visual /en mobile
  const m = await b.newPage();
  await m.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await m.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch {} });
  await m.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  await m.screenshot({ path: `${OUT}/en-mobile-header.png`, clip: { x: 0, y: 0, width: 390, height: 100 } });
  await m.screenshot({ path: `${OUT}/en-mobile-hero.png`, clip: { x: 0, y: 0, width: 390, height: 844 } });

  const h1 = await m.evaluate(() => document.querySelector('h1.hero-title')?.textContent?.trim().slice(0, 200));
  const lang = await m.evaluate(() => document.documentElement.lang);
  console.log('CSR /en mobile ->', { lang, h1 });

  // 3) Toggle: clicar bandeira PT no /en deve navegar pra /
  await m.click('.lang-toggle-mobile');
  await new Promise(r => setTimeout(r, 1500));
  const newUrl = m.url();
  const newLang = await m.evaluate(() => document.documentElement.lang);
  const newH1 = await m.evaluate(() => document.querySelector('h1.hero-title')?.textContent?.trim().slice(0, 100));
  console.log('Apos clicar toggle ->', { newUrl, newLang, newH1 });

  // 4) /en internal anchor link (#cafes) -> deve continuar em /en
  const m2 = await b.newPage();
  await m2.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await m2.goto(`${BASE}/en`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  const cafesHref = await m2.evaluate(() => {
    // pega o primeiro link "Cafés" no header nav (pode estar oculto em mobile)
    const link = Array.from(document.querySelectorAll('a')).find(a => /Coffees|Caf[eé]s/i.test(a.textContent || ''));
    return link?.getAttribute('href');
  });
  console.log('Header link de Cafes em /en ->', cafesHref);

  console.log('Saved screenshots in', OUT);
} finally {
  await b.close();
}
