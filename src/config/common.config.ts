import { registerAs } from '@nestjs/config';

const pjson = require('../../package.json');

export default registerAs('common', () => ({
  appStart: new Date(),
  name: pjson.name || 'HW-PLUS API',
  version: pjson.version || '0.0.1',
  environment: process.env.NODE_ENV || 'development',
  port: +process.env.PORT || 3000,
  cors: process.env.CORS === 'true',
  headerApiKey: { key: process.env.HEADER_API_KEY, header: 'x-api-key' },
  auth: {
    algorithm: process.env.AUTH_ALGORITHM,
    secretKey: { frontEnd: process.env.AUTH_FRONT_SECRET, cms: process.env.AUTH_CMS_SECRET },
  },
  logResp: process.env.LOG_RESP === 'false' ? false : true,
  ipWhiteList: process.env.IP_WHITELIST,
  hwClientId: process.env.HW_CLIENT_ID,
  hwClientSecret: process.env.HW_CLIENT_SECRET,
  hwClientScope: process.env.HW_CLIENT_SCOPE,
}));
