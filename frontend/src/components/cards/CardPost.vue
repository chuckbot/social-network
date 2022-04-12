<template>
  <figure id="card-post" class="card-post ctn--column">
    <div class="ctn ctn--space-between">
      <div class="card-post__creator-infos">
        <a href="" @click.prevent="goToProfile()" class="ctn ctn--flex-start link">
          <div>
            <img
              :src="creatorImgUrl === null ? undefined : creatorImgUrl"
              alt="Profil Picture"
              class="img img--card_post_profile"
            />
          </div>
          <div>
            <span class="text--normal-w">{{
              creatorFirstName + " " + creatorLastName
            }}</span>
          </div>
        </a>
      </div>
      <div
        id="controllers"
        v-if="creatorId === get_user_id || is_moderator"
        class="ctn ctn--flex-end card-post__controllers"
      >
        <ModifyButton :modifyThis="modifyPost"></ModifyButton>
        <DeleteButton :deleteThis="deletePost"></DeleteButton>
      </div>
    </div>
    <Date :type="this.type" :id="this.postId" class="date-ctn"></Date>
    <div class="card-post__post-infos">
      <a href="" @click.prevent="goToPost()" class="link">
        <div
          id="post-img-ctn"
          v-if="this.imgUrl"
          class="card-post__post-infos__post-img-ctn"
        >
          <img :src="imgUrl" alt="" />
        </div>
        <div>
          <div id="title-post-ctn" class="text--large-f text--normal-w">
            <span>{{ title }}</span>
          </div>
          <div id="content-post-ctn" class="text--normal-f">
            <p class="text--black">
              {{ shortContent
              }}<span v-if="readMore" class="text--normal-w text--label"
                >... read more</span
              >
            </p>
          </div>
          <div id="comments-post-ctn" class="text--normal-f text--normal-w">
            <span>{{ nbOfCom }} feedback</span>
          </div>
        </div>
      </a>
    </div>
  </figure>
</template>

<script>
import DeleteButton from "../buttons/DeleteButton.vue";
import ModifyButton from "../buttons/ModifyButton.vue";
import Date from "../Date.vue";
import { mapGetters } from "vuex";
export default {
  name: "CardPost",
  el: "#card-post",
  components: {
    DeleteButton,
    ModifyButton,
    Date,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    creatorFirstName: {
      type: String,
      required: true,
    },
    creatorLastName: {
      type: String,
      required: true,
    },
    creatorImgUrl: {
      type: String,
      default: "http://localhost:3000/images/user-solid.svg",
    },
    title: {
      type: String,
      default: "Untitled publication",
      required: true,
    },
    content: {
      type: String,
      default: "Content of the publication",
    },
    imgUrl: {
      type: String,
      default: undefined,
    },
    nbOfCom: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      postId: this.id,
      type: "POST",
    };
  },
  computed: {
    ...mapGetters([
      "get_profile_id",
      "get_user_id",
      "is_moderator",
      "get_com_number_for_post",
    ]),
    shortContent() {
      return this.content.length > 50 ? `${this.content.slice(0, 200)}` : this.content;
    },
    readMore() {
      return this.content.length > 50 ? true : false;
    },
  },
  methods: {
    goToPost() {
      this.$router.push({ name: "post", params: { postId: this.postId } });
    },
    goToProfile() {
      this.$store.dispatch("go_to_profile", {
        local_profile_id: this.get_profile_id,
        local_user_id: this.get_user_id,
        target_user_id: this.creatorId,
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
        params: { postId: this.postId },
      });
    },
  },
};
</script>
