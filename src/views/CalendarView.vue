<template>
  <div class="calendar-view">
    <div class="row mb-3">
      <div class="col-12 text-center">
        <div class="section-title-wrapper d-inline-flex flex-column align-items-center">
          <h2 class="display-4 fw-bold text-white mb-2 category-title">
            活動行事曆
          </h2>
          <div class="title-underline"></div>
          <p class="text-white-50 mt-3 letter-spacing-wide">
            ACTIVITY CALENDAR
          </p>
        </div>
      </div>
    </div>

    <div class="container pb-5">
      <div class="calendar-container shadow-lg">
        <!-- Calendar Header -->
        <div class="calendar-header">
          <div class="calendar-header-left">
            <div class="d-flex align-items-center gap-3">
              <button @click="prev" class="calendar-nav-btn" :disabled="isPrevDisabled">
                <i class="bi bi-chevron-left"></i>
              </button>
              <h3 class="m-0 text-white fw-bold serif-title title-container"
                style="min-width: 150px; text-align: center">
                <template v-if="viewMode === 'month'">
                  <span>{{ currentYear }} 年 </span>
                  <span class="d-block d-sm-inline ms-sm-1">{{ currentMonth + 1 }} 月 </span>
                </template>
                <template v-else>
                  <span>{{ currentYear }} 年 </span>
                </template>
              </h3>
              <button @click="next" class="calendar-nav-btn" :disabled="isNextDisabled">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
            <button @click="goToToday" class="btn btn-outline-light btn-sm rounded-pill px-3 today-btn">
              今天
            </button>
          </div>

          <div class="calendar-header-right d-none d-sm-block">
            <div class="btn-group" role="group">
              <input type="radio" class="btn-check" name="viewMode" id="monthView" value="month" v-model="viewMode" />
              <label class="btn custom-view-toggle" for="monthView">月</label>

              <input type="radio" class="btn-check" name="viewMode" id="yearView" value="year" v-model="viewMode" />
              <label class="btn custom-view-toggle" for="yearView">年</label>
            </div>
          </div>
        </div>

        <!-- Month View -->
        <div v-if="viewMode === 'month'" class="month-view-wrapper">
          <div class="calendar-grid">
            <!-- Weekday Headers -->
            <div v-for="day in weekdays" :key="day" class="weekday-header">
              {{ day }}
            </div>

            <!-- Days -->
            <div v-for="(day, index) in calendarDays" :key="index" class="calendar-day" :class="{
              'other-month': !day.isCurrentMonth,
              'is-today': day.isToday,
            }">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="day-number">{{ day.dayNumber }}</span>
              </div>

              <!-- Events -->
              <div class="events-container d-flex flex-column gap-1">
                <RouterLink v-for="event in day.events" :key="event.id" :to="'/news/' + event.id" class="event-badge"
                  :class="event.type === 'performance'
                    ? 'event-performance'
                    : 'event-seminar'
                    " :title="`${getEventTypeLabel(event.type)}-${event.title}`">
                  {{ event.time.split("-")[0] }} {{ event.title }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Year View -->
        <div v-if="viewMode === 'year'" class="year-view-wrapper">
          <div class="year-grid">
            <div v-for="monthItem in yearMonths" :key="monthItem.monthNumber" class="month-card"
              :class="{ 'has-events': monthItem.events.length > 0, 'disabled': isMonthDisabled(monthItem.monthNumber - 1) }" @click="selectMonth(monthItem.monthNumber - 1)">
              <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-white-10 pb-2">
                <h4 class="month-card-title m-0">{{ monthItem.monthName }}</h4>
                <span v-if="monthItem.events.length > 0" class="badge bg-primary rounded-pill">
                  {{ monthItem.events.length }} 則活動
                </span>
              </div>

              <div v-if="monthItem.events.length > 0" class="month-events-preview d-flex flex-column gap-1 mt-2">
                <RouterLink v-for="event in monthItem.events.slice(0, 3)" :key="event.id" :to="'/news/' + event.id" class="event-badge"
                  :class="event.type === 'performance' ? 'event-performance' : 'event-seminar'"
                  :title="`${getEventTypeLabel(event.type)}-${event.title}`"
                  @click.stop>
                  {{ event.time ? event.time.split("-")[0] : '' }} {{ event.title }}
                </RouterLink>
                <div v-if="monthItem.events.length > 3" class="text-white-50 small fst-italic mt-1 text-center">
                  ...及其他 {{ monthItem.events.length - 3 }} 則活動
                </div>
              </div>
              <div v-else class="text-white-50 small opacity-50">
                無活動安排
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useNewsStore } from "../stores/newsStore";

