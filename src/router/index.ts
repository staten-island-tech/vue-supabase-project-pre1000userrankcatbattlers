// import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: HomeView,
//     },
//     {
//       path: "/login",
//       name: "login",
//       component: () => import("../views/LoginPage.vue"),
//     },
//     {
//       path: "/book",
//       name: "book",
//       component: () => import("../views/BookRec.vue"),
//     },
//   ],
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/book",
      name: "book",
      component: () => import("../views/BookRec.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: () => import("../views/CreateRecipe.vue"),
    },
  ],
});

export default router;
