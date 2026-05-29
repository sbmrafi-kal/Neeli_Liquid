const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const fs = require('fs');
  const imgPath = path.resolve(__dirname, '../ref/new_figma_imgs/Desktop/img_08.png');
  console.log('Loading image:', imgPath);
  
  const imgBuffer = fs.readFileSync(imgPath);
  const dataUrl = `data:image/png;base64,${imgBuffer.toString('base64')}`;
  
  await page.goto('about:blank');
  
  // Paint image to canvas in browser to read pixels
  const colors = await page.evaluate(async (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Scan for pixels that look gold/yellow
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imgData.data;
        
        const goldCount = {};
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];
          const a = data[i+3];
          
          if (a > 200) {
            // Check if it matches a gold/yellow profile
            if (r > 150 && g > 110 && b < 130 && r > g && g > b) {
              const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
              goldCount[hex] = (goldCount[hex] || 0) + 1;
            }
          }
        }
        
        // Sort colors by frequency
        const sorted = Object.entries(goldCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 15);
        resolve(sorted);
      };
      img.onerror = (e) => reject(new Error('Image failed to load: ' + e.message));
      img.src = src;
    });
  }, dataUrl);
  
  console.log('Detected gold/yellow colors in mockup image (sorted by frequency):');
  console.log(colors);
  
  await browser.close();
})();
