<template>
  <p id="date" class="date text--small-f text--normal-w">{{ this.date }}</p>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DateCom",
  el: "#date",
  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["get_local_com_date", "get_local_post_date"]),
    date() {
      if (this.type === "POST") {
        return this.get_local_post_date(this.id);
      } else if (this.type === "COM") {
        return this.get_local_com_date(this.id);
      } else {
        return undefined;
      }
    },
  },
};
</script>
