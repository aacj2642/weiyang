export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: '/weiyang/',
    head: {
      title: '未央樂集',
      htmlAttrs: {
        lang: 'zh-TW'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/weiyang/weiyang_logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css' }
      ]
    }
  },

  css: [
    '~/assets/scss/all.scss'
  ],

  modules: [
    '@pinia/nuxt'
  ],

  vite: {
    define: {
      'import.meta.env.BASE_URL': JSON.stringify('/weiyang/')
    }
  },

  // Enable compatibility with older component formats if needed
  compatibilityDate: '2024-04-03'
})
