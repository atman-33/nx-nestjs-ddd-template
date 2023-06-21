export class CountryEntity {
    countryId!: string;
    countryName!: string;
    regionId!: number;

    constructor(countryId: string, countryName: string, regionId: number) {
        this.countryId = countryId;
        this.countryName = countryName;
        this.regionId = regionId;
    }
}