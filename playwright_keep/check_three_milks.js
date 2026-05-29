const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });
  const page = await context.newPage();
  
  console.log('Navigating to product page on mobile...');
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  
  // Handle password
  const passwordField = await page.$('input[type="password"], input[name="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    await passwordField.press('Enter');
    await page.waitForTimeout(5000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await page.waitForTimeout(3000);
  }
  
  const visibility = await page.evaluate(() => {
    const mobileGrid = document.querySelector('.theme-three-milks__mobile-grid');
    const desktopGrid = document.querySelector('.theme-three-milks__desktop-grid');
    return {
      mobileGrid: mobileGrid ? {
        display: getComputedStyle(mobileGrid).display,
        visibility: getComputedStyle(mobileGrid).visibility,
        offsetHeight: mobileGrid.offsetHeight
      } : 'Not found',
      desktopGrid: desktopGrid ? {
        display: getComputedStyle(desktopGrid).display,
        visibility: getComputedStyle(desktopGrid).visibility,
        offsetHeight: desktopGrid.offsetHeight
      } : 'Not found'
    };
  });
  
  console.log('Visibility of Secret Base on Mobile:');
  console.log(JSON.stringify(visibility, null, 2));
  
  await browser.close();
})();
