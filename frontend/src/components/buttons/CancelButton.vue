<template>
  <div id="cancel-button">
    <button type="button" @click="$emit('cancel')">{{ label }}</button>
  </div>
</template>

<script>
export default {
  name: "CancelButton",
  el: "#cancel-button",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
