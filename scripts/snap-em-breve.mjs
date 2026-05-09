import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
try {
  const p = await b.newPage();
  await p.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36');
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto('https://zerbinatticoffee.com/', { waitUntil: 'networkidle0', timeout: 30000 });

  await p.evaluate(() => {
    document.getElementById('cafes')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: 'C:/Users/fabio/AppData/Local/Temp/zrb-cafes.png', fullPage: false });

  await p.evaluate(() => {
    document.getElementById('assinatura')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await p.screenshot({ path: 'C:/Users/fabio/AppData/Local/Temp/zrb-assinatura.png', fullPage: false });

  console.log('saved cafes + assinatura screenshots');
} finally {
  await b.close();
}
