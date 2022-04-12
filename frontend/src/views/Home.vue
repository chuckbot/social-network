<template>
  <div class="home">
    <FluxPost></FluxPost>
  </div>
</template>

<script>
import FluxPost from "../components/flux/FluxPost.vue";
export default {
  name: "Home",
  el: "#home",
  components: {
    FluxPost,
  },
  beforeCreate() {
    this.$store.dispatch("get_all_profiles");
    this.$store.dispatch("commit_local_posts");
    this.$store.dispatch("commit_my_posts", this.$store.getters.get_profile_id);
  },
};
</script>
