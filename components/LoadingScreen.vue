<template>
  <div class="loading-screen" :class="{ 'fade-out': !isLoading }">
    <div class="loading-content">
      <div class="logo">
        <img src="/weiyang_logo.png" alt="Weiyang Logo" class="logo-img" />
      </div>
      <div class="title">未央樂集</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #06171f;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.8s ease-in-out, visibility 0.8s ease-in-out;

  &.fade-out {
    opacity: 0;
    visibility: hidden;
  }
}

.loading-content {
  text-align: center;
  animation: pulse 2s infinite ease-in-out;
}

.logo {
  width: 110px;
  height: 110px;
  display: inline-block;
  margin-bottom: 20px;
}

.logo-img {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.title {
  font-family: "Noto Serif TC", serif;
  font-size: 2rem;
  color: #fff;
  letter-spacing: 0.5rem;
  margin: 0;
  margin-left: 0.5rem;
  font-weight: 300;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(0.98);
  }

  50% {
    opacity: 1;
    transform: scale(1.02);
  }

  100% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}
</style>
