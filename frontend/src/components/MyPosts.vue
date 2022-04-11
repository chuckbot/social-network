<template>
  <div id="my-posts">
    <CardPost
      v-for="post in get_my_posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :content="post.text"
      :imgUrl="post.postPictureURL"
      :creatorId="post.profileId"
      :creatorFirstName="get_user_profile.firstName"
      :creatorLastName="get_user_profile.lastName"
      :creatorImgUrl="get_user_profile.profilPictureURL"
    ></CardPost>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardPost from "../components/cards/CardPost.vue";
export default {
  name: "MyPosts",
  el: "#my-posts",
  components: {
    CardPost,
  },
  beforeCreate() {
    this.$store.dispatch("commit_my_posts", this.$store.getters.get_profile_id);
  },
  computed: {
    ...mapGetters(["get_my_posts", "get_user_profile"]),
  },
  watch: {},
};
</script>
