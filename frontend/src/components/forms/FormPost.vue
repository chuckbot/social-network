<template>
  <div id="form-post" class="form-post">
    <form
      class="ctn ctn--column ctn--space-between"
      enctype="multipart/form-data"
      @submit.prevent="createOrModifyPost()"
      @input="submitValidation()"
    >
      <div class="ctn ctn--column">
        <label
          v-if="!imagePreview && !oldPicture"
          for="upload-file"
          class="btn text--btn text--center text--normal-w text--normal-f"
          >Add an image</label
        >
        <label
          v-else
          for="upload-file"
          class="btn text--btn text--center text--normal-w text--normal-f"
          >Change image</label
        >
        <input
          class="input-file"
          id="upload-file"
          type="file"
          accept=".jpg, .jpeg, .png"
          @change="handleFileUpload($event)"
        />
        <img :src="imagePreview ? imagePreview : oldPicture" class="img-preview" />
      </div>
      <p
        v-if="validator.file"
        class="text--error text--center text--normal-f text--bold-w"
      >
        Allowed files: .jpg, .jpeg, .png, 5MB maximum.
      </p>
      <div class="text--normal-f text--normal-w text--label ctn--column input-wrap">
        <label for="title">{{ label.title }}</label>
        <input
          class="input text--normal-f text--light-w"
          id="title"
          name="title"
          type="text"
          placeholder="The Phantom Menace"
          v-model="form.title"
          @change="titleValidation()"
        />
      </div>
      <p
        v-if="validator.title"
        class="text--error text--center text--normal-f text--bold-w"
      >
        The title must not exceed 50 characters.
      </p>
      <div
        class="text--normal-f text--normal-w text--label ctn ctn--space-between select-wrap"
      >
        <label for="type">{{ label.type }}</label>
        <select
          name="type"
          id="type"
          v-model="form.type"
          class="select text--normal-f text--normal-w text--label"
        >
          <option v-for="type in types" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
      <div
        class="text--normal-f text--normal-w text--label ctn--column input-wrap textarea-wrap"
      >
        <label for="text">{{ label.text }}</label>
        <textarea
          class="textarea text--normal-f text--light-w"
          id="text"
          name="text"
          type="textarea"
          placeholder="Write here ..."
          v-model="form.text"
          @change="textValidation()"
        >
        </textarea>
      </div>
      <div class="ctn">
        <CancelButton :label="label.cancel" @cancel="cancel()"></CancelButton>
        <SubmitButton
          class="ctn ctn--flex-end"
          v-if="this.$route.name === 'create-post'"
          :label="label.submit"
          :disabled="disableSubmit"
        ></SubmitButton>
        <SubmitButton
          class="ctn ctn--flex-end"
          v-if="this.$route.name === 'modify-post'"
          :label="label.modify"
        >
        </SubmitButton>
      </div>
    </form>
  </div>
</template>

<script>
import SubmitButton from "../buttons/SubmitButton.vue";
import CancelButton from "../buttons/CancelButton.vue";
// import trimAll from "../../scripts/triming";
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
    CancelButton,
  },
  data() {
    return {
      label: {
        title: "Title",
        content: "Content",
        type: "Category",
        submit: "Publish",
        modify: "Modify",
        cancel: "Cancel",
      },
      form: {
        image: this.oldPicture,
        title: this.oldTitle,
        type: this.oldType,
        text: this.oldText,
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
        general: "General",
      },
      imagePreview: undefined,
      disableSubmit: true,
    };
  },
  computed: {},
  methods: {
    handleFileUpload(event) {
      this.form.image = event.target.files[0];
      this.validator.file = validateImage(this.form.image);
      this.imagePreview = URL.createObjectURL(this.form.image);
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
    ...mapActions(["create_modify_post"]),
    createOrModifyPost() {
      this.create_modify_post({ form: this.form, route: this.$route });
    },
    cancel() {
      if (this.$route.name === "create-post") {
        this.$router.push({ name: "home" });
      } else {
        this.$router.push({
          name: "my-profile",
          params: { userId: this.$store.getters.get_user_id },
        });
      }
    },
  },
  props: {
    oldTitle: {
      type: String,
      default: "",
    },
    oldPicture: {
      type: File,
      default: null,
    },
    oldText: {
      type: String,
      default: "",
    },
    oldType: {
      type: String,
      default: "",
    },
  },
};
</script>
