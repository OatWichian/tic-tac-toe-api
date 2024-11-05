import { Controller, Get, UseGuards } from '@nestjs/common';
import { Claims } from 'src/helpers/decorators/claims.decorator';
import { IClaims } from 'src/helpers/interface/claims.interface';
import { ProfileService } from './profile.service';
import { ApiKeyGuard } from 'src/auth/apikey.guard';
import { AuthFrontGuard } from 'src/auth/auth-front.guard';
import RouterConfig from 'src/routes/router.config';

@UseGuards(ApiKeyGuard, AuthFrontGuard)
@Controller(RouterConfig.api.profile.root)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll(@Claims() claims: IClaims) {
    return this.profileService.getProfile(claims);
  }

  @Get('leader-board')
  findLeaderBoard() {
    return this.profileService.getLeaderBoard();
  }
}
