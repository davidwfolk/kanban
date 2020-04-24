<template>
  <div class="bg-image">
      <div class="center-name d-flex align-items-center justify-content-center">
        <div v-if="$auth.isAuthenticated">
          <h1 class="text-light">Welcome back, {{this.$store.state.user.name}}!</h1>
          <h2 class="text-light">Let's get started!</h2>
        </div>
        <div v-else>
          <h1 class="text-light">Sign up now, or login to begin!</h1>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
.center-name {
  height: 50vh;
}
</style>