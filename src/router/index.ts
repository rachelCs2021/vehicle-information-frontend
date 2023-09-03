import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/pages/HomePage.vue"),
      },
      {
        path: "/newCar",
        name: "NewCar",
        component: () => import("@/pages/NewCarPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
