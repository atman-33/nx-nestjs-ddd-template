import { AbstractFactory } from '@libs/shared/infrastructure';
import { Module } from '@nestjs/common';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';

@Module({
  controllers: [RegionsController],
  providers: [
    RegionsService,
    {
      provide: AbstractFactory,
      useFactory: () => AbstractFactory.create()
    }
  ],
})
export class RegionsModule { }
