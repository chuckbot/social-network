<template>
  <div id="modify-post">
    <FormPost
      :oldPicture="myPost.postPictureURL"
      :oldTitle="myPost.title"
      :oldText="myPost.text"
      :oldType="myPost.type"
    ></FormPost>
  </div>
</template>

<script>
import FormPost from "../components/forms/FormPost.vue";
import { mapGetters } from "vuex";
export default {
  name: "ModifyPost",
  el: "#modify-post",
  components: {
    FormPost,
  },
  computed: {
    ...mapGetters(["get_my_posts"]),
    myPost() {
      return this.get_my_posts.find((post) => post.id === this.$route.params.postId);
    },
  },
};
</script>
