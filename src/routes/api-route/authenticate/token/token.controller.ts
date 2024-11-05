import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/apikey.guard';
import { AuthFirebaseGuard } from 'src/auth/auth-firebase.guard';
import { ClaimsFirebase } from 'src/helpers/decorators/claims.decorator';
import { IClaimsFirebase } from 'src/helpers/interface/claims.interface';
import RouterConfig from 'src/routes/router.config';
import { TokenService } from './token.service';

@UseGuards(ApiKeyGuard, AuthFirebaseGuard)
@Controller(RouterConfig.api.authenticate.service.token)
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Post()
  generateToken(@ClaimsFirebase() claimsFirebase: IClaimsFirebase) {
    return this.tokenService.generateToken(claimsFirebase);
  }
}
