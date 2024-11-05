import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ReqApiService } from './req-api.service';
@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 120000,
    }),
  ],
  providers: [ReqApiService],
  exports: [ReqApiService],
})
export class ReqApiModule {}
