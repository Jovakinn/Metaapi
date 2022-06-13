import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';

@Controller('controller')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  public async getUserById(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @Post()
  public async createUser(@Body('user') user: UserEntity): Promise<UserEntity> {
    return await this.userService.createUser(user);
  }

  @Delete()
  public async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.removeUser(id);
  }
}
