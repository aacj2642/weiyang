<template>
  <div class="calendar-view container-fluid py-5">
    <div class="row mb-5 mt-5">
      <div class="col-12 text-center">
        <div class="section-title-wrapper d-inline-flex flex-column align-items-center">
          <h2 class="display-4 fw-bold text-white mb-2 category-title">活動行事曆</h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">ACTIVITY CALENDAR</p>
        </div>
      </div>
    </div>

    <div class="container pb-5">
      <div class="calendar-placeholder text-center py-5 bg-dark-soft rounded-3">
        <div class="mb-4">
          <i class="bi bi-calendar-range display-1 text-primary-soft"></i>
        </div>
        <h3 class="text-white mb-3">行事曆建置中</h3>
        <p class="text-white-50">我們即將在近期內推出更完整的活動行事曆功能，敬請期待！</p>
        <RouterLink to="/all-news" class="btn btn-outline-primary mt-4 px-4 py-2 rounded-0">
          查看所有消息
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarView",
};
</script>

<style lang="scss" scoped>
.calendar-view {
  min-height: 80vh;
  background-color: #0c0f12;
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

.bg-dark-soft {
  background-color: #1a1e23;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.text-primary-soft {
  color: rgba(var(--bs-primary-rgb), 0.3);
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
