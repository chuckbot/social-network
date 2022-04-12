<template>
  <div id="cardprofile">
    <a href="" @click.prevent="$emit('send:id', this.userId)">
      <div id="picture-ctn">
        <img :src="profilePicURL" alt="Profile Picture" width="100" />
      </div>
      <div id="firstname-ctn">
        <span id="firstName">{{ firstName }}</span>
      </div>
      <div id="lastname-ctn">
        <span id="lastName">{{ lastName }}</span>
      </div>
      <div id="email-ctn" v-if="email">{{ email }}</div>
      <div id="position-ctn">
        <span id="position">{{ position }}</span>
      </div>
      <div id="description-ctn">
        <span id="description">{{ description }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "CardProfile",
  el: "#cardprofile",
  props: {
    userId: {
      type: String,
      required: true,
    },
    profilePicURL: {
      type: String,
      default: "http://localhost:3000/images/user-solid.svg",
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
    email: {
      type: String,
    },
    computed: {},
  },
};
</script>
