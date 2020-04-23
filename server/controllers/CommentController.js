import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { commentService } from '../services/CommentService'

export class CommentController extends BaseController {
  constructor() {
    super("api/comment")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      // .get('', this.getAll)
      .get('/:id', this.getByTaskId)
      .post('', this.createComment)
      .put('/:id', this.editComment)
      .delete('/:id', this.deleteComment)
  }
  async getByTaskId(req, res, next) {
    try {
      let data = await commentService.getByTaskId(req.params.id, req.userInfo.email)
      return res.send(data)
    } catch (error) { next(error) 
    }
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await commentService.createComment(req.body)
      return res.send(data)

    } catch (error) { next(error) }
  }
  async editComment(req, res, next) {
    try {
      let data = await commentService.editComment(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error)
    }
  }
  async deleteComment(req, res, next) {
    try {
      await commentService.deleteComment(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted!!!!!!!!!!")
    } catch (error) { next(error)
    } 
  }
}