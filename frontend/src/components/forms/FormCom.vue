<template>
  <div id="form-com" @submit.prevent="createOrModify()">
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
      <button v-if="changeCom" @click="$emit('change-com')">
        {{ label.cancel }}
      </button>
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
  props: {
    changeCom: {
      type: Boolean,
      default: false,
    },
    oldCom: {
      type: String,
      default: "",
    },
    comId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      label: {
        com: "Comment:",
        submit: "Submit",
        cancel: "Cancel",
      },
      form: {
        com: this.oldCom,
      },
      validator: {
        com: false,
      },
    };
  },
  computed: {},
  methods: {
    createOrModify() {
      if (this.changeCom) {
        this.modifyCom();
      } else {
        this.createCom();
      }
    },
    createCom() {
      this.$store.dispatch("create_com", {
        com: this.form.com,
        postId: this.$route.params.postId,
      });
      this.form.com = "";
    },
    modifyCom() {
      this.$store
        .dispatch("modify_my_com", {
          postId: this.$route.params.postId,
          comId: this.comId,
          text: this.form.com,
        })
        .then(() => {
          this.$emit("change-com");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    comValidation() {},
  },
};
</script>
