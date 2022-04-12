<template>
  <div id="delete-button">
    <button @click="deleteThis" class="btn btn--bg_w btn--modify-delete">
      <img src="../../assets/delete.svg" alt="" class="icon icon--small" />
      <span v-if="isLargeScreen" class="text--normal-w">{{ label }}</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "DeleteButton",
  el: "#delete-button",
  props: {
    deleteThis: {
      type: Function,
    },
    label: {
      type: String,
      default: "Delete",
    },
  },
  computed: {
    isLargeScreen() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
