import { env } from '@libs/shared/config';
import * as sqlite3 from 'sqlite3';

export class SQLiteDao {

    private static filePath: string = env.SQLITE_PATH as unknown as string;

    public static async query<T>(
        sql: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameters: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createEntity: (row: any) => T)
        : Promise<Array<T>> {
        const db = new sqlite3.Database(SQLiteDao.filePath);

        return new Promise<Array<T>>((resolve, reject) => {
            let replacedSql = sql;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`sqlite query sql: ${replacedSql}`);

            db.all(replacedSql, (error, rows) => {
                if (error) {
                    reject(error);
                } else {
                    const entities = rows.map(createEntity);
                    resolve(entities);
                }
            });

            db.close();
        });
    }

    public static async querySingle<T>(
        sql: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameters: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createEntity: (row: any) => T,
        nullEntity: T)
        : Promise<T> {
        const db = new sqlite3.Database(SQLiteDao.filePath);

        return new Promise<T>((resolve, reject) => {
            let replacedSql = sql;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`querySingle sql: ${replacedSql}`);

            db.get(replacedSql, (error, row) => {
                if (error) {
                    reject(error);
                } else {
                    const entity = row ? createEntity(row) : nullEntity;
                    resolve(entity);
                }
            });

            db.close();
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static executeUpsert(insert: string, update: string, parameters: any): Promise<void> {
        let replacedSql: string;
        const db = new sqlite3.Database(SQLiteDao.filePath);

        return new Promise((resolve, reject) => {
            replacedSql = update;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`update sql: ${replacedSql}`);

            db.run(replacedSql, function (err) {
                if (err) {
                    reject(err);
                } else {
                    if (this.changes < 1) {
                        replacedSql = insert;
                        for (const [key, value] of Object.entries(parameters)) {
                            replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
                        }
                        console.log(`insert sql: ${replacedSql}`);
            
                        db.run(replacedSql, function (err) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    } else {
                        resolve();
                    }
                }
            });

            db.close();
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static executeSql(sql: string, parameters: any): Promise<void> {
        const db = new sqlite3.Database(SQLiteDao.filePath);

        return new Promise((resolve, reject) => {
            let replacedSql = sql;
            for (const [key, value] of Object.entries(parameters)) {
                replacedSql = replacedSql.replace(new RegExp(`@${key}`, 'g'), "'" + value + "'");
            }
            console.log(`excute sql: ${replacedSql}`);

            db.run(replacedSql, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });

            db.close();
        });
    }
}