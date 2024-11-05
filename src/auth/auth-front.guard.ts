import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EStrategyName } from 'src/helpers/constance/common.enum';
import { AuthService } from './auth.service';

@Injectable()
export class AuthFrontGuard extends AuthGuard(EStrategyName.JWT_FRONT) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    try {
      const activater = await super.canActivate(context);
      return activater;
    } catch (error) {
      throw this.authService.guardException(request, error);
    }
  }
}
