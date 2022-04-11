<template>
  <div id="form-com" @submit.prevent="createCom()">
    <form>
      <label for="com">{{ label.com }}</label>
      <textarea
        id="com"
        name="com"
        type="textarea"
        placeholder="Votre Commentaire"
        v-model="form.com"
        @change="comValidation()"
      >
      </textarea>
      <span v-if="validator.com"></span>
      <SubmitButton :label="label.submit"></SubmitButton>
    </form>
  </div>
</template>

<script>
import SubmitButton from "../buttons/SubmitButton.vue";
export default {
  name: "FormCom",
  el: "#form-com",
  components: { SubmitButton },
  data() {
    return {
      label: {
        com: "Comment:",
        submit: "Comment",
      },
      form: {
        com: "",
      },
      validator: {
        com: false,
      },
    };
  },
  computed: {},
  methods: {
    createCom() {
      this.$store.dispatch("create_com", {
        com: this.form.com,
        postId: this.$route.params.postId,
      });
    },
    comValidation() {},
  },
};
</script>
