<template>
  <div id="sidebar">
    <ul>
      <li v-for="value in sidebar_items" :key="value">
        <a href @click.prevent="value.method">{{ value.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  el: "#sidebar",
  data() {
    return {};
  },
  computed: {},
  props: {
    sidebar_items: {
      type: Object,
      required: true,
    },
  },
};
</script>
