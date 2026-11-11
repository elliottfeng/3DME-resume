import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions 会注入 VITE_SITE_URL（https://<owner>.github.io/<repo>/）；
// 本地开发默认 http://localhost:5173/。手动构建时也可显式设置。
const SITE_URL = (process.env.VITE_SITE_URL || 'http://localhost:5173/').replace(/\/+$/, '') + '/'

// 把 index.html 中的 __SITE_URL__ 替换为构建时的站点地址（开发/构建都生效）。
function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    transformIndexHtml(html) {
      return html.replaceAll('__SITE_URL__', SITE_URL)
    },
  }
}

export default defineConfig({
  // 打包后资源用相对路径（dist/index.html 引用 ./assets/...，可放任意子目录/直接打开）
  base: './',
  plugins: [react(), siteUrlPlugin()],
  server: { host: true, port: 5173 },
})
