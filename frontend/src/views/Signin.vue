<template>
  <div id="signin">
    <h1>Connexion</h1>
    <p>Description</p>
    <FormSignin></FormSignin>
    <p>
      Not registered yet?
      <a href @click.prevent="changeSignView()">Sign up!</a>
    </p>
  </div>
</template>

<script>
import FormSignin from "../components/forms/FormSignin.vue";
export default {
  name: "Signin",
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
