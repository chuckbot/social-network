<template>
  <div id="cardprofile">
    <div id="picture-ctn">
      <img :src="profilePicURL" alt="Profile Picture" />
      <!-- {{ profilePicURL }} -->
    </div>
    <div id="firstname-ctn">
      <span id="firstName">{{ firstName }}</span>
    </div>
    <div id="lastname-ctn">
      <span id="lastName">{{ lastName }}</span>
    </div>
    <div id="position-ctn">
      <span id="position">{{ position }}</span>
    </div>
    <div id="description-ctn">
      <span id="description">{{ description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardProfile",
  el: "#cardprofile",
  props: {
    profilePicURL: {
      type: String,
      default: "../../assets/user-solid.svg",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "Works at TP",
    },
    description: {
      type: String,
      default: "✌️",
    },
    computed: {},
  },
};
</script>
