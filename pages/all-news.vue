<template>
  <h1 class="visually-hidden">最新消息 - 未央樂集 Weiyang Sizhule</h1>
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
      "瀏覽未央樂集（Weiyang Sizhule）的所有最新活動與消息，包括國樂公演、售票演出、音樂講座、古箏體驗課程與報名購票詳情。";

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
          name: "最新消息",
          item: "https://aacj2642.github.io/weiyang/all-news/",
        },
      ],
    };

    useHead({
      title: "最新消息 - 未央樂集 Weiyang Sizhule",
      meta: [
        { name: "description", content: description },
        {
          property: "og:title",
          content: "最新消息 - 未央樂集 Weiyang Sizhule",
        },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        {
          name: "twitter:title",
          content: "最新消息 - 未央樂集 Weiyang Sizhule",
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
