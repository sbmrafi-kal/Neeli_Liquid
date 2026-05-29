const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Desktop
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  
  console.log('Navigating to product page on desktop...');
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  
  // Enter password if needed
  const passwordField = await page.$('input[type="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    await passwordField.press('Enter');
    await page.waitForTimeout(4000);
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await page.waitForTimeout(2000);
  }
  
  // Find massage ritual section and patch trigger
  const section = await page.$('.theme-massage-ritual');
  if (!section) {
    console.error('Massage ritual section not found!');
    await browser.close();
    return;
  }
  
  console.log('Opening patch test on desktop...');
  const trigger = await page.$('.theme-massage-ritual__patch-trigger');
  if (trigger) {
    await trigger.click();
    await page.waitForTimeout(1000);
  } else {
    console.error('Trigger not found!');
  }
  
  // Get details element height/bounding box
  const popupDetails = await page.evaluate(() => {
    const popup = document.querySelector('.theme-massage-ritual__patch-popup');
    const wrap = document.querySelector('.theme-massage-ritual__patch-test-wrap');
    const sectionEl = document.querySelector('.theme-massage-ritual');
    return {
      popup: popup ? {
        height: popup.offsetHeight,
        top: popup.getBoundingClientRect().top,
        position: getComputedStyle(popup).position,
        display: getComputedStyle(popup).display
      } : null,
      wrap: wrap ? {
        height: wrap.offsetHeight,
        top: wrap.getBoundingClientRect().top
      } : null,
      section: sectionEl ? {
        height: sectionEl.offsetHeight
      } : null
    };
  });
  console.log('Desktop Layout Details:', JSON.stringify(popupDetails, null, 2));
  
  await section.screenshot({ path: '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/patch_test_open_desktop.png' });
  console.log('Saved desktop screenshot to brain directory.');
  
  // Mobile
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
  });
  const mobilePage = await mobileContext.newPage();
  
  console.log('Navigating to product page on mobile...');
  await mobilePage.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await mobilePage.waitForTimeout(2000);
  
  // Enter password if needed
  const mobPasswordField = await mobilePage.$('input[type="password"]');
  if (mobPasswordField) {
    await mobPasswordField.fill('jay');
    await mobPasswordField.press('Enter');
    await mobilePage.waitForTimeout(4000);
    await mobilePage.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await mobilePage.waitForTimeout(2000);
  }
  
  const mobSection = await mobilePage.$('.theme-massage-ritual');
  console.log('Opening patch test on mobile...');
  const mobTrigger = await mobilePage.$('.theme-massage-ritual__patch-trigger');
  if (mobTrigger) {
    await mobTrigger.click();
    await mobilePage.waitForTimeout(1000);
  }
  
  const mobPopupDetails = await mobilePage.evaluate(() => {
    const popup = document.querySelector('.theme-massage-ritual__patch-popup');
    const wrap = document.querySelector('.theme-massage-ritual__patch-test-wrap');
    const sectionEl = document.querySelector('.theme-massage-ritual');
    return {
      popup: popup ? {
        height: popup.offsetHeight,
        top: popup.getBoundingClientRect().top,
        position: getComputedStyle(popup).position,
        display: getComputedStyle(popup).display
      } : null,
      wrap: wrap ? {
        height: wrap.offsetHeight,
        top: wrap.getBoundingClientRect().top
      } : null,
      section: sectionEl ? {
        height: sectionEl.offsetHeight
      } : null
    };
  });
  console.log('Mobile Layout Details:', JSON.stringify(mobPopupDetails, null, 2));
  
  if (mobSection) {
    await mobSection.screenshot({ path: '/Users/rafi/.gemini/antigravity/brain/60218c3f-291c-44ef-bde0-4c7aa3805d40/patch_test_open_mobile.png' });
    console.log('Saved mobile screenshot to brain directory.');
  }
  
  await browser.close();
})();
