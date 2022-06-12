import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ITask } from '@src/test/interfaces/task.interface';
import { TestService } from '@src/test/service/test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  public async getTasks(): Promise<ITask[]> {
    return await this.testService.getTasks();
  }

  @Get(':id')
  public async getTaskById(@Param('id') id: number): Promise<ITask> {
    return await this.testService.getTaskById(id);
  }

  @Post()
  public async createTask(@Body('task') task: ITask): Promise<ITask> {
    return await this.testService.createTask(task);
  }

  @Delete()
  public async deleteTask(@Param('id') id: number): Promise<void> {
    await this.testService.deleteTask(id);
  }
}
