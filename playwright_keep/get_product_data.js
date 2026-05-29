const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  
  const passwordField = await page.$('input[type="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    await passwordField.press('Enter');
    await page.waitForTimeout(4000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  }
  
  const metadata = await page.evaluate(() => {
    return {
      meta: window.meta,
      ShopifyAnalytics: window.ShopifyAnalytics?.meta?.product
    };
  });
  console.log('Product metadata:', JSON.stringify(metadata, null, 2));
  await browser.close();
})();
