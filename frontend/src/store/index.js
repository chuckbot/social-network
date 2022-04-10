import { createStore } from "vuex";
import createPersistedStore from "vuex-persistedstate";

// Modules
import app from "./modules/app";
import auth from "./modules/auth";
import profile from "./modules/profile";
import post from "./modules/post";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  modules: {
    app,
    auth,
    profile,
    post,
  },
  plugins: [createPersistedStore()],
});
