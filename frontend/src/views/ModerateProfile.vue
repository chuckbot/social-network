<template>
  <div id="moderate-profile" class="moderate-profile">
    <div class="moderate-profile__controllers ctn ctn--space-between">
      <ModifyButton
        :label="updateProfile ? label.cancel : label.modifyProfile"
        @click="modifyProfile"
      >
      </ModifyButton>
      <DeleteButton
        v-if="updateProfile"
        :label="label.delete"
        @click="deleteProfile"
      ></DeleteButton>
    </div>
    <FormProfile
      class="moderate-profile__form"
      v-if="updateProfile"
      :oldFirstName="profile.firstName"
      :oldLastName="profile.lastName"
      :oldPosition="profile.position"
      :oldDescription="profile.description"
      :oldImgURL="profile.profilePictureURL"
      @profileupdated="modifyProfile"
    ></FormProfile>
    <CardProfile
      class="moderate-profile__card-profile"
      v-if="!updateProfile"
      :userId="profile.userId"
      :email="profile.User.email"
      :firstName="profile.firstName"
      :lastName="profile.lastName"
      :position="profile.position"
      :description="profile.description"
      :profilePicURL="profile.profilePictureURL"
    >
    </CardProfile>
    <FormPwd v-if="!updateProfile" class="moderate-profile__form-pwd"></FormPwd>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ModifyButton from "../components/buttons/ModifyButton.vue";
import DeleteButton from "../components/buttons/DeleteButton.vue";
import CardProfile from "../components/cards/CardProfile.vue";
import FormPwd from "../components/forms/FormPwd.vue";
import FormProfile from "../components/forms/FormProfile.vue";
export default {
  name: "ModerateProfile",
  el: "#moderate-profile",
  components: {
    CardProfile,
    ModifyButton,
    DeleteButton,
    FormPwd,
    FormProfile,
  },
  data() {
    return {
      userId: this.$route.params.userId,
      label: {
        modifyPwd: "Change password",
        modifyProfile: "Edit profile",
        cancel: "Return",
        delete: "Delete profile",
      },
      updateProfile: false,
    };
  },
  computed: {
    ...mapGetters(["get_one_local_profile", "is_moderator"]),
    profile() {
      return this.get_one_local_profile(this.userId);
    },
  },
  methods: {
    ...mapActions(["delete_user", "change_pwd"]),
    modifyProfile() {
      this.updateProfile = !this.updateProfile;
    },
    modifyPwd() {},
    deleteProfile() {
      this.delete_user(this.userId);
    },
  },
};
</script>
