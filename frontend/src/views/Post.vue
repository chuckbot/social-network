<template>
  <div id="post">
    <Date type="POST" :id="get_local_post.id"></Date>
    <div>
      <a href @click.prevent="goToProfile()">
        <div>
          <img
            :src="get_local_post.Profile.profilPictureURL"
            alt="Profil Picture"
            width="100"
          />
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
        <img :src="get_local_post.postPictureURL" alt="Post Picture" width="100" />
      </div>
      <div>
        <div id="title-post-ctn">{{ get_local_post.title }}</div>
        <div id="content-post-ctn">{{ get_local_post.text }}</div>
      </div>
    </div>
    <div>
      <div>
        <FluxComments></FluxComments>
      </div>
      <div>
        <FormCom></FormCom>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FluxComments from "../components/flux/FluxComments.vue";
import FormCom from "../components/forms/FormCom.vue";
import Date from "../components/Date.vue";
export default {
  name: "Post",
  el: "#post",
  components: { FormCom, FluxComments, Date },
  beforeCreate() {
    this.$store.dispatch("commit_local_post", this.$route.params.postId);
  },
  created() {},
  data() {},
  computed: {
    ...mapGetters(["get_local_post", "get_local_coms"]),
  },
  methods: {
    ...mapActions(["get_one_profile"]),
    goToProfile() {
      this.get_one_profile(this.get_local_post.Profile.userId)
        .then(() => {
          this.$router.push({
            name: "profile",
            params: { userId: this.get_local_post.Profile.userId },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
