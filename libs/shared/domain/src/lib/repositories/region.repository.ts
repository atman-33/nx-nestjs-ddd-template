import { RegionEntity } from '../entities/region.entity';

export interface IRegionRepository{
    getData(): Promise<RegionEntity[]>
    save(entity: RegionEntity): Promise<void>
    delete(entity: RegionEntity): Promise<void>
}