import { Status } from '../enums/status';

export interface ITask {
  id: number;
  task: string;
  status: Status;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
