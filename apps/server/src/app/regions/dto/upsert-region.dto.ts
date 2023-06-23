import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpsertRegionDto{
    @IsNumber()
    @IsNotEmpty()
    regionId: number;

    @IsString()
    regionName: string;
}