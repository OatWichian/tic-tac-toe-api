import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { IClaims } from 'src/helpers/interface/claims.interface';
import { ExceptionMapping } from 'src/helpers/mapping/response.mapping';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class RegisterService {
  constructor(private prismaService: PrismaService) {}

  async create(createRegisterDto: CreateRegisterDto, claims: IClaims) {
    const fetchUserProfile = await this.prismaService.userProfile.findMany({
      where: { firebaseId: claims.fid },
    });

    if (fetchUserProfile.length) {
      throw new BadRequestException(ExceptionMapping.auth.registerAlready);
    }

    const result = await this.prismaService.userProfile.create({
      data: {
        firstName: createRegisterDto.firstName,
        lastName: createRegisterDto.lastName,
        email: createRegisterDto.email,
        firebaseId: claims.fid,
        imageUrl: createRegisterDto.imageUrl,
      },
    });

    return result;
  }
}
