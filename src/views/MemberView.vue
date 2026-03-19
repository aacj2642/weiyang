<template>
  <div class="member-page">
    <div class="row mb-3">
      <div class="col-12 text-center">
        <div
          class="section-title-wrapper d-inline-flex flex-column align-items-center"
        >
          <h2 class="display-4 fw-bold text-white mb-2 category-title">
            成員介紹
          </h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">
            MEMBER INTRODUCTION
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <!-- Category Tabs -->
      <ul
        class="nav nav-pills justify-content-center mb-5"
        id="member-tab"
        role="tablist"
      >
        <li
          class="nav-item"
          role="presentation"
          v-for="(category, index) in allCategories"
          :key="category.name"
        >
          <button
            class="nav-link fs-5"
            :class="{ active: index === 0 }"
            :id="'tab-' + index"
            data-bs-toggle="pill"
            :data-bs-target="'#content-' + index"
            type="button"
            role="tab"
            :aria-controls="'content-' + index"
            :aria-selected="index === 0 ? 'true' : 'false'"
          >
            {{ category.name }}
          </button>
        </li>
      </ul>

      <!-- Category Content -->
      <div class="tab-content" id="member-tabContent">
        <div
          class="tab-pane fade"
          :class="{ 'show active': index === 0 }"
          :id="'content-' + index"
          role="tabpanel"
          :aria-labelledby="'tab-' + index"
          tabindex="0"
          v-for="(category, index) in allCategories"
          :key="category.name"
        >
          <div
            class="row row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 justify-content-center"
          >
            <div
              class="col"
              v-for="member in category.members"
              :key="member.id || member.name"
            >
              <div
                class="card h-100 text-center border-0 bg-transparent member-card"
                @click="member.id ? $router.push(`/member/${member.id}`) : null"
              >
                <div class="avatar-wrapper mx-auto mb-3 shadow-sm text-light">
                  <!-- 1:1 Avatar -->
                  <img
                    :src="member.avatar"
                    @error="handleImageError($event, member.name)"
                    class="w-100 h-100 object-fit-cover text-white-50"
                    :alt="member.name"
                  />
                </div>
                <div class="card-body p-0">
                  <h4 class="card-title fw-bold mb-2 member-name-text">
                    {{ member.name }}
                  </h4>
                  <div
                    class="position-badges mb-2"
                    v-if="member.positions && member.positions.length"
                  >
                    <span
                      v-for="pos in member.positions"
                      :key="pos"
                      class="badge rounded-pill me-1 position-badge"
                      :style="badgeStyle"
                      >{{ pos }}</span
                    >
                  </div>
                  <p class="card-text fs-6 member-role-text">
                    {{ member.role }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useMemberStore, positionBadgeStyle } from "@/stores/memberStore";

export default {
  name: "MemberView",
  computed: {
    ...mapState(useMemberStore, ["allCategories"]),
    badgeStyle() {
      return {
        color: positionBadgeStyle.color,
        backgroundColor: positionBadgeStyle.bg,
        border: "1px solid " + positionBadgeStyle.color,
      };
    },
  },
  methods: {
    handleImageError(e, memberName) {
      // Fallback if image not found to fakeimg
      e.target.src = `https://pbs.twimg.com/media/GBtW3HCacAAwykB.jpg`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";

.member-page {
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

.avatar-wrapper {
  width: 160px;
  height: 160px;
  border-radius: 50%; /* 1:1 circle */
  overflow: hidden;
  border: 4px solid #fff;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  }

  @media (min-width: map-get($grid-breakpoints, md)) {
    width: 200px;
    height: 200px;
  }
}

.object-fit-cover {
  object-fit: cover;
}

.member-name-text {
  color: #ffffff !important;
  letter-spacing: 0.1rem;
}

.member-role-text {
  color: rgba(255, 255, 255, 0.75) !important;
  letter-spacing: 0.05rem;
}

.nav-pills {
  .nav-link {
    color: rgba(255, 255, 255, 0.7) !important;
    border-radius: 50px;
    padding: 10px 24px;
    margin: 0 4px;
    transition: all 0.3s ease;

    &:hover {
      color: #fff !important;
      background-color: rgba(255, 255, 255, 0.1) !important;
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.2) !important;
      color: #fff !important;
      font-weight: bold;
    }
  }
}

.member-card {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    .member-name-text {
      color: rgba(255, 255, 255, 0.9) !important;
    }
  }
}

.position-badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25em 0.65em;
  letter-spacing: 0.03rem;
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
