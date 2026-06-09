// Generuje public/sitemap.xml z realnych tras aplikacji (App.jsx) i slugów projektów
// (src/data/projects.js). Uruchom: node scripts/build-sitemap.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://zlotorowicz.com'

const { projects } = await import(
  'file://' + join(root, 'src', 'data', 'projects.js').replace(/\\/g, '/')
)

const today = new Date().toISOString().slice(0, 10)

// Trasy statyczne + dynamiczne /portfolio/:slug. priority: strona główna > portfolio
// > projekty > polityka.
const routes = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.8', changefreq: 'monthly' },
  ...projects.map((p) => ({
    path: `/portfolio/${p.slug}`,
    priority: '0.6',
    changefreq: 'yearly',
  })),
  { path: '/polityka-prywatnosci', priority: '0.3', changefreq: 'yearly' },
]

const body = routes
  .map(
    ({ path, priority, changefreq }) =>
      `  <url>\n` +
      `    <loc>${ORIGIN}${path}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`

writeFileSync(join(root, 'public', 'sitemap.xml'), xml)
console.log(`OK → public/sitemap.xml (${routes.length} URL)`)
