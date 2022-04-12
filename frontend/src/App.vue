<template>
  <div id="app" class="main ctn">
    <div v-if="isLoggedIn" class="ctn--main-view">
      <NavBar></NavBar>
      <router-view></router-view>
    </div>
    <div v-else class="ctn--sign">
      <SignIn v-if="signin"></SignIn>
      <SignUp v-else></SignUp>
    </div>
  </div>
</template>

<script>
import SignIn from "./views/Signin.vue";
import SignUp from "./views/Signup.vue";
import NavBar from "./components/Nav.vue";
export default {
  name: "App",
  el: "#app",
  components: {
    SignIn,
    SignUp,
    NavBar,
  },
  beforeCreate() {},
  data() {
    return {};
  },
  computed: {
    signin() {
      return this.$store.getters.get_sign_in_up;
    },
    isLoggedIn() {
      return this.$store.getters.is_logged_in;
    },
  },
};
</script>

<style lang="scss">
@import "./src/style/global.scss";
</style>
