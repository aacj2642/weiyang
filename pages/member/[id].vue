<template>
  <div class="member-detail-page">
    <h1 class="visually-hidden" v-if="member">
      {{ member.name }} - 成員介紹 - 未央樂集 Weiyang Sizhule
    </h1>
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

    <div class="container text-light">
      <div class="row align-items-start" v-if="member">
        <div class="col-md-5 text-center mb-4 mb-md-0">
          <div class="avatar-wrapper mx-auto shadow-lg">
            <img
              :src="member.artisticPhoto || member.avatar"
              @error="handleImageError"
              class="w-100 h-100 object-fit-cover"
              :alt="member.name"
            />
          </div>
        </div>
        <div class="col-md-7 text-center text-md-start">
          <h2 class="fw-bold mb-3 member-name-text text-white">
            {{ member.name }}
          </h2>
          <div
            class="position-badges mb-3"
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
          <h4 class="mb-4 member-role-text text-white-50">{{ member.role }}</h4>
          <p class="lh-lg my-4 text-start" style="white-space: pre-line">
            {{ member.description }}
          </p>
          <button
            class="btn btn-outline-light mt-4 px-4 py-2 rounded-pill"
            @click="$router.push('/member')"
          >
            <i class="bi bi-arrow-left me-2"></i>返回成員列表
          </button>
        </div>
      </div>
      <div v-else class="text-center py-5 mt-5">
        <h3 class="text-white mb-4">找不到該成員資料</h3>
        <button
          class="btn btn-outline-light px-4 py-2 rounded-pill"
          @click="$router.push('/member')"
        >
          <i class="bi bi-arrow-left me-2"></i>返回成員列表
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useMemberStore, positionBadgeStyle } from "~/stores/memberStore";
import { useHead } from "#app";

export default {
  name: "MemberDetailView",
  setup() {
    const route = useRoute();
    const store = useMemberStore();
    const member = computed(() => {
      const memberId = route.params.id;
      return store.getMemberById(memberId) || null;
    });

    const canonicalUrl = computed(() => {
      const path = route.path.endsWith("/") ? route.path : `${route.path}/`;
      return `https://aacj2642.github.io/weiyang${path}`;
    });

    const memberDesc = computed(() => {
      if (!member.value) return "未央樂集團員介紹。";
      const clean = member.value.description
        .replace(/[\s\r\n]+/g, " ")
        .replace(/•/g, "")
        .trim();
      return clean.length > 200 ? `${clean.slice(0, 197)}...` : clean;
    });

    const ogImage = computed(() => {
      if (!member.value)
        return "https://aacj2642.github.io/weiyang/weiyang_logo.png";
      const base = "https://aacj2642.github.io";
      const path = member.value.artisticPhoto || member.value.avatar;
      return `${base}${path}`;
    });

    const jsonLd = computed(() => {
      if (!member.value) return {};
      const base = "https://aacj2642.github.io";
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
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
                name: "成員介紹",
                item: "https://aacj2642.github.io/weiyang/member/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: member.value.name,
                item: `${base}/weiyang/member/${member.value.id}/`,
              },
            ],
          },
          {
            "@type": "Person",
            name: member.value.name,
            jobTitle: member.value.role,
            description: memberDesc.value,
            image: ogImage.value,
            memberOf: {
              "@type": "MusicGroup",
              name: "未央樂集",
              url: "https://aacj2642.github.io/weiyang/",
            },
          },
        ],
      };
    });

    useHead({
      title: computed(() =>
        member.value
          ? `${member.value.name} - 成員介紹 - 未央樂集 Weiyang Sizhule`
          : "成員介紹 - 未央樂集 Weiyang Sizhule",
      ),
      meta: [
        { name: "description", content: memberDesc },
        {
          property: "og:title",
          content: computed(() =>
            member.value
              ? `${member.value.name} - 未央樂集 Weiyang Sizhule`
              : "成員介紹 - 未央樂集",
          ),
        },
        { property: "og:description", content: memberDesc },
        { property: "og:image", content: ogImage },
        { property: "og:url", content: canonicalUrl },
        {
          name: "twitter:title",
          content: computed(() =>
            member.value
              ? `${member.value.name} - 未央樂集 Weiyang Sizhule`
              : "成員介紹 - 未央樂集",
          ),
        },
        { name: "twitter:description", content: memberDesc },
        { name: "twitter:image", content: ogImage },
      ],
      link: [{ rel: "canonical", href: canonicalUrl }],
      script: [
        {
          type: "application/ld+json",
          children: computed(() => JSON.stringify(jsonLd.value)),
        },
      ],
    });

    return {
      member,
    };
  },
  computed: {
    badgeStyle() {
      return {
        color: positionBadgeStyle.color,
        backgroundColor: positionBadgeStyle.bg,
        border: "1px solid " + positionBadgeStyle.color,
      };
    },
  },
  methods: {
    handleImageError(e) {
      if (this.member) {
        e.target.src = `${import.meta.env.BASE_URL}weiyang_logo.png`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/customVariables";

.member-detail-page {
  background-color: $primary;
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
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  overflow: hidden;
  border: 5px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0.5rem 2rem rgba(255, 255, 255, 0.15) !important;
  }

  @media (min-width: 768px) {
    border-width: 8px;
  }
}

.object-fit-cover {
  object-fit: cover;
}

.member-name-text {
  letter-spacing: 0.2rem;
}

.member-role-text {
  letter-spacing: 0.1rem;
}

.position-badge {
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.3em 0.75em;
  letter-spacing: 0.03rem;
}

.lh-lg {
  line-height: 2 !important;
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
