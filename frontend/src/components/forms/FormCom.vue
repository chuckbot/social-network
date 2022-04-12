<template>
  <div id="form-com" @submit.prevent="createOrModify()" class="form-com">
    <form class="ctn ctn--column form-com__form" :class="{ changeMyCom: changeCom }">
      <label for="com" class="text--label text--normal-w text--normal-f">{{
        changeCom ? label.changeCom : label.com
      }}</label>
      <textarea
        id="com"
        name="com"
        type="textarea"
        class="textarea text--normal-f text--normal-w"
        :class="{}"
        placeholder="Your Comment"
        v-model="form.com"
        @change="comValidation()"
      >
      </textarea>
      <span v-if="validator.com"></span>
      <div class="ctn">
        <button
          v-if="changeCom"
          @click="$emit('change-com')"
          class="btn text--btn text--normal-w text--normal-f"
        >
          {{ label.cancel }}
        </button>
        <SubmitButton :label="label.submit"></SubmitButton>
      </div>
    </form>
  </div>
</template>

<script>
import SubmitButton from "../buttons/SubmitButton.vue";
// import trimAll from "../../scripts/triming"
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
    },
  },
  data() {
    return {
      label: {
        com: "Comment on this post",
        changeCom: "Edit your comment",
        submit: "Comment",
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
