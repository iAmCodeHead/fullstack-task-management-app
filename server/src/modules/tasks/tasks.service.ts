import { ITask } from './tasks.interface';
import Task from './tasks.model';
import { IOptions, QueryResult } from '../../utils/db-utils/pagination';
import { TaskStatus } from './tasks.enum';

export const createTask = async (task: ITask): Promise<ITask> => {
  // TODO: Invalidate cache once a new task is created
  return Task.create(task);
};

export const fetchTask = async (taskId: string | undefined, userId: string | undefined): Promise<ITask | null> => {
  // TODO: Cache response
  return Task.findOne({ _id: taskId, userId });
};

export const fetchTasks = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const tasks = await Task.paginate(filter, options);
  // TODO: Cache response
  return tasks;
};

export const updateTask = async (taskId: string | undefined, task: ITask) => {
  // TODO: Invalidate cache once a task is updated
  return Task.updateOne({ _id: taskId, userId: task.userId }, task);
};

export const deleteTask = async (taskId: string | undefined, userId: string | undefined) => {
  // TODO: Invalidate cache once a task is deleted
  return Task.deleteOne({ _id: taskId }, { userId });
};

const finishedTasksCount = async (userId: string) => {
  // TODO: Cache response
  return Task.count({ userId, status: TaskStatus.DONE });
};

const todoTasksCount = async (userId: string) => {
  // TODO: Cache response
  return Task.count({ userId, status: TaskStatus.TODO });
};

const allTodayTasks = async (userId: string) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return Task.find({
    userId,
    dueDate: {
      $gte: today,
      $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
    },
  });
};

const filterTasksByStatus = (tasks: Array<ITask>, status: TaskStatus): Array<ITask> => {
  return tasks.filter((task) => task.status === status);
};

const dailyTasks = async (userId: string) => {
  const todaysTasks = await allTodayTasks(userId);
  const completedTodaysTasks = filterTasksByStatus(todaysTasks, TaskStatus.DONE);
  return { todaysTasks: todaysTasks.length, completedTodaysTasks: completedTodaysTasks.length };
};

export const tasksOverview = async (userId: string) => {
  // TODO: Cache response
  const daily = await dailyTasks(userId);
  const totalFinishedTasks = await finishedTasksCount(userId);
  const totalTasksInTodo = await todoTasksCount(userId);
  return { daily, totalFinishedTasks, totalTasksInTodo };
};
