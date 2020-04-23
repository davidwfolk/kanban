<template>
<div class="row">
      <div class="col-12 text-center">
        <div v-if="$auth.isAuthenticated">
          <h1 class="text-dark">Welcome back, {{this.$store.state.user.name}}!</h1>
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
</style>