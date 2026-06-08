<template>
  <h1 class="visually-hidden">演出訊息 - 未央樂集 Weiyang Sizhule</h1>
  <NewsList />
</template>

<script>
import NewsList from "~/components/NewsList.vue";
import { useHead } from "#app";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    NewsList,
  },
  setup() {
    const route = useRoute();
    const canonicalUrl = computed(() => {
      const path = route.path.endsWith("/") ? route.path : `${route.path}/`;
      return `https://aacj2642.github.io/weiyang${path}`;
    });

    const description =
      "關注未央樂集（Weiyang Sizhule）最新的國樂合奏公演、售票演出以及受補助的巡迴演出訊息。";

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
          name: "演出訊息",
          item: "https://aacj2642.github.io/weiyang/performance-news/",
        },
      ],
    };

    useHead({
      title: "演出訊息 - 最新消息 - 未央樂集 Weiyang Sizhule",
      meta: [
        { name: "description", content: description },
        {
          property: "og:title",
          content: "演出訊息 - 最新消息 - 未央樂集 Weiyang Sizhule",
        },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        {
          name: "twitter:title",
          content: "演出訊息 - 最新消息 - 未央樂集 Weiyang Sizhule",
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
