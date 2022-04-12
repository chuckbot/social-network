<template>
  <div id="profiles">
    <CardProfile
      v-for="profile in get_local_profiles"
      :key="profile.id"
      :profilePicURL="profile.profilPictureURL"
      :firstName="profile.firstName"
      :lastName="profile.lastName"
      :position="profile.position"
      :description="profile.description"
    ></CardProfile>
  </div>
</template>

<script>
import CardProfile from "../components/cards/CardProfile.vue";
import { mapGetters } from "vuex";
export default {
  name: "Profiles",
  el: "#profiles",
  components: {
    CardProfile,
  },
  beforeCreate() {
    this.$store.dispatch("get_all_profiles");
  },
  computed: {
    ...mapGetters(["get_local_profiles"]),
  },
};
</script>
