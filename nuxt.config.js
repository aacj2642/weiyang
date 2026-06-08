export default defineNuxtConfig({
  ssr: true,

  app: {
    baseURL: "/weiyang/",
    head: {
      title: "未央樂集",
      htmlAttrs: {
        lang: "zh-TW",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "未央樂集（Weiyang Sizhule）成立於高雄，以國樂演奏與音樂講座為核心，結合經典文學與中國傳統絲竹音樂。未央是漢代宮殿名稱，意謂未盡；樂集因樂而聚。期待與您一同在悠揚的樂音中探尋人生的哲理。",
        },
        {
          name: "keywords",
          content:
            "未央樂集,國樂,絲竹樂,高雄國樂,國樂演奏,音樂講座,紅樓夢,品味三國,王亭又,薛青麗,黃淑敏,阮麟鈞,中國音樂",
        },
        { property: "og:title", content: "未央樂集 Weiyang Sizhule" },
        {
          property: "og:description",
          content:
            "未央樂集成立於高雄，以國樂演奏與音樂講座為核心，結合經典文學與中國傳統絲竹音樂，期許傳統樂音在南台灣落地生根。",
        },
        {
          property: "og:image",
          content: "https://aacj2642.github.io/weiyang/group_photo.jpg",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "未央樂集 Weiyang Sizhule" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "未央樂集 Weiyang Sizhule" },
        {
          name: "twitter:description",
          content:
            "未央樂集成立於高雄，以國樂演奏與音樂講座為核心，結合經典文學與中國傳統絲竹音樂，期許傳統樂音在南台灣落地生根。",
        },
        {
          name: "twitter:image",
          content: "https://aacj2642.github.io/weiyang/group_photo.jpg",
        },
        { name: "robots", content: "index, follow" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/weiyang/weiyang_logo.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;300;400;500;600;700;900&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css",
        },
      ],
    },
  },

  css: ["~/assets/scss/all.scss"],

  modules: ["@pinia/nuxt"],

  vite: {
    define: {
      "import.meta.env.BASE_URL": JSON.stringify("/weiyang/"),
    },
  },

  // Enable compatibility with older component formats if needed
  compatibilityDate: "2024-04-03",
});
