import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const apiKey = request.headers[this.configService.get('common.headerApiKey.header')];
      if (!apiKey || apiKey.trim() === '') {
        throw new UnauthorizedException('API key is missing.');
      }

      const response = this.authService.validateApiKey(apiKey);
      if (!response) {
        throw new UnauthorizedException('Invalid API key.');
      }
      return response;
    } catch (error) {
      throw this.authService.guardException(request, error);
    }
  }
}
