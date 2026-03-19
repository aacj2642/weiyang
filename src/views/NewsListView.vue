<template>
  <div class="news-list-view">
    <div class="row mb-3">
      <div class="col-12 text-center">
        <div class="section-title-wrapper d-inline-flex flex-column align-items-center">
          <h2 class="display-4 fw-bold text-white mb-2 category-title">{{ pageTitle }}</h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">NEWS & UPDATES</p>
        </div>
      </div>
    </div>

    <div class="container pb-5">
      <div class="row g-4">
        <div v-for="item in filteredNews" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <RouterLink :to="'/news/' + item.id" class="text-decoration-none h-100 d-block">
            <div class="news-card h-100 border-0 bg-dark-soft overflow-hidden">
              <div class="card-img-container position-relative">
                <img :src="item.image" :alt="item.title" class="card-img-top news-image"
                  @error="handleImageError">
                <div class="date-badge position-absolute top-0 end-0 p-3 bg-primary text-white">
                  {{ formatDate(item.date) }}
                </div>
              </div>
              <div class="card-body p-4 text-white">
                <h5 class="card-title fw-bold mb-3 letter-spacing-wide">{{ item.title }}</h5>
                <p class="card-text text-white-50 small mb-0 line-clamp-3">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      
      <div v-if="filteredNews.length === 0" class="text-center py-5 text-white-50">
        <p>目前尚無相關訊息</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useNewsStore } from "../stores/newsStore";

export default {
  name: "NewsListView",
  setup() {
    const route = useRoute();
    const newsStore = useNewsStore();

    const filteredNews = computed(() => {
      const path = route.path;
      if (path === "/performance-news" || path === "/performence-news") {
        return newsStore.performanceNews;
      } else if (path === "/seminar-news") {
        return newsStore.seminarNews;
      }
      return newsStore.allNews;
    });

    const pageTitle = computed(() => {
      const path = route.path;
      if (path === "/performance-news" || path === "/performence-news") {
        return "演出訊息";
      } else if (path === "/seminar-news") {
        return "講座訊息";
      }
      return "所有消息";
    });

    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    };

    const handleImageError = (e) => {
      // Background pattern if image fails
      e.target.src = "https://placehold.co/600x400/222/555?text=No+Image";
    };

    return {
      filteredNews,
      pageTitle,
      formatDate,
      handleImageError,
    };
  },
};
</script>

<style lang="scss" scoped>
.news-list-view {
  background-color: #0c0f12;
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

.bg-dark-soft {
  background-color: #1a1e23;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    
    .news-image {
      transform: scale(1.1);
    }
  }
}

.card-img-container {
  height: 250px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.5s ease;
}

.date-badge {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  z-index: 10;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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
