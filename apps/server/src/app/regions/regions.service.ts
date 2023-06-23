import { IRegionRepository, RegionEntity } from '@libs/shared/domain';
import { AbstractFactory } from '@libs/shared/infrastructure';
import { Injectable } from '@nestjs/common';
import { RegionDto } from './dto/region.dtos';
import { UpsertRegionDto } from './dto/upsert-region.dto';

@Injectable()
export class RegionsService {
    private readonly regionRepository: IRegionRepository;

    constructor(private readonly factory: AbstractFactory) {
        this.regionRepository = factory.createRegionRepository();
    }

    async findAll(): Promise<RegionDto[]> {
        const entities = await this.regionRepository.getData();

        const dtos: RegionDto[] = entities.map(entity => {
            const dto = new RegionDto();
            dto.regionId = entity.regionId;
            dto.regionName = entity.regionName;
            return dto;
        });

        return dtos;
    }

    async upsert(upsertRegionDto: UpsertRegionDto): Promise<void> {
        const entity = new RegionEntity(
            upsertRegionDto.regionId,
            upsertRegionDto.regionName
        );
        await this.regionRepository.save(entity);
    }

    async delete(id: number): Promise<void> {
        const entity = new RegionEntity(
            id,
            ''
        );
        await this.regionRepository.delete(entity);
    }
}