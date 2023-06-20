import { IRegionRepository, Region } from '@libs/shared/domain';
import { AbstractFactory } from '@libs/shared/infrastructure';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegionsService {
    private readonly regionRepository: IRegionRepository

    constructor(private readonly factory: AbstractFactory) {
        this.regionRepository = factory.createRegionRepository();
     }

    async findAll(): Promise<Region[]> {
        return this.regionRepository.getData();
    }
}
