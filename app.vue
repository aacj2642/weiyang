<template>
  <div>
    <LoadingScreen :isLoading="!isLoaded" />
    <AppHeader />
    <main class="main">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoaded: false,
    };
  },
  mounted() {
    const handleLoad = () => {
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
@import "~/assets/scss/customVariables";

.main {
  padding: 2rem;
  margin-top: 65px;
  min-height: calc(100vh - 65px - 228px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: map-get($grid-breakpoints, md)) {
    margin-top: 85px;
    min-height: calc(100vh - 85px - 160px);
  }
}
</style>
