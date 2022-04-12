<template>
  <figure id="card-com" class="card-com ctn--column">
    <div
      id="controllers"
      class="card-com__controllers ctn ctn--flex-end"
      v-if="(profile.id === this.get_profile_id && !changeCom) || is_moderator"
    >
      <ModifyButton :modifyThis="modifyCom"></ModifyButton>
      <DeleteButton :deleteThis="deleteCom"></DeleteButton>
    </div>
    <div class="card-com__creator-infos" :class="{ changingCom: changeCom }">
      <a href="" @click.prevent="goToProfile()" class="ctn ctn--flex-start link">
        <div>
          <img
            :src="profile.profileImg"
            alt="Profile Picture"
            class="img--card_com_profile"
          />
          <span class="text--normal-f text--normal-w">{{
            profile.firstName + " " + profile.lastName
          }}</span>
        </div>
      </a>
    </div>
    <DateCom :type="this.type" :id="com.id" class="card-com__date"></DateCom>
    <div v-if="!this.changeCom" class="card-com__com">
      <p class="text--normal-w text--normal-f">{{ com.text }}</p>
    </div>
    <div v-else>
      <FormCom
        :changeCom="this.changeCom"
        :oldCom="com.text"
        :comId="com.id"
        @change-com="modifyCom"
      ></FormCom>
    </div>
  </figure>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModifyButton from "../buttons/ModifyButton.vue";
import DeleteButton from "../buttons/DeleteButton.vue";
import FormCom from "../forms/FormCom.vue";
import DateCom from "../Date.vue";
export default {
  name: "CardCom",
  id: "#card-com",
  components: {
    ModifyButton,
    DeleteButton,
    FormCom,
    DateCom,
  },
  props: {
    profile: {
      id: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      profileImg: {
        type: String,
        required: true,
      },
    },
    com: {
      text: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  },
  data() {
    return { changeCom: false, type: "COM" };
  },
  computed: {
    ...mapGetters([
      "get_profile_id",
      "get_change_com_status",
      "get_user_id",
      "is_moderator",
    ]),
  },
  methods: {
    ...mapActions(["delete_my_com"]),
    deleteCom() {
      this.delete_my_com(this.com.id);
      this.deleted = true;
    },
    modifyCom() {
      this.changeCom = !this.changeCom;
    },
    goToProfile() {
      this.$store.dispatch("go_to_profile", {
        local_profile_id: this.get_profile_id,
        local_user_id: this.get_user_id,
        target_id: this.profile.id,
      });
    },
  },
};
</script>
