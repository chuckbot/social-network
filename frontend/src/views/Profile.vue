<template>
  <div id="profile">
    <CardProfile
      :userId="get_local_profile.userId"
      :profilePicURL="
        get_local_profile.profilPictureURL === null
          ? undefined
          : get_local_profile.profilPictureURL
      "
      :firstName="get_local_profile.firstName"
      :lastName="get_local_profile.lastName"
      :email="get_local_profile.User.email"
      :position="get_local_profile.position"
      :description="get_local_profile.description"
    ></CardProfile>
    <FluxPost></FluxPost>
  </div>
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
