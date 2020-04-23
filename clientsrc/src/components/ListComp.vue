<template>
  <div class="list card bglist col-12 col-lg-2 mr-1 mb-2 p-2 border-0 rounded-lg">
    <div v-if="!editing">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-6 p-0 mt-1 mb-1"><strong>{{listData.title}}</strong></div>
            <div class="col-1">
              <button class="btn btn-sm textColor" @click="editing = true">
                <svg
                  class="bi bi-pencil"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div class="col-1">
              <button class="btn btn-sm text-danger" @click="deleteList()">
                <svg
                  class="bi bi-trash"
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <form>
        <input type="text" v-model="listData.title" />
        <button class="btn text-warning" @click="editList()">submit</button>
      </form>
    </div>
    <task v-for="task in tasks" :taskData="task" :key="task._id"></task>
    <form>
      <span>
        <input
          type="text"
          v-model="newTask.title"
          class="bg-dark text-white input-group-sm border-0 rounded-lg"
          placeholder=" New Task"
        />
        <button class="display-5 btn mr-1 p-0" @click="addNewTask()">
          <strong>+</strong>
        </button>
      </span>
    </form>
  </div>
</template>


<script>
import Task from "../components/TaskComp";
export default {
  name: "list",
  props: ["listData"],
  mounted() {
    // this.$store.dispatch("getListByBoardId", this.$route.params.listId);
    this.$store.dispatch("getTaskByListId", this.listData.id);
  },
  data() {
    return {
      editing: false,
      newTask: {}
    };
  },
  computed: {
    profile() {
      return this.$store.state.user;
    },
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    }
  },
  methods: {
    addNewTask() {
      this.newTask.listId = this.listData.id;
      this.newTask.creatorEmail = this.listData.creatorEmail;
      console.log("addNewList", this.newTask.creatorEmail);
      this.$store.dispatch("addNewTask", this.newTask);
      this.newTask = {};
    },
    deleteList() {
      this.$store.dispatch("deleteList", this.listData);
    },
    editList() {
      this.$store.dispatch("editList", this.listData);
      this.editing = false;
    }
  },
  components: {
    Task
  }
};
</script>


<style scoped>
input {
  width: 85%;
}
span {
  display: block;
  overflow: hidden;
  padding: 5px 0 5px 0;
}
.bglist {
  background-color: rgba(0, 20, 63, 0.7);
}
.textColor {
  color: yellow
}
</style>