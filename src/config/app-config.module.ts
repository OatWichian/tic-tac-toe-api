import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// config
import commonConfig from './common.config';
import databaseConfig from './database.config';
import firebaseAdminConfig from './firebase.admin.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConfig, databaseConfig, firebaseAdminConfig],
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {}
