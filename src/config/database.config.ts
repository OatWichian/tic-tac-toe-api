import { registerAs } from '@nestjs/config';
import { ISqlConfig } from '../helpers/interface/common.interface';

export default registerAs<ISqlConfig>('database', () => ({
  client: process.env.DATABASE_CLIENT,
  migrations: process.env.DATABASE_MIGRATIONS,
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  url: process.env.DATABASE_URL,
  replica_host: process.env.DATABASE_REPLICA_HOST,
  replica_port: +process.env.DATABASE_REPLICA_PORT,
  replica_user: process.env.DATABASE_REPLICA_USER,
  replica_password: process.env.DATABASE_REPLICA_PASSWORD,
  replica_database: process.env.DATABASE_REPLICA_DATABASE,
  replica_url: process.env.DATABASE_REPLICA_URL,
}));
