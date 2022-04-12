<template>
  <div id="formsignin">
    <p
      v-if="error.invalidCredentials"
      class="text--small-f text--normal-w text--error text--center"
    >
      {{ label.invalidCredentials }}
    </p>
    <form
      @submit.prevent="logIn()"
      @input="submitValidation()"
      class="ctn ctn--column form"
    >
      <div class="ctn--input">
        <label for="email" class="text--label text--normal-f text--normal-w box"
          >E-mail</label
        >
        <input
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          required
          v-model="form.email"
          @input="emailValidation()"
          placeholder="exemple@groupomania.fr"
          class="input input--sign box text--normal-f text--light-w"
        />
      </div>
      <p
        v-if="validator.email"
        class="text--normal-f text--bold-w text--error text--center"
      >
        Invalid email.
      </p>
      <div class="ctn--input">
        <label for="password" class="text--label text--normal-f text--normal-w box"
          >Password</label
        >
        <input
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          required
          v-model="form.password"
          class="input box text--normal-f text--light-w"
        />
      </div>
      <SubmitButton :label="label.submit" :disabled="disableSubmit" class="ctn" />
    </form>
  </div>
</template>

<script>
// import trimAll from "../../scripts/triming"
import SubmitButton from "../buttons/SubmitButton.vue";
import { mapActions } from "vuex";
import { validateEmail, validateForm } from "../../scripts/validate";
export default {
  name: "FormSignin",
  el: "#formsignin",
  components: {
    SubmitButton,
  },
  data() {
    return {
      label: {
        submit: "Connection",
        invalidCredentials: "Incorrect password or email.",
      },
      form: {
        email: "",
        password: "",
      },
      validator: {
        email: false,
      },
      error: {
        invalidCredentials: false,
      },
      disableSubmit: true,
    };
  },
  computed: {},
  methods: {
    emailValidation() {
      this.validator.email = validateEmail(this.form.email);
    },
    submitValidation() {
      this.disableSubmit = validateForm(this.validator, this.form);
    },
    ...mapActions(["sign_in"]),
    logIn() {
      this.sign_in(this.form).then((res) => {
        !res
          ? (this.error.invalidCredentials = true)
          : (this.error.invalidCredentials = false);
      });
    },
  },
};
</script>
