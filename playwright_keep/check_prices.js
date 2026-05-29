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
  }
  
  const html = await page.evaluate(() => {
    // Find comments matching DIAGNOSTIC
    const comments = [];
    const iterator = document.createNodeIterator(document.body, NodeFilter.SHOW_COMMENT);
    let currentNode;
    while (currentNode = iterator.nextNode()) {
      if (currentNode.nodeValue.includes('DIAGNOSTIC')) {
        comments.push(currentNode.nodeValue.trim());
      }
    }
    
    return {
      variantBoxes: Array.from(document.querySelectorAll('.theme-variant-box')).map(el => ({
        label: el.querySelector('.theme-variant-box__title')?.textContent?.trim(),
        priceRow: el.querySelector('.theme-variant-box__price-row')?.textContent?.trim(),
        discount: el.querySelector('.theme-variant-box__discount-tag')?.textContent?.trim()
      })),
      comments
    };
  });
  console.log('Results:', JSON.stringify(html, null, 2));
  await browser.close();
})();
