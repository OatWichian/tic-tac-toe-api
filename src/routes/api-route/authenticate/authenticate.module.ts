import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { RegisterModule } from './register/register.module';
import { TokenModule } from './token/token.module';
@Module({
  imports: [RegisterModule, FirebaseModule, TokenModule],
})
export class AuthenticateModule {}
