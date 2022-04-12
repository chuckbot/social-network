<template>
  <article id="post" class="post">
    <div class="ctn ctn--space-between">
      <div class="post__creator-infos">
        <a href="" @click.prevent="goToProfile()" class="ctn ctn--flex-start link">
          <div>
            <img :src="get_local_post.Profile.profilePictureURL" alt="Profile Picture" />
          </div>
          <div>
            <span class="text--normal-w">{{
              get_local_post.Profile.firstName + " " + get_local_post.Profile.lastName
            }}</span>
          </div>
        </a>
      </div>
      <div
        id="controllers"
        class="ctn ctn--flex-end post__controllers"
        v-if="get_local_post.Profile.userId === get_user_id || is_moderator"
      >
        <ModifyButton :modifyThis="modifyPost"></ModifyButton>
        <DeleteButton :deleteThis="deletePost"></DeleteButton>
      </div>
    </div>
    <div class="post__post-infos">
      <Date type="POST" :id="get_local_post.id"></Date>
      <div>
        <h1 id="title-post-ctn" class="text--large-f text--normal-w">
          {{ get_local_post.title }}
        </h1>
        <div id="post-img-ctn">
          <img
            v-if="get_local_post.postPictureURL"
            :src="get_local_post.postPictureURL"
            alt="Post Picture"
          />
        </div>
        <article id="content-post-ctn" class="text--normal-f text--normal-w">
          {{ get_local_post.text }}
        </article>
      </div>
    </div>
    <p class="text--label text--normal-f text--normal-w post__nb-com">
      {{ get_com_number_for_post(get_local_post.id) }} Feedback
    </p>
    <div>
      <div>
        <FluxComments></FluxComments>
      </div>
      <div>
        <FormCom></FormCom>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FluxComments from "../components/flux/FluxComments.vue";
import FormCom from "../components/forms/FormCom.vue";
import Date from "../components/Date.vue";
import ModifyButton from "../components/buttons/ModifyButton.vue";
import DeleteButton from "../components/buttons/DeleteButton.vue";
export default {
  name: "Post",
  el: "#post",
  components: { FormCom, FluxComments, Date, ModifyButton, DeleteButton },
  beforeCreate() {
    this.$store.dispatch("commit_local_post", this.$route.params.postId);
  },
  created() {},
  computed: {
    ...mapGetters([
      "get_local_post",
      "get_local_coms",
      "get_user_id",
      "get_com_number_for_post",
      "is_moderator",
      "get_user_email",
    ]),
  },
  methods: {
    ...mapActions(["get_one_profile", "get_profile_id"]),
    goToProfile() {
      this.$store.dispatch("go_to_profile", {
        local_profile_id: this.get_profile_id,
        local_user_id: this.get_user_id,
        target_id: this.get_local_post.profileId,
      });
    },
    deletePost() {
      this.$store.dispatch("delete_my_post", this.postId);
      if (this.$route.name === "post") {
        this.$router.push({ name: "home" });
      }
      this.deleted = true;
    },
    modifyPost() {
      this.$router.push({
        name: "modify-post",
        params: { postId: this.get_local_post.id },
      });
    },
  },
};
</script>
