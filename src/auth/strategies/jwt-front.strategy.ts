import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EStrategyName } from 'src/helpers/constance/common.enum';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtFrontStrategy extends PassportStrategy(Strategy, EStrategyName.JWT_FRONT) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('common.auth.secretKey.frontEnd'),
    });
  }

  async validate(payload: { data: string }) {
    // const data = this.authService.decryptData(payload.data, this.configService.get('common.auth.secretKey.frontEnd'));
    // if (!data) return false;

    return this.authService.validatePayload(payload);
  }
}
