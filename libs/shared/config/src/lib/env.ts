import * as dotenv from 'dotenv';

dotenv.config({ path: './libs/shared/config/src/lib/.env' });

export const env = {
  PORT: process.env['PORT'],
  DATABASE_TYPE: process.env['DATABASE_TYPE'],
  ORACLE_USER: process.env['ORACLE_USER'],
  ORACLE_PASSWORD: process.env['ORACLE_PASSWORD'],
  ORACLE_DATA_SOURCE: process.env['ORACLE_DATA_SOURCE'],
  SQLITE_PATH: process.env['SQLITE_PATH']
};
