<template>
  <h1 class="visually-hidden">講座訊息 - 未央樂集 Weiyang Sizhule</h1>
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
      "報名參與未央樂集（Weiyang Sizhule）主辦的國樂講座、傳統樂器體驗課程、經典文學與音樂結合講座等精彩活動。";

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
          name: "講座訊息",
          item: "https://aacj2642.github.io/weiyang/seminar-news/",
        },
      ],
    };

    useHead({
      title: "講座訊息 - 最新消息 - 未央樂集 Weiyang Sizhule",
      meta: [
        { name: "description", content: description },
        {
          property: "og:title",
          content: "講座訊息 - 最新消息 - 未央樂集 Weiyang Sizhule",
        },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        {
          name: "twitter:title",
          content: "講座訊息 - 最新消息 - 未央樂集 Weiyang Sizhule",
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
