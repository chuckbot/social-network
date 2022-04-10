<template>
  <div id="formsignup">
    <form @submit.prevent="signup()" @input="submitValidation()">
      <div>
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          autocomplete="email"
          required
          v-model="form.email"
          @input="emailValidation()"
          placeholder="exemple@mail.com"
        />
        <span v-if="validator.email"
          >Invalid email, must be of the form: exemple@mail.com</span
        >
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          required
          v-model="form.password"
          @input="passwordValidation()"
        />
        <span v-if="validator.password">
          Invalid password, must contain at least 1 capital letter, a miniscule, a number,
          a special character and between 8 and 16 characters.
        </span>
      </div>
      <div>
        <label for="passwordConf">Confirm your password:</label>
        <input
          type="password"
          id="passwordConf"
          name="passwordConf"
          autocomplete="new-password"
          required
          v-model="form.passwordConf"
          @input="passwordConfValidation()"
        />
      </div>
      <SubmitButton :label="label.submit" :disabled="disableSubmit" />
    </form>
  </div>
</template>

<script>
import SubmitButton from "../buttons/SubmitButton.vue";
import { mapActions } from "vuex";
import {
  validateEmail,
  validatePassword,
  validatePasswordConf,
  validateForm,
} from "../../scripts/validate";

export default {
  name: "FormSignup",
  el: "#formsignup",
  components: {
    // EmailInput,
    SubmitButton,
  },
  data() {
    return {
      label: {
        submit: "Inscription",
      },
      form: {
        email: "",
        password: "",
        passwordConf: "",
      },
      validator: {
        email: false,
        password: false,
        passwordConf: false,
      },
      disableSubmit: true,
    };
  },
  computed: {},
  methods: {
    emailValidation() {
      this.validator.email = validateEmail(this.form.email);
    },
    passwordValidation() {
      this.validator.password = validatePassword(this.form.password);
    },
    passwordConfValidation() {
      this.validator.passwordConf = validatePasswordConf(
        this.form.password,
        this.form.passwordConf
      );
    },
    submitValidation() {
      this.disableSubmit = validateForm(this.validator, this.form);
    },
    ...mapActions(["sign_up"]),
    signup() {
      this.sign_up(this.form);
    },
  },
};
</script>
