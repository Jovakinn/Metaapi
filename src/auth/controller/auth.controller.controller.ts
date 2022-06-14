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
import { LogInDto } from '../dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserService } from '../../users/services/user.service';
import { JwtAuthGuard } from '../guards/jwt-auth-guard.service';

@Controller('authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  public async register(@Body() registrationData: RegisterDto) {
    return await this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  @ApiBody({ type: LogInDto })
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { cookie: refreshTokenCookie, token: refreshToken }: string =
      this.authService.getCookieWithJwtAccessToken(user.id);

    await this.userService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);

    if (user.isTwoFactorAuthenticationEnabled) {
      return;
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('log-out')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.userService.removeRefreshToken(request.user.id);
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }
}
