import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserResolver } from './resolvers/user/user.resolver';
import { UserController } from './controller/userController';
import { AuthService } from '../auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserResolver, AuthService, JwtService],
  controllers: [UserController],
})
export class UsersModule {}
