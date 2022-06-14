import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategy/local.strategy.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controller/auth.controller.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt-strategy.service';
import { JwtAuthGuard } from './guards/jwt-auth-guard.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthenticationModule {}
