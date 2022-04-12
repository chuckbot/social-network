<template>
  <div id="create-post" class="create-post ctn ctn--column">
    <h1 class="text--large-f text--bold-w text--label">Create a publication</h1>
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
