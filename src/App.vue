<template>
  <LoadingScreen :isLoading="!isLoaded" />
  <AppHeader />
  <RouterView class="main" />
  <AppFooter />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import LoadingScreen from "./components/LoadingScreen.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
    LoadingScreen,
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    const handleLoad = () => {
      // 確保至少有一點點動畫時間，讓畫面典雅過渡
      setTimeout(() => {
        this.isLoaded = true;
      }, 600);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/customVariables";

.main {
  padding: 2rem;
  // header
  margin-top: 65px;
  // all - header - footer
  min-height: calc(100vh - 65px - 228px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: map-get($grid-breakpoints, md)) {
    margin-top: 101px;
    // header
    // all - header - footer
    min-height: calc(100vh - 101px - 160px);
  }
}
</style>
