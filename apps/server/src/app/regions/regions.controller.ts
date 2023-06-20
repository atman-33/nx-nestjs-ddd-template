import { Region } from '@libs/shared/domain';
import { Controller, Get } from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {

    constructor(private readonly regionsService: RegionsService){}

    @Get()
    async findAll(): Promise<Region[]>{
        return await this.regionsService.findAll();
    }
}
