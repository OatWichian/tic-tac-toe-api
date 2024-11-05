import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppConfigModule } from './config/app-config.module';
import { PrismaModule } from './database/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ReqApiModule } from './req-api/req-api.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({}),
    PrismaModule,
    ReqApiModule,
    AuthModule,
    RoutesModule,
    FirebaseModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
