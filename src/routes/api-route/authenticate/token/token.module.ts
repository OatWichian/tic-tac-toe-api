import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [TokenController],
  providers: [TokenService, AuthService],
})
export class TokenModule {}
