import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from '../service/task.service';
import { ITask } from '../interfaces/task.interface';
import { CreateTaskDto } from '../dto/create-task';
import { EmailPipe } from '../pipes/email.pipe';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getTasks(): Promise<ITask[]> {
    return await this.taskService.getTasks();
  }

  @Get(':id')
  public async getTaskById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ITask> {
    return await this.taskService.getTaskById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post()
  public async createTask(@Body() task: CreateTaskDto): Promise<ITask> {
    return await this.taskService.createTask(task);
  }

  @Delete()
  public async deleteTask(@Param('id') id: number): Promise<void> {
    await this.taskService.deleteTask(id);
  }

  @Get('email/:email')
  public async getTaskByEmail(
    @Param('email', EmailPipe) email: string,
  ): Promise<ITask[]> {
    return await this.taskService.getTaskByEmail(email);
  }
}
