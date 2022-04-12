<template>
  <section id="profiles">
    <FluxProfiles></FluxProfiles>
  </section>
</template>

<script>
import FluxProfiles from "../components/flux/FluxProfiles.vue";
export default {
  name: "Profiles",
  el: "#profiles",
  components: {
    FluxProfiles,
  },
};
</script>
