import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { listService } from '../services/ListService'
import { taskService } from "../services/TaskService";

export class ListController extends BaseController {
  constructor() {
    super("api/list")
    this.router
      .use(auth0provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      // .get('/:id', this.getByBoardId)
      .post('', this.createList)
      .put('/:id', this.editList)
      .delete('/:id', this.deleteList)
      .get('/:id/task', this.getTaskByListId)
  }

  async getAll(req, res, next) {
    try {
      //only gets boards by user who is logged in
      let data = await listService.getAll(req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async getTaskByListId(req, res, next) {
    try {
      let data = await taskService.getTaskByListId(req.params.id, req.userInfo.email)
      return res.send(data)
    }
    catch (err) { next(err) }
  }
  async createList(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await listService.createList(req.body)
      return res.send(data)

    } catch (error) { next(error) }
  }
  async editList(req, res, next) {
    try {
      let data = await listService.editList(req.params.id, req.userInfo.email, req.body)
    } catch (error) {
      next(error)
    }
  }
  async deleteList(req, res, next) {
    try {
      await listService.deleteList(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted!!!!!!!!!!")
    } catch (error) {
      next(error)
    }
  }
}