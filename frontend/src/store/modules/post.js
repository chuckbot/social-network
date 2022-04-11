import axios from "axios";
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
    return state.myPosts.find((post) => post[postId] === postId);
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
  remove_my_post(state, postId) {
    state.myPosts = state.myPosts.filter((post) => post[postId] !== postId);
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
    console.log(postObj);
    const formData = new FormData();
    if (postObj.form.image) {
      formData.append("image", postObj.form.image);
    }
    formData.append("title", postObj.form.title);
    formData.append("type", postObj.form.type);
    formData.append("text", postObj.form.text);
    formData.append("isImportant", postObj.form.isImportant);
    console.log(formData);
    if (postObj.route.name === "create-post") {
      this.axios
        .post("/posts", formData)
        .then((res) => {
          this.$router.push({ name: "home" });
          commit("add_my_post", res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.axios
        .put(`/posts/${postObj.route.params.postId}`, formData)
        .then(() => {
          this.$router.push({ name: "home" });
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
        console.log(`Post ${postId} supprimé.`);
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
