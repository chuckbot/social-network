<template>
  <div id="cancel-button">
    <button
      type="button"
      @click="$emit('cancel')"
      class="btn text--btn text--center text--normal-w text--normal-f"
    >
      {{ label }}
    </button>
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
