export class RegionEntity {
    regionId!: number;
    regionName!: string;

    constructor(regionId: number, regionName: string){
        this.regionId = regionId;
        this.regionName = regionName
    }
}