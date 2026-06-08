<template>
  <div>
    <h1 class="visually-hidden">
      未央樂集 Weiyang Sizhule - 國樂演奏與音樂講座
    </h1>
    <div
      class="banner mb-5"
      style="
        background-image:
          linear-gradient(
            rgba(var(--bs-primary-rgb), 1) 0%,
            rgba(var(--bs-primary-rgb), 0.7) 20%,
            rgba(var(--bs-primary-rgb), 0.3) 30%,
            rgba(var(--bs-primary-rgb), 0) 100%
          ),
          url(&quot;/weiyang/group_photo.jpg&quot;);
      "
    >
      <img
        src="/hero-text.png"
        alt="weiyang"
        class="banner-text animate-fade-in-up"
      />
    </div>

    <div class="reveal mb-5" ref="aboutSec">
      <AboutSection />
    </div>
    <div class="reveal w-100" ref="newsSec">
      <NewsSection class="py-4" />
    </div>
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
      "未央是漢代宮殿的名稱，意謂未盡；樂集因樂而聚。未央樂集以絲竹為根基，提供精湛的國樂演奏與文學音樂講座，融合傳統與現代，將樂音深植南臺灣。";

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      name: "未央樂集",
      alternateName: "Weiyang Sizhule",
      description: description,
      url: "https://aacj2642.github.io/weiyang/",
      logo: "https://aacj2642.github.io/weiyang/weiyang_logo.png",
      image: "https://aacj2642.github.io/weiyang/group_photo.jpg",
      genre: ["國樂", "絲竹樂", "室內樂", "Chinese Chamber Music"],
      foundingLocation: {
        "@type": "Place",
        name: "高雄, 台灣",
      },
    };

    useHead({
      title: "首頁 - 未央樂集 Weiyang Sizhule",
      meta: [
        { name: "description", content: description },
        { property: "og:title", content: "首頁 - 未央樂集 Weiyang Sizhule" },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl },
        { name: "twitter:title", content: "首頁 - 未央樂集 Weiyang Sizhule" },
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
  mounted() {
    this.initScrollReveal();
  },
  methods: {
    initScrollReveal() {
      const observerOptions = {
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // Once revealed, we can stop observing this element
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const revealElements = this.$el.querySelectorAll(".reveal");
      revealElements.forEach((el) => observer.observe(el));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/customVariables";

.banner {
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 480px;

  @media (min-width: map-get($grid-breakpoints, md)) {
    height: 800px;
  }
}

.banner-text {
  display: block;
  width: 320px;
  max-width: 100%;
  margin: 15px auto 0;

  @media (min-width: map-get($grid-breakpoints, md)) {
    margin-top: 15px;
    width: 460px;
  }
}
</style>
