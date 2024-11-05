import { Module } from '@nestjs/common';
//
import { ApiRouteModule } from './api-route/api-route.module';

@Module({
  imports: [ApiRouteModule],
})
export class RoutesModule {}
