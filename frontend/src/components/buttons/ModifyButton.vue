<template>
  <div id="modify-button">
    <button @click="modifyThis">Modifier</button>
  </div>
</template>
<script>
export default {
  name: "modifyButton",
  el: "#modify-button",
  props: {
    modifyThis: {
      type: Function,
      required: true,
    },
  },
};
</script>
