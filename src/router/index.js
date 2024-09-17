import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AiChatView from "../views/AiChatView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/ai-chat",
    name: "ai-chat",
    component: AiChatView,
    meta: { requiresAuth: true }, // Requires authentication to access
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next("/"); // Redirect to home if not authenticated
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
