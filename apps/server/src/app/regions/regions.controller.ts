import { Controller, Get } from '@nestjs/common';
import { RegionDto } from './dto/region.dtos';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {

    constructor(private readonly regionsService: RegionsService){}

    @Get()
    async findAll(): Promise<RegionDto[]>{
        return await this.regionsService.findAll();
    }
}
