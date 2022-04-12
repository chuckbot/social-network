<template>
  <section id="flux-profiles" class="flux-profile">
    <CardProfile
      v-for="profile in get_local_profiles"
      :key="profile.id"
      :userId="profile.userId"
      :profilePicURL="profile.profilePictureURL"
      :firstName="profile.firstName"
      :lastName="profile.lastName"
      :position="profile.position"
      :description="profile.description"
      @sendid="goToProfile($event)"
    ></CardProfile>
  </section>
</template>

<script>
import CardProfile from "../cards/CardProfile.vue";
import { mapGetters } from "vuex";
export default {
  name: "FluxProfiles",
  el: "#flux-profiles",
  components: {
    CardProfile,
  },
  beforeCreate() {
    this.$store.dispatch("get_all_profiles");
  },
  computed: {
    ...mapGetters([
      "get_local_profiles",
      "get_profile_id",
      "get_user_id",
      "is_moderator",
    ]),
  },
  methods: {
    goToProfile(id) {
      this.$store.dispatch("go_to_profile", {
        local_profile_id: this.get_profile_id,
        local_user_id: this.get_user_id,
        target_user_id: id,
        isModerator: this.is_moderator,
      });
    },
  },
};
</script>
