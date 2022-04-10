<template>
  <div id="form-post">
    <form
      enctype="multipart/form-data"
      @submit.prevent="createPost()"
      @input="submitValidation()"
    >
      <div>
        <input type="file" @change="handleFileUpload($event)" />
        <span v-if="validator.file">Allowed files: .jpg, .jpeg, .png, 5Mo maximum.</span>
      </div>
      <div>
        <label for="title">{{ label.title }}</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="The Phantom Menace"
          v-model="form.title"
          @change="titleValidation()"
        />
        <span v-if="validator.title">The title must not exceed 50 characters.</span>
      </div>
      <div>
        <label for="type">{{ label.type }}</label>
        <select name="type" id="type" v-model="form.type">
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <span v-if="validator.type"></span>
      </div>
      <div>
        <label for="text">{{ label.text }}</label>
        <textarea
          id="text"
          name="text"
          type="textarea"
          placeholder="Écrivez ici ..."
          v-model="form.text"
          @change="textValidation()"
        >
        </textarea>
        <span v-if="validator.text"></span>
      </div>
      <SubmitButton :label="label.submit" :disabled="disableSubmit"></SubmitButton>
    </form>
  </div>
</template>

<script>
import SubmitButton from "../buttons/SubmitButton.vue";
import { mapActions } from "vuex";
import {
  validateImage,
  validateDescription,
  validatePostForm,
} from "../../scripts/validate";
export default {
  name: "FormPost",
  el: "#form-post",
  components: {
    SubmitButton,
  },
  data() {
    return {
      label: {
        title: "Titre",
        content: "Contenu",
        type: "Catégorie",
        submit: "Publier",
      },
      form: {
        image: "",
        title: "",
        type: "",
        text: "",
        isImportant: false,
      },
      validator: {
        file: false,
        title: false,
        type: false,
        text: false,
      },
      types: {
        default: "",
        general: "général",
      },
      disableSubmit: true,
    };
  },
  computed: {},
  methods: {
    handleFileUpload(event) {
      this.form.image = event.target.files[0];
      this.validator.file = validateImage(this.form.image);
    },
    titleValidation() {
      this.validator.title = validateDescription(this.form.title);
    },
    submitValidation() {
      this.disableSubmit = validatePostForm(this.validator, this.form);
    },
    textValidation() {
      this.validator.text = false;
    },
    ...mapActions(["create_post"]),
    createPost() {
      console.log({ ...this.form });
      this.create_post({ ...this.form });
    },
  },
};
</script>
