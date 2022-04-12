<template>
  <div id="signin" class="bg--white sign">
    <h1 class="title--main text--center">Sign in</h1>
    <p class="text--normal-w text--center text--small-f">
      Already registered on Groupomania?<br />
      Connect to your favorite social network!
    </p>
    <FormSignin></FormSignin>
    <p class="text--normal-w text--small-f text--center">
      Not registered yet?
      <a href="" @click.prevent="changeSignView()">Sign up!</a>
    </p>
  </div>
</template>

<script>
import FormSignin from "../components/forms/FormSignin.vue";
export default {
  name: "SignIn",
  el: "#signin",
  components: {
    FormSignin,
  },
  methods: {
    changeSignView() {
      this.$store.dispatch("change_sign_in_up");
    },
  },
};
</script>

<style lang="scss"></style>
