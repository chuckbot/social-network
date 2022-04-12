<template>
  <div id="flux-profiles">
    <CardProfile
      v-for="profile in get_local_profiles"
      :key="profile.id"
      :id="profile.id"
      :profilePicURL="profile.profilPictureURL"
      :firstName="profile.firstName"
      :lastName="profile.lastName"
      :position="profile.position"
      :description="profile.description"
      @send:id="goToProfile($event)"
    >
    </CardProfile>
  </div>
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
    ...mapGetters(["get_local_profiles", "get_profile_id", "get_user_id"]),
  },
  methods: {
    goToProfile(id) {
      this.$store.dispatch("go_to_profile", {
        local_profile_id: this.get_profile_id,
        local_user_id: this.get_user_id,
        target_id: id,
      });
    },
  },
};
</script>
