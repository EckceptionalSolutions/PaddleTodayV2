import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'public/brand/paddle-today-logo-transparent-512-clean.png');
const outputDir = path.join(root, 'apps/mobile/assets/images');
const background = '#f4f1e8';

const outputs = [
  { name: 'icon.png', size: 1024, logoScale: 0.78, background },
  { name: 'adaptive-icon.png', size: 1024, logoScale: 0.62, background },
  { name: 'splash-icon.png', size: 1024, logoScale: 0.58, background },
];

if (!fs.existsSync(source)) {
  throw new Error(`Missing source brand asset: ${source}`);
}

await fs.promises.mkdir(outputDir, { recursive: true });

for (const output of outputs) {
  const logoSize = Math.round(output.size * output.logoScale);
  const logo = await sharp(source)
    .resize({ width: logoSize, height: logoSize, fit: 'inside' })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: output.size,
      height: output.size,
      channels: 4,
      background: output.background,
    },
  })
    .composite([{ input: logo, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, output.name));
}

await sharp(source)
  .resize(48, 48, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toFile(path.join(outputDir, 'favicon.png'));

for (const name of [...outputs.map((output) => output.name), 'favicon.png']) {
  const file = path.join(outputDir, name);
  const buffer = fs.readFileSync(file);
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  const sizeKb = Math.round(buffer.length / 1024);
  console.log(`${path.relative(root, file)} ${width}x${height} ${sizeKb}KB`);
}
