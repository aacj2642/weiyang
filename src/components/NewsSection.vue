<template>
  <div class="news-section text-white">
    <div class="container">
      <!-- Tabs -->
      <ul class="nav justify-content-center mb-5 news-tabs">
        <li v-for="tab in tabs" :key="tab.value" class="nav-item">
          <a class="nav-link" :class="{ active: currentTab === tab.value }" href="#"
            @click.prevent="currentTab = tab.value">
            {{ tab.label }}
          </a>
        </li>
      </ul>

      <!-- Cards -->
      <div class="row justify-content-center g-5 mt-3">
        <div v-for="item in displayedNews" :key="item.id" class="col-12 col-md-6 col-lg-4 px-4">
          <RouterLink :to="'/news/' + item.id" class="text-decoration-none h-100 d-block">
            <div class="news-card position-relative h-100">
              <div class="card-img-placeholder">
                <img :src="item.image" :alt="item.title" class="news-img" @error="handleImageError">
                <div class="date-overlay text-white">
                  {{ formatDate(item.date) }}
                </div>
              </div>

              <div
                class="news-content bg-white text-dark position-absolute p-4 d-flex flex-column justify-content-between">
                <div>
                  <h5 class="fw-bold mb-2 letter-spacing-wide text-truncate">{{ item.title }}</h5>
                  <div class="text-primary small mb-2"><i class="bi bi-clock me-1"></i> {{ item.time }}</div>
                </div>
                <div>
                  <p class="mb-0 text-muted small lh-lg line-clamp-2">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <!-- More Button -->
      <div class="text-center mt-5 pt-5">
        <RouterLink :to="moreLink"
          class="btn btn-outline-light rounded-0 px-4 py-2 mt-5 letter-spacing-wide shadow-none">
          查看更多 <i class="bi bi-arrow-right ms-3"></i>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
import { useNewsStore } from "../stores/newsStore";

export default {
  name: "NewsSection",
  components: {
    RouterLink,
  },
  data() {
    return {
      currentTab: "all",
      tabs: [
        { label: "最新消息", value: "all" },
        { label: "演出訊息", value: "performance" },
        { label: "講座訊息", value: "seminar" },
      ],
    };
  },
  computed: {
    displayedNews() {
      const newsStore = useNewsStore();
      let filtered = [];
      if (this.currentTab === "all") {
        filtered = newsStore.allNews;
      } else if (this.currentTab === "performance") {
        filtered = newsStore.performanceNews;
      } else if (this.currentTab === "seminar") {
        filtered = newsStore.seminarNews;
      }
      return filtered.slice(0, 3); // Show only top 3 on home page
    },
    moreLink() {
      if (this.currentTab === "performance") return "/performance-news";
      if (this.currentTab === "seminar") return "/seminar-news";
      return "/all-news";
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return "";
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    handleImageError(e) {
      e.target.src = "https://placehold.co/600x800/222/555?text=Poster";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";

.news-section {
  width: 100%;
  background-color: #0c0f12;
  /* Adjust to match the screenshot */
}

.news-tabs {
  .nav-link {
    color: rgba(255, 255, 255, 0.6);
    padding: 0.5rem 2rem;
    font-size: 1.1rem;
    letter-spacing: 2px;
    transition: all 0.3s ease;

    &:hover {
      color: white;
    }

    &.active {
      color: white;
      border-bottom: 1px solid white;
    }
  }
}

.card-img-placeholder {
  width: 100%;
  height: 480px;
  background-color: #1a1e23;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  .news-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
    transition: transform 0.5s ease;
  }

  .date-overlay {
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: var(--bs-primary);
    padding: 10px 15px;
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
}

.news-card {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);

    .news-img {
      transform: scale(1.1);
    }
  }

  .news-content {
    bottom: -30px;
    left: -20px;
    width: 90%;
    height: 180px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    border-left: 4px solid var(--bs-primary);

    h5 {
      letter-spacing: 0.1rem;
      font-size: 1.1rem;
    }

    p {
      line-height: 1.6;
      letter-spacing: 1px;
      font-size: 0.8rem;
    }
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.letter-spacing-wide {
  letter-spacing: 0.2em;
}


.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.4);

  &:hover {
    background-color: var(--bs-primary);
    color: white;
    border-color: var(--bs-primary);
  }
}
</style>
