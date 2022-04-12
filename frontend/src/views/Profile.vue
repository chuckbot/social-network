<template>
  <section id="profile" class="ctn ctn--column profile">
    <CardProfile
      class="profile__card-profile"
      :userId="get_local_profile.userId"
      :profilePicURL="
        get_local_profile.profilePictureURL === null
          ? undefined
          : get_local_profile.profilePictureURL
      "
      :firstName="get_local_profile.firstName"
      :lastName="get_local_profile.lastName"
      :email="get_local_profile.User.email"
      :position="get_local_profile.position"
      :description="get_local_profile.description"
    ></CardProfile>
    <h1 class="text--large-f text--bold-w text--label text--center">Publications</h1>
    <FluxPost></FluxPost>
  </section>
</template>

<script>
import CardProfile from "../components/cards/CardProfile.vue";
import FluxPost from "../components/flux/FluxPost.vue";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  el: "#profile",
  components: { CardProfile, FluxPost },
  computed: {
    ...mapGetters(["get_local_profile"]),
  },
};
</script>
