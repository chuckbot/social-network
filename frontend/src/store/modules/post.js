import axios from "axios";
import router from "../../router";
import { formatDate } from "../../scripts/date";

const state = {
  posts: null,
  post: null,
  myPosts: null,
};
const getters = {
  get_local_posts(state) {
    return state.posts;
  },
  get_local_post(state) {
    return state.post;
  },
  get_my_posts(state) {
    return state.myPosts;
  },
  get_my_post: (state) => (postId) => {
    return state.myPosts.find((post) => post.id === postId);
  },
  get_local_post_date: (state) => (postId) => {
    const post = state.posts.find((post) => post.id === postId);
    const dates = {
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
    return formatDate(dates);
  },
  get_nb_of_com: (state) => (postId) => {
    return state.posts.find((post) => post.id === postId).Comments
      ? state.posts.find((post) => post.id === postId).Comments.length
      : "0";
  },
  get_com_post_from_user: (state) => (profileId) => {
    const posts = [];
    for (const post of state.posts) {
      if (post.Comments.find((com) => com.profileId === profileId)) {
        posts.push(post);
      }
    }
    return posts;
  },
};
const mutations = {
  set_local_posts(state, posts) {
    state.posts = posts;
  },
  add_local_post(state, post) {
    state.posts.push(post);
  },
  set_local_post(state, post) {
    state.post = post;
  },
  set_my_posts(state, posts) {
    state.myPosts = posts;
  },
  add_my_post(state, post) {
    state.myPosts.push(post);
  },
  update_my_posts(state, postObj) {
    state.myPosts[
      state.myPosts.findIndex((post) => post.id === postObj.postId)
    ] = postObj.post;
  },
  remove_my_post(state, postId) {
    state.myPosts = state.myPosts.filter((post) => post.id !== postId);
    state.posts = state.posts.filter((post) => post.id !== postId);
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
        commit("set_local_post", res.data.post);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  commit_my_posts({ commit }, profileId) {
    axios
      .get(`/posts/user/${profileId}`)
      .then((res) => {
        commit("set_my_posts", res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  create_modify_post({ commit }, postObj) {
    const formData = new FormData();
    if (postObj.form.image) {
      formData.append("image", postObj.form.image);
    }
    formData.append("title", postObj.form.title);
    formData.append("type", postObj.form.type);
    formData.append("text", postObj.form.text);
    formData.append("isImportant", postObj.form.isImportant);
    if (postObj.route.name === "create-post") {
      axios
        .post("/posts", formData)
        .then((res) => {
          router.push({ name: "home" });
          commit("add_my_post", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(`/posts/${postObj.route.params.postId}`, formData)
        .then((res) => {
          commit("update_my_posts", { postId: res.data.id, post: res.data });
          router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  delete_my_post({ commit }, postId) {
    axios
      .delete(`/posts/${postId}`)
      .then(() => {
        commit("remove_my_post", postId);
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
