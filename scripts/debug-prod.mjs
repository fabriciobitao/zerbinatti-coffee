import puppeteer from 'puppeteer-core';
const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
try {
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36');
  await page.setViewport({ width: 1440, height: 900 });
  page.on('pageerror', (e) => console.log('[pageerror]', e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') console.log('[err]', m.text());
  });
  const resp = await page.goto('https://zerbinatticoffee.com/', { waitUntil: 'networkidle0', timeout: 30000 });
  console.log('response:', resp.status(), resp.url(), 'final URL:', page.url());

  const r = await page.evaluate(() => ({
    title: document.title,
    bodyStart: document.body.innerText.slice(0, 300),
    cafesExists: Boolean(document.getElementById('cafes')),
    allDataAdd: Array.from(document.querySelectorAll('[data-add]')).map((e) => ({
      tag: e.tagName,
      attr: e.getAttribute('data-add'),
      text: e.textContent.trim().slice(0, 30),
      class: e.className.slice(0, 60),
    })),
    allButtons: Array.from(document.querySelectorAll('button')).length,
    htmlSnippet: document.getElementById('cafes')?.outerHTML?.slice(0, 4000) ?? 'NO #cafes',
    buttonsList: Array.from(document.querySelectorAll('button')).map((b) => ({
      text: b.textContent.trim().slice(0, 40),
      class: b.className.slice(0, 60),
      attrs: Array.from(b.attributes).map((a) => `${a.name}=${a.value.slice(0, 30)}`),
    })),
  }));
  console.log(JSON.stringify(r, null, 2));
} finally {
  await browser.close();
}
