<template>
  <div id="post">
    <div>
      <a href @click.prevent="goToProfile()">
        <div>
          <img :src="get_local_post.Profile.profilPictureURL" alt="Profil Picture" />
        </div>
        <div>
          <span>{{ get_local_post.Profile.firstName }}</span>
        </div>
        <div>
          <span>{{ get_local_post.Profile.lastName }}</span>
        </div>
      </a>
    </div>
    <div>
      <div id="post-img-ctn">
        <img :src="get_local_post.imgUrl" alt="Post Picture" />
      </div>
      <div>
        <div id="title-post-ctn">{{ get_local_post.title }}</div>
        <div id="content-post-ctn">{{ get_local_post.text }}</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Post",
  el: "#post",
  beforeCreate() {
    this.$store.dispatch("commit_local_post", this.$route.params.postId);
  },
  created() {},
  computed: {
    ...mapGetters(["get_local_post"]),
  },
};
</script>
