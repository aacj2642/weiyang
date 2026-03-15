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
  margin-top: 64px;
  // all - header - footer
  min-height: calc(100vh - 64px - 228px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: map-get($grid-breakpoints, md)) {
    // header
    margin-top: 100px;
    // all - header - footer
    min-height: calc(100vh - 100px - 160px);
  }
}
</style>
