import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://localhost:3000/';
const out = process.argv[3] || 'C:/Users/fabio/AppData/Local/Temp/zrb-fullpage.png';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--disable-gpu'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  // Slow scroll (mimics human scroll - reliably triggers IO)
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 100;
        if (y < document.body.scrollHeight) {
          setTimeout(step, 80);
        } else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 1500);
        }
      };
      step();
    });
  });

  await new Promise((r) => setTimeout(r, 1500));

  await page.screenshot({ path: out, fullPage: true });
  console.log('saved', out);
} finally {
  await browser.close();
}
