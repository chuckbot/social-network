<template>
  <section id="flux-post" class="flux-post ctn ctn--column">
    <CardPost
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      :content="post.text"
      :imgUrl="post.postPictureURL"
      :id="post.id"
      :creatorId="post.Profile ? post.Profile.userId : get_local_profile.userId"
      :creatorFirstName="
        post.Profile ? post.Profile.firstName : get_local_profile.firstName
      "
      :creatorLastName="post.Profile ? post.Profile.lastName : get_local_profile.lastName"
      :creatorImgUrl="
        post.Profile
          ? post.Profile.profilePictureURL
          : get_local_profile.profilePictureURL
      "
      :nbOfCom="get_nb_of_com(post.id)"
    ></CardPost>
  </section>
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
  // beforeCreate() {
  //   this.$store.dispatch("commit_local_posts");
  //   this.$store.dispatch("commit_my_posts", this.$store.getters.get_profile_id);
  // },
  props: {},
  computed: {
    ...mapGetters(["get_local_posts", "get_local_profile", "get_nb_of_com"]),
    posts() {
      return this.$route.name === "home"
        ? this.get_local_posts
        : this.get_local_profile.Posts;
    },
  },
};
</script>
