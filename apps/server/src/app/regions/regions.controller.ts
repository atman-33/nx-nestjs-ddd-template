import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RegionDto } from './dto/region.dtos';
import { UpsertRegionDto } from './dto/upsert-region.dto';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {

    constructor(private readonly regionsService: RegionsService){}

    @Get()
    async findAll(): Promise<RegionDto[]>{
        return await this.regionsService.findAll();
    }

    @Post()
    async upsert(
        @Body() upsertRegionDto: UpsertRegionDto
    ): Promise<void>{
        return await this.regionsService.upsert(upsertRegionDto);
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ): Promise<void>{
        return await this.regionsService.delete(id);
    }
}
