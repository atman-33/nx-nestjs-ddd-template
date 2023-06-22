import { CountryEntity, ICountryRepository } from '@libs/shared/domain';
import { SQLiteDao } from './sqlite.dao';

export class CountrySQLiteRepository implements ICountryRepository {

    public getData(): Promise<CountryEntity[]> {
        const sql = 'SELECT country_id, country_name, region_id FROM countries';

        return new Promise((resolve, reject) => {
            SQLiteDao.query<CountryEntity>(sql, {}, row => {
                return new CountryEntity(
                    row[0],
                    row[1],
                    row[2]);
            }).then(entities => {
                resolve(entities);
            }).catch(error => {
                reject(error);
            });
        });
    }

    public save(entity: CountryEntity): Promise<void> {
        const insertSql = "INSERT INTO countries (country_id, country_name, region_id) VALUES(:country_id, :country_name, :region_id)";
        const updateSql = "UPDATE countries SET country_name = :country_name, region_id = :region_id WHERE country_id = :country_id";;

        const parameters = {
            country_id: entity.countryId,
            country_name: entity.countryName,
            region_id: entity.regionId
        };

        return new Promise<void>((resolve, reject) => {
            SQLiteDao.executeUpsert(insertSql, updateSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public delete(entity: CountryEntity): Promise<void> {
        const deleteSql = 'DELETE FROM countries WHERE country_id = :country_id';
        const parameters = { country_id: entity.countryId };

        return new Promise((resolve, reject) => {
            SQLiteDao.executeSql(deleteSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}