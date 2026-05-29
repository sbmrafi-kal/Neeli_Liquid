const fs = require('fs');
const path = require('path');

function getPngSize(filePath) {
  const buf = Buffer.alloc(24);
  const fd = fs.openSync(filePath, 'r');
  fs.readSync(fd, buf, 0, 24, 0);
  fs.closeSync(fd);
  
  // Verify PNG signature
  if (buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4E || buf[3] !== 0x47) {
    throw new Error('Not a valid PNG file: ' + filePath);
  }
  
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

const desktopDir = path.resolve(__dirname, '../ref/new_figma_imgs/Desktop');
const files = fs.readdirSync(desktopDir).filter(f => f.endsWith('.png'));

console.log('Desktop reference images size:');
for (const file of files) {
  try {
    const size = getPngSize(path.join(desktopDir, file));
    console.log(`${file}: ${size.width}x${size.height}`);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}

const mobileDir = path.resolve(__dirname, '../ref/new_figma_imgs/Mobile');
const mobFiles = fs.readdirSync(mobileDir).filter(f => f.endsWith('.png'));
console.log('\nMobile reference images size:');
for (const file of mobFiles) {
  try {
    const size = getPngSize(path.join(mobileDir, file));
    console.log(`${file}: ${size.width}x${size.height}`);
  } catch (err) {
    console.error(`Error reading ${file}:`, err.message);
  }
}
