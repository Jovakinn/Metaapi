import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '../entities/task.entity';
import { ITask } from '../interfaces/task.interface';
import { CreateTaskDto } from '../dto/create-task';
import { NotFoundTaskException } from '../exceptions/not-found-exception.exceptions';

@Injectable()
export class TaskService {
  private tasks: ITask[] = [];

  public async getTasks(): Promise<ITask[]> {
    return this.tasks;
  }

  public async getTaskById(id: number): Promise<ITask> {
    const task = await this.tasks.find((t) => t.id === +id);
    if (!task) {
      throw new NotFoundTaskException();
    }
    return task;
  }

  public async getTaskByEmail(email: string): Promise<ITask[]> {
    const task = this.tasks.filter((t) => t.email === email);
    if (!task || task.length === 0) {
      throw new BadRequestException();
    }
    return task;
  }

  public async createTask({
    task,
    email,
    tags,
    status,
  }: CreateTaskDto): Promise<ITask> {
    const newTask = new Task(task, email, tags, status);
    this.tasks.push(newTask);
    return newTask;
  }

  public async deleteTask(id: number): Promise<void> {
    this.tasks.filter((x) => x.id !== id);
  }
}
