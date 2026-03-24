export default defineNuxtConfig({
  compatibilityDate: '2026-03-24',
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/content'
  ],
  devtools: { enabled: false },
  app: {
    head: {
      title: '同好会官网 - 日程与进度',
      meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  },
  content: {
      highlight: { theme: 'github-light' }
    },
})