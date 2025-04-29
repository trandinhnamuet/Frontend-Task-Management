import { Task } from './task.model';

export interface UserTasks {
  userID: number;
  userName: string;
  fullName: string;
  tasks: Task[];
}