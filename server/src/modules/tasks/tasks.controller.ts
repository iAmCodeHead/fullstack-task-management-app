import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import * as taskService from './tasks.service';
import pick from '../../utils/pick';
import { IOptions } from '../../utils/db-utils/pagination';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(httpStatus.CREATED).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const task = await taskService.fetchTask(taskId, userId);
    res.status(httpStatus.OK).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryFilter = pick(req.query, ['createdAt', 'status', 'priority']);
    const { userId } = req.body;
    const filter = { ...queryFilter, userId };
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await taskService.fetchTasks(filter, options);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const result = await taskService.updateTask(taskId, req.body);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const result = await taskService.deleteTask(taskId, userId);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTasksOverview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;
    const result = await taskService.tasksOverview(userId);
    res.status(httpStatus.OK).json(result);
  } catch (error) {
    next(error);
  }
};
