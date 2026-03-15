import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/member/:id",
      name: "member-detail",
      component: () => import("../views/MemberDetailView.vue"),
    },
    {
      path: "/member",
      name: "member",
      component: () => import("../views/MemberView.vue"),
    },
    {
      path: "/all-news",
      name: "all-news",
      component: () => import("../views/NewsListView.vue"),
    },
    {
      path: "/performance-news",
      name: "performance-news",
      component: () => import("../views/NewsListView.vue"),
    },
    {
      path: "/seminar-news",
      name: "seminar-news",
      component: () => import("../views/NewsListView.vue"),
    },
    {
      path: "/news/:id",
      name: "news-detail",
      component: () => import("../views/NewsDetailView.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../views/CalendarView.vue"),
    },
    {
      path: "/performance",
      name: "performance-video",
      component: () => import("../views/PerformanceVideoView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: "instant",
      };
    }
  },
});

export default router;
