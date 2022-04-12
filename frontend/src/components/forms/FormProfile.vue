<template>
  <div id="formProfile" class="form-profile ctn ctn--column">
    <form
      class="ctn ctn--column ctn--space-between"
      enctype="multipart/form-data"
      @submit.prevent="updateProfile()"
      @input="submitValidation()"
    >
      <div class="ctn ctn--column">
        <label
          v-if="!imagePreview && !oldImg"
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
        <img :src="imagePreview ? imagePreview : oldImg" class="img-preview-profile" />
      </div>
      <p
        v-if="validator.file"
        class="text--error text--center text--normal-f text--bold-w"
      >
        Allowed files: .jpg, .jpeg, .png, 5MB maximum.
      </p>
      <div class="text--normal-f text--normal-w text--label ctn--column input-wrap">
        <label for="firstName">{{ label.firstName }}</label>
        <input
          class="input text--normal-f text--light-w"
          id="firstName"
          name="firstName"
          type="text"
          placeholder="Jacques"
          v-model="form.firstName"
          @input="firstNameValidation()"
        />
        <span v-if="validator.fistName">Invalid First Name.</span>
      </div>
      <div class="text--normal-f text--normal-w text--label ctn--column input-wrap">
        <label for="lastName">{{ label.lastName }}</label>
        <input
          class="input text--normal-f text--light-w"
          id="lastName"
          name="lastname"
          type="text"
          placeholder="Dupont"
          v-model="form.lastName"
          @input="lastNameValidation()"
        />
        <span v-if="validator.lastName">Invalid last name.</span>
      </div>
      <div class="text--normal-f text--normal-w text--label ctn--column input-wrap">
        <label for="position">{{ label.position }}</label>
        <input
          class="input text--normal-f text--light-w"
          id="position"
          name="position"
          type="text"
          placeholder="Accountant"
          v-model="form.position"
          @input="positionValidation()"
        />
        <span v-if="validator.position">Invalid position.</span>
      </div>
      <div
        class="text--normal-f text--normal-w text--label ctn--column input-wrap textarea-wrap"
      >
        <label for="description">{{ label.description }}</label>
        <textarea
          class="textarea text--normal-f text--light-w"
          id="description"
          name="description"
          type="text"
          placeholder="I like to count."
          v-model="form.description"
          @input="descriptionValidation()"
        />
        <span v-if="validator.description">50 characters maximum allowed.</span>
      </div>
      <SubmitButton
        class="ctn"
        :label="label.submit"
        :disabled="disableSubmit"
      ></SubmitButton>
    </form>
  </div>
</template>

<script>
import SubmitButton from "../buttons/SubmitButton.vue";
// import trimAll from "../../scripts/triming"
import { mapActions } from "vuex";
import {
  validateName,
  validateDescription,
  validateProfileForm,
  validateImage,
} from "../../scripts/validate";
export default {
  name: "FormProfile",
  el: "#formProfile",
  components: {
    SubmitButton,
  },
  data() {
    return {
      label: {
        submit: "Update",
        firstName: "First Name",
        lastName: "Last Name",
        position: "Post",
        description: "Description",
      },
      form: {
        image: this.oldImg,
        firstName: this.oldFirstName,
        lastName: this.oldLastName,
        position: this.oldPosition,
        description: this.oldDescription,
      },
      validator: {
        file: false,
        firstName: false,
        lastName: false,
        position: false,
        description: false,
      },
      disableSubmit: true,
      imagePreview: undefined,
    };
  },
  computed: {},
  methods: {
    firstNameValidation() {
      this.validator.firstName = validateName(this.form.firstName);
    },
    lastNameValidation() {
      this.validator.lastName = validateName(this.form.lastName);
    },
    positionValidation() {
      this.validator.position = validateName(this.form.position);
    },
    descriptionValidation() {
      this.validator.description = validateDescription(this.form.description);
    },
    submitValidation() {
      this.disableSubmit = validateProfileForm(
        this.validator,
        this.form,
        this.get_profile_status
      );
    },
    handleFileUpload(event) {
      this.form.image = event.target.files[0];
      this.validator.file = validateImage(this.form.image);
      this.imagePreview = URL.createObjectURL(this.form.image);
    },
    ...mapActions(["update_profile", "get_profile_status"]),
    updateProfile() {
      this.update_profile({
        form: this.form,
        userId: this.$route.params.userId,
      })
        .then(() => {
          this.$emit("profileupdated");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  props: {
    oldFirstName: {
      type: String,
      default: "",
    },
    oldLastName: {
      type: String,
      default: "",
    },
    oldPosition: {
      type: String,
      default: "",
    },
    oldDescription: {
      type: String,
      default: "",
    },
    oldImg: {
      type: String,
      default: undefined,
    },
  },
};
</script>
