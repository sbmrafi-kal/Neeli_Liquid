const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop Screenshot
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await desktopContext.newPage();
  
  console.log('Navigating to password page/storefront...');
  await page.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
  await page.waitForTimeout(2000);
  
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
    // Go to product page again to make sure it loads with the preview theme
    await page.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
    await page.waitForTimeout(5000);
  }
  
  console.log('Taking desktop screenshot...');
  
  // DIAGNOSTIC LOGS FOR CAROUSEL AND STATS
  const carouselGeom = await page.evaluate(() => {
    const el = document.querySelector('.theme-hero-carousel');
    const stage = document.querySelector('.theme-hero-carousel__stage');
    const stats = document.querySelector('.theme-hero-carousel__stats');
    return {
      carousel: el ? { outerHTML: el.outerHTML.substring(0, 300), clientHeight: el.clientHeight, display: getComputedStyle(el).display } : null,
      stage: stage ? { clientHeight: stage.clientHeight, display: getComputedStyle(stage).display } : null,
      stats: stats ? { clientHeight: stats.clientHeight, display: getComputedStyle(stats).display, opacity: getComputedStyle(stats).opacity, visibility: getComputedStyle(stats).visibility } : null
    };
  });
  console.log('DOM Diagnostic Info:', JSON.stringify(carouselGeom, null, 2));

  const desktopPath = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/desktop_preview.png';
  await page.screenshot({ path: desktopPath, fullPage: true });
  console.log(`Desktop preview saved to: ${desktopPath}`);
  
  // Mobile Screenshot
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  
  console.log('Navigating to mobile storefront...');
  await mobilePage.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
  await mobilePage.waitForTimeout(3000);

  // Check for password form on mobile
  const mobilePasswordField = await mobilePage.$('input[type="password"], input[name="password"]');
  if (mobilePasswordField) {
    console.log('Mobile password page detected. Entering password...');
    await mobilePasswordField.fill('jay');
    const submitBtn = await mobilePage.$('button[type="submit"], input[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
    } else {
      await mobilePasswordField.press('Enter');
    }
    await mobilePage.waitForTimeout(5000);
    // Go to product page again to make sure it loads with the preview theme
    await mobilePage.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
    await mobilePage.waitForTimeout(5000);
  }
  
  console.log('Taking mobile screenshot...');
  const mobilePath = '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/mobile_preview.png';
  await mobilePage.screenshot({ path: mobilePath, fullPage: true });
  console.log(`Mobile preview saved to: ${mobilePath}`);
  
  await browser.close();
  console.log('Screenshots captured successfully!');
})();