const sharedViewMode = ref("month");
const sharedCurrentDate = ref(new Date());

export default {
  name: "CalendarView",
  setup() {
    const newsStore = useNewsStore();
    const allNews = computed(() => newsStore.allNews);

    const minDateInfo = computed(() => {
      if (!allNews.value || allNews.value.length === 0) return { year: new Date().getFullYear(), month: 0 };
      const dates = allNews.value.map(news => new Date(news.date)).filter(d => !isNaN(d.getTime()));
      if (dates.length === 0) return { year: new Date().getFullYear(), month: 0 };
      const minMs = Math.min(...dates.map(d => d.getTime()));
      const minDate = new Date(minMs);
      return { year: minDate.getFullYear(), month: minDate.getMonth() };
    });

    const isPrevDisabled = computed(() => {
      const minInfo = minDateInfo.value;
      if (viewMode.value === "month") {
        if (currentYear.value < minInfo.year) return true;
        if (currentYear.value === minInfo.year && currentMonth.value <= minInfo.month) return true;
        return false;
      } else {
        return currentYear.value <= minInfo.year;
      }
    });

    const maxDateInfo = computed(() => {
      const now = new Date();
      if (!allNews.value || allNews.value.length === 0) return { year: now.getFullYear(), month: now.getMonth() };
      const dates = allNews.value.map(news => new Date(news.date)).filter(d => !isNaN(d.getTime()));
      if (dates.length === 0) return { year: now.getFullYear(), month: now.getMonth() };
      const maxMs = Math.max(now.getTime(), ...dates.map(d => d.getTime()));
      const maxDate = new Date(maxMs);
      return { year: maxDate.getFullYear(), month: maxDate.getMonth() };
    });

    const isNextDisabled = computed(() => {
      const maxInfo = maxDateInfo.value;
      if (viewMode.value === "month") {
        if (currentYear.value > maxInfo.year) return true;
        if (currentYear.value === maxInfo.year && currentMonth.value >= maxInfo.month) return true;
        return false;
      } else {
        return currentYear.value >= maxInfo.year;
      }
    });

    const viewMode = sharedViewMode;
    const currentDate = sharedCurrentDate;

    const currentYear = computed(() => currentDate.value.getFullYear());
    const currentMonth = computed(() => currentDate.value.getMonth());

    let lastIsMobile = typeof window !== 'undefined' ? window.innerWidth < 576 : false;

    const handleResize = () => {
      const isMobile = window.innerWidth < 576;
      if (isMobile && !lastIsMobile) {
        viewMode.value = "year";
      }
      lastIsMobile = isMobile;
    };

    onMounted(() => {
      document.title = "活動行事曆 - 未央樂集";
      if (lastIsMobile) {
        viewMode.value = "year";
      }
      window.addEventListener("resize", handleResize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    const weekdays = ["日", "一", "二", "三", "四", "五", "六"];

    const calendarDays = computed(() => {
      const year = currentYear.value;
      const month = currentMonth.value;
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const days = [];
      const startingDayOfWeek = firstDay.getDay();
      const prevMonthLastDay = new Date(year, month, 0).getDate();

      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const d = prevMonthLastDay - i;
        days.push(createDayObject(new Date(year, month - 1, d), false));
      }

      for (let d = 1; d <= lastDay.getDate(); d++) {
        days.push(createDayObject(new Date(year, month, d), true));
      }

      const remaining = 42 - days.length;
      for (let d = 1; d <= remaining; d++) {
        days.push(createDayObject(new Date(year, month + 1, d), false));
      }

      return days;
    });

    const yearMonths = computed(() => {
      const year = currentYear.value;
      const months = [];
      for (let m = 0; m < 12; m++) {
        const events = allNews.value.filter((news) => {
          const newsDate = new Date(news.date);
          return newsDate.getFullYear() === year && newsDate.getMonth() === m;
        });

        // Sort events by date inside the month
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        months.push({
          monthNumber: m + 1,
          monthName: `${m + 1}月`,
          events,
        });
      }
      return months;
    });

    function createDayObject(dateObj, isCurrentMonth) {
      const dateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
      const events = allNews.value.filter((news) => news.date === dateStr);

      const today = new Date();
      const isToday =
        today.getFullYear() === dateObj.getFullYear() &&
        today.getMonth() === dateObj.getMonth() &&
        today.getDate() === dateObj.getDate();

      return {
        date: dateObj,
        dateStr,
        dayNumber: dateObj.getDate(),
        isCurrentMonth,
        isToday,
        events,
      };
    }

    function next() {
      if (isNextDisabled.value) return;
      if (viewMode.value === "month") {
        currentDate.value = new Date(
          currentYear.value,
          currentMonth.value + 1,
          1,
        );
      } else {
        currentDate.value = new Date(
          currentYear.value + 1,
          currentMonth.value,
          1,
        );
      }
    }

    function prev() {
      if (isPrevDisabled.value) return;
      if (viewMode.value === "month") {
        currentDate.value = new Date(
          currentYear.value,
          currentMonth.value - 1,
          1,
        );
      } else {
        currentDate.value = new Date(
          currentYear.value - 1,
          currentMonth.value,
          1,
        );
      }
    }

    function goToToday() {
      currentDate.value = new Date();
      viewMode.value = "month";
    }

    function selectMonth(monthIndex) {
      if (isMonthDisabled(monthIndex)) return;
      currentDate.value = new Date(currentYear.value, monthIndex, 1);
      viewMode.value = "month";
    }

    function isMonthDisabled(monthIndex) {
      const targetYear = currentYear.value;
      const minInfo = minDateInfo.value;
      const maxInfo = maxDateInfo.value;
      
      if (targetYear < minInfo.year || (targetYear === minInfo.year && monthIndex < minInfo.month)) return true;
      if (targetYear > maxInfo.year || (targetYear === maxInfo.year && monthIndex > maxInfo.month)) return true;
      return false;
    }

    function getEventTypeLabel(type) {
      switch (type) {
        case "performance":
          return "演出";
        case "seminar":
          return "講座";
        default:
          return "";
      }
    }

      return {
        viewMode,
        currentYear,
        currentMonth,
        weekdays,
        calendarDays,
        yearMonths,
        next,
        prev,
        goToToday,
        selectMonth,
        isMonthDisabled,
        getEventTypeLabel,
        isPrevDisabled,
        isNextDisabled,
      };
    },
  };
</script>

<style lang="scss" scoped>
.calendar-view {
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

.serif-title {
  font-family: serif;
  letter-spacing: 0.1rem;
}

.border-white-10 {
  border-color: rgba(255, 255, 255, 0.1) !important;
}

.calendar-container {
  background-color: #1a1e23;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.calendar-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.calendar-header-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.title-container {
  line-height: 1.3;
}

.calendar-header-right {
  display: flex;
  justify-content: center;
}

.calendar-nav-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
}

.custom-view-toggle {
  color: rgba(255, 255, 255, 0.6);
  border-color: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;

  &:hover {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
  }
}

.btn-check:checked+.custom-view-toggle {
  color: #fff;
  background-color: var(--bs-primary);
  border-color: var(--bs-primary);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 1px;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  overflow: hidden;
}

.weekday-header {
  text-align: center;
  padding: 1rem 0;
  color: rgba(255, 255, 255, 0.6);
  background-color: #1a1e23;
  font-weight: bold;
}

.calendar-day {
  background-color: #0c0f12;
  min-height: 100px;
  padding: 0.5rem;
  transition: background-color 0.2s;
  min-width: 0;

  @media (min-width: 768px) {
    min-height: 120px;
  }

  &.other-month {
    background-color: rgba(12, 15, 18, 0.5);

    .day-number {
      opacity: 0.3;
    }
  }

  &.is-today .day-number {
    background-color: var(--bs-danger);
    color: white;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
}

.day-number {
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  transition: all 0.3s;
}

.events-container {
  margin-top: 0.25rem;
}

.event-badge {
  display: block;
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  white-space: normal;
  word-break: break-word;
  line-height: 1.4;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s;
  color: #fff !important;
  font-weight: 500;

  &.event-performance {
    background-color: var(--bs-success);
    border-left: 3px solid rgba(255, 255, 255, 0.7);
  }

  &.event-seminar {
    background-color: var(--bs-info);
    border-left: 3px solid rgba(255, 255, 255, 0.7);
  }

  &:hover {
    filter: brightness(1.2);
    transform: translateX(2px);
  }
}

.year-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.month-card {
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
  height: 100%;

  &:hover {
    background-color: rgba(255, 255, 255, 0.06);
    transform: translateY(-5px);
  }

  &.has-events {
    border-color: rgba(var(--bs-primary-rgb), 0.5);
    background-color: rgba(var(--bs-primary-rgb), 0.05);

    &:hover {
      background-color: rgba(var(--bs-primary-rgb), 0.1);
    }
  }

  &.disabled {
    opacity: 0.3;
    pointer-events: none;
  }
}

.month-card-title {
  font-size: 1.3rem;
  color: #fff;
  font-family: serif;
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
