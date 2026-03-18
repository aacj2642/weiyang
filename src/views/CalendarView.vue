<template>
  <div class="calendar-view">
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
      <div class="calendar-container shadow-lg">
        <!-- Calendar Header -->
        <div class="calendar-header">
          <div class="d-flex align-items-center gap-3">
            <button @click="prev" class="calendar-nav-btn">
              <i class="bi bi-chevron-left"></i>
            </button>
            <h3 class="m-0 text-white fw-bold serif-title" style="min-width: 150px; text-align: center;">
              {{ displayTitle }}
            </h3>
            <button @click="next" class="calendar-nav-btn">
              <i class="bi bi-chevron-right"></i>
            </button>
            <button @click="goToToday" class="btn btn-outline-light btn-sm ms-2 rounded-pill px-3">
              今天
            </button>
          </div>

          <div class="btn-group" role="group">
            <input type="radio" class="btn-check" name="viewMode" id="monthView" value="month" v-model="viewMode">
            <label class="btn custom-view-toggle" for="monthView">月</label>

            <input type="radio" class="btn-check" name="viewMode" id="yearView" value="year" v-model="viewMode">
            <label class="btn custom-view-toggle" for="yearView">年</label>
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
            <div v-for="(day, index) in calendarDays" :key="index" class="calendar-day"
              :class="{ 'other-month': !day.isCurrentMonth, 'is-today': day.isToday }">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="day-number">{{ day.dayNumber }}</span>
              </div>

              <!-- Events -->
              <div class="events-container d-flex flex-column gap-1">
                <RouterLink v-for="event in day.events" :key="event.id" :to="'/news/' + event.id" class="event-badge"
                  :class="event.type === 'performance' ? 'event-performance' : 'event-seminar'"
                  :title="`${getEventTypeLabel(event.type)}-${event.title}`">
                  {{ event.time.split('-')[0] }} {{ event.title }}
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Year View -->
        <div v-if="viewMode === 'year'" class="year-view-wrapper">
          <div class="year-grid">
            <div v-for="monthItem in yearMonths" :key="monthItem.monthNumber" class="month-card"
              :class="{ 'has-events': monthItem.events.length > 0 }" @click="selectMonth(monthItem.monthNumber - 1)">

              <div class="d-flex justify-content-between align-items-center mb-3 border-bottom border-white-10 pb-2">
                <h4 class="month-card-title m-0">{{ monthItem.monthName }}</h4>
                <span v-if="monthItem.events.length > 0" class="badge bg-primary rounded-pill">
                  {{ monthItem.events.length }} 則活動
                </span>
              </div>

              <div v-if="monthItem.events.length > 0" class="month-events-preview d-flex flex-column gap-2">
                <div v-for="event in monthItem.events.slice(0, 3)" :key="event.id"
                  class="text-white-50 small text-truncate">
                  <span class="text-primary me-2">•</span>{{ getEventTypeLabel(event.type) }}-{{ event.title }}
                </div>
                <div v-if="monthItem.events.length > 3" class="text-white-50 small fst-italic mt-1">
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
import { ref, computed } from "vue";
import { useNewsStore } from "../stores/newsStore";

const sharedViewMode = ref("month");
const sharedCurrentDate = ref(new Date());

export default {
  name: "CalendarView",
  setup() {
    const newsStore = useNewsStore();
    const allNews = computed(() => newsStore.allNews);

    const viewMode = sharedViewMode;
    const currentDate = sharedCurrentDate;

    const currentYear = computed(() => currentDate.value.getFullYear());
    const currentMonth = computed(() => currentDate.value.getMonth());

    const displayTitle = computed(() => {
      if (viewMode.value === "month") {
        return `${currentYear.value} 年 ${currentMonth.value + 1} 月`;
      }
      return `${currentYear.value} 年`;
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
        const events = allNews.value.filter(news => {
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
      const events = allNews.value.filter(news => news.date === dateStr);

      const today = new Date();
      const isToday = today.getFullYear() === dateObj.getFullYear() &&
        today.getMonth() === dateObj.getMonth() &&
        today.getDate() === dateObj.getDate();

      return {
        date: dateObj,
        dateStr,
        dayNumber: dateObj.getDate(),
        isCurrentMonth,
        isToday,
        events
      };
    }

    function next() {
      if (viewMode.value === "month") {
        currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1);
      } else {
        currentDate.value = new Date(currentYear.value + 1, currentMonth.value, 1);
      }
    }

    function prev() {
      if (viewMode.value === "month") {
        currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1);
      } else {
        currentDate.value = new Date(currentYear.value - 1, currentMonth.value, 1);
      }
    }

    function goToToday() {
      currentDate.value = new Date();
      viewMode.value = "month";
    }

    function selectMonth(monthIndex) {
      currentDate.value = new Date(currentYear.value, monthIndex, 1);
      viewMode.value = "month";
    }

    function getEventTypeLabel(type) {
      switch (type) {
        case "performance":
          return "音樂會";
        case "seminar":
          return "講座";
        default:
          return "";
      }
    }

    return {
      viewMode,
      displayTitle,
      weekdays,
      calendarDays,
      yearMonths,
      next,
      prev,
      goToToday,
      selectMonth,
      getEventTypeLabel
    };
  },
};
</script>

<style lang="scss" scoped>
.calendar-view {
  background-color: #0c0f12;
  animation: fadeIn 0.8s ease-out;
  min-height: 100vh;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
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

  &:hover {
    background: rgba(255, 255, 255, 0.1);
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
  grid-template-columns: repeat(7, 1fr);
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
    background-color: var(--bs-primary);
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
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
