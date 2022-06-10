import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '../../services/user/user.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserInput } from '../../input/create-user.input';
import { UpdateUserInput } from '../../input/update-user.input';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  public async createUser(
    @Args('createUser') createUserInput: CreateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserInput);
  }

  @Mutation(() => UserEntity)
  public async updateUser(
    @Args('updateUser') updateUserInput: UpdateUserInput,
  ): Promise<UserEntity> {
    return await this.userService.updateUser(updateUserInput);
  }

  @Mutation(() => Number)
  public async removeUser(@Args('id') id: number): Promise<number> {
    return await this.userService.removeUser(id);
  }

  @Query(() => UserEntity)
  public async getOneUser(@Args('id') id: number): Promise<UserEntity> {
    return await this.userService.getOneUser(id);
  }

  @Query(() => [UserEntity])
  public async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAllUsers();
  }
}
