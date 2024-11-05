import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
// strategy

import { JwtFrontStrategy } from './strategies/jwt-front.strategy';
import { JwtFrontIgnEmployeeIdStrategy } from './strategies/jwt-front-ign-employee-id.strategy';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        signOptions: {
          expiresIn: '1d',
          algorithm: configService.get('common.auth.algorithm'),
        },
        verifyOptions: {
          algorithms: [configService.get('common.auth.algorithm')],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtFrontStrategy, JwtFrontIgnEmployeeIdStrategy],
  exports: [AuthService],
})
export class AuthModule {}
