<template>
  <div class="task bg-light text-dark border border-primary rounded">
    <div v-if="!editing">
      <!-- Will be replaced by click on the task -->
      <li
        type="button"
        class="p-1"
        data-toggle="modal"
        :data-target="'#commentBodyModal' + taskData.id"
      >{{taskData.title}}
      </li>

      <!-- Modal -->
      <div class="modal fade" :id="'commentBodyModal' + taskData.id" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="commentModal">{{taskData.title}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <comment class v-for="comment in comments" :commentData="comment" :key="comment._id"></comment>
              <div>
                <form>
                  <input
                    type="text"
                    v-model="newComment.title"
                    class="bg-dark text-white input-group-sm border-0 ml-5"
                    placeholder="New Comment"
                  />
                  <button @click="addNewComment()">submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn text-secondary" @click="editing = true">
        <svg
          class="bi bi-pencil-square"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"
          />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <button class="btn text-secondary" @click="deleteTask()">
        <svg
          class="bi bi-trash2"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3.18 4l1.528 9.164a1 1 0 00.986.836h4.612a1 1 0 00.986-.836L12.82 4H3.18zm.541 9.329A2 2 0 005.694 15h4.612a2 2 0 001.973-1.671L14 3H2l1.721 10.329z"
            clip-rule="evenodd"
          />
          <path d="M14 3c0 1.105-2.686 2-6 2s-6-.895-6-2 2.686-2 6-2 6 .895 6 2z" />
          <path
            fill-rule="evenodd"
            d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <!--  -->
    </div>
    <div v-else>
      <form>
        <input type="text" v-model="taskData.title" />
        <button class="btn btn-sm btn-success" @click="editTask()">OK</button>
      </form>
    </div>
      <div>
        <div class="dropdown">
          <button
            class="btn-sm btn-secondary display-5 btn mb-1 py-0 px-1"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
          >
            <strong><-- --></strong>
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li
              v-for="list in lists"
              :listData="list"
              :key="list._id"
              class="dropdown-item"
              type="submit"
              @click="moveTaskToDifList(list)"
            >{{list.title}}</li>
          </div>
        </div>
      </div>
  </div>
</template>


<script>
import Comment from "../components/CommentComp";
export default {
  name: "task",
  props: ["taskData"],
  mounted() {
    this.$store.dispatch("getCommentByTaskId", this.taskData.id);
  },
  data() {
    return {
      editing: false,
      newComment: {}
    };
  },
  computed: {
    profile() {
      return this.$store.state.user;
    },
    comments() {
      return this.$store.state.comments[this.taskData.id];
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    addNewComment() {
      this.newComment.taskId = this.taskData.id;
      this.newComment.creatorEmail = this.taskData.creatorEmail;
      console.log("addNewComment", this.newComment.creatorEmail);
      this.$store.dispatch("addNewComment", this.newComment);
      this.newComment = {};
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.taskData);
    },
    editTask() {
      this.$store.dispatch("editTask", this.taskData);
      this.editing = false;
    },
    moveTaskToDifList(list) {
      this.taskData.oldListId = this.taskData.listId;
      this.taskData.listId = list.id;
      this.$store.dispatch("moveTaskToDifList", this.taskData);
    }
  },
  components: {
    Comment
  }
};
</script>


<style scoped>
</style>