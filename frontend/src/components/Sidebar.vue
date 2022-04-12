<template>
  <aside id="sidebar" class="sidebar">
    <ul class="ctn--column">
      <li v-for="value in sidebar_items" :key="value">
        <a
          :class="{ activeProfileLink: value.isActive }"
          class="link text--normal-w text--normal-f"
          href=""
          @click.prevent="value.method"
          >{{ value.label }}</a
        >
      </li>
    </ul>
  </aside>
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
  methods: {
    getActiveLink() {
      return Object.values(this.links_status).findIndex((val) => val);
    },
  },
};
</script>
