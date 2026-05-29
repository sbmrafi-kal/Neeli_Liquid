const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  await page.goto('http://127.0.0.1:9292/');
  await page.waitForTimeout(2000);
  
  const passwordField = await page.$('input[type="password"], input[name="password"]');
  if (passwordField) {
    console.log('Password screen detected, logging in...');
    await passwordField.fill('jay');
    const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
    if (submitBtn) await submitBtn.click();
    else await passwordField.press('Enter');
    await page.waitForTimeout(4000);
  }
  
  await page.goto('http://127.0.0.1:9292/');
  await page.waitForTimeout(2000);
  
  // Take screenshot of the entire header on home page
  const header = await page.$('.theme-header-figma, .theme-header, header');
  if (header) {
    await header.screenshot({ path: path.join(ARTIFACT_DIR, 'home_header.png') });
    console.log('Home header screenshot saved');
    
    const logoHtml = await page.evaluate(() => {
      const brand = document.querySelector('.theme-header-figma__brand, .theme-header__brand');
      return brand ? brand.outerHTML : 'Brand not found';
    });
    console.log('Home logo HTML:', logoHtml);
  } else {
    console.log('Header not found');
  }
  
  // Also check product page header
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  const prodHeader = await page.$('.theme-header-figma, .theme-header, header');
  if (prodHeader) {
    await prodHeader.screenshot({ path: path.join(ARTIFACT_DIR, 'product_header.png') });
    console.log('Product header screenshot saved');
    
    const logoHtml = await page.evaluate(() => {
      const brand = document.querySelector('.theme-header-figma__brand, .theme-header__brand');
      return brand ? brand.outerHTML : 'Brand not found';
    });
    console.log('Product logo HTML:', logoHtml);
  }
  
  await browser.close();
})();
