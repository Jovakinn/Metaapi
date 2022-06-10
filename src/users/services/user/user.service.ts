import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../../input/create-user.input';
import { UpdateUserInput } from '../../input/update-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(
    createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userRepository.save({ ...createUserInput });
  }

  public async getOneUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: id });
  }

  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  public async removeUser(id: number): Promise<number> {
    await this.userRepository.delete({ id });
    return id;
  }

  public async updateUser(
    updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    await this.userRepository.update(
      { id: updateUserInput.id },
      { ...updateUserInput },
    );
    return await this.getOneUser(updateUserInput.id);
  }
}
