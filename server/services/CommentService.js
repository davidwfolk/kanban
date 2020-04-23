import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class CommentService {
  async getCommentByTaskId(taskId, userEmail) {
    let data = await dbContext.Comment.find({ taskId: taskId, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Inalid ID or you do not own this comment!!!!")
    }
    return data
  }
  async getByTaskId(taskId, userEmail) {
    let data = await dbContext.Comment.findOne({ _id: taskId, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Inalid ID or you do not own this comment!!!!")
    }
    return data
  }
  async createComment(rawData) {
    let data = await dbContext.Comment.create(rawData)
    return data
  }
  async editComment(commentId, userEmail, update) {
    let data = await dbContext.Comment.findOneAndUpdate({ _id: commentId, creatorEmail: userEmail },
      update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
    return data;
  }
  async deleteComment(commentId, userEmail) {
    let data = await dbContext.Comment.findOneAndRemove({ _id: commentId, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
  }
}

export const commentService = new CommentService()