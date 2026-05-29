const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop Context
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  page.setDefaultTimeout(60000);
  
  // Navigate to product page
  console.log('Navigating to product page (local)...');
  try {
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt', { timeout: 60000, waitUntil: 'load' });
  } catch (err) {
    console.error('Initial navigation to desktop product page timed out/failed. Retrying...', err.message);
    await page.waitForTimeout(5000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt', { timeout: 60000, waitUntil: 'load' });
  }
  await page.waitForTimeout(5000);
  
  // Check for password form
  const passwordField = await page.$('input[type="password"], input[name="password"]');
  if (passwordField) {
    console.log('Password page detected. Entering password...');
    await passwordField.fill('jay');
    const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
    } else {
      await passwordField.press('Enter');
    }
    await page.waitForTimeout(5000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt', { timeout: 60000 });
    await page.waitForTimeout(5000);
  }
  
  console.log('Taking desktop product page screenshot...');
  const desktopProductPath = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/desktop_product.png';
  await page.screenshot({ path: desktopProductPath, fullPage: true });
  
  // Navigate to homepage
  console.log('Navigating to homepage (local)...');
  try {
    await page.goto('http://127.0.0.1:9292/', { timeout: 60000 });
  } catch (err) {
    console.error('Failed to load homepage, retrying...', err.message);
    await page.goto('http://127.0.0.1:9292/', { timeout: 60000 });
  }
  await page.waitForTimeout(5000);
  
  console.log('Taking desktop homepage screenshot...');
  const desktopHomePath = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/desktop_home.png';
  await page.screenshot({ path: desktopHomePath, fullPage: true });
  
  // Mobile Context
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.setDefaultTimeout(60000);
  
  // Navigate to product page
  console.log('Navigating to mobile product page (local)...');
  try {
    await mobilePage.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt', { timeout: 60000, waitUntil: 'load' });
  } catch (err) {
    console.error('Initial navigation to mobile product page timed out/failed. Retrying...', err.message);
    await mobilePage.waitForTimeout(5000);
    await mobilePage.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt', { timeout: 60000, waitUntil: 'load' });
  }
  await mobilePage.waitForTimeout(5000);
  
  // Check password
  const mobPasswordField = await mobilePage.$('input[type="password"], input[name="password"]');
  if (mobPasswordField) {
    console.log('Mobile password page detected. Entering password...');
    await mobPasswordField.fill('jay');
    const submitBtn = await mobilePage.$('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
    } else {
      await mobPasswordField.press('Enter');
    }
    await mobilePage.waitForTimeout(5000);
    await mobilePage.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt', { timeout: 60000 });
    await mobilePage.waitForTimeout(5000);
  }
  
  console.log('Taking mobile product page screenshot...');
  const mobileProductPath = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/mobile_product.png';
  await mobilePage.screenshot({ path: mobileProductPath, fullPage: true });
  
  // Navigate to homepage
  console.log('Navigating to mobile homepage (local)...');
  try {
    await mobilePage.goto('http://127.0.0.1:9292/', { timeout: 60000 });
  } catch (err) {
    console.error('Failed to load mobile homepage, retrying...', err.message);
    await mobilePage.goto('http://127.0.0.1:9292/', { timeout: 60000 });
  }
  await mobilePage.waitForTimeout(5000);
  
  console.log('Taking mobile homepage screenshot...');
  const mobileHomePath = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/mobile_home.png';
  await mobilePage.screenshot({ path: mobileHomePath, fullPage: true });
  
  await browser.close();
  console.log('All screenshots captured successfully!');
})();
