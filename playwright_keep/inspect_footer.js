const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to product page...');
  await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
  await page.waitForTimeout(2000);
  
  // Handle password if any
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
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await page.waitForTimeout(3000);
  }
  
  const footerDetails = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) {
      return {
        error: 'Footer not found',
        html: document.body.innerHTML.substring(0, 1000)
      };
    }
    
    const lists = Array.from(footer.querySelectorAll('ul.theme-footer-list'));
    const tagline = footer.querySelector('.theme-footer-tagline-p');
    
    return {
      footerClass: footer.className,
      footerStyle: {
        background: getComputedStyle(footer).background,
        color: getComputedStyle(footer).color,
        padding: getComputedStyle(footer).padding,
        margin: getComputedStyle(footer).margin,
        width: getComputedStyle(footer).width,
        height: getComputedStyle(footer).height
      },
      lists: lists.map((list, idx) => ({
        index: idx,
        title: list.parentElement.querySelector('.theme-footer-column__title')?.textContent || 'No Title',
        titleStyle: {
          fontSize: getComputedStyle(list.parentElement.querySelector('.theme-footer-column__title') || list).fontSize,
          fontWeight: getComputedStyle(list.parentElement.querySelector('.theme-footer-column__title') || list).fontWeight,
          fontFamily: getComputedStyle(list.parentElement.querySelector('.theme-footer-column__title') || list).fontFamily,
          color: getComputedStyle(list.parentElement.querySelector('.theme-footer-column__title') || list).color,
          textTransform: getComputedStyle(list.parentElement.querySelector('.theme-footer-column__title') || list).textTransform
        },
        items: Array.from(list.querySelectorAll('li')).map(li => ({
          text: li.textContent.trim(),
          style: {
            fontSize: getComputedStyle(li).fontSize,
            fontWeight: getComputedStyle(li).fontWeight,
            fontFamily: getComputedStyle(li).fontFamily,
            color: getComputedStyle(li).color,
            lineHeight: getComputedStyle(li).lineHeight,
            textTransform: getComputedStyle(li).textTransform
          }
        }))
      })),
      tagline: tagline ? {
        text: tagline.textContent.trim(),
        fontSize: getComputedStyle(tagline).fontSize,
        color: getComputedStyle(tagline).color,
        textAlign: getComputedStyle(tagline).textAlign
      } : 'No tagline'
    };
  });
  
  console.log('--- FOOTER DETAILS ---');
  console.log(JSON.stringify(footerDetails, null, 2));
  
  await browser.close();
})();
