<template>
  <div>
    <div
      class="banner"
      style="
        background-image: linear-gradient(
            rgba(var(--bs-primary-rgb), 1) 0%,
            rgba(var(--bs-primary-rgb), 0.7) 20%,
            rgba(var(--bs-primary-rgb), 0.3) 30%,
            rgba(var(--bs-primary-rgb), 0) 100%
          ),
          url('./group_photo.jpg');
      "
    >
      <img src="/hero-text.png" alt="weiyang" class="banner-text animate-fade-in-up" />
    </div>
    
    <div class="reveal" ref="aboutSec">
      <AboutSection />
    </div>
    <div class="reveal w-100" ref="newsSec">
      <NewsSection />
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

  background-position: center bottom -20px;
  height: 480px;
  @media (min-width: map-get($grid-breakpoints, md)) {
    background-position: center bottom -40px;
    height: 800px;
  }
}
.banner-text {
  display: block;
  width: 320px;
  margin: 35px auto 0;
  @media (min-width: map-get($grid-breakpoints, md)) {
    margin-top: 92px;
    width: 460px;
  }
}
</style>
