import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IClaims } from 'src/helpers/interface/claims.interface';
import { ExceptionMapping } from 'src/helpers/mapping/response.mapping';

@Injectable()
export class ProfileService {
  constructor(private prismaService: PrismaService) {}

  async getProfile(claims: IClaims) {
    const result = await this.prismaService.userProfile.findUnique({
      where: { uuid: claims.employeeUuid },
    });
    if (!result) {
      throw new BadRequestException(ExceptionMapping.common.dataNotFound);
    }
    return result;
  }

  async getLeaderBoard() {
    const result = await this.prismaService.userProfile.findMany({
      orderBy: {
        totalScore: 'desc',
      },
    });
    return result;
  }
}
