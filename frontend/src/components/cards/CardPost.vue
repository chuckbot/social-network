<template>
  <div id="card-post" class="card-post">
    <div id="controllers" v-if="creatorId === this.get_profile_id">
      <ModifyButton :modifyThis="modifyPost"></ModifyButton>
      <DeleteButton :deleteThis="deletePost"></DeleteButton>
    </div>
    <Date :type="this.type" :id="this.postId"></Date>
    <div class="card-post__creator-infos" v-if="this.$route.name === 'home'">
      <a href="" @click.prevent="goToProfile()">
        <div>
          <img
            :src="creatorImgUrl === null ? undefined : creatorImgUrl"
            alt="Profil Picture"
            width="100"
          />
        </div>
        <div>
          <span>{{ creatorFirstName }}</span>
        </div>
        <div>
          <span>{{ creatorLastName }}</span>
        </div>
      </a>
    </div>
    <div class="card-post__post-infos">
      <a href="" @click.prevent="goToPost()">
        <div id="post-img-ctn">
          <img :src="imgUrl" alt="" width="100" />
        </div>
        <div>
          <div id="title-post-ctn">{{ title }}</div>
          <div id="content-post-ctn">{{ content }}</div>
          <div id="comments-post-ctn">{{ nbOfCom }} feedback</div>
        </div>
      </a>
    </div>
  </div>
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
      default: "../../assets/user-solid.svg",
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
  compoted: {
    ...mapGetters(["get_profile_id", "get_user_id"]),
  },
  methods: {
    goToPost() {
      this.$router.push({ name: "post", params: { postId: this.postId } });
    },
    goToProfile() {
      this.$store.dispatch("go_to_profile", {
        local_profile_id: this.get_profile_id,
        local_user_id: this.get_user_id,
        target_id: this.creatorId,
      });
    },
    goToProfile() {},
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
<style>
.card-post {
  border: 2px solid black;
  margin-bottom: 2px;
}

.card-post__creator-infos {
  border: 1px solid green;
}

.card-post__post-infos {
  border: 1px solid red;
}
</style>
