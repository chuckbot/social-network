import axios from "axios";

const state = {
  local_coms: null,
};
const getters = {
  get_local_coms(state) {
    return state.local_coms;
  },
};
const mutations = {
  set_local_coms(state, coms) {
    state.local_coms = coms;
  },
  add_local_com(state, com) {
    state.local_coms.push(com);
  },
  remove_local_com(state, comId) {
    state.local_coms = state.local_coms.filter((com) => com[comId] !== comId);
  },
};

const actions = {
  commit_local_coms({ commit }, postId) {
    axios
      .get(`/comments/${postId}`)
      .then((res) => {
        commit("set_local_coms", res.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  create_com({ commit }, comObj) {
    axios
      .post(`/comments/${comObj.postId}`, { text: comObj.com })
      .then((res) => {
        commit("add_local_com", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  delete_my_com({ commit }, comId) {
    axios
      .delete(`/comments/${comId}`)
      .then(() => {
        commit("remove_local_com", comId);
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
