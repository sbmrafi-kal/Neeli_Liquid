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
  
  const logoInfo = await page.evaluate(() => {
    const img = document.querySelector('.theme-header-figma__brand-image');
    if (!img) return 'Image not found';
    return {
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      clientWidth: img.clientWidth,
      clientHeight: img.clientHeight,
      computedStyle: {
        filter: getComputedStyle(img).filter,
        opacity: getComputedStyle(img).opacity,
        display: getComputedStyle(img).display
      }
    };
  });
  
  console.log('LOGO INFO:', logoInfo);
  await browser.close();
})();
