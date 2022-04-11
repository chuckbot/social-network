<template>
  <div id="card-com" v-if="!deleted">
    <div id="controllers" v-if="profile.id === this.get_profile_id">
      <ModifyButton :modifyThis="modifyCom"></ModifyButton>
      <DeleteButton :deleteThis="deleteCom"></DeleteButton>
    </div>
    <a href="" @click.prevent="goToProfile()">
      <div>
        <img :src="profile.profileImg" alt="Profile Picture" />
        <span>{{ profile.firstName }}</span>
        <span> {{ profile.lastName }}</span>
      </div>
    </a>
    <div>
      <span>{{ com.text }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModifyButton from "../buttons/ModifyButton.vue";
import DeleteButton from "../buttons/DeleteButton.vue";
export default {
  name: "CardCom",
  id: "#card-com",
  components: {
    ModifyButton,
    DeleteButton,
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
    return { deleted: false };
  },
  computed: {
    ...mapGetters(["get_profile_id"]),
  },
  methods: {
    ...mapActions(["delete_my_com"]),
    deleteCom() {
      this.delete_my_com(this.com.id);
      this.deleted = true;
    },
    modifyCom() {},
  },
};
</script>
