import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router/index'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 10000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    setActiveList(state, lists) {
      state.lists = lists
    },
    setActiveTask(state, payload) {
      // state.tasks[payload.listId] = payload.tasks **the ways of the old**
      Vue.set(state.tasks, payload.listId, payload.tasks)
    },
    setActiveComment(state, payload) {
      // state.comments = comments **ways of days past**
      Vue.set(state.comments, payload.taskId, payload.comments)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    async getBoard({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("boards/" + boardId)
        commit("setActiveBoard", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    async deleteBoard({commit, dispatch}, boardId) {
      try {
        let res = await api.delete("boards/" + boardId)
        dispatch("getBoards")
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion


    //#region -- LISTS --
    //NOTE if fails try setActiveBoard in commit, if fails again give up
    async getListByBoardId({ commit, dispatch }, boardId) {
      try {
        let res = await api.get("boards/" + boardId + "/list")
        commit('setActiveList', res.data)
      } catch (error) {
        console.error(error);

      }
    },
    async addNewList({ commit, dispatch }, newList) {
      try {
        let res = await api.post("list", newList)
        dispatch("getBoard", newList.boardId)
        dispatch("getListByBoardId", newList.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ commit, dispatch }, listData) {
      try {
        let res = await api.delete("list/" + listData.id)
        dispatch("getBoard", listData.boardId)
        dispatch("getListByBoardId", listData.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    async editList({ commit, dispatch }, listData) {
      try {
        let res = await api.put("list/" + listData.id, listData)
        dispatch('getBoard', listData.boardId)
        dispatch("getListByBoardId", listData.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion

    //#region --Tasks--
    async getTaskByListId({ commit, dispatch }, listId) {
      try {
        let res = await api.get("list/" + listId + "/task")
        commit('setActiveTask', { listId, tasks: res.data })
      } catch (error) {
        console.error(error);
      }
    },
    async addNewTask({ commit, dispatch }, newTask) {
      try {
        console.log("addNewTask", newTask);

        let res = await api.post("task", newTask)
        // dispatch("getBoard", newTask.listId) //REVISIT AFTER SLEEP
        dispatch("getTaskByListId", newTask.listId)
      } catch (error) {
        console.error(error);
      }
    },
    async editTask({ commit, dispatch }, taskData) {
      try {
        let res = await api.put("task/" + taskData.id, taskData)
        dispatch("getTaskByListId", taskData.listId)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ commit, dispatch }, taskData) {
      try {
        let res = await api.delete("task/" + taskData.id)
        dispatch("getTaskByListId", taskData.listId)
      } catch (error) {
        console.error(error);
      }
    },
    async moveTaskToDifList({ commit, dispatch }, taskData) {
      try {
        let res = await api.put("task/" + taskData.id, taskData)
        dispatch("getTaskByListId", taskData.listId)
        dispatch("getTaskByListId", taskData.oldListId)
        
      } catch (error) {
        console.error(error);
        
      }
    },
    //#endregion



    //#region --Comments --
    async getCommentByTaskId({ commit, dispatch }, taskId) {
      try {
        let res = await api.get("task/" + taskId + "/comment")
        commit('setActiveComment', { taskId, comments: res.data })
      } catch (error) {
        console.error(error);
      }
    },
    async addNewComment({ commit, dispatch }, newComment) {
      try {
        let res = await api.post("comment", newComment)
        // dispatch("getBoard", newTask.listId) //REVISIT AFTER SLEEP
        dispatch("getCommentByTaskId", newComment.taskId)
      } catch (error) {
        console.error(error);
      }
    },
    async editComment({ commit, dispatch }, commentData) {
      try {
        let res = await api.put("comment/" + commentData.id, commentData)
        dispatch("getCommentByTaskId", commentData.taskId)

      } catch (error) {
        console.error(error);
      }
    },
    async deleteComment({ commit, dispatch }, commentData) {
      try {
        let res = await api.delete("comment/" + commentData.id)
        dispatch("getCommentByTaskId", commentData.taskId)
      } catch (error) {
        console.error(error);
      }
    },

    //#endregion
  }
})