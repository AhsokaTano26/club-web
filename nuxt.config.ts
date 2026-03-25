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
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    }
  },
  content: {
    // --- 新增远程数据源配置 ---
    sources: {
      github: {
        driver: 'github',
        prefix: '/', // 挂载到根路径，保持 queryContent('/') 逻辑不变
        repo: 'AhsokaTano26/club-web-content',
        branch: 'main',
        dir: '', // 文档在仓库根目录
        // 建议在环境变量中配置 GITHUB_TOKEN 以提高 API 限额
        // token: process.env.GITHUB_TOKEN
      }
    },
    // --- 保留原有高亮配置 ---
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      }
    }
  },
})