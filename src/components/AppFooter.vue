<template>
  <div class="bg-secondary">
    <footer class="container p-0 mx-auto">
      <div
        class="d-flex flex-column flex-md-row justify-content-between contact-info"
      >
        <div class="text-center mb-2 order-1">
          <img src="/logo_text.png" alt="weiyang_logo" style="height: 60px" />
        </div>
        <div
          class="d-flex flex-column align-items-md-start align-items-center order-2 order-md-0"
        >
          <a class="text-white" href="mailto: weiyangsizhule@gmail.com">
            <i class="bi bi-envelope-fill me-1"></i>weiyangsizhule@gmail.com
          </a>
          <a class="text-white" href="https://www.facebook.com/weiyangsizhule">
            <i class="bi bi-facebook me-1"></i>Facebook
          </a>
          <a class="text-white" href="https://www.youtube.com/@weiyangsizhule">
            <i class="bi bi-youtube me-1"></i>Youtube
          </a>
        </div>
      </div>
      <div class="text-center text-white-40 caption py-4">
        Copyright © Wei Yang Sizhule 2023
      </div>
    </footer>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  msg: {
    type: String,
    required: true,
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";
.contact-info {
  padding: 40px 0;
  @media (min-width: map-get($grid-breakpoints, md)) {
    padding: 100px 0;
  }
}
</style>
