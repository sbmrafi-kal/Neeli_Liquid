const fs = require('fs');
const content = fs.readFileSync('/Users/rafi/Documents/Neeli_Shopify_Liquid/assets/section-theme-product-page.css', 'utf8');

let braceCount = 0;
let lineNum = 1;
let colNum = 1;
let insideComment = false;
let insideString = false;
let stringChar = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  
  if (char === '\n') {
    lineNum++;
    colNum = 1;
  } else {
    colNum++;
  }

  // Handle comments
  if (insideComment) {
    if (char === '*' && content[i + 1] === '/') {
      insideComment = false;
      i++;
    }
    continue;
  }
  if (char === '/' && content[i + 1] === '*') {
    insideComment = true;
    i++;
    continue;
  }

  // Handle strings
  if (insideString) {
    if (char === stringChar && content[i - 1] !== '\\') {
      insideString = false;
    }
    continue;
  }
  if (char === '"' || char === "'") {
    insideString = true;
    stringChar = char;
    continue;
  }

  if (char === '{') {
    braceCount++;
  } else if (char === '}') {
    braceCount--;
    if (braceCount < 0) {
      console.log(`Extra closing brace at line ${lineNum}, col ${colNum}`);
      braceCount = 0; // reset
    }
  }
}

console.log(`Finished checking. Final brace count: ${braceCount}`);
