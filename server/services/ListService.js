import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ListService {
  async getAll(userEmail) {
    return await dbContext.List.find({ creatorEmail: userEmail }).populate("title", "creator email")
  }
  async getListByBoardId(boardId, userEmail) {
    let data = await dbContext.List.find({ boardId: boardId, creatorEmail: userEmail})
    if (!data) {
      throw new BadRequest("Invalid Board or you do not own this board")
    }
    return data
  }
  async createList(rawData) {
    let data = await dbContext.List.create(rawData)
    return data
  }
  async editList(boardId, userEmail, update) {
    let data = await dbContext.List.findOneAndUpdate({ _id: boardId, creatorEmail: userEmail },
      update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
    return data;
  }
  async deleteList(boardId, userEmail) {
    let data = await dbContext.List.findOneAndRemove({ _id: boardId, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you don't have permissions")
    }
  }
}

export const listService = new ListService()