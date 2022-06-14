import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategy/local.strategy.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller.controller';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthenticationModule {}
