<template>
  <div id="my-profile">
    <Sidebar :sidebar_items="this.sidebar_items"></Sidebar>
    <section id="change-profile" v-if="links.changeProfile || !get_profile_status">
      <h3>Editing profile</h3>
      <FormProfile @profileupdated="goToProfil()"></FormProfile>
    </section>
    <section id="mes-infos" v-else-if="links.myInfos">
      <h3>My information</h3>
      <ul>
        <li>Email : {{ get_user_email }}</li>
      </ul>
    </section>
    <section id="change-pwd" v-else-if="links.changePwd">
      <h3>Changing the password</h3>
      <FormPwd></FormPwd>
    </section>
    <section id="posts" v-else-if="links.myPosts">
      <h3>My publications</h3>
      <MyPosts></MyPosts>
    </section>
    <section id="profile" v-else>
      <h3>My profile</h3>
      <CardProfile
        :profilePicURL="
          get_user_profile.profilPictureURL
            ? get_user_profile.profilPictureURL
            : undefined
        "
        :firstName="get_user_profile.firstName"
        :lastName="get_user_profile.lastName"
        :position="get_user_profile.position ? get_user_profile.position : undefined"
        :description="
          get_user_profile.description ? get_user_profile.description : undefined
        "
      ></CardProfile>
    </section>
    <div
      id="back-link-ctn"
      v-if="seeBackLink && !this.links.myProfile && get_profile_status"
    >
      <a href="" @click.prevent="back()">{{ backlink }} </a>
    </div>
  </div>
</template>

<script>
import FormProfile from "../components/forms/FormProfile.vue";
import CardProfile from "../components/cards/CardProfile.vue";
import Sidebar from "../components/Sidebar.vue";
import FormPwd from "../components/forms/FormPwd.vue";
import MyPosts from "../components/MyPosts.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "MyProfile",
  el: "#my-profile",
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
        myPosts: {
          label: "My publications",
          method: this.goToMyPosts,
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
      backlink: "< Return",
      links: {
        myProfile: true,
        changePwd: false,
        changeProfile: false,
        myInfos: false,
        myPosts: false,
      },
    };
  },
  components: {
    Sidebar,
    CardProfile,
    FormProfile,
    FormPwd,
    MyPosts,
  },
  computed: {
    ...mapGetters([
      "get_update_status",
      "get_user_profile",
      "get_profile_status",
      "get_user_email",
    ]),
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
    goToMyPosts() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.myPosts = true;
    },
    back() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
    },
  },
};
</script>
