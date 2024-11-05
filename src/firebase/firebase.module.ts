import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const firebaseConfig = {
      type: configService.get<string>('firebase.credential.type'),
      project_id: configService.get<string>('firebase.credential.project_id'),
      private_key_id: configService.get<string>('firebase.credential.private_key_id').replace(/\\n/g, '\n'),
      private_key: configService.get<string>('firebase.credential.private_key'),
      client_email: configService.get<string>('firebase.credential.client_email'),
      client_id: configService.get<string>('firebase.credential.client_id'),
      auth_uri: configService.get<string>('firebase.credential.auth_uri'),
      token_uri: configService.get<string>('firebase.credential.token_uri'),
      auth_provider_x509_cert_url: configService.get<string>('firebase.credential.auth_provider_x509_cert_url'),
      client_x509_cert_url: configService.get<string>('firebase.credential.client_x509_cert_url'),
      universe_domain: configService.get<string>('firebase.credential.universe_domain'),
    } as admin.ServiceAccount;
    return admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
      databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
      storageBucket: `${firebaseConfig.projectId}.appspot.com`,
    });
  },
};
@Global()
@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider],
})
export class FirebaseModule {}
