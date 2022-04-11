<template>
  <div id="delete-button">
    <button @click="deletePost">Supprimer</button>
  </div>
</template>
<script>
export default {
  name: "DeleteButton",
  el: "#delete-button",
  props: {
    deletePost: {
      type: Function,
      required: true,
    },
  },
};
</script>
