import axios from "axios";
import router from "../../router/index";
const state = {
  user: {
    email: null,
    _id: null,
    profileFilled: null,
    profile: {
      firstName: null,
      lastName: null,
      position: undefined,
      description: null,
      profilePictureURL: null,
    },
  },
};
const getters = {
  is_logged_in(state) {
    return state.user._id !== null ? true : false;
  },
  get_user_id(state) {
    return state.user._id;
  },
  get_user_email(state) {
    return state.user.email;
  },
  get_user_profile(state) {
    return state.user.profile;
  },
  get_profile_status(state) {
    return state.user.profileFilled;
  },
  get_profile_id(state) {
    return state.user.profile.id;
  },
};
const mutations = {
  set_user_email(state, email) {
    state.user.email = email;
  },
  set_user_id(state, id) {
    state.user._id = id;
  },
  set_user_profile(state, data) {
    state.user.profile = { ...data };
  },
  set_profile_status(state, payload) {
    state.user.profileFilled = payload;
  },
  log_out(state) {
    state.user = {
      email: null,
      _id: null,
      profile: {
        firstName: null,
        lastName: null,
        position: null,
        description: null,
        profilePictureURL: null,
      },
    };
  },
};
const actions = {
  sign_up({ dispatch }, form) {
    const data = { email: form.email, password: form.password };
    axios
      .post("/signup", data)
      .then(() => {
        dispatch("sign_in", data);
      })
      .catch((error) => {
        return error;
      });
  },
  sign_in({ commit, state, dispatch }, form) {
    axios
      .post("/signin", form)
      .then((res) => {
        // Set user email and userId.
        commit("set_user_email", form.email);
        commit("set_user_id", res.data.userId);
        // Set profile if it exist, else redirect to profil completion view.
        axios
          .get(`users/${state.user._id}`)
          .then((res) => {
            if (res.data.profile.firstName) {
              // Set user profile
              dispatch("change_profile_status", true);
              commit("set_user_profile", res.data.profile);
              router.push({ name: "home" });
            } else {
              dispatch("change_profile_status", false);
              router.push({
                name: "profile",
                params: { userId: state.user._id },
              });
            }
          })
          .catch((error) => {
            return error;
          });
      })
      .catch((error) => {
        return error;
      });
  },
  logout({ commit }) {
    commit("log_out");
    axios
      .delete("/logout")
      .then(() => {
        console.log("Bye Bye !");
      })
      .catch((error) => {
        console.log(error);
      });
  },
  change_profile_status({ commit }, payload) {
    commit("set_profile_status", payload);
  },
  change_pwd({ state }, form) {
    axios
      .post("/signin", { email: state.user.email, password: form.oldPassword })
      .then(() => {
        if (form.password != form.passwordConf) {
          return false;
        } else {
          axios
            .put(`/${state.user._id}`, { password: form.password })
            .then(() => {
              return true;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch(() => {
        return undefined;
      });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
