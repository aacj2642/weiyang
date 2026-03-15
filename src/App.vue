<template>
  <AppHeader />
  <RouterView class="main" />
  <AppFooter />
</template>

<script>
import { RouterLink, RouterView } from "vue-router";

import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
export default {
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss" scoped>
@import "./scss/customVariables";

.main {
  padding: 12px;
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
