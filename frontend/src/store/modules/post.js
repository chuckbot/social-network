import axios from "axios";

const state = {
  posts: null,
  post: null,
};
const getters = {
  get_local_posts(state) {
    return state.posts;
  },
  get_local_post(state) {
    return state.post;
  },
};
const mutations = {
  set_local_posts(state, posts) {
    state.posts = posts;
  },
  set_local_post(state, post) {
    state.post = post;
  },
};
const actions = {
  commit_local_posts({ commit }) {
    axios
      .get("/posts")
      .then((res) => {
        commit("set_local_posts", res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  commit_local_post({ commit }, postId) {
    axios
      .get(`/posts/${postId}`)
      .then((res) => {
        console.log(res.data);
        commit("set_local_post", res.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
