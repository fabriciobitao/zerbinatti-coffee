// Cria cart via Storefront API e visita checkoutUrl com browser real.
// Independente do front — testa SO a parte Shopify.
import puppeteer from 'puppeteer-core';

const STORE = 'zerbinatticoffee.myshopify.com';
const TOKEN = '5f110b3e4f23e4e4e45d992fefb5a833';
const VARIANT = 'gid://shopify/ProductVariant/44078248099928';

const res = await fetch(`https://${STORE}/api/2024-10/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': TOKEN,
  },
  body: JSON.stringify({
    query: `mutation { cartCreate(input: {lines: [{merchandiseId: "${VARIANT}", quantity: 1}]}) { cart { id checkoutUrl } userErrors { message } } }`,
  }),
});
const json = await res.json();
const checkoutUrl = json.data.cartCreate.cart.checkoutUrl;
console.log('checkoutUrl:', checkoutUrl);

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(checkoutUrl, { waitUntil: 'networkidle0', timeout: 30000 });

  const state = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    hasPasswordForm: Boolean(document.querySelector('input[type="password"]')),
    hasPaymentSection: Boolean(
      document.querySelector('[data-payment-method], [data-step="payment_method"], input[name="checkout[email]"]'),
    ),
    bodySnippet: document.body.innerText.slice(0, 400),
  }));
  console.log(JSON.stringify(state, null, 2));

  await page.screenshot({
    path: 'C:/Users/fabio/AppData/Local/Temp/zrb-checkout-prod.png',
    fullPage: true,
  });
  console.log('saved C:/Users/fabio/AppData/Local/Temp/zrb-checkout-prod.png');
} finally {
  await browser.close();
}
