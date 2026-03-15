<template>
  <div class="about-page container-fluid py-5">
    <div class="row mb-5">
      <div class="col-12 text-center">
        <div class="section-title-wrapper d-inline-flex flex-column align-items-center">
          <h2 class="display-4 fw-bold text-white mb-2 category-title">關於我們</h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">ABOUT US</p>
        </div>
      </div>
    </div>
    <AboutSection :showInternalTitle="false" />
  </div>
</template>

<script>
import AboutSection from "@/components/AboutSection.vue";

export default {
  components: {
    AboutSection,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";

.about-page {
  background-color: $primary;
  min-height: calc(100vh - 100px);
  color: white;
  padding-top: 2rem !important;
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
