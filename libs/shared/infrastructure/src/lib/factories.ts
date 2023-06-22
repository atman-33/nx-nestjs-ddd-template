import { env } from '@libs/shared/config';
import { ICountryRepository, IRegionRepository } from '@libs/shared/domain';
import { CountryOracleRepository } from './oracle/country-oracle.repository';
import { RegionOracleRepository } from './oracle/region-oracle.repository';
import { CountrySQLiteRepository } from './sqlite/country-sqlite.repository';
import { RegionSQLiteRepository } from './sqlite/region-sqlite.repository';

export abstract class AbstractFactory {

    abstract createRegionRepository(): IRegionRepository;
    abstract createCountryRepository(): ICountryRepository;

    static create(): AbstractFactory {
        if (env.DATABASE_TYPE === 'oracle') {
            return new OracleFactory();
            
        } else if (env.DATABASE_TYPE === 'sqlite') {
            return new SQLiteFactory()
        }

        throw new Error('env.DATABASE_TYPE is wrong.');
    }
}

class OracleFactory extends AbstractFactory{
    override createRegionRepository(): IRegionRepository {
        return new RegionOracleRepository();
    }

    override createCountryRepository(): ICountryRepository {
        return new CountryOracleRepository();
    }
}

export class SQLiteFactory extends AbstractFactory{
    override createRegionRepository(): IRegionRepository {
        return new RegionSQLiteRepository();
    }

    override createCountryRepository(): ICountryRepository {
        return new CountrySQLiteRepository();
    }
}