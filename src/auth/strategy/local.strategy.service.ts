import { Injectable } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
