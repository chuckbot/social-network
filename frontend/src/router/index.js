import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "app",
    component: () => import("../App.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/my-profile/:userId",
    name: "my-profile",
    component: () => import("../views/MyProfile.vue"),
  },
  {
    path: "/profile/:userId",
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/profiles",
    name: "profiles",
    component: () => import("../views/Profiles.vue"),
  },
  {
    path: "/post/:postId",
    name: "post",
    component: () => import("../views/Post.vue"),
  },
  {
    path: "/post",
    name: "create-post",
    component: () => import("../views/CreatePost.vue"),
  },
  {
    path: "/post/modify/:postId",
    name: "modify-post",
    component: () => import("../views/ModifyPost.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
