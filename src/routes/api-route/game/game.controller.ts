import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/auth/apikey.guard';
import { AuthFrontGuard } from 'src/auth/auth-front.guard';
import { Claims } from 'src/helpers/decorators/claims.decorator';
import { IClaims } from 'src/helpers/interface/claims.interface';
import RouterConfig from 'src/routes/router.config';
import { CreateGameDto } from './dto/create-game.dto';
import { GameService } from './game.service';

@UseGuards(ApiKeyGuard, AuthFrontGuard)
@Controller(RouterConfig.api.game.root)
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('score')
  calculateScore(@Claims() claims: IClaims, @Body() createGameDto: CreateGameDto) {
    return this.gameService.calculateScore(claims, createGameDto);
  }
}
