<template>
  <div id="delete-button">
    <button>Supprimer</button>
  </div>
</template>
<script>
export default {
  name: "DeleteButton",
  el: "#delete-button",
  props: {
    type: Function,
    required: true,
  },
};
</script>
