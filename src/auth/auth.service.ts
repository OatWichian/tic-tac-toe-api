import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';
import { IPayloadToken } from 'src/helpers/interface/claims.interface';

const _TokenExpiresIn = '2h';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  guardException(req: Request, error: any) {
    // check if env. is dev
    console.error('Error stack :: ', error);

    const statusCode = HttpStatus.UNAUTHORIZED;
    const resBody = {
      code: `${statusCode}`,
      msg: `Access denied. You don’t have permission to view this. Please try again or contact support.`, // error?.response?.error || error?.message,
      msgTh: `ขออภัยในความไม่สะดวก ไม่ได้รับอนุญาตให้เข้าถึงระบบ กรุณาลองใหม่ภายหลัง `,
      data: null,
      error: {
        status: statusCode,
        desc: error?.response?.message || error?.message,
      },
    };
    return new HttpException(resBody, statusCode, {
      cause: error,
    });
  }

  /** --- validate --- */

  validateApiKey(key: string) {
    if (key && key === this.configService.get('common.headerApiKey.key')) {
      return true;
    }
    return false;
  }

  verifyFirebaseIdToken(token: string) {
    return admin.auth().verifyIdToken(token);
  }

  validatePayloadIgnEmployeeId(payload: unknown) {
    const keyValidates: Array<keyof IPayloadToken> = ['fid'];
    return this.validateKeyInPayload(payload, keyValidates);
  }

  validatePayload(payload: unknown) {
    const keyValidates: Array<keyof IPayloadToken> = ['fid', 'employeeId'];
    return this.validateKeyInPayload(payload, keyValidates);
  }

  validatePayloadIngExpire(payload: unknown) {
    const keyValidates: Array<keyof IPayloadToken> = ['fid'];
    return this.validateKeyInPayload(payload, keyValidates);
  }

  private validateKeyInPayload(payload: unknown, keyValidates: Array<keyof IPayloadToken>) {
    for (const key of keyValidates) {
      if (_.isEmpty(payload[key])) {
        this.logger.warn(`invalid payload data : ${key} is empty`);
        throw { message: 'invalid payload data' };
      }
    }
    return payload;
  }

  /** --- generate token --- */

  async generateFrontToken(payload: IPayloadToken) {
    const secret = this.configService.get('common.auth.secretKey.frontEnd');
    const accessToken = this.jwtService.sign(payload, {
      secret,
      expiresIn: _TokenExpiresIn,
    });
    return {
      accessToken: accessToken,
    };
  }
}
