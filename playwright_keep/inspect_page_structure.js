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
  
  const sectionsInfo = await page.evaluate(() => {
    const results = {};
    
    // 1. Product Hero pricing
    const hero = document.querySelector('.theme-product-page--figma');
    results.hero = hero ? {
      class: hero.className,
      hasVariantBoxes: document.querySelectorAll('.theme-variant-box').length,
      variantBoxes: Array.from(document.querySelectorAll('.theme-variant-box')).map(el => ({
        text: el.textContent.trim().replace(/\s+/g, ' '),
        class: el.className
      }))
    } : 'Not found';
    
    // 2. Stats bar
    const stats = document.querySelector('.theme-hero-carousel__stats') || document.querySelector('[class*="stats"]') || document.querySelector('[class*="highlight"]');
    results.stats = stats ? {
      tagName: stats.tagName,
      class: stats.className,
      text: stats.textContent.trim().replace(/\s+/g, ' ')
    } : 'Not found';
    
    // 3. What to expect
    // Let's find section containing "What to expect" or "The honest sequence" or "timeline"
    const timeline = document.querySelector('.theme-timeline') || document.querySelector('[class*="timeline"]');
    results.timeline = timeline ? {
      class: timeline.className,
      heading: timeline.querySelector('h1, h2, h3')?.textContent?.trim(),
      items: Array.from(timeline.querySelectorAll('.theme-timeline__item, [class*="item"]')).map(el => el.textContent.trim().replace(/\s+/g, ' '))
    } : 'Not found';
    
    // 4. Ritual Guide & 5. Patch Test
    const ritual = document.querySelector('.theme-massage-ritual') || document.querySelector('[class*="ritual"]');
    results.ritual = ritual ? {
      class: ritual.className,
      heading: ritual.querySelector('h1, h2, h3')?.textContent?.trim(),
      hasTrigger: !!ritual.querySelector('.theme-massage-ritual__patch-trigger'),
      hasPopup: !!ritual.querySelector('.theme-massage-ritual__patch-popup'),
      triggerText: ritual.querySelector('.theme-massage-ritual__patch-trigger')?.textContent?.trim()
    } : 'Not found';
    
    // 6. Information section
    const info = document.querySelector('.theme-information') || document.querySelector('[class*="info"]');
    results.info = info ? {
      class: info.className,
      heading: info.querySelector('h1, h2, h3')?.textContent?.trim()
    } : 'Not found';
    
    // 7. Customer reviews button
    const reviews = document.querySelector('.theme-customer-reviews') || document.querySelector('[class*="review"]');
    const readReviewsBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent.includes('reviews') || el.textContent.includes('Reviews') || el.textContent.includes('86'));
    results.reviews = {
      sectionClass: reviews ? reviews.className : 'Not found',
      btnText: readReviewsBtn ? readReviewsBtn.textContent.trim() : 'Not found',
      btnClass: readReviewsBtn ? readReviewsBtn.className : 'Not found'
    };
    
    // 8. Full Spectrum
    const spectrum = document.querySelector('.theme-brand-trust') || document.querySelector('[class*="brand-trust"]') || document.querySelector('[class*="spectrum"]');
    results.spectrum = spectrum ? {
      class: spectrum.className,
      heading: spectrum.querySelector('h1, h2, h3')?.textContent?.trim(),
      textBlocks: Array.from(spectrum.querySelectorAll('p, span, div')).slice(0, 5).map(el => el.textContent.trim().replace(/\s+/g, ' ')).filter(t => t.length > 0)
    } : 'Not found';
    
    // 9. Footer
    const footer = document.querySelector('footer') || document.querySelector('.theme-footer');
    results.footer = footer ? {
      class: footer.className,
      lists: Array.from(footer.querySelectorAll('ul')).map(ul => ({
        class: ul.className,
        hasBullets: getComputedStyle(ul).listStyleType !== 'none',
        items: Array.from(ul.querySelectorAll('li')).map(li => li.textContent.trim())
      })),
      socialIcons: footer.querySelector('.theme-footer-social') || footer.querySelector('[class*="social"]') ? {
        class: (footer.querySelector('.theme-footer-social') || footer.querySelector('[class*="social"]')).className
      } : 'Not found'
    } : 'Not found';
    
    return results;
  });
  
  console.log('--- COMPREHENSIVE DIAGNOSTIC INFO ---');
  console.log(JSON.stringify(sectionsInfo, null, 2));
  
  await browser.close();
})();
