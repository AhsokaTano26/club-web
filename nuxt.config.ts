export default defineNuxtConfig({
  compatibilityDate: '2026-03-24',
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/content'
  ],
  devtools: { enabled: false },
  app: {
    head: {
      title: '同好会官网',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [
              // 建议 favicon 使用更现代的 SVG 格式，同时保留 ico 兼容
              { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
              { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
              // 如果你有 manifest.json，也可以在这里添加
            ],
    }
  },
  content: {
      highlight: {
        theme: {
          default: 'github-light',
          dark: 'github-dark'
          }
        }
    },
})