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
  
  const stylesInfo = await page.evaluate(() => {
    const slide = document.querySelector('.theme-hero-carousel__slide.is-active');
    if (!slide) return 'Active slide not found';
    
    const img = slide.querySelector('img');
    const computedSlide = getComputedStyle(slide);
    const computedImg = img ? getComputedStyle(img) : {};
    
    return {
      slideStyles: {
        position: computedSlide.position,
        top: computedSlide.top,
        left: computedSlide.left,
        right: computedSlide.right,
        bottom: computedSlide.bottom,
        width: computedSlide.width,
        height: computedSlide.height,
        padding: computedSlide.padding,
        margin: computedSlide.margin,
        boxSizing: computedSlide.boxSizing
      },
      imgStyles: img ? {
        position: computedImg.position,
        top: computedImg.top,
        left: computedImg.left,
        right: computedImg.right,
        bottom: computedImg.bottom,
        width: computedImg.width,
        height: computedImg.height,
        padding: computedImg.padding,
        margin: computedImg.margin,
        objectFit: computedImg.objectFit,
        maxWidth: computedImg.maxWidth,
        maxHeight: computedImg.maxHeight
      } : null
    };
  });
  
  console.log('STYLES INFO:', stylesInfo);
  await browser.close();
})();
