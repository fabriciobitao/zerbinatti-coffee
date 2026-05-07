// Simula fluxo de pedido E2E:
//   home -> add to cart -> ler checkoutUrl -> visitar Shopify checkout
// Para identificar onde o pedido eventualmente trava (payment, shipping, password).
import puppeteer from 'puppeteer-core';

const url = process.argv[2] || 'http://localhost:3000/';

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--disable-gpu'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', (m) => {
    if (m.type() === 'error') console.log(`[console.error] ${m.text()}`);
  });
  page.on('pageerror', (e) => console.log(`[pageerror] ${e.message}`));

  console.log('=== STEP 1: load home');
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  console.log('=== STEP 2: scroll to #cafes and click first Add button');
  await page.evaluate(() => {
    document.getElementById('cafes')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));

  const addBtnInfo = await page.evaluate(() => {
    const btn = document.querySelector('button[data-add="true"]');
    if (!btn) return { found: false };
    return {
      found: true,
      variantId: btn.getAttribute('data-variant-id'),
      disabled: btn.disabled,
      text: btn.textContent.trim().slice(0, 40),
    };
  });
  console.log('Add button:', JSON.stringify(addBtnInfo));

  if (!addBtnInfo.found) throw new Error('Add button not found');

  await page.click('button[data-add="true"]');

  // Wait for cart drawer to update with line + checkoutUrl
  await page.waitForFunction(
    () => {
      try {
        const id = window.localStorage.getItem('zrb-cart-id');
        return Boolean(id);
      } catch {
        return false;
      }
    },
    { timeout: 10000 },
  );

  const cartState = await page.evaluate(() => {
    const drawer = document.getElementById('cartDrawer');
    const checkoutAnchor = drawer?.querySelector('a.btn-gold');
    const cartId = window.localStorage.getItem('zrb-cart-id');
    const items = drawer?.querySelectorAll('.cart-item').length ?? 0;
    return {
      cartId,
      drawerOpen: drawer?.classList.contains('open') ?? false,
      itemCount: items,
      checkoutUrl: checkoutAnchor?.getAttribute('href') ?? null,
      checkoutDisabled: checkoutAnchor?.getAttribute('aria-disabled') === 'true',
    };
  });
  console.log('Cart state:', JSON.stringify(cartState, null, 2));

  if (!cartState.checkoutUrl || cartState.checkoutUrl === '#') {
    throw new Error('No checkoutUrl on cart');
  }

  console.log('\n=== STEP 3: visit Shopify checkoutUrl');
  console.log('URL:', cartState.checkoutUrl);

  const checkoutPage = await browser.newPage();
  await checkoutPage.setViewport({ width: 1440, height: 900 });

  // Capture network errors / final URL
  const responses = [];
  checkoutPage.on('response', (r) => {
    const u = r.url();
    if (u.includes('myshopify') || u.includes('shopify.com')) {
      responses.push({ url: u.slice(0, 120), status: r.status() });
    }
  });

  try {
    await checkoutPage.goto(cartState.checkoutUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
  } catch (e) {
    console.log('checkout goto error:', e.message);
  }

  const finalState = await checkoutPage.evaluate(() => ({
    url: location.href,
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    bodyClass: document.body.className,
    bodySnippet: document.body.innerText.slice(0, 600),
    hasPasswordForm: Boolean(document.querySelector('input[type="password"]')),
    hasPaymentSection: Boolean(
      document.querySelector('[data-payment-method], [data-step="payment_method"]'),
    ),
  }));
  console.log('\nCheckout page final state:');
  console.log(JSON.stringify(finalState, null, 2));

  await checkoutPage.screenshot({
    path: 'C:/Users/fabio/AppData/Local/Temp/zrb-checkout.png',
    fullPage: true,
  });
  console.log('saved C:/Users/fabio/AppData/Local/Temp/zrb-checkout.png');

  console.log('\nKey shopify responses:');
  responses.slice(0, 8).forEach((r) => console.log(`  [${r.status}] ${r.url}`));
} finally {
  await browser.close();
}
