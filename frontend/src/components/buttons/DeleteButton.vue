<template>
  <div id="delete-button">
    <button @click="deleteThis">Supprimer</button>
  </div>
</template>
<script>
export default {
  name: "DeleteButton",
  el: "#delete-button",
  props: {
    deleteThis: {
      type: Function,
      required: true,
    },
  },
};
</script>
