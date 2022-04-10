<template>
  <div id="nav">
    <router-link :to="pathToHome">News Feed </router-link>
    <router-link :to="pathToCreatePost">Create a Post</router-link>
    <router-link :to="pathToProfile">My Profile</router-link>
    <router-link to="/" @click="logout()">Logout</router-link>
  </div>
</template>
<script>
export default {
  name: "Nav",
  el: "#nav",
  data() {
    return {
      pathToHome: { name: "home" },
      pathToProfile: {
        name: "profile",
        params: { userId: this.$store.getters.get_user_id },
      },
      pathToCreatePost: { name: "create-post" },
    };
  },
  computed: {},
  created() {},
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
