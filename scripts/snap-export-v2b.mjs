import puppeteer from 'puppeteer-core';

const BASE = 'http://localhost:3000';
const OUT = 'C:/Users/fabio/AppData/Local/Temp';

const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--hide-scrollbars'],
});

try {
  const d = await b.newPage();
  await d.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
  await d.goto(`${BASE}/export`, { waitUntil: 'networkidle0', timeout: 90000 });
  await new Promise(r => setTimeout(r, 3500));
  await d.screenshot({ path: `${OUT}/export-en-hero-2.png`, clip: { x: 0, y: 0, width: 1440, height: 1100 } });
  console.log('hero-2 saved');

  // Scroll snapshots
  const sections = [
    { id: 'origin', name: 'origin' },
    { id: 'coffees', name: 'coffees' },
    { id: 'process', name: 'process' },
    { id: 'logistics', name: 'logistics' },
    { id: 'inquiry', name: 'inquiry' },
  ];
  for (const s of sections) {
    await d.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, s.id);
    await new Promise(r => setTimeout(r, 700));
    await d.screenshot({ path: `${OUT}/export-en-${s.name}.png`, clip: { x: 0, y: 0, width: 1440, height: 1000 } });
    console.log(`${s.name} saved`);
  }
} finally {
  await b.close();
}
