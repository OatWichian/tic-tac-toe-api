import { Module } from '@nestjs/common';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { ProfileModule } from './profile/profile.module';
import { GameModule } from './game/game.module';

@Module({
  imports: [AuthenticateModule, ProfileModule, GameModule],
})
export class ApiRouteModule {}
