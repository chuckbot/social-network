<template>
  <div id="profiles">
    <FluxProfiles></FluxProfiles>
  </div>
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
