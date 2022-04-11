<template>
  <div id="card-com">
    <div id="controllers" v-if="profile.id === this.get_profile_id && !changeCom">
      <ModifyButton :modifyThis="modifyCom"></ModifyButton>
      <DeleteButton :deleteThis="deleteCom"></DeleteButton>
    </div>
    <Date :type="this.type" :id="com.id"></Date>
    <a href="" @click.prevent="goToProfile()">
      <div>
        <img :src="profile.profileImg" alt="Profile Picture" />
        <span>{{ profile.firstName }}</span>
        <span> {{ profile.lastName }}</span>
      </div>
    </a>
    <div v-if="!this.changeCom">
      <span>{{ com.text }}</span>
    </div>
    <div v-else>
      <FormCom
        :changeCom="this.changeCom"
        :oldCom="com.text"
        :comId="com.id"
        @change-com="modifyCom"
      ></FormCom>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModifyButton from "../buttons/ModifyButton.vue";
import DeleteButton from "../buttons/DeleteButton.vue";
import FormCom from "../forms/FormCom.vue";
import Date from "../Date.vue";
export default {
  name: "CardCom",
  id: "#card-com",
  components: {
    ModifyButton,
    DeleteButton,
    FormCom,
    Date,
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
    ...mapGetters(["get_profile_id", "get_change_com_status"]),
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
  },
};
</script>
