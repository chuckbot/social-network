import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "app",
    redirect: "/home",
    component: () => import("../App.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { guest: true },
  },
  {
    path: "/my-profile/:userId",
    name: "my-profile",
    component: () => import("../views/MyProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:userId",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profiles",
    name: "profiles",
    component: () => import("../views/Profiles.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/moderate-profile/:userId",
    name: "moderate-profile",
    component: () => import("../views/ModerateProfile.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:postId",
    name: "post",
    component: () => import("../views/Post.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post",
    name: "create-post",
    component: () => import("../views/CreatePost.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/post/modify/:postId",
    name: "modify-post",
    component: () => import("../views/ModifyPost.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
