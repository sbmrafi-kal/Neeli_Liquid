const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Go to product page first
  console.log('Navigating to product page...');
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  
  // Handle password
  const passwordField = await page.$('input[type="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    await passwordField.press('Enter');
    await page.waitForTimeout(4000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await page.waitForTimeout(2000);
  }
  
  const productSections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      className: s.className,
      kicker: s.querySelector('.theme-kicker, .theme-badge-line')?.textContent?.trim() || null,
      heading: s.querySelector('h1, h2')?.textContent?.trim() || null
    }));
  });
  console.log('--- PRODUCT PAGE SECTIONS ---');
  console.log(JSON.stringify(productSections, null, 2));
  
  // Go to homepage
  console.log('Navigating to homepage...');
  await page.goto('http://127.0.0.1:9292/');
  await page.waitForTimeout(2000);
  
  const homeSections = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section')).map(s => ({
      id: s.id,
      className: s.className,
      kicker: s.querySelector('.theme-kicker, .theme-badge-line')?.textContent?.trim() || null,
      heading: s.querySelector('h1, h2')?.textContent?.trim() || null
    }));
  });
  console.log('--- HOMEPAGE SECTIONS ---');
  console.log(JSON.stringify(homeSections, null, 2));
  
  await browser.close();
})();
