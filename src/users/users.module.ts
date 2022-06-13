import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { UserController } from './controller/userController';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, AuthenticationService],
  controllers: [UserController],
})
export class UsersModule {}
