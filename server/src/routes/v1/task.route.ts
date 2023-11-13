import express, { Router } from 'express';
import authenticate from '../../middleware/auth.middleware';
import { taskController, taskValidation } from '../../modules/tasks';
import validate from '../../middleware/validate.middleware';

const router: Router = express.Router();

router
  .post('/', authenticate, validate(taskValidation.createTask), taskController.createTask)
  .get('/', authenticate, taskController.getTasks)
  .get('/overview', authenticate, taskController.getTasksOverview)
  .get('/:taskId', authenticate, validate(taskValidation.taskId), taskController.getTask)
  .patch('/:taskId', authenticate, validate(taskValidation.updateTask), taskController.updateTask)
  .delete('/:taskId', authenticate, validate(taskValidation.taskId), taskController.deleteTask);

export default router;
