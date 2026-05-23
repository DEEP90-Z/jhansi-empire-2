const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

if (!fs.existsSync('package.json')) {
    fs.writeFileSync('package.json', '{}');
}

try {
    require.resolve('sharp');
} catch (e) {
    console.log("Installing sharp...");
    execSync('npm install sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');
const dir = './public/3 layers';
const files = fs.readdirSync(dir);

(async () => {
    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg')) {
            const input = path.join(dir, file);
            const output = path.join(dir, file.replace(/\.(png|jpg)$/, '.webp'));
            console.log(`Compressing ${input} to ${output}`);
            try {
                await sharp(input)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(output);
                console.log(`Success: ${output}`);
            } catch (err) {
                console.error(`Failed to compress ${input}`, err);
            }
        }
    }
})();
