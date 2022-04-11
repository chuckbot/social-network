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
};
</script>
