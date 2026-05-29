const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = '/Users/rafi/.gemini/antigravity/brain/bd670327-b661-4d11-9aa3-f31af28087db';

// Helper to ensure artifact directory exists
if (!fs.existsSync(ARTIFACT_DIR)) {
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // Define target states
  const runForViewport = async (viewportName, width, height, isMobile = false) => {
    console.log(`\n=================== RUNNING FOR ${viewportName.toUpperCase()} (${width}x${height}) ===================`);
    
    const context = await browser.newContext({
      viewport: { width, height },
      isMobile,
      userAgent: isMobile 
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
        : undefined
    });
    
    const page = await context.newPage();
    
    // Enable console logs in node console
    page.on('console', msg => {
      if (msg.type() === 'log') console.log(`[Browser Log] ${msg.text()}`);
    });
    
    await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
    await page.waitForTimeout(2000);
    
    // Handle password
    const passwordField = await page.$('input[type="password"], input[name="password"]');
    if (passwordField) {
      console.log('Password screen detected, logging in...');
      await passwordField.fill('jay');
      const submitBtn = await page.$('button[type="submit"], input[type="submit"]');
      if (submitBtn) await submitBtn.click();
      else await passwordField.press('Enter');
      await page.waitForTimeout(4000);
      await page.goto('http://127.0.0.1:9292/products/core-lab-lilac-solid-slim-fit-t-shirt');
      await page.waitForTimeout(3000);
    }
    
    const inspectResults = {};
    
    // Helper to take screenshot of element safely
    const captureElement = async (selector, filename) => {
      const el = await page.$(selector);
      if (el) {
        // Scroll into view first
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const screenshotPath = path.join(ARTIFACT_DIR, `${viewportName}_${filename}`);
        await el.screenshot({ path: screenshotPath });
        console.log(`Saved screenshot: ${screenshotPath}`);
        return true;
      } else {
        console.warn(`Element not found for screenshot: ${selector}`);
        return false;
      }
    };
    
    // 1. Product Hero section pricing details (variant boxes, prices, and discount percentages)
    console.log('1. Inspecting Product Hero pricing details...');
    const pricingSelector = '.theme-product-page--figma';
    await captureElement(pricingSelector, '1_product_hero.png');
    inspectResults.heroPricing = await page.evaluate(() => {
      const parent = document.querySelector('.theme-product-page--figma');
      if (!parent) return 'Product Hero not found';
      
      const boxes = Array.from(document.querySelectorAll('.theme-variant-box'));
      return {
        hasParent: true,
        parentLayout: getComputedStyle(parent).display,
        variantBoxesCount: boxes.length,
        variantBoxes: boxes.map((box, i) => {
          const title = box.querySelector('.theme-variant-box__title');
          const priceRow = box.querySelector('.theme-variant-box__price-row');
          const discount = box.querySelector('.theme-variant-box__discount-tag');
          
          return {
            index: i,
            isSelected: box.classList.contains('is-selected'),
            text: box.textContent.trim().replace(/\s+/g, ' '),
            boxStyles: {
              display: getComputedStyle(box).display,
              flexDirection: getComputedStyle(box).flexDirection,
              width: getComputedStyle(box).width,
              height: getComputedStyle(box).height,
              margin: getComputedStyle(box).margin,
              padding: getComputedStyle(box).padding,
              border: getComputedStyle(box).border,
              borderRadius: getComputedStyle(box).borderRadius,
              backgroundColor: getComputedStyle(box).backgroundColor,
              borderColor: getComputedStyle(box).borderColor,
              gap: getComputedStyle(box).gap
            },
            titleStyles: title ? {
              fontSize: getComputedStyle(title).fontSize,
              fontWeight: getComputedStyle(title).fontWeight,
              color: getComputedStyle(title).color
            } : null,
            priceRowStyles: priceRow ? {
              fontSize: getComputedStyle(priceRow).fontSize,
              fontWeight: getComputedStyle(priceRow).fontWeight,
              color: getComputedStyle(priceRow).color,
              margin: getComputedStyle(priceRow).margin
            } : null,
            discountStyles: discount ? {
              fontSize: getComputedStyle(discount).fontSize,
              fontWeight: getComputedStyle(discount).fontWeight,
              color: getComputedStyle(discount).color,
              backgroundColor: getComputedStyle(discount).backgroundColor,
              padding: getComputedStyle(discount).padding,
              borderRadius: getComputedStyle(discount).borderRadius
            } : null
          };
        })
      };
    });
    
    // 2. The stats/highlights bar below the product hero carousel
    console.log('2. Inspecting stats/highlights bar...');
    const statsSelector = '.theme-hero-carousel__stats';
    await captureElement(statsSelector, '2_stats_bar.png');
    inspectResults.statsBar = await page.evaluate(() => {
      const stats = document.querySelector('.theme-hero-carousel__stats');
      if (!stats) return 'Stats bar not found';
      
      const items = Array.from(stats.children);
      return {
        text: stats.textContent.trim().replace(/\s+/g, ' '),
        styles: {
          display: getComputedStyle(stats).display,
          flexDirection: getComputedStyle(stats).flexDirection,
          justifyContent: getComputedStyle(stats).justifyContent,
          alignItems: getComputedStyle(stats).alignItems,
          background: getComputedStyle(stats).background,
          backgroundColor: getComputedStyle(stats).backgroundColor,
          color: getComputedStyle(stats).color,
          padding: getComputedStyle(stats).padding,
          margin: getComputedStyle(stats).margin,
          border: getComputedStyle(stats).border,
          borderRadius: getComputedStyle(stats).borderRadius,
          gap: getComputedStyle(stats).gap
        },
        items: items.map((item, idx) => ({
          index: idx,
          tagName: item.tagName,
          class: item.className,
          text: item.textContent.trim().replace(/\s+/g, ' '),
          styles: {
            fontSize: getComputedStyle(item).fontSize,
            fontWeight: getComputedStyle(item).fontWeight,
            color: getComputedStyle(item).color,
            display: getComputedStyle(item).display,
            alignItems: getComputedStyle(item).alignItems,
            gap: getComputedStyle(item).gap
          }
        }))
      };
    });
    
    // 3. The 'What to expect' section layout, labels, and text styling
    console.log('3. Inspecting What to expect section...');
    const timelineSelector = '.theme-timeline';
    await captureElement(timelineSelector, '3_what_to_expect.png');
    inspectResults.whatToExpect = await page.evaluate(() => {
      const timeline = document.querySelector('.theme-timeline');
      if (!timeline) return 'Timeline not found';
      
      const heading = timeline.querySelector('h1, h2, h3');
      const items = Array.from(timeline.querySelectorAll('*')).filter(el => {
        const className = typeof el.className === 'string' ? el.className : (el.className?.baseVal || '');
        return className.includes('item') || className.includes('step') || className.includes('block') || className.includes('timeline__');
      });
      
      return {
        headingText: heading ? heading.textContent.trim() : 'No heading',
        headingStyles: heading ? {
          fontSize: getComputedStyle(heading).fontSize,
          fontWeight: getComputedStyle(heading).fontWeight,
          fontFamily: getComputedStyle(heading).fontFamily,
          color: getComputedStyle(heading).color,
          textAlign: getComputedStyle(heading).textAlign,
          margin: getComputedStyle(heading).margin,
          padding: getComputedStyle(heading).padding
        } : null,
        timelineStyles: {
          display: getComputedStyle(timeline).display,
          padding: getComputedStyle(timeline).padding,
          margin: getComputedStyle(timeline).margin
        },
        detectedElements: items.map(el => ({
          tagName: el.tagName,
          class: el.className,
          text: el.textContent.trim().substring(0, 100)
        })).slice(0, 10) // Limit to top 10 elements to prevent overflow
      };
    });
    
    // 4. The 'Ritual Guide' section and 5. Always patch test first behavior
    console.log('4 & 5. Inspecting Ritual Guide and patch test popup behavior...');
    const ritualSelector = '.theme-massage-ritual';
    
    // Take screenshot closed
    await captureElement(ritualSelector, '4_ritual_guide_closed.png');
    
    // Get heights closed
    const layoutBeforeClick = await page.evaluate(() => {
      const section = document.querySelector('.theme-massage-ritual');
      const wrap = document.querySelector('.theme-massage-ritual__patch-test-wrap');
      const trigger = document.querySelector('.theme-massage-ritual__patch-trigger');
      const popup = document.querySelector('.theme-massage-ritual__patch-popup');
      
      return {
        sectionHeight: section ? section.offsetHeight : 0,
        wrapHeight: wrap ? wrap.offsetHeight : 0,
        popupStyles: popup ? {
          display: getComputedStyle(popup).display,
          position: getComputedStyle(popup).position,
          top: getComputedStyle(popup).top,
          left: getComputedStyle(popup).left,
          height: popup.offsetHeight,
          maxHeight: getComputedStyle(popup).maxHeight,
          zIndex: getComputedStyle(popup).zIndex,
          overflow: getComputedStyle(popup).overflow,
          visibility: getComputedStyle(popup).visibility,
          opacity: getComputedStyle(popup).opacity
        } : null,
        triggerStyles: trigger ? {
          display: getComputedStyle(trigger).display,
          fontSize: getComputedStyle(trigger).fontSize,
          fontWeight: getComputedStyle(trigger).fontWeight,
          color: getComputedStyle(trigger).color,
          backgroundColor: getComputedStyle(trigger).backgroundColor,
          border: getComputedStyle(trigger).border,
          padding: getComputedStyle(trigger).padding,
          borderRadius: getComputedStyle(trigger).borderRadius
        } : null
      };
    });
    
    // Click the patch test trigger
    const patchTrigger = await page.$('.theme-massage-ritual__patch-trigger');
    let clicked = false;
    if (patchTrigger) {
      console.log('Clicking the patch test button...');
      await patchTrigger.click();
      await page.waitForTimeout(1000); // wait for transitions
      clicked = true;
      
      // Take screenshot opened
      await captureElement(ritualSelector, '5_ritual_guide_open.png');
    }
    
    // Get heights opened
    const layoutAfterClick = clicked ? await page.evaluate(() => {
      const section = document.querySelector('.theme-massage-ritual');
      const wrap = document.querySelector('.theme-massage-ritual__patch-test-wrap');
      const popup = document.querySelector('.theme-massage-ritual__patch-popup');
      
      return {
        sectionHeight: section ? section.offsetHeight : 0,
        wrapHeight: wrap ? wrap.offsetHeight : 0,
        popupStyles: popup ? {
          display: getComputedStyle(popup).display,
          position: getComputedStyle(popup).position,
          top: getComputedStyle(popup).top,
          left: getComputedStyle(popup).left,
          height: popup.offsetHeight,
          maxHeight: getComputedStyle(popup).maxHeight,
          zIndex: getComputedStyle(popup).zIndex,
          overflow: getComputedStyle(popup).overflow,
          visibility: getComputedStyle(popup).visibility,
          opacity: getComputedStyle(popup).opacity
        } : null
      };
    }) : null;
    
    inspectResults.patchTestBehavior = {
      layoutBeforeClick,
      layoutAfterClick,
      overlapCheck: (layoutBeforeClick && layoutAfterClick) ? {
        sectionHeightExpanded: layoutAfterClick.sectionHeight > layoutBeforeClick.sectionHeight,
        sectionHeightDiff: layoutAfterClick.sectionHeight - layoutBeforeClick.sectionHeight,
        popupHeight: layoutAfterClick.popupStyles ? layoutAfterClick.popupStyles.height : 0,
        popupPosition: layoutAfterClick.popupStyles ? layoutAfterClick.popupStyles.position : 'unknown',
        explanation: (layoutAfterClick.popupStyles && layoutAfterClick.popupStyles.position === 'absolute') 
          ? 'Popup is absolutely positioned, so it overlays elements and does not expand section height.'
          : 'Popup expands the section height dynamically.'
      } : 'Trigger not clicked'
    };
    
    // 6. The 'Information' section title top spacing
    console.log('6. Inspecting Information section title top spacing...');
    const infoSelector = '.theme-information';
    await captureElement(infoSelector, '6_information_section.png');
    inspectResults.informationSection = await page.evaluate(() => {
      const section = document.querySelector('.theme-information');
      if (!section) return 'Information section not found';
      
      const innerSection = section.querySelector('.theme-product-page__section') || section;
      const heading = section.querySelector('h1, h2, h3');
      
      return {
        sectionClass: section.className,
        innerSectionClass: innerSection.className,
        innerSectionStyles: {
          padding: getComputedStyle(innerSection).padding,
          paddingTop: getComputedStyle(innerSection).paddingTop,
          margin: getComputedStyle(innerSection).margin,
          marginTop: getComputedStyle(innerSection).marginTop
        },
        headingText: heading ? heading.textContent.trim() : 'No heading',
        headingStyles: heading ? {
          fontSize: getComputedStyle(heading).fontSize,
          fontWeight: getComputedStyle(heading).fontWeight,
          fontFamily: getComputedStyle(heading).fontFamily,
          color: getComputedStyle(heading).color,
          margin: getComputedStyle(heading).margin,
          marginTop: getComputedStyle(heading).marginTop,
          padding: getComputedStyle(heading).padding,
          paddingTop: getComputedStyle(heading).paddingTop
        } : null
      };
    });
    
    // 7. The 'Read all 86 reviews' button styles
    console.log('7. Inspecting Read all 86 reviews button styles...');
    const reviewBtnSelector = '.theme-review-button-v2';
    await captureElement(reviewBtnSelector, '7_reviews_button.png');
    inspectResults.reviewsButton = await page.evaluate(() => {
      const btn = document.querySelector('.theme-review-button-v2');
      if (!btn) return 'Reviews button not found';
      
      return {
        text: btn.textContent.trim(),
        class: btn.className,
        styles: {
          display: getComputedStyle(btn).display,
          fontSize: getComputedStyle(btn).fontSize,
          fontWeight: getComputedStyle(btn).fontWeight,
          fontFamily: getComputedStyle(btn).fontFamily,
          color: getComputedStyle(btn).color,
          backgroundColor: getComputedStyle(btn).backgroundColor,
          border: getComputedStyle(btn).border,
          borderWidth: getComputedStyle(btn).borderWidth,
          borderStyle: getComputedStyle(btn).borderStyle,
          borderColor: getComputedStyle(btn).borderColor,
          borderRadius: getComputedStyle(btn).borderRadius,
          padding: getComputedStyle(btn).padding,
          margin: getComputedStyle(btn).margin,
          width: getComputedStyle(btn).width,
          textAlign: getComputedStyle(btn).textAlign,
          cursor: getComputedStyle(btn).cursor,
          boxShadow: getComputedStyle(btn).boxShadow,
          textTransform: getComputedStyle(btn).textTransform
        }
      };
    });
    
    // 8. The 'Full Spectrum' text block and credentials styling
    console.log('8. Inspecting Full Spectrum section...');
    const spectrumSelector = '.theme-brand-trust';
    await captureElement(spectrumSelector, '8_full_spectrum.png');
    inspectResults.fullSpectrum = await page.evaluate(() => {
      const section = document.querySelector('.theme-brand-trust');
      if (!section) return 'Brand trust section not found';
      
      const heading = section.querySelector('h1, h2, h3');
      const textBlock = section.querySelector('.theme-brand-trust-tagline, p');
      const credentialsContainer = section.querySelector('.theme-brand-trust__credentials') || section.querySelector('.theme-brand-trust-grid') || section;
      
      return {
        sectionClass: section.className,
        headingText: heading ? heading.textContent.trim() : 'No heading',
        headingStyles: heading ? {
          fontSize: getComputedStyle(heading).fontSize,
          fontWeight: getComputedStyle(heading).fontWeight,
          fontFamily: getComputedStyle(heading).fontFamily,
          color: getComputedStyle(heading).color,
          textAlign: getComputedStyle(heading).textAlign,
          margin: getComputedStyle(heading).margin
        } : null,
        textBlockText: textBlock ? textBlock.textContent.trim() : 'No text block',
        textBlockStyles: textBlock ? {
          fontSize: getComputedStyle(textBlock).fontSize,
          fontWeight: getComputedStyle(textBlock).fontWeight,
          fontFamily: getComputedStyle(textBlock).fontFamily,
          color: getComputedStyle(textBlock).color,
          textAlign: getComputedStyle(textBlock).textAlign,
          lineHeight: getComputedStyle(textBlock).lineHeight,
          margin: getComputedStyle(textBlock).margin
        } : null,
        credentialsContainerClass: credentialsContainer.className,
        credentialsLayout: {
          display: getComputedStyle(credentialsContainer).display,
          gridTemplateColumns: getComputedStyle(credentialsContainer).gridTemplateColumns,
          flexDirection: getComputedStyle(credentialsContainer).flexDirection,
          gap: getComputedStyle(credentialsContainer).gap,
          justifyContent: getComputedStyle(credentialsContainer).justifyContent,
          alignItems: getComputedStyle(credentialsContainer).alignItems,
          padding: getComputedStyle(credentialsContainer).padding
        }
      };
    });
    
    // 9. The Footer column list styles and mobile social icon centering
    console.log('9. Inspecting Footer styles...');
    const footerSelector = '.theme-footer';
    await captureElement(footerSelector, '9_footer.png');
    inspectResults.footer = await page.evaluate(() => {
      const footer = document.querySelector('.theme-footer') || document.querySelector('footer');
      if (!footer) return 'Footer not found';
      
      const lists = Array.from(footer.querySelectorAll('ul.theme-footer-list'));
      const socialWrapper = footer.querySelector('.theme-footer-social-wrapper') || footer.querySelector('[class*="social"]');
      
      return {
        footerClass: footer.className,
        footerBackground: getComputedStyle(footer).backgroundColor || getComputedStyle(footer).background,
        lists: lists.map((list, i) => {
          const listStyle = getComputedStyle(list);
          const firstLi = list.querySelector('li');
          const firstLiStyle = firstLi ? getComputedStyle(firstLi) : null;
          
          return {
            index: i,
            className: list.className,
            listStyleType: listStyle.listStyleType,
            listStylePosition: listStyle.listStylePosition,
            padding: listStyle.padding,
            margin: listStyle.margin,
            liStyles: firstLiStyle ? {
              listStyleType: firstLiStyle.listStyleType,
              padding: firstLiStyle.padding,
              margin: firstLiStyle.margin,
              display: firstLiStyle.display
            } : null
          };
        }),
        socialIcons: socialWrapper ? {
          class: socialWrapper.className,
          display: getComputedStyle(socialWrapper).display,
          justifyContent: getComputedStyle(socialWrapper).justifyContent,
          alignItems: getComputedStyle(socialWrapper).alignItems,
          textAlign: getComputedStyle(socialWrapper).textAlign,
          margin: getComputedStyle(socialWrapper).margin,
          padding: getComputedStyle(socialWrapper).padding,
          width: getComputedStyle(socialWrapper).width
        } : 'Social icons wrapper not found'
      };
    });
    
    await context.close();
    return inspectResults;
  };
  
  // Run on Desktop
  const desktopData = await runForViewport('desktop', 1440, 900, false);
  
  // Run on Mobile
  const mobileData = await runForViewport('mobile', 375, 812, true);
  
  // Save results to report file
  const reportPath = path.join(ARTIFACT_DIR, 'visual_report.json');
  fs.writeFileSync(reportPath, JSON.stringify({ desktop: desktopData, mobile: mobileData }, null, 2));
  console.log(`\nVisual analysis report successfully saved to: ${reportPath}`);
  
  await browser.close();
})();
