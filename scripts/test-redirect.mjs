import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
try {
  const p = await b.newPage();
  await p.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36');
  console.log('Visiting checkout.zerbinatticoffee.com/ ...');
  await p.goto('https://checkout.zerbinatticoffee.com/', { waitUntil: 'networkidle0', timeout: 30000 });
  console.log('Final URL:', p.url());
  console.log('Title:', await p.title());
} finally {
  await b.close();
}
