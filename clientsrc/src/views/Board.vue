<template>
  <div class="board container-fluid bg-image">
    <div class="row mt-2 ml-2">
      <div class="col-12">
        <h6 class="text-light mt-2 p-0 m-0 text-left"> 
          <strong>{{board.title}} - {{board.description}}</strong>
        </h6>
      </div>
    </div>
    <div class="row p-2">
      <div class="col-12">
        <div id="card-display" class="row card border-0 bg-transparent text-light">
          <list v-for="list in lists" :listData="list" :key="list._id"></list>
          <form @submit.prevent="addNewList()">
            <input
              type="text"
              v-model="newList.title"
              class="bg-light text-dark input-group-sm border-0 ml-2 rounded-lg mt-2"
              placeholder=" New List"
              
            />
            <button class="display-5 btn m-0 p-0" type="submit">
              <strong>+</strong>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/ListComp";
export default {
  data() {
    return {
      newList: {}
    };
  },
  name: "board",
  props: ["boardId"],
  async mounted() {
    await this.$store.dispatch("getProfile");
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    this.$store.dispatch("getListByBoardId", this.$route.params.boardId);
  },
  computed: {
    profile() {
      return this.$store.state.user;
    },
    board() {
      //**SOLVED** //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    addNewList() {
      this.newList.boardId = this.$route.params.boardId;
      this.newList.creatorEmail = this.board.creatorEmail;
      console.log("addNewList", this.newList.creatorEmail);
      this.$store.dispatch("addNewList", this.newList);
      this.newList = {};
    }
  },
  components: {
    List
  }
};
</script>

<style>
#card-display {
  flex-direction: row;
}
</style>
