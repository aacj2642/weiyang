<template>
  <div v-if="newsItem" class="news-detail-view container-fluid pt-5 mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!-- Back Button -->
          <button
            @click="$router.back()"
            class="btn btn-link text-white-50 text-decoration-none mb-4 p-0"
          >
            <i class="bi bi-arrow-left me-2"></i> 返回列表
          </button>

          <!-- Main Content -->
          <div class="news-header mb-5">
            <div class="news-type-badge mb-3">
              <span
                class="badge rounded-pill px-3 py-2 text-white letter-spacing-wide"
              >
                {{ newsTypeLabel }}
              </span>
            </div>
            <h1 class="display-5 fw-bold text-white letter-spacing-wide mb-4">
              {{ newsItem.title }}
            </h1>
            <div class="news-meta d-flex flex-wrap gap-4 text-white-50">
              <span>
                <i class="bi bi-calendar3 me-2"></i> {{ newsItem.date }}
              </span>
              <span>
                <i class="bi bi-clock me-2"></i> {{ newsItem.time }}
              </span>
              <span>
                <i class="bi bi-geo-alt me-2"></i>
                {{ newsItem.location }}
              </span>
            </div>
          </div>

          <div class="row g-5">
            <div class="col-md-6">
              <div
                class="news-image-container rounded-3 overflow-hidden shadow-lg mb-4"
              >
                <img
                  :src="newsItem.image"
                  :alt="newsItem.title"
                  class="img-fluid w-100"
                  @error="handleImageError"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="news-description text-white">
                <div class="description-content lh-lg white-space-pre-wrap">
                  {{ newsItem.description }}
                </div>
              </div>

              <div
                v-if="newsItem.link"
                class="action-buttons mt-5 pt-4 border-top border-white-10"
              >
                <a
                  :href="newsItem.link"
                  target="_blank"
                  class="btn btn-primary px-5 py-3 rounded-0 letter-spacing-wide shadow-none"
                >
                  立即報名 / 購票
                  <i class="bi bi-arrow-up-right-square ms-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container text-center text-white">
    <h3>找不到該消息</h3>
    <button @click="$router.push('/all-news')" class="btn btn-primary mt-4">
      查看所有消息
    </button>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useNewsStore } from "../stores/newsStore";

export default {
  name: "NewsDetailView",
  setup() {
    const route = useRoute();
    const newsStore = useNewsStore();
    const id = route.params.id;

    const newsItem = computed(() => newsStore.getNewsById(id));

    const newsTypeLabel = computed(() => {
      if (!newsItem.value) return "";
      return newsItem.value.type === "performance" ? "演出訊息" : "講座訊息";
    });

    watchEffect(() => {
      if (newsItem.value) {
        document.title = `${newsItem.value.title} - 未央樂集`;
      } else {
        document.title = "消息詳情 - 未央樂集";
      }
    });

    const handleImageError = (e) => {
      e.target.src =
        "https://placehold.co/800x1200/222/555?text=Poster+Placeholder";
    };

    return {
      newsItem,
      newsTypeLabel,
      handleImageError,
    };
  },
};
</script>

<style lang="scss" scoped>
.news-detail-view {
  background-color: #0c0f12;
  animation: fadeIn 0.8s ease-out;
}

h1 {
  letter-spacing: 0.3rem !important;
  font-family: serif;
}

.news-image-container {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.white-space-pre-wrap {
  white-space: pre-wrap;
}

.border-white-10 {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.letter-spacing-wide {
  letter-spacing: 0.15rem;
}

.description-content {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.05rem;
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
