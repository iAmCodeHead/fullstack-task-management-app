import { TaskPriority, TaskStatus } from "../enums/task.enum";

export interface FormData {
    title: string | '';
    description: string | '';
    dueDate: string | '';
    status: TaskStatus | '';
    priority:TaskPriority | '';
}

export interface Task extends FormData {
    id: string;
    showDescription: boolean;
  }