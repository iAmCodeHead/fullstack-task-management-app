import { Segments, Joi, SchemaOptions } from 'celebrate';
import { ITask } from './tasks.interface';
import { TaskPriority, TaskStatus } from './tasks.enum';

export type ITaskValidation = Omit<ITask, 'userId'>;

const mongoId = /^[0-9a-fA-F]{24}$/;

const createTaskPayload: Record<keyof ITask, any> = {
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date().required(),
  priority: Joi.string()
    .valid(...Object.values(TaskPriority))
    .required(),
  status: Joi.string().valid(...Object.values(TaskStatus)),
  userId: Joi.string().regex(mongoId, 'valid id').required(),
};

const updateTaskPayload: Record<keyof ITask, any> = {
  title: Joi.string(),
  description: Joi.string(),
  dueDate: Joi.date(),
  priority: Joi.string().valid(...Object.values(TaskPriority)),
  status: Joi.string().valid(...Object.values(TaskStatus)),
  userId: Joi.string().regex(mongoId, 'valid id').required(),
};

export const createTask: SchemaOptions = {
  [Segments.BODY]: Joi.object().keys(createTaskPayload),
};

export const updateTask = {
  [Segments.BODY]: Joi.object().keys(updateTaskPayload),
  [Segments.PARAMS]: Joi.object().keys({
    taskId: Joi.string().regex(mongoId, 'valid id').required(),
  }),
};

export const taskId = {
  [Segments.PARAMS]: Joi.object().keys({
    taskId: Joi.string().regex(mongoId, 'valid id').required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    userId: Joi.string().regex(mongoId, 'valid id').required(),
  }),
};

export const getTasks = {
  [Segments.QUERY]: Joi.object().keys({
    sortBy: Joi.string(),
  }),
};
