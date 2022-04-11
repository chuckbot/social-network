import axios from "axios";
import { formatDate } from "../../scripts/date";

const state = {
  local_coms: null,
  change_com: false,
};
const getters = {
  get_local_coms(state) {
    return state.local_coms;
  },
  get_change_com_status(state) {
    return state.change_com;
  },
  get_local_com_date: (state) => (comId) => {
    const com = state.local_coms.find((com) => com.id === comId);
    const dates = {
      createdAt: com.createdAt,
      updatedAt: com.updatedAt,
    };
    return formatDate(dates);
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
    state.local_coms = state.local_coms.filter((com) => com.id !== comId);
  },
  update_local_com(state, comObj) {
    state.local_coms[
      state.local_coms.findIndex((com) => com.id === comObj.comId)
    ] = comObj.com;
  },
  set_change_com(state) {
    state.change_com = !state.change_com;
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
  modify_my_com({ commit }, comObj) {
    axios
      .put(`/comments/${comObj.postId}`, {
        text: comObj.text,
        comId: comObj.comId,
      })
      .then((res) => {
        commit("update_local_com", {
          com: res.data,
          comId: res.data.id,
        });
      })
      .catch((error) => {
        console.log(error.toJSON());
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
  commit_change_com({ commit }) {
    commit("set_change_com");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
