<template>
  <div class="about-section position-relative overflow-hidden">
    <div class="container py-5 mt-lg-5">
      <div class="row align-items-stretch">

        <!-- Left Item: Image and Logo -->
        <div class="col-12 col-lg-6 position-relative d-flex flex-column">
          <div class="image-wrapper w-100 flex-grow-1 position-relative">
            <img src="/index_girl.png" alt="Girl playing instrument"
              class="img-fluid w-100 h-100 object-fit-cover shadow-lg" />
          </div>

          <!-- Logo Section overlapping bottom left of image -->
          <div class="logo-box position-absolute z-2 d-flex align-items-center">
            <img src="/weiyang_logo.png" alt="Weiyang Logo" class="weiyang-logo me-3" />
            <div
              class="logo-text d-flex flex-column justify-content-center border-end border-white border-opacity-25 pe-4 me-4">
              <span class="fs-4 fw-bold letter-spacing-wide mb-1">未央樂集</span>
              <span class="text-white-50 letter-spacing-widest"
                style="font-size: 0.65rem; line-height: 1;">WEIYANGSIZHULE</span>
            </div>
            <div class="d-flex flex-column justify-content-center">
              <span class="letter-spacing-wide mb-1" style="font-size: 0.85rem;">國樂演奏</span>
              <span class="letter-spacing-wide" style="font-size: 0.85rem;">音樂講座</span>
            </div>
          </div>
        </div>

        <!-- Right Item: Vertical Text & Button -->
        <div class="col d-flex flex-column position-relative">

          <div class="d-flex flex-row-reverse justify-content-start text-white flex-grow-1 mt-lg-n5">

            <div class="d-flex flex-column align-items-center">
              <h2 class="fs-2 fw-medium mb-0"
                style="writing-mode: vertical-rl; letter-spacing: 0.4em; font-family: serif;">關於我們</h2>
              <div
                style="writing-mode: vertical-rl; text-orientation: upright; letter-spacing: 0.4em; font-family: sans-serif; font-size: 0.8rem; color: rgba(255,255,255,0.4);">
                ABOUT US</div>
            </div>

            <!-- Col 3: Desc Block 1 -->
            <div class="d-flex flex-row-reverse">
              <p class="mb-0 text-white-75 paragraph-text">未央是漢代宮殿的名稱，</p>
              <p class="mb-0 text-white-75 paragraph-text">意謂未盡；</p>
              <p class="mb-0 text-white-75 paragraph-text">樂集因樂而聚。</p>
              <p class="mb-0 text-white-75 paragraph-text">標誌選用青色期待如春季萬物萌發，</p>
              <p class="mb-0 text-white-75 paragraph-text">以笛與琵琶象徵本團以絲竹為根基。</p>
            </div>
          </div>

          <!-- Bottom Button -->
          <div class="d-flex w-100 align-items-center mt-5 mb-lg-5 position-relative z-3">
            <div class="flex-grow-1 border-top border-white border-opacity-25 me-4"></div>
            <RouterLink to="/about"
              class="btn btn-outline-light rounded-0 px-4 py-2 d-flex align-items-center text-nowrap">
              成員介紹 <i class="bi bi-arrow-right ms-3"></i>
            </RouterLink>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "AboutSection",
  components: {
    RouterLink,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/customVariables";

.about-section {
  background-color: $primary;
  color: white;
}

.object-fit-cover {
  object-fit: cover;
}

.logo-box {
  background-color: $primary;
  padding: 20px 30px 0 0;
  bottom: 20px;
  left: calc(var(--bs-gutter-x) / 2);
}

.weiyang-logo {
  width: 65px;
  height: 65px;
}

.paragraph-text {
  writing-mode: vertical-rl;
  letter-spacing: 0.3em;
  line-height: 2;
  font-family: serif;
  font-size: 0.95rem;
}

.text-white-75 {
  color: rgba(255, 255, 255, 0.75);
}

.letter-spacing-wide {
  letter-spacing: 0.25em;
}

.letter-spacing-widest {
  letter-spacing: 0.15em;
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.4);

  &:hover {
    background-color: transparent;
    color: white;
    border-color: white;
  }
}
</style>
