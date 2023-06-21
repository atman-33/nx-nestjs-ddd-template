import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegionDto {

    @IsNumber()
    @IsNotEmpty()
    regionId: number;

    @IsString()
    regionName: string;
}