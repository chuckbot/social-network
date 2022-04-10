<template>
  <div id="app">
    <div v-if="isLoggedIn">
      <!-- <Home></Home> -->
      <Nav></Nav>
      <router-view></router-view>
    </div>
    <div v-else>
      <Signin v-if="signin"></Signin>
      <Signup v-else></Signup>
    </div>
  </div>
</template>

<script>
import Signin from "./views/Signin.vue";
import Signup from "./views/Signup.vue";
// import Home from "./views/Home";
import Nav from "./components/Nav.vue";

export default {
  name: "App",
  el: "#app",
  components: {
    Signin,
    Signup,
    // Home,
    Nav,
  },
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
  methods: {},
  // created() {
  //   if() {}
  // }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
