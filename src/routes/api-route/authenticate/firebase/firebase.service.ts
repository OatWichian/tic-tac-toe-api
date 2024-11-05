import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { ReqApiService } from 'src/req-api/req-api.service';
import { FirebaseDto } from './dto/firebase.dto';
import { FirebaseLinkEmailDto } from './dto/firebase-link-email.dto';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class FirebaseService {
  constructor(
    private configService: ConfigService,
    private reqApiService: ReqApiService,
  ) {}

  async firebaseSignup(firebaseDto: FirebaseDto) {
    let userResponse: UserRecord;
    try {
      userResponse = await admin.auth().createUser({
        email: firebaseDto.email,
        password: firebaseDto.password,
        emailVerified: false,
        disabled: false,
      });
    } catch (error) {
      if (error?.code == 'auth/email-already-exists') {
        const userRecord = await admin.auth().getUserByEmail(firebaseDto.email);
        const providerPassword = userRecord.providerData.find((val) => val.providerId == 'password');
        if (!providerPassword) {
          return this.linkEmail({ email: firebaseDto.email, password: firebaseDto.password, fid: userRecord.uid });
        }
      }
      throw new BadRequestException(error);
    }

    return userResponse;
  }

  async firebaseSignIn(firebaseDto: FirebaseDto) {
    admin
      .auth()
      .getUserByEmail(firebaseDto.email)
      .then((userRecord) => {
        admin.auth().revokeRefreshTokens(userRecord.uid);
      })
      .catch((error) => {
        console.log('Error fetching user data:', error);
      });

    const url = `${this.configService.get('firebase.apiIdentity')}?key=${this.configService.get('firebase.config.apiKey')}`;
    const body = {
      email: firebaseDto.email,
      password: firebaseDto.password,
      returnSecureToken: true,
    };
    const signInResponse = await this.reqApiService.post('signInFirebase', url, body);
    return signInResponse;
  }

  async linkEmail(firebaseDto: FirebaseLinkEmailDto) {
    try {
      const userRecord = await admin.auth().updateUser(firebaseDto.fid, {
        email: firebaseDto.email,
        password: firebaseDto.password,
        emailVerified: false,
      });
      return userRecord;
    } catch (error) {
      throw error;
    }
  }
}
