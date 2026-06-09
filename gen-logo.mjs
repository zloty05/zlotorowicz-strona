import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'fs';

mkdirSync('public/logo', { recursive: true });

// 1) Pełne logo (kafelek + błyskawica) z favicon.svg
const fullSvg = readFileSync('public/favicon.svg');
for (const s of [256, 512, 1024]) {
  await sharp(fullSvg, { density: 384 })
    .resize(s, s)
    .png()
    .toFile(`public/logo/logo-${s}.png`);
}

// 2) Sama błyskawica na przezroczystym tle (do nakładek)
const boltSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none">
  <defs>
    <linearGradient id="bolt" x1="22" y1="8" x2="42" y2="56" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#E9C45A"/>
      <stop offset="0.5" stop-color="#C4992A"/>
      <stop offset="1" stop-color="#A07A18"/>
    </linearGradient>
  </defs>
  <path d="M36.5 8 L20 35 H29.5 L27 56 L45 26 H34.5 L40.5 8 Z"
    fill="url(#bolt)" stroke="#F1DA94" stroke-width="1.1" stroke-linejoin="round"/>
</svg>`;
for (const s of [256, 512, 1024]) {
  await sharp(Buffer.from(boltSvg), { density: 384 })
    .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(`public/logo/bolt-${s}.png`);
}

console.log('OK');
