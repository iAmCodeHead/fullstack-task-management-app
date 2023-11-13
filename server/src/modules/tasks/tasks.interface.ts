import { Model, Document, Schema } from 'mongoose';
import { QueryResult } from '../../utils/db-utils/pagination';
import { TaskPriority, TaskStatus } from './tasks.enum';

export interface ITask {
  title: string;
  description: string;
  dueDate: Date;
  priority: TaskPriority;
  status: TaskStatus;
  userId?: Schema.Types.ObjectId;
}

export interface ITaskDoc extends ITask, Document {}

export interface ITaskModel extends Model<ITaskDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
