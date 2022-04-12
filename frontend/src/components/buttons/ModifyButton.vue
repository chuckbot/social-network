<template>
  <div id="modify-button">
    <button @click="modifyThis" class="btn btn--bg_w btn--modify-delete">
      <img src="../../assets/modify.svg" alt="" class="icon icon--small" />
      <span v-if="isLargeScreen" class="text--normal-w">{{ label }}</span>
    </button>
  </div>
</template>
<script>
export default {
  name: "modifyButton",
  el: "#modify-button",
  props: {
    modifyThis: {
      type: Function,
    },
    label: {
      type: String,
      default: "Modify",
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
