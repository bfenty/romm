// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import("@/views/Dashboard/Base.vue"),
      },
      {
        path: "/platform/:platform",
        name: "platform",
        component: () => import("@/views/Gallery/Base.vue"),
      },
      {
        path: "/platform/:platform/:rom",
        name: "rom",
        component: () => import("@/views/Details/Base.vue"),
      },
      {
        path: "/library/scan",
        name: "scan",
        component: () => import("@/views/Library/Scan.vue"),
      },
      {
        path: "/settings/control-panel",
        name: "controlPanel",
        component: () => import("@/views/Settings/ControlPanel.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "noMatch",
        component: () => import("@/views/Dashboard/Base.vue"),
      },
    ],
  },
  {
    path: "/play/:platform/:rom",
    component: () => import("@/views/Play.vue"),
  }
];

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
