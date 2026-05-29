const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  // Listen for console messages
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER EXCEPTION:', err.toString()));

  console.log('Navigating to storefront...');
  await page.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
  await page.waitForTimeout(2000);
  
  // Password login
  const passwordField = await page.$('input[type="password"], input[name="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
    if (submitBtn) await submitBtn.click();
    else await passwordField.press('Enter');
    await page.waitForTimeout(5000);
    
    // GO AGAIN to product page!
    await page.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
    await page.waitForTimeout(5000);
  }

  // Get active slide before click
  const activeBefore = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('.theme-hero-carousel__slide'));
    return slides.map((s, i) => ({ index: i, isActive: s.classList.contains('is-active') }));
  });
  console.log('Active slides before click:', activeBefore);

  // Check if next button exists
  const nextBtn = await page.$('[data-theme-carousel-next]');
  if (!nextBtn) {
    console.log('Next button NOT found in DOM!');
  } else {
    console.log('Next button found. Clicking...');
    // Check z-index and clickability
    const isVisible = await nextBtn.isVisible();
    const box = await nextBtn.boundingBox();
    console.log(`Next button visible: ${isVisible}, Bounding box:`, box);
    
    await nextBtn.click();
    console.log('Clicked next button.');
    await page.waitForTimeout(1000);
  }

  // Get active slide after click
  const activeAfter = await page.evaluate(() => {
    const slides = Array.from(document.querySelectorAll('.theme-hero-carousel__slide'));
    return slides.map((s, i) => ({ index: i, isActive: s.classList.contains('is-active') }));
  });
  console.log('Active slides after click:', activeAfter);

  await browser.close();
})();
