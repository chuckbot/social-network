<template>
  <div id="card-com">
    <div>
      <img :src="profile.profileImg" alt="Profile Picture" />
      <span>{{ profile.firstName }}</span>
      <span> {{ profile.lastName }}</span>
    </div>
    <div>
      <span>{{ com.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCom",
  id: "#card-com",
  props: {
    profile: {
      id: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      profileImg: {
        type: String,
        required: true,
      },
    },
    com: {
      text: {
        type: String,
        required: true,
      },
    },
  },
};
</script>
