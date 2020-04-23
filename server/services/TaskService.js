import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TaskService {

  async getTaskByListId(listId, userEmail) {
    let data = await dbContext.Task.find({listId: listId, creatorEmail: userEmail})
    if (!data) {
      throw new BadRequest("bad stuff happened.")
  }
return data
}
  async createTask(rawData) {
    let data = await dbContext.Task.create(rawData)
    return data
  }
  async editTask(listId, userEmail, update) {
    let data = await dbContext.Task.findOneAndUpdate({ _id: listId, creatorEmail: userEmail },
      update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
    return data;
  }
  async deleteTask(listId, userEmail) {
    let data = await dbContext.Task.findOneAndRemove({ _id: listId, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
  }
}

export const taskService = new TaskService()