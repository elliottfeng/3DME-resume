import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

// 构建后生成 robots.txt / sitemap.xml，使用与 index.html 相同的站点地址。
// GitHub Actions 会注入 VITE_SITE_URL；本地构建默认 localhost。
const raw = process.env.VITE_SITE_URL || 'http://localhost:5173/'
const siteUrl = raw.replace(/\/+$/, '') + '/'
const dist = resolve('dist')

mkdirSync(dist, { recursive: true })

writeFileSync(
  resolve(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`
)

writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
)

console.log(`[site-files] robots.txt / sitemap.xml -> ${siteUrl}`)
