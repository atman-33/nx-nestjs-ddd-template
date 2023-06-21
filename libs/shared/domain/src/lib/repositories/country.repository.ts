import { CountryEntity } from '../entities/country.entity';

export interface ICountryRepository{
    getData(): Promise<CountryEntity[]>
    save(entity: CountryEntity): Promise<void>
    delete(entity: CountryEntity): Promise<void>
}