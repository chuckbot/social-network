<template>
  <div id="app" class="main ctn">
    <div v-if="isLoggedIn" class="ctn--main-view">
      <Nav></Nav>
      <router-view></router-view>
    </div>
    <div v-else class="ctn--sign">
      <Signin v-if="signin"></Signin>
      <Signup v-else></Signup>
    </div>
  </div>
</template>

<script>
import Signin from "./views/Signin.vue";
import Signup from "./views/Signup.vue";
import Nav from "./components/Nav.vue";
export default {
  name: "App",
  el: "#app",
  components: {
    Signin,
    Signup,
    Nav,
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
