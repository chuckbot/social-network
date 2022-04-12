<template>
  <div id="form-pwd">
    <form
      class="ctn ctn--column ctn--space-between"
      v-if="!success"
      @submit.prevent="changePwd()"
      @input="submitValidation()"
    >
      <div
        v-if="!isAdminRoute"
        class="text--normal-f text--normal-w text--label ctn--column input-wrap"
      >
        <label for="oldPassword">Old password</label>
        <input
          class="input text--normal-f text--light-w"
          type="password"
          id="oldPassword"
          name="oldPassword"
          autocomplete="password"
          required
          v-model="form.oldPassword"
        />
      </div>
      <div class="text--normal-f text--normal-w text--label ctn--column input-wrap">
        <label for="password">New password</label>
        <input
          class="input text--normal-f text--light-w"
          type="password"
          id="password"
          name="password"
          autocomplete="new-password"
          required
          v-model="form.password"
          @input="passwordValidation()"
        />
      </div>
      <p
        v-if="validator.password"
        class="text--center text--error text--small-f text--bold-w"
      >
        Invalid password, must contain at least 1 capital letter, one miniscule, a number,
        a special character and between 8 and 16 characters.
      </p>
      <div class="text--normal-f text--normal-w text--label ctn--column input-wrap">
        <label for="passwordConf">Confirm your password</label>
        <input
          class="input text--normal-f text--light-w"
          type="password"
          id="passwordConf"
          name="passwordConf"
          autocomplete="new-password"
          required
          v-model="form.passwordConf"
          @input="passwordConfValidation()"
        />
      </div>
      <p
        v-if="validator.passwordConf"
        class="text--center text--error text--small-f text--bold-w"
      >
        Different passwords.
      </p>
      <SubmitButton :label="label.submit" :disabled="disableSubmit" />
    </form>
    <p v-else class="text--center text--normal-f text--bold-w">
      Password changed successfully!
    </p>
  </div>
</template>

<script>
// import trimAll from "../../scripts/triming"
import {
  validatePassword,
  validatePasswordConf,
  validateForm,
} from "../../scripts/validate";
import SubmitButton from "../buttons/SubmitButton.vue";
import { mapActions } from "vuex";
export default {
  name: "FormPwd",
  el: "#form-pwd",
  components: {
    SubmitButton,
  },
  data() {
    return {
      label: {
        submit: "Change password",
      },
      form: {
        oldPassword: "",
        password: "",
        passwordConf: "",
      },
      validator: {
        password: false,
        passwordConf: false,
      },
      disableSubmit: true,
      success: false,
    };
  },
  computed: {
    isAdminRoute() {
      return this.$route.name === "moderate-profile" ? true : false;
    },
  },
  methods: {
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
      if (this.$store.getters.is_moderator) {
        this.disableSubmit = validateForm(this.validator, {
          password: this.password,
          passwordConf: this.passwordConf,
        });
      } else {
        this.disableSubmit = validateForm(this.validator, this.form);
      }
    },
    ...mapActions(["change_pwd"]),
    changePwd() {
      this.change_pwd(this.form)
        .then(() => {
          this.success = true;
        })
        .catch(() => {
          this.success = false;
        });
    },
  },
};
</script>
