import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../input/create-user.dto';
import { UpdateUserInput } from '../input/update-user.input';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async createUser(createUserInput: CreateUserDto): Promise<UserEntity> {
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

  public async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findBy({ email: email });
    if (!user) {
      throw new HttpException(
        'User with this email does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
    return user.at(0);
  }

  public async create(userData: CreateUserDto) {
    const newUser = await this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }
}
