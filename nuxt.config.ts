export default defineNuxtConfig({
  compatibilityDate: '2026-03-24',
  modules: [
      '@nuxtjs/tailwindcss',
      '@nuxt/content',
      '@nuxt/icon'
  ],

  devtools: { enabled: false },

  app: {
    head: {
      title: '跨世界同好会官网',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
    pageTransition: {
          name: 'page',
          mode: 'out-in'
    },
    loadingIndicator: false
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