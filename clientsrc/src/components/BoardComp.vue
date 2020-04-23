<template>
    <div class="col-3 card mx-2 mt-3 boarder-3 bg-dark p-2 text-primary">
      <h4>{{boardData.title}}</h4>
      <h6>{{boardData.description}}</h6>
      <button class="btn btn-light my-1" @click="selectBoard()">Select</button>
      <button class="btn btn-light mb-1" @click="deleteBoard()">Delete</button>
    </div>
</template>


<script>
export default {
  name: "board",
  props: ["boardData"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    selectBoard() {
      this.$store.commit("setActiveBoard", {});
      this.$router.push({
        name: "board",
        params: { boardId: this.boardData.id }
      });
    },
    deleteBoard() {
      if(confirm('are you sure?')) {
        this.$store.dispatch("deleteBoard", this.boardData.id);
      }
    }
  },
  components: {}
};
</script>


<style scoped>
</style>