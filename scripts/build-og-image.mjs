// Renderuje public/og-image.png (1200×630) z osadzonym fontem DM Sans (latin-ext,
// polskie znaki). Uruchom: NODE_OPTIONS="--use-system-ca" node scripts/build-og-image.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fontsDir = join(root, 'public', 'fonts')

// DM Sans, subset latin-ext (ma ł, ż, ó, ą…). Wagi użyte w banerze: 400, 500, 700.
const b64 = (w) =>
  readFileSync(join(fontsDir, `dm-sans-latin-ext-${w}.woff2`)).toString('base64')

const fontFace = (w) => `
  @font-face {
    font-family: 'DM Sans';
    font-style: normal;
    font-weight: ${w};
    src: url(data:font/woff2;base64,${b64(w)}) format('woff2');
  }`

const css = `<style>${[400, 500, 700].map(fontFace).join('')}</style>`

// Wstrzykujemy <style> z osadzonym fontem zaraz po otwierającym <svg ...>
let svg = readFileSync(join(root, 'public', 'og-image.svg'), 'utf8')
svg = svg.replace(/(<svg[^>]*>)/, `$1\n  ${css}`)

await sharp(Buffer.from(svg), { density: 144 })
  .png()
  .toFile(join(root, 'public', 'og-image.png'))

console.log('OK → public/og-image.png')
