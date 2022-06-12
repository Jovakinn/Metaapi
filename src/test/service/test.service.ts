import { Injectable } from '@nestjs/common';
import { ITask } from '@src/test/interfaces/task.interface';

@Injectable()
export class TestService {
  private tasks: ITask[] = [
    { id: 1, task: 'task 1' },
    { id: 2, task: 'task 2' },
  ];

  public async getTasks(): Promise<ITask[]> {
    return this.tasks;
  }

  public async getTaskById(id: number): Promise<ITask> {
    return this.tasks.find((t) => t.id === +id);
  }

  public async createTask(task: ITask): Promise<ITask> {
    this.tasks.push(task);
    return task;
  }

  public async deleteTask(id: number): Promise<void> {
    this.tasks.filter((x) => x.id !== id);
  }
}
