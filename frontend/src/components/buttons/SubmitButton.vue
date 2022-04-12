<template>
  <div id="submitbutton" class="ctn--btn">
    <input
      type="submit"
      :value="label"
      :disabled="disabled"
      class="btn text--btn text--center text--normal-w text--normal-f"
    />
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
