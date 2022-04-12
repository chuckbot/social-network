<template>
  <section id="my-posts">
    <CardPost
      v-for="post in get_my_posts"
      :key="post.id"
      :id="post.id"
      :title="post.title"
      :content="post.text"
      :imgUrl="post.postPictureURL"
      :creatorId="get_user_profile.userId"
      :creatorFirstName="get_user_profile.firstName"
      :creatorLastName="get_user_profile.lastName"
      :creatorImgUrl="get_user_profile.profilePictureURL"
      :nbOfCom="get_com_number_for_post(post.id)"
    ></CardPost>
  </section>
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
    ...mapGetters(["get_my_posts", "get_user_profile", "get_com_number_for_post"]),
  },
  watch: {},
};
</script>
