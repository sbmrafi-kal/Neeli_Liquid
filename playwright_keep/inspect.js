const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();
  
  console.log('Navigating to storefront...');
  await page.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
  await page.waitForTimeout(2000);
  
  // Enter password if needed
  const passwordField = await page.$('input[type="password"], input[name="password"]');
  if (passwordField) {
    await passwordField.fill('jay');
    const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
    if (submitBtn) await submitBtn.click();
    else await passwordField.press('Enter');
    await page.waitForTimeout(5000);
    await page.goto('https://arise-jin.myshopify.com/products/core-lab-lilac-solid-slim-fit-t-shirt?preview_theme_id=149066154028');
    await page.waitForTimeout(3000);
  }
  
  console.log('--- DIAGNOSTICS START ---');
  
  // 1. Pricing tags
  const variantBoxes = await page.evaluate(() => {
    const el = document.querySelector('.theme-variant-boxes');
    if (!el) return 'Not found';
    return {
      display: getComputedStyle(el).display,
      gap: getComputedStyle(el).gap,
      flexDirection: getComputedStyle(el).flexDirection,
      boxCount: el.querySelectorAll('.theme-variant-box').length,
      boxStyles: Array.from(el.querySelectorAll('.theme-variant-box')).map(b => ({
        label: b.querySelector('.theme-variant-box__title')?.innerText || '',
        display: getComputedStyle(b).display,
        border: getComputedStyle(b).border,
        minHeight: getComputedStyle(b).minHeight,
        padding: getComputedStyle(b).padding
      }))
    };
  });
  console.log('1. Pricing tags:', JSON.stringify(variantBoxes, null, 2));

  // 2. Badge size
  const badgeInfo = await page.evaluate(() => {
    const badge = document.querySelector('.theme-product-page__badge--figma');
    if (!badge) return 'Not found';
    return {
      display: getComputedStyle(badge).display,
      padding: getComputedStyle(badge).padding,
      fontSize: getComputedStyle(badge.querySelector('.theme-product-page__badge-line') || badge).fontSize,
      letterSpacing: getComputedStyle(badge.querySelector('.theme-product-page__badge-line') || badge).letterSpacing,
      text: badge.innerText
    };
  });
  console.log('2. Claim Badge:', JSON.stringify(badgeInfo, null, 2));

  // 3. What to expect layout
  const timelineInfo = await page.evaluate(() => {
    const mobGrid = document.querySelector('.theme-timeline-grid--mobile');
    const deskGrid = document.querySelector('.theme-timeline-grid--desktop');
    return {
      mobileGrid: mobGrid ? { display: getComputedStyle(mobGrid).display, visibility: getComputedStyle(mobGrid).visibility } : 'Not found',
      desktopGrid: deskGrid ? { display: getComputedStyle(deskGrid).display, visibility: getComputedStyle(deskGrid).visibility } : 'Not found'
    };
  });
  console.log('3. What to expect:', JSON.stringify(timelineInfo, null, 2));

  // 4. What's in it section
  const ingredientStoryInfo = await page.evaluate(() => {
    const container = document.querySelector('.theme-ingredients-in-out') || document.querySelector('.theme-ingredient-story') || document.querySelector('.theme-story-section') || document.querySelector('.theme-panels-grid') || document.querySelector('.theme-panel--soft')?.parentElement;
    if (!container) return 'Not found';
    return {
      className: container.className,
      display: getComputedStyle(container).display,
      gridTemplateColumns: getComputedStyle(container).gridTemplateColumns,
      panels: Array.from(container.querySelectorAll('.theme-panel, [class*="panel"]')).map(p => ({
        class: p.className,
        display: getComputedStyle(p).display,
        background: getComputedStyle(p).background,
        width: getComputedStyle(p).width
      }))
    };
  });
  console.log('4. What\'s in it:', JSON.stringify(ingredientStoryInfo, null, 2));

  // 5. Always Patch Test Card alignment
  const patchTestInfo = await page.evaluate(() => {
    const card = document.querySelector('.theme-patch-test') || document.querySelector('.theme-patch-test-card') || document.querySelector('.patch-test') || document.querySelector('[class*="patch-test"]');
    if (!card) return 'Not found';
    const inner = card.querySelector('.theme-patch-test__inner') || card.querySelector('div') || card;
    return {
      className: card.className,
      display: getComputedStyle(card).display,
      textAlign: getComputedStyle(card).textAlign,
      margin: getComputedStyle(card).margin,
      justifyContent: getComputedStyle(card).justifyContent,
      innerMargin: getComputedStyle(inner).margin,
      innerTextAlign: getComputedStyle(inner).textAlign
    };
  });
  console.log('5. Patch Test:', JSON.stringify(patchTestInfo, null, 2));

  // 6. Go deeper layout & Spacing
  const infoInfo = await page.evaluate(() => {
    const section = document.querySelector('.theme-information') || document.querySelector('.theme-info-section') || document.querySelector('[class*="information"]');
    if (!section) return 'Not found';
    const heading = section.querySelector('h2') || section.querySelector('[class*="heading"]');
    const cols = section.querySelector('.theme-information-grid') || section.querySelector('.theme-info-grid') || section.querySelector('div');
    return {
      display: getComputedStyle(section).display,
      headingMarginTop: heading ? getComputedStyle(heading).marginTop : null,
      headingPaddingTop: heading ? getComputedStyle(heading).paddingTop : null,
      gridDisplay: cols ? getComputedStyle(cols).display : null,
      gridTemplateColumns: cols ? getComputedStyle(cols).gridTemplateColumns : null
    };
  });
  console.log('6. Go deeper:', JSON.stringify(infoInfo, null, 2));

  // 7. Reviews Section Star Color
  const reviewsInfo = await page.evaluate(() => {
    const star = document.querySelector('.theme-review-card__stars') || document.querySelector('.theme-review-stars') || document.querySelector('.stars') || document.querySelector('[class*="star"]');
    if (!star) return 'Not found';
    return {
      className: star.className,
      color: getComputedStyle(star).color,
      fill: star.querySelector('svg') ? getComputedStyle(star.querySelector('svg')).fill : null,
      text: star.innerText
    };
  });
  console.log('7. Reviews:', JSON.stringify(reviewsInfo, null, 2));

  // 8. Footer desktop layout
  const footerInfo = await page.evaluate(() => {
    const footer = document.querySelector('footer') || document.querySelector('.theme-footer') || document.querySelector('[class*="footer"]');
    if (!footer) return 'Not found';
    const colsWrap = footer.querySelector('.theme-footer-grid') || footer.querySelector('.footer__blocks-wrapper') || footer.querySelector('div');
    return {
      display: getComputedStyle(footer).display,
      gridDisplay: colsWrap ? getComputedStyle(colsWrap).display : null,
      gridTemplateColumns: colsWrap ? getComputedStyle(colsWrap).gridTemplateColumns : null,
      flexDirection: colsWrap ? getComputedStyle(colsWrap).flexDirection : null,
      columnsCount: colsWrap ? colsWrap.children.length : 0
    };
  });
  console.log('8. Footer:', JSON.stringify(footerInfo, null, 2));

  console.log('--- DIAGNOSTICS END ---');
  
  await browser.close();
})();
