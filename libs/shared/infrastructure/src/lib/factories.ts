import { env } from '@libs/shared/config';
import { IRegionRepository } from '@libs/shared/domain';
import { RegionOracleRepository } from './oracle/region-oracle.repository';

export abstract class AbstractFactory {

    abstract createRegionRepository(): IRegionRepository;
    // abstract createCountriesRepository(): ICountriesRepository;

    static create(): AbstractFactory {
        if (env.DATABASE_TYPE === 'oracle') {
            return new OracleFactory();
            
        } else if (env.DATABASE_TYPE === 'sqlite') {
            // return new SQLiteFaFactor()
        }

        throw new Error('env.DATABASE_TYPE is wrong.');
    }
}

class OracleFactory extends AbstractFactory{
    override createRegionRepository(): IRegionRepository {
        return new RegionOracleRepository();
    }

    // override createCountryRepository(): ICountryRepository {
    //     return new CountryOracleRepository();
    // }
}

// export class SQLiteFactory extends AbstractFactory{
//     override createRegionRepository(): IRegionRepository {
//         return new RegionSQLiteRepository();
//     }

//     override createCountryRepository(): ICountryRepository {
//         return new CountrySQLiteRepository();
//     }
// }