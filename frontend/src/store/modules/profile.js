import axios from "axios";
import router from "../../router";

const state = {
  updateProfile: false,
  local_profile: null,
  local_profiles: null,
};

const getters = {
  get_update_status(state) {
    return state.updateProfile;
  },
  get_local_profile(state) {
    return state.local_profile;
  },
  get_local_profiles(state) {
    return state.local_profiles;
  },
};

const mutations = {
  set_update_status(state) {
    state.updateProfile = !state.updateProfile;
  },
  set_local_profile(state, profile) {
    state.local_profile = profile;
  },
  set_local_profiles(state, profiles) {
    state.local_profiles = profiles;
  },
};

const actions = {
  commit_update_status({ commit }) {
    commit("set_update_status");
  },
  update_profile({ commit, dispatch }, data) {
    const formData = new FormData();
    if (data.form.image) {
      formData.append("image", data.form.image);
    }
    formData.append("firstName", data.form.firstName);
    formData.append("lastName", data.form.lastName);
    formData.append("position", data.form.position);
    formData.append("description", data.form.description);
    axios
      .put(`/users/${data.userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        axios
          .get(`users/${data.userId}`)
          .then((res) => {
            commit("set_user_profile", res.data);
            dispatch("change_profile_status", true);
            commit("set_update_status");
          })
          .catch((error) => {
            console.log(error.toJSON());
          });
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  },
  get_one_profile({ commit }, userId) {
    axios
      .get(`/users/${userId}`)
      .then((res) => {
        commit("set_local_profile", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  get_all_profiles({ commit }) {
    axios
      .get(`/users`)
      .then((res) => {
        commit("set_local_profiles", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  go_to_profile({ dispatch }, idObj) {
    if (idObj.local_user_id === idObj.target_id) {
      router.push({
        name: "my-profile",
        params: { userId: idObj.local_user_id },
      });
    } else {
      dispatch("get_one_profile", idObj.target_id)
        .then(() => {
          router.push({ name: "profile", params: { userId: idObj.target_id } });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};

export default { state, getters, mutations, actions };
