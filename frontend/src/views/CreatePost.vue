<template>
  <div id="create-post">
    <FormPost></FormPost>
  </div>
</template>

<script>
import FormPost from "../components/forms/FormPost.vue";
export default {
  name: "CreatePost",
  el: "#create-post",
  components: {
    FormPost,
  },
};
</script>
