<template>
  <div id="card-post" class="card-post" v-if="!deleted">
    <div id="controllers" v-if="this.$route.name === 'profile'">
      <ModifyButton :modifyPost="modifyPost"></ModifyButton>
      <DeleteButton :deletePost="deletePost"></DeleteButton>
    </div>
    <div class="card-post__creator-infos" v-if="this.$route.name === 'home'">
      <a href="" @click.prevent="goToProfile()">
        <div><img :src="creatorImgUrl" alt="Profile Picture" /></div>
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
          <img :src="imgUrl" alt="" />
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
import { mapGetters } from "vuex";
export default {
  name: "CardPost",
  el: "#card-post",
  components: {
    DeleteButton,
    ModifyButton,
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
      required: true,
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
      deleted: false,
    };
  },
  compoted: {
    ...mapGetters(["get_profile_id"]),
  },
  methods: {
    goToPost() {
      this.$router.push({ name: "post", params: { postId: this.postId } });
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
