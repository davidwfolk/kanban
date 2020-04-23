import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
import { dbContext } from "../db/DbContext"

const Task = new Schema({
  title: { type: String, required: true },
  creatorEmail: { type: String, required: true },
  listId: { type: ObjectId, ref: 'List', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })


Task.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

//CASCADE ON DELETE
// Task.pre('deleteMany', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     //something like...
//     dbContext.Task.deleteMany({ listId: this._conditions._id }),
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

// //CASCADE ON DELETE
// Task.pre('findOneAndRemove', function (next) {
//   //lets find all the lists and remove them
//   Promise.all([
//     dbContext.Task.deleteMany({ boardId: this._conditions._id })
//   ])
//     .then(() => next())
//     .catch(err => next(err))
// })

export default Task