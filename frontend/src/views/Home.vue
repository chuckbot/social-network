<template>
  <div class="home">
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
      :creatorImgUrl="post.Profile.profilePictureURL"
    ></CardPost>
  </div>
</template>

<script>
import CardPost from "../components/cards/CardPost.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Home",
  el: "#home",
  components: {
    CardPost,
  },
  beforeCreate() {
    this.$store.dispatch("commit_local_posts");
  },
  computed: {
    ...mapGetters(["get_local_posts"]),
    methods: {
      ...mapActions([]),
    },
  },
};
</script>
