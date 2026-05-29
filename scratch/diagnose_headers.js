const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Go to product page first
  console.log('Navigating to product page...');
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  
  // Handle password if any
  const passwordField = await page.$('input[type="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    await passwordField.press('Enter');
    await page.waitForTimeout(4000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await page.waitForTimeout(2000);
  }
  
  const productHeaderHtml = await page.evaluate(() => {
    const brand = document.querySelector('.theme-header-figma__center, .theme-header__center');
    return brand ? brand.outerHTML : 'Not found';
  });
  console.log('PRODUCT PAGE HEADER LOGO HTML:');
  console.log(productHeaderHtml);
  
  // Go to homepage
  console.log('Navigating to homepage...');
  await page.goto('http://127.0.0.1:9292/');
  await page.waitForTimeout(2000);
  
  const homeHeaderHtml = await page.evaluate(() => {
    const brand = document.querySelector('.theme-header-figma__center, .theme-header__center');
    return brand ? brand.outerHTML : 'Not found';
  });
  console.log('HOMEPAGE HEADER LOGO HTML:');
  console.log(homeHeaderHtml);
  
  await browser.close();
})();
