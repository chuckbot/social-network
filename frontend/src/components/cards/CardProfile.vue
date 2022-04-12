<template>
  <figure id="cardprofile" class="card-profile" :class="{ cardProfilesView: isProfilesView }">
    <a href="" class="link text--normal-w text--normal-f ctn ctn--flex-start"
      @click.prevent="$emit('sendid', this.userId)">
      <div id="picture-ctn" class="card-profile__img-ctn">
        <img :src="profilePicURL" alt="Profile Picture" />
      </div>
      <div class="card-profile__infos-ctn ctn--column">
        <div class="ctn ctn--flex-start">
          <div class="text--bold-w text--normal-f text--red-underline">
            <span id="firstName">{{ firstName + " " }}</span>
            <span id="lastName">{{ lastName }}</span>
          </div>
        </div>
        <div id="email-ctn" class="text--normal-w text--normal-f" v-if="email">
          {{ email }}
        </div>
        <div id="position-ctn" class="text--light text--normal-f text--bold-w">
          <p id="position">{{ position }}</p>
        </div>
        <div id="description-ctn" class="text--black text--small-f">
          <p id="description">{{ description }}</p>
        </div>
      </div>
    </a>
  </figure>
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
      default: "Works at Groupomania",
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
  data() {
    return {};
  },
  computed: {
    isProfilesView() {
      return this.$route.name === "profiles";
    },
  },
};
</script>
