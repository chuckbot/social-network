<template>
  <div id="submitbutton">
    <input type="submit" :value="label" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  name: "SubmitButton",
  el: "#submitbutton",
  props: {
    label: String,
    disabled: Boolean,
  },
};
</script>
