<template>
  <div id="flux-post">
    <CardPost
      v-for="post in get_local_posts"
      :key="post.id"
      :title="post.title"
      :content="post.text"
      :imgUrl="post.postPictureURL"
      :id="post.id"
      :creatorId="post.profileId"
      :creatorFirstName="post.Profile.firstName"
      :creatorLastName="post.Profile.lastName"
      :creatorImgUrl="post.Profile.profilPictureURL"
    ></CardPost>
  </div>
</template>

<script>
import CardPost from "../cards/CardPost.vue";
import { mapGetters } from "vuex";
export default {
  name: "FluxPost",
  el: "#flux-post",
  components: {
    CardPost,
  },
  beforeCreate() {
    this.$store.dispatch("commit_local_posts");
  },
  computed: {
    ...mapGetters(["get_local_posts"]),
  },
};
</script>
