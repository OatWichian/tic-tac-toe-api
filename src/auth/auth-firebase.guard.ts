import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { IClaimsFirebase } from 'src/helpers/interface/claims.interface';
import { AuthService } from './auth.service';
@Injectable()
export class AuthFirebaseGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      // verify token
      const authorization = request.headers?.authorization;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.replace(/bearer/gim, '').trim();
      if (!authToken) {
        throw new UnauthorizedException('Authentication token not found.');
      }
      const decodedToken: IClaimsFirebase = await this.authService.verifyFirebaseIdToken(authToken);
      // set claims
      request.headers.claimsFirebase = decodedToken;
      return true;
    } catch (error) {
      throw this.authService.guardException(request, error);
    }
  }
}
