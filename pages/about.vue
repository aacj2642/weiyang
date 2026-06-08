<template>
  <div class="about-page">
    <h1 class="visually-hidden">關於我們 - 未央樂集 Weiyang Sizhule</h1>
    <div class="row mb-3">
      <div class="col-12 text-center">
        <div
          class="section-title-wrapper d-inline-flex flex-column align-items-center"
        >
          <h2 class="display-4 fw-bold text-white mb-2 category-title">
            關於我們
          </h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">ABOUT US</p>
        </div>
      </div>
    </div>
    <AboutSection :showInternalTitle="false" />
  </div>
</template>

<script>
import { useHead } from "#app";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  setup() {
    const route = useRoute();
    const canonicalUrl = computed(() => {
      const path = route.path.endsWith("/") ? route.path : `${route.path}/`;
      return `https://aacj2642.github.io/weiyang${path}`;
    });

    const description =
      "了解未央樂集（Weiyang Sizhule）的創立宗旨與核心精神。未央樂集由一群熱愛音樂的人士組成，以中國傳統笛與琵琶象徵本團以絲竹為根基，在南台灣推廣精湛的國樂演出與文學音樂講座。";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首頁",
          item: "https://aacj2642.github.io/weiyang/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "關於我們",
          item: "https://aacj2642.github.io/weiyang/about/",
        },
      ],
    };

    useHead({
      title: "關於我們 - 未央樂集 Weiyang Sizhule",
      meta: [
        { name: "description", content: description },
        {
          property: "og:title",
          content: "關於我們 - 未央樂集 Weiyang Sizhule",
        },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        {
          name: "twitter:title",
          content: "關於我們 - 未央樂集 Weiyang Sizhule",
        },
        { name: "twitter:description", content: description },
      ],
      link: [{ rel: "canonical", href: canonicalUrl }],
      script: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    });
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/customVariables";

.about-page {
  background-color: $primary;
  color: white;
  animation: fadeIn 0.8s ease-out;
}

.category-title {
  letter-spacing: 0.3rem;
  font-family: serif;
}

.title-underline {
  width: 60px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-top: 1rem;
}

.letter-spacing-wide {
  letter-spacing: 0.2rem;
  font-size: 0.85rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
