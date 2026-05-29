const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });
  const page = await context.newPage();
  
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
  
  const badgeInfo = await page.evaluate(() => {
    const badge = document.querySelector('.theme-product-page__badge--figma');
    if (!badge) return 'Badge not found';
    
    return {
      width: badge.clientWidth,
      height: badge.clientHeight,
      scrollWidth: badge.scrollWidth,
      parentWidth: badge.parentElement.clientWidth,
      display: getComputedStyle(badge).display,
      whiteSpace: getComputedStyle(badge.querySelector('.theme-product-page__badge-line') || badge).whiteSpace
    };
  });
  
  console.log('BADGE INFO MOBILE:', badgeInfo);
  await browser.close();
})();
