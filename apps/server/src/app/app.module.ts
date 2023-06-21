import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionsModule } from './regions/regions.module';

import { env } from '@libs/shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({ ...env })],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_TYPE: Joi.string().required(),
        ORACLE_USER: Joi.string().required(),
        ORACLE_PASSWORD: Joi.string().required(),
        ORACLE_DATA_SOURCE: Joi.string().required(),
        SQLITE_PATH: Joi.string().required(),
      }),
    }),
    RegionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
