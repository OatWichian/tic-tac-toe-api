import { BadRequestException, Injectable } from '@nestjs/common';
import { IClaims } from 'src/helpers/interface/claims.interface';
import { CreateGameDto } from './dto/create-game.dto';
import { PrismaService } from 'src/database/prisma.service';
import { EGameResult } from 'src/helpers/constance/common.enum';
import { ExceptionMapping } from 'src/helpers/mapping/response.mapping';
import { Prisma } from '@prisma/client';

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  async calculateScore(claims: IClaims, createGameDto: CreateGameDto) {
    const fetchProfile = await this.prismaService.userProfile.findUnique({
      where: {
        uuid: claims.employeeUuid,
      },
    });

    if (!fetchProfile) {
      throw new BadRequestException(ExceptionMapping.common.dataNotFound);
    }

    const fetchGameMaster = await this.prismaService.gameMaster.findUnique({
      where: {
        uuid: '123e4567-e89b-12d3-a456-426614174000',
      },
    });

    let result: Prisma.UserProfileGetPayload<object>;
    if (createGameDto.gameResult === EGameResult.WIN) {
      const winContinuous = fetchProfile.winContinuous + 1;
      if (winContinuous >= fetchGameMaster.winContinuous) {
        result = await this.prismaService.userProfile.update({
          data: {
            totalScore: fetchProfile.totalScore + fetchGameMaster.winScore + fetchGameMaster.specialScore,
            winContinuous: 0,
          },
          where: {
            uuid: fetchProfile.uuid,
          },
        });
      } else {
        result = await this.prismaService.userProfile.update({
          data: {
            totalScore: fetchProfile.totalScore + fetchGameMaster.winScore,
            winContinuous: winContinuous,
          },
          where: {
            uuid: fetchProfile.uuid,
          },
        });
      }
    } else {
      result = await this.prismaService.userProfile.update({
        data: {
          totalScore: fetchProfile.totalScore > 0 ? fetchGameMaster.lostScore + fetchProfile.totalScore : 0,
          winContinuous: 0,
        },
        where: {
          uuid: fetchProfile.uuid,
        },
      });
    }
    return result;
  }
}
