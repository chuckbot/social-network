<template>
  <div id="profile">
    <!-- <Nav></Nav> -->
    <Sidebar :sidebar_items="this.sidebar_items"></Sidebar>
    <section id="change-profile" v-if="links.changeProfile || !profileFilled">
      <h3>Editing the profile</h3>
      <FormProfile></FormProfile>
    </section>
    <section id="mes-infos" v-else-if="links.myInfos">
      <h3>My information</h3>
      <ul>
        <li>Email: {{ get_user_email }}</li>
      </ul>
    </section>
    <section id="change-pwd" v-else-if="links.changePwd">
      <h3>Changing the password</h3>
      <FormPwd></FormPwd>
    </section>
    <section id="profile" v-else>
      <h3>My profile</h3>
      <CardProfile
        :profilePicURL="
          getProfile.profilePictureUrl ? profile.profilePictureUrl : undefined
        "
        :firstName="getProfile.firstName"
        :lastName="getProfile.lastName"
        :position="getProfile.position ? profile.position : undefined"
        :description="getProfile.description ? profile.description : undefined"
      ></CardProfile>
    </section>
    <div id="back-link-ctn" v-if="seeBackLink && !this.links.myProfile && profileFilled">
      <a href @click.prevent="back()">{{ backlink }}</a>
    </div>
  </div>
</template>

<script>
// import Nav from "../components/Nav.vue";
import FormProfile from "../components/forms/FormProfile.vue";
import CardProfile from "../components/cards/CardProfile.vue";
import Sidebar from "../components/Sidebar.vue";
import FormPwd from "../components/forms/FormPwd.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Profile",
  el: "#profile",
  data() {
    return {
      sidebar_items: {
        myProfile: {
          label: "My profile",
          method: this.goToProfil,
        },
        myInfos: {
          label: "My information",
          method: this.goToInfos,
        },
        updateProfile: {
          label: "Edit my profile",
          method: this.goToUpdateProfile,
        },
        updatePwd: {
          label: "Change my password",
          method: this.goToUpdatePwd,
        },
      },
      backlink: "< Retour",
      links: {
        myProfile: true,
        changePwd: false,
        changeProfile: false,
        myInfos: false,
      },
    };
  },
  components: {
    // Nav,
    Sidebar,
    CardProfile,
    FormProfile,
    FormPwd,
  },
  computed: {
    ...mapGetters([
      "get_update_status",
      "get_user_profile",
      "get_profile_status",
      "get_user_email",
    ]),
    updateProfile() {
      return this.get_update_status;
    },
    getProfile() {
      return this.get_user_profile;
    },
    profileFilled() {
      return this.get_profile_status;
    },
    seeBackLink() {
      return Object.values(this.links).find((value) => value);
    },
  },
  methods: {
    ...mapActions(["commit_update_status"]),
    goToProfil() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.myProfile = true;
    },
    goToInfos() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.myInfos = true;
    },
    goToUpdateProfile() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.changeProfile = true;
    },
    goToUpdatePwd() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.changePwd = true;
    },
    back() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
    },
  },
};
</script>
