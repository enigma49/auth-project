import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomLogger } from 'src/logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: CustomLogger,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    if (password === '') {
      this.logger.error('Password is required', email);
      throw new UnauthorizedException('Password is required');
    }
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      this.logger.error('Invalid credentials', email);
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
