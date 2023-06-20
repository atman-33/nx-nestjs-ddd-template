import { IRegionRepository, RegionEntity } from '@libs/shared/domain';
import { OracleDao } from './oracle.dao';

export class RegionOracleRepository implements IRegionRepository {

    public getData(): Promise<RegionEntity[]> {
        const sql = 'SELECT region_id, region_name FROM regions';

        return new Promise((resolve, reject) => {
            OracleDao.query<RegionEntity>(sql, {}, row => {
                return new RegionEntity(
                    row[0],
                    row[1]);
            }).then(entities => {
                resolve(entities);
            }).catch(error => {
                reject(error);
            });
        });
    }

    public save(entity: RegionEntity): Promise<void> {
        const insertSql = "INSERT INTO regions (region_id, region_name) VALUES(:region_id, :region_name)";
        const updateSql = "UPDATE regions SET region_name = :region_name WHERE region_id = :region_id";;

        const parameters = {
            region_id: entity.regionId,
            region_name: entity.regionName
        };

        return new Promise<void>((resolve, reject) => {
            OracleDao.executeUpsert(insertSql, updateSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public delete(entity: RegionEntity): Promise<void> {
        const deleteSql = 'DELETE FROM regions WHERE region_id = :region_id';
        const parameters = { region_id: entity.regionId };

        return new Promise((resolve, reject) => {
            OracleDao.executeSql(deleteSql, parameters)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}