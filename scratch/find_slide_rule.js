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
  
  const rules = await page.evaluate(() => {
    const slide = document.querySelector('.theme-hero-carousel__slide.is-active');
    if (!slide) return 'Active slide not found';
    
    const matchedRules = [];
    const sheets = Array.from(document.styleSheets);
    for (const sheet of sheets) {
      try {
        const rulesList = Array.from(sheet.cssRules || sheet.rules);
        for (const rule of rulesList) {
          if (slide.matches(rule.selectorText)) {
            matchedRules.push({
              href: sheet.href ? sheet.href.split('/').pop() : 'inline/styled',
              selector: rule.selectorText,
              cssText: rule.cssText
            });
          }
        }
      } catch (e) {
        // cross-origin stylesheets ignore
      }
    }
    return matchedRules;
  });
  
  console.log('MATCHED RULES:', JSON.stringify(rules, null, 2));
  await browser.close();
})();
