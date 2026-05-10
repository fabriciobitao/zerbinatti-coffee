import puppeteer from 'puppeteer-core';

const URL = 'http://localhost:3001/';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});

try {
  const m = await b.newPage();
  await m.evaluateOnNewDocument(() => { try { localStorage.clear(); } catch {} });
  await m.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  await m.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await new Promise(r => setTimeout(r, 2500));
  // Estado inicial PT: deve mostrar bandeira EN
  await m.screenshot({ path: `${OUT}/toggle-pt-shows-en.png`, clip: { x: 0, y: 0, width: 390, height: 90 } });
  const before = await m.evaluate(() => document.documentElement.lang);

  // Click na bandeira do toggle
  await m.click('.lang-toggle-mobile');
  await new Promise(r => setTimeout(r, 600));
  const after = await m.evaluate(() => document.documentElement.lang);
  await m.screenshot({ path: `${OUT}/toggle-en-shows-pt.png`, clip: { x: 0, y: 0, width: 390, height: 90 } });

  // Click de novo: volta pra PT
  await m.click('.lang-toggle-mobile');
  await new Promise(r => setTimeout(r, 600));
  const back = await m.evaluate(() => document.documentElement.lang);
  await m.screenshot({ path: `${OUT}/toggle-pt-again.png`, clip: { x: 0, y: 0, width: 390, height: 90 } });

  console.log('toggle ->', { before, after, back });
} finally {
  await b.close();
}
