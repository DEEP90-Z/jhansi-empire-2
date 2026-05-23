const sharp = require('sharp');
const path = require('path');

async function processImage() {
  const pngInput = path.join(__dirname, 'public', 'hero layers', '3 Layers (13).png');
  const webpOutput = path.join(__dirname, 'public', 'hero layers', '3 Layers (13).webp');
  
  try {
    const metadata = await sharp(pngInput).metadata();
    console.log("Original Image Metadata:", metadata);
    
    // Convert to webp with 90% quality and NO resizing to keep it extremely sharp
    await sharp(pngInput)
      .webp({ quality: 90, effort: 6 })
      .toFile(webpOutput);
      
    const newMetadata = await sharp(webpOutput).metadata();
    console.log("New WebP Image Metadata:", newMetadata);
    console.log("Success converting image at original resolution with high quality!");
  } catch (err) {
    console.error("Error processing image:", err);
  }
}

processImage();
