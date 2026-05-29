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
  
  const carouselInfo = await page.evaluate(() => {
    const root = document.querySelector('.theme-hero-carousel');
    if (!root) return 'Carousel root not found';
    
    const stage = root.querySelector('.theme-hero-carousel__stage');
    const activeSlide = root.querySelector('.theme-hero-carousel__slide.is-active');
    const activeImage = activeSlide ? activeSlide.querySelector('img') : null;
    
    return {
      root: {
        className: root.className,
        width: root.clientWidth,
        height: root.clientHeight,
        display: getComputedStyle(root).display
      },
      stage: stage ? {
        width: stage.clientWidth,
        height: stage.clientHeight,
        aspectRatio: getComputedStyle(stage).aspectRatio,
        background: getComputedStyle(stage).background
      } : null,
      activeSlide: activeSlide ? {
        width: activeSlide.clientWidth,
        height: activeSlide.clientHeight,
        display: getComputedStyle(activeSlide).display,
        position: getComputedStyle(activeSlide).position
      } : null,
      activeImage: activeImage ? {
        src: activeImage.src,
        width: activeImage.clientWidth,
        height: activeImage.clientHeight,
        objectFit: getComputedStyle(activeImage).objectFit,
        position: getComputedStyle(activeImage).position
      } : null
    };
  });
  
  console.log('CAROUSEL INFO:', carouselInfo);
  await browser.close();
})();
