import mongoose from 'mongoose';
import { ITaskDoc, ITaskModel } from './tasks.interface';
import toJSON from '../../utils/db-utils/to-json/to-json';
import paginate from '../../utils/db-utils/pagination';
import { TaskStatus } from './tasks.enum';

const { Schema } = mongoose;

const taskSchema = new Schema<ITaskDoc, ITaskModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: TaskStatus.TODO,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

taskSchema.plugin(toJSON);
taskSchema.plugin(paginate);

const Task = mongoose.model<ITaskDoc, ITaskModel>('Task', taskSchema);

export default Task;
