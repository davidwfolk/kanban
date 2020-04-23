<template>
  <div class="board text-dark">
<h4>{{boardData.title}}</h4>
<button @click="selectBoard()">Select</button>
<button @click="deleteBoard()">Delete</button>

  </div>
</template>


<script>
export default {
  name: 'board',
  props: ["boardData"],
  data(){
    return {}
  },
  computed:{},
  methods:{
    selectBoard() {
      this.$store.commit("setActiveBoard", {})
      this.$router.push({
        name: "board",
        params: {boardId: this.boardData.id}
      })
    },
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.boardData.id)
    }
  },
  components:{}
}
</script>


<style scoped>

</style>