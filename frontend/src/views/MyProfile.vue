<template>
  <div id="my-profile" class="my-profile">
    <SideBar :sidebar_items="this.sidebar_items" class="my-profile__sidebar"></SideBar>
    <div class="ctn--profile-view">
      <section
        class="my-profile__change-profile ctn ctn--column"
        id="change-profile"
        v-if="links.changeProfile || !get_profile_status"
      >
        <h1>Editing the profile</h1>
        <FormProfile
          @profileupdated="goToProfil()"
          :oldFirstName="get_user_profile.firstName"
          :oldLastName="get_user_profile.lastName"
          :oldPosition="get_user_profile.position"
          :oldDescription="get_user_profile.description"
          :oldImg="get_user_profile.profilePictureURL"
        ></FormProfile>
      </section>
      <section id="mes-infos" class="my-profile__my-infos" v-else-if="links.myInfos">
        <h1>My information</h1>
        <ul class="text--normal-f text--bold-w text--label">
          <li>
            Email : <span class="text--normal-w">{{ get_user_email }}</span>
          </li>
        </ul>
      </section>
      <section id="change-pwd" v-else-if="links.changePwd">
        <h1>Changing the password</h1>
        <FormPwd></FormPwd>
      </section>
      <section id="my-posts" v-else-if="links.myPosts" class="my-profile__my-posts">
        <h1>My publications</h1>
        <MyPosts></MyPosts>
      </section>
      <section id="my-coms" v-else-if="links.myComs" class="my-profile__my-coms">
        <h1>My comments</h1>
        <CardPost
          v-for="post in get_com_post_from_user(get_profile_id)"
          :key="post.id"
          :id="post.id"
          :creatorFirstName="post.Profile.firstName"
          :creatorLastName="post.Profile.lastName"
          :creatorImgUrl="post.Profile.profilePictureURL"
          :creatorId="post.Profile.userId"
          :title="post.title"
          :content="post.text"
          :imgUrl="post.postPictureURL"
          :nbOfCom="get_com_number_for_post(post.id)"
        ></CardPost>
      </section>
      <section id="delete-my-account" v-else-if="links.deleteAccount">
        <h1>Delete my account</h1>
        <DeleteAccount :userId="get_user_id"></DeleteAccount>
      </section>
      <section id="profile" class="my-profile__profile ctn ctn--column" v-else>
        <h1>My profile</h1>
        <CardProfile
          :userId="get_user_profile.userId"
          :profilePicURL="
            get_user_profile.profilePictureURL
              ? get_user_profile.profilePictureURL
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
        class="btn my-profile__backlink"
        id="back-link-ctn"
        v-if="seeBackLink && !this.links.myProfile && get_profile_status"
      >
        <a class="link" href="" @click.prevent="back()"
          ><span class="text--btn text--normal-w text--normal-f">{{ backlink }}</span></a
        >
      </div>
    </div>
  </div>
</template>

<script>
import FormProfile from "../components/forms/FormProfile.vue";
import CardProfile from "../components/cards/CardProfile.vue";
import SideBar from "../components/Sidebar.vue";
import FormPwd from "../components/forms/FormPwd.vue";
import MyPosts from "../components/MyPosts.vue";
import CardPost from "../components/cards/CardPost.vue";
import DeleteAccount from "../components/forms/FormDeleteAccount.vue";
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
          isActive: true,
        },
        myInfos: {
          label: "My information",
          method: this.goToInfos,
          isActive: false,
        },
        myPosts: {
          label: "My publications",
          method: this.goToMyPosts,
          isActive: false,
        },
        myComs: {
          label: "My commented publications",
          method: this.goToMyComs,
          isActive: false,
        },
        updateProfile: {
          label: "Edit my profile",
          method: this.goToUpdateProfile,
          isActive: false,
        },
        updatePwd: {
          label: "Change my password",
          method: this.goToUpdatePwd,
          isActive: false,
        },
        deleteAccount: {
          label: "Delete my account",
          method: this.goToDeleteAccount,
          isActive: false,
        },
      },
      backlink: "Return",
      links: {
        myProfile: true,
        changePwd: false,
        changeProfile: false,
        myInfos: false,
        myPosts: false,
        myComs: false,
        deleteAccount: false,
      },
    };
  },
  components: {
    SideBar,
    CardProfile,
    FormProfile,
    FormPwd,
    MyPosts,
    CardPost,
    DeleteAccount,
  },
  computed: {
    ...mapGetters([
      "get_update_status",
      "get_user_profile",
      "get_profile_status",
      "get_user_email",
      "get_user_id",
      "get_com_post_from_user",
      "get_profile_id",
      "get_com_number_for_post",
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
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.myProfile.isActive = true;
    },
    goToInfos() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.myInfos = true;
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.myInfos.isActive = true;
    },
    goToUpdateProfile() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.changeProfile = true;
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.updateProfile.isActive = true;
    },
    goToUpdatePwd() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.changePwd = true;
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.updatePwd.isActive = true;
    },
    goToMyPosts() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.myPosts = true;
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.myPosts.isActive = true;
    },
    back() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.myProfile.isActive = true;
    },
    goToMyComs() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.myComs = true;
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.myComs.isActive = true;
    },
    goToDeleteAccount() {
      Object.keys(this.links).forEach((key) => (this.links[key] = false));
      this.links.deleteAccount = true;
      Object.keys(this.sidebar_items).forEach(
        (key) => (this.sidebar_items[key].isActive = false)
      );
      this.sidebar_items.deleteAccount.isActive = true;
    },
  },
};
</script>
