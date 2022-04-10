const state = {
  sign_in_up: true,
};
const getters = {
  get_sign_in_up(state) {
    return state.sign_in_up;
  },
};
const mutations = {
  set_sign_in_up(state) {
    state.sign_in_up = !state.sign_in_up;
  },
};
const actions = {
  change_sign_in_up({ commit }) {
    commit("set_sign_in_up");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
