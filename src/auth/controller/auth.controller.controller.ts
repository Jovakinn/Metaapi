import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LocalAuthGuard } from '../guards/local-auth-guard.service';
import { RequestWithUser } from '../interfaces/RequestWithUser';

@Controller('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() registrationData: RegisterDto) {
    return await this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  public async logIn(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
