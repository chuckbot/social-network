<template>
  <div id="signup" class="bg--white sign">
    <h1 class="title--main text--center">S'inscrire</h1>
    <p class="text--normal-w text--center text--small-f">
      Join hundreds of Groupomaniacs on your company's social network!
    </p>
    <FormSignup></FormSignup>
    <p class="text--normal-w text--small-f text--center">
      Already registered?
      <a href="" @click.prevent="changeSignView()">Log in!</a>
    </p>
  </div>
</template>

<script>
import FormSignup from "../components/forms/FormSignup.vue";
export default {
  name: "Signup",
  el: "#signup",
  components: {
    FormSignup,
  },
  methods: {
    changeSignView() {
      this.$store.dispatch("change_sign_in_up");
    },
  },
};
</script>
