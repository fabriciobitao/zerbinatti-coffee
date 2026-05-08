// Footer screenshot for visual QA — focuses on Gruta badge area
import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://localhost:3000/';
const out = process.argv[3] || 'C:/Users/fabio/AppData/Local/Temp/zrb-footer.png';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--disable-gpu'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        window.scrollTo(0, y);
        y += 200;
        if (y < document.body.scrollHeight) {
          setTimeout(step, 50);
        } else {
          window.scrollTo(0, document.body.scrollHeight);
          setTimeout(resolve, 2500);
        }
      };
      step();
    });
  });

  const footer = await page.$('footer');
  if (footer) {
    await footer.screenshot({ path: out });
    console.log(`Footer screenshot saved: ${out}`);
  } else {
    await page.screenshot({ path: out, fullPage: false });
    console.log(`No footer element — saved viewport: ${out}`);
  }
} finally {
  await browser.close();
}
