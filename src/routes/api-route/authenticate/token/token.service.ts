import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/database/prisma.service';
import { IClaimsFirebase } from 'src/helpers/interface/claims.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async generateToken(claimsFirebase: IClaimsFirebase) {
    // get employee
    const userData = await this.prismaService.userProfile.findUnique({
      where: { firebaseId: claimsFirebase.uid },
    });

    if (userData) {
      return this.authService.generateFrontToken({
        fid: claimsFirebase.uid,
        employeeId: userData.uuid,
      });
    } else {
      const result = await this.authService.generateFrontToken({
        fid: claimsFirebase.uid,
      });
      return { action: 'create_user', ...result };
    }
  }
}
