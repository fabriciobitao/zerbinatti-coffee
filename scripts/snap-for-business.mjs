import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3001';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

try {
  // 1) SSR /en/for-business -> OG/title em EN
  console.log('\n[1] SSR /en/for-business OG check');
  const html = await fetch(`${BASE}/en/for-business`).then(r => r.text());
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  const ogTitle = html.match(/property="og:title" content="([^"]+)"/)?.[1];
  const ogLocale = html.match(/property="og:locale" content="([^"]+)"/)?.[1];
  const ogUrl = html.match(/property="og:url" content="([^"]+)"/)?.[1];
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  console.log({ title, ogTitle, ogLocale, ogUrl, canonical });

  // 2) /para-empresas -> 301 redirect pra /en/for-business
  console.log('\n[2] /para-empresas redirect');
  const r = await fetch(`${BASE}/para-empresas`, { redirect: 'manual' });
  console.log({ status: r.status, location: r.headers.get('location') });

  const r2 = await fetch(`${BASE}/en/para-empresas`, { redirect: 'manual' });
  console.log('  /en/para-empresas:', { status: r2.status, location: r2.headers.get('location') });

  // 3) Render visual desktop
  console.log('\n[3] Render desktop');
  const d = await b.newPage();
  await d.setViewport({ width: 1440, height: 900 });
  await d.goto(`${BASE}/en/for-business`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  await d.screenshot({ path: `${OUT}/for-business-hero.png`, clip: { x: 0, y: 0, width: 1440, height: 900 } });
  const h1 = await d.evaluate(() => document.querySelector('h1.b2b-hero-title')?.textContent?.replace(/\s+/g, ' '));
  const lang = await d.evaluate(() => document.documentElement.lang);
  console.log({ lang, h1: h1?.slice(0, 80) });

  // 4) Mobile screenshot
  console.log('\n[4] Render mobile');
  const m = await b.newPage();
  await m.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await m.goto(`${BASE}/en/for-business`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2000));
  await m.screenshot({ path: `${OUT}/for-business-mobile-hero.png`, clip: { x: 0, y: 0, width: 390, height: 844 } });

  // 5) Header de "/" em desktop -> link "Para Empresas" deve apontar pra /en/for-business
  console.log('\n[5] PT home link to /en/for-business');
  const ptHtml = await fetch(`${BASE}/`).then(r => r.text());
  const empresas = ptHtml.match(/href="[^"]*for-business[^"]*"/g);
  console.log('  matches:', empresas?.length || 0, empresas?.[0]);

  // 6) Form post sem turnstile -> deve falhar com 403 turnstile_failed
  console.log('\n[6] /api/b2b-form POST sem turnstileToken (locale=en)');
  const resp = await fetch(`${BASE}/api/b2b-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'John Doe',
      empresa: 'Roastery Inc',
      email: 'john@roastery.test',
      whatsapp: '+1 555 1234567',
      pais: 'USA',
      segmento: 'roastery',
      volume: '100kg green/month',
      mensagem: 'Looking for traceable lots',
      locale: 'en',
    }),
  });
  const json = await resp.json();
  console.log('  status:', resp.status, 'body:', json);

  console.log('\nSaved screenshots in', OUT);
} finally {
  await b.close();
}
