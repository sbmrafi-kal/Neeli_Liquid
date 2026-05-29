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
    await page.waitForTimeout(2000);
  }
  
  const stickyPriceInfo = await page.evaluate(() => {
    const bar = document.querySelector('.theme-sticky-cart-bar');
    if (!bar) return 'Sticky bar not found';
    
    const priceEl = bar.querySelector('.theme-sticky-cart-bar__price');
    const compareEl = bar.querySelector('.theme-sticky-cart-bar__compare');
    const mrpEl = bar.querySelector('.theme-sticky-cart-bar__mrp');
    
    return {
      bar: {
        display: getComputedStyle(bar).display,
        visibility: getComputedStyle(bar).visibility,
        opacity: getComputedStyle(bar).opacity,
        background: getComputedStyle(bar).background
      },
      price: priceEl ? {
        text: priceEl.textContent,
        display: getComputedStyle(priceEl).display,
        color: getComputedStyle(priceEl).color,
        visibility: getComputedStyle(priceEl).visibility
      } : 'Not found',
      compare: compareEl ? {
        text: compareEl.textContent,
        display: getComputedStyle(compareEl).display,
        color: getComputedStyle(compareEl).color,
        hidden: compareEl.hidden
      } : 'Not found',
      mrp: mrpEl ? {
        text: mrpEl.textContent,
        display: getComputedStyle(mrpEl).display
      } : 'Not found'
    };
  });
  
  console.log('STICKY PRICE INFO:', stickyPriceInfo);
  await browser.close();
})();
