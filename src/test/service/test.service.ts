import { Injectable } from '@nestjs/common';
import { Task } from '../entities/test.entity';
import { ITask } from '../interfaces/task.interface';
import { CreateTaskDto } from '../dto/create-task';

@Injectable()
export class TestService {
  private tasks: ITask[] = [];

  public async getTasks(): Promise<ITask[]> {
    return this.tasks;
  }

  public async getTaskById(id: number): Promise<ITask> {
    return this.tasks.find((t) => t.id === +id);
  }

  public async createTask({
    task,
    tags,
    status,
  }: CreateTaskDto): Promise<ITask> {
    const newTask = new Task(task, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }

  public async deleteTask(id: number): Promise<void> {
    this.tasks.filter((x) => x.id !== id);
  }
}
