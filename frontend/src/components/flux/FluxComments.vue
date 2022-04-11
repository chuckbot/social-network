<template>
  <div id="flux-comments">
    <CardCom
      v-for="com in get_local_coms"
      :key="com.id"
      :com="{ text: com.text, id: com.id }"
      :profile="{
        id: com.Profile ? com.Profile.id : get_user_profile.id,
        firstName: com.Profile ? com.Profile.firstName : get_user_profile.firstName,
        lastName: com.Profile ? com.Profile.lastName : get_user_profile.lastName,
        profileImg: com.Profile
          ? com.Profile.profilPictureURL
          : get_user_profile.profilPictureURL,
      }"
    ></CardCom>
  </div>
</template>

<script>
import CardCom from "../cards/CardCom.vue";
import { mapGetters } from "vuex";
export default {
  name: "FluxComments",
  el: "flux-comments",
  components: { CardCom },
  beforeCreate() {
    this.$store.dispatch("commit_local_coms", this.$route.params.postId);
  },
  computed: {
    ...mapGetters(["get_local_coms", "get_user_profile"]),
  },
};
</script>
