<template>
  <div id="modify-button">
    <button @click="modifyPost">Modifier</button>
  </div>
</template>
<script>
export default {
  name: "modifyButton",
  el: "#modify-button",
  props: {
    modifyPost: {
      type: Function,
      required: true,
    },
  },
};
</script>
