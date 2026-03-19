<template>
  <div>
    <div class="banner mb-5" style="
        background-image: linear-gradient(
            rgba(var(--bs-primary-rgb), 1) 0%,
            rgba(var(--bs-primary-rgb), 0.7) 20%,
            rgba(var(--bs-primary-rgb), 0.3) 30%,
            rgba(var(--bs-primary-rgb), 0) 100%
          ),
          url('./group_photo.jpg');
      ">
      <img src="/hero-text.png" alt="weiyang" class="banner-text animate-fade-in-up" />
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
import AboutSection from "@/components/AboutSection.vue";
import NewsSection from "@/components/NewsSection.vue";

export default {
  components: {
    AboutSection,
    NewsSection,
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
@import "../scss/customVariables";

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
