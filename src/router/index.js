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
      path: "/member",
      name: "member",
      component: () => import("../views/MemberView.vue"),
    },
    {
      path: "/member/:id",
      name: "member-detail",
      component: () => import("../views/MemberDetailView.vue"),
    },
  ],
});

export default router;
