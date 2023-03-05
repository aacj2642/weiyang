<template>
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
    <img src="/hero-text.png" alt="weiyang" class="banner-text" />
  </div>
</template>

<style lang="scss" scoped>
@import "../scss/customVariables";
.banner {
  max-width: 100%;
  width: 100vw;
  background-repeat: no-repeat;
  background-size: cover;

  background-position: center bottom -20px;
  height: 480px;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    background-position: center bottom -40px;
    height: 800px;
  }
}
.banner-text {
  display: block;
  width: 320px;
  margin: 35px auto 0;
  @media (min-width: map-get($grid-breakpoints, sm)) {
    margin-top: 92px;
    width: 460px;
  }
}
</style>
