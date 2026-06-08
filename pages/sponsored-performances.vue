<template>
  <div class="sponsored-performances-view">
    <h1 class="visually-hidden">受補助之演出 - 未央樂集 Weiyang Sizhule</h1>
    <div class="row mb-5">
      <div class="col-12 text-center">
        <div
          class="section-title-wrapper d-inline-flex flex-column align-items-center"
        >
          <h2 class="display-4 fw-bold text-white mb-2 category-title">
            受補助之演出
          </h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">
            SPONSORED PERFORMANCES
          </p>
        </div>
      </div>
    </div>

    <div class="container pb-5">
      <div class="row g-4">
        <div v-for="item in sponsoredNews" :key="item.id" class="col-12">
          <NuxtLink
            :to="'/news/' + item.id"
            class="text-decoration-none d-block"
          >
            <!-- 橫式排版 (md and up) -->
            <div
              class="sponsored-card d-none d-md-flex row g-0 overflow-hidden align-items-center bg-dark-soft"
            >
              <div class="col-md-7 p-4 p-lg-5 info-section text-white">
                <h3 class="card-title fw-bold mb-4">
                  【{{ item.title.replace(/【|】/g, "") }}】
                </h3>
                <p class="mb-2 info-text">
                  <span class="info-label me-2">日期:</span>
                  {{ formatDate(item.date) }}
                </p>
                <p class="mb-2 info-text" v-if="item.time">
                  <span class="info-label me-2">時間:</span> {{ item.time }}
                </p>
                <p class="mb-2 info-text" v-if="item.location">
                  <span class="info-label me-2">地點:</span> {{ item.location }}
                </p>
                <p class="mb-0 info-text" v-if="item.sponsor">
                  <span class="info-label me-2">補助單位:</span>
                  {{ item.sponsor }}
                </p>
              </div>
              <div class="col-md-5 img-section p-4">
                <div class="img-wrapper">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="img-fluid rounded sponsored-image"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </div>

            <!-- 直式排版 (below md) -->
            <div class="sponsored-card d-md-none overflow-hidden bg-dark-soft">
              <div class="p-4 info-section text-white">
                <h3 class="card-title fw-bold mb-4">
                  【{{ item.title.replace(/【|】/g, "") }}】
                </h3>
                <p class="mb-2 info-text">
                  <span class="info-label me-2">日期:</span>
                  {{ formatDate(item.date) }}
                </p>
                <p class="mb-2 info-text" v-if="item.time">
                  <span class="info-label me-2">時間:</span> {{ item.time }}
                </p>
                <p class="mb-2 info-text" v-if="item.location">
                  <span class="info-label me-2">地點:</span> {{ item.location }}
                </p>
                <p class="mb-0 info-text" v-if="item.sponsor">
                  <span class="info-label me-2">補助單位:</span>
                  {{ item.sponsor }}
                </p>
              </div>
              <div class="img-section p-4 pt-0">
                <div class="img-wrapper">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="img-fluid rounded w-100 sponsored-image"
                    @error="handleImageError"
                  />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="sponsoredNews.length === 0"
        class="text-center py-5 text-white-50"
      >
        <p>目前尚無相關訊息</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useNewsStore } from "~/stores/newsStore";
import { useHead } from "#app";
import { useRoute } from "vue-router";

export default {
  name: "SponsoredPerformancesView",
  setup() {
    const newsStore = useNewsStore();
    const route = useRoute();

    const canonicalUrl = computed(() => {
      const path = route.path.endsWith("/") ? route.path : `${route.path}/`;
      return `https://aacj2642.github.io/weiyang${path}`;
    });

    const description =
      "查看未央樂集（Weiyang Sizhule）獲得高雄市文化局等政府與藝文單位補助之精選演出項目。提供詳細的演出日期、時間、地點及歷史回顧。";

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
          name: "受補助之演出",
          item: "https://aacj2642.github.io/weiyang/sponsored-performances/",
        },
      ],
    };

    const sponsoredNews = computed(() => {
      return newsStore.sponsoredNews;
    });

    useHead({
      title: "受補助之演出 - 未央樂集 Weiyang Sizhule",
      meta: [
        { name: "description", content: description },
        {
          property: "og:title",
          content: "受補助之演出 - 未央樂集 Weiyang Sizhule",
        },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        {
          name: "twitter:title",
          content: "受補助之演出 - 未央樂集 Weiyang Sizhule",
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

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      // Format as "D M 月, YYYY" to match the screenshot style
      // or "YYYY年M月D日" which is more standard.
      // E.g., Date: 28 4 月, 2026. Wait, standard is better.
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    };

    const handleImageError = (e) => {
      e.target.src = "https://placehold.co/600x400/222/555?text=No+Image";
    };

    return {
      sponsoredNews,
      formatDate,
      handleImageError,
    };
  },
};
</script>

<style lang="scss" scoped>
.sponsored-performances-view {
  animation: fadeIn 0.8s ease-out;
}

.category-title {
  letter-spacing: 0.3rem;
  font-family: serif;
}

.letter-spacing-wide {
  letter-spacing: 0.25em;
}

.title-underline {
  width: 60px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-top: 1rem;
}

.bg-dark-soft {
  background-color: #1a1e23;
  border-radius: 20px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);

    .img-wrapper img {
      transform: scale(1.1);
    }
  }
}

.card-title {
  font-family: "Noto Sans TC", sans-serif;
  font-size: 1.8rem;
  margin-left: -0.5rem; /* Offset for the brackets */
}

.info-text {
  font-size: 1.1rem;
  font-family: "Outfit", "Noto Sans TC", sans-serif;
  color: rgba(255, 255, 255, 0.85);
}

.info-label {
  color: rgba(255, 255, 255, 0.5);
}

.img-wrapper {
  overflow: hidden;
  border-radius: 12px;
}

.sponsored-image {
  object-fit: cover;
  transition: transform 0.5s ease;
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
