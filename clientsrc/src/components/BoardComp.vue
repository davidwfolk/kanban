<template>
  <div class="board">
<h1>THIS IS THE BOARD!!!!!!</h1>
<p>{{boardData.title}}</p>
<button @click="selectBoard()">Select Board</button>

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
    }
  },
  components:{}
}
</script>


<style scoped>

</style>