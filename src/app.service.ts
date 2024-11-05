import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly configService: ConfigService) {}

  getAppInfo() {
    const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
    return {
      APP_NAME: this.configService.get('common.name'),
      APP_VERSION: this.configService.get('common.version'),
      APP_START: this.configService.get('common.appStart'),
      NODE_ENV: this.configService.get('common.environment'),
      MEMORY_USED: `${Math.round(memoryUsed * 100) / 100} MB`,
    };
  }
}
