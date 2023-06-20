import { env } from '@libs/shared/config';
import * as oracledb from 'oracledb';

export class OracleDao {

    private static dbConfig = {
        user: env.ORACLE_USER,
        password: env.ORACLE_PASSWORD,
        connectString: env.ORACLE_DATA_SOURCE
    };

    static async open(): Promise<void> {
        try {
            const connection = await oracledb.getConnection(OracleDao.dbConfig);
            console.log('Connected to the database.');
            connection.release();
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error(error);
            }
        }
    }

    static async query<T>(
        sql: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameters: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createEntity: (row: any) => T)
        : Promise<Array<T>> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleDao.dbConfig);
            console.log('Connected to the database.');
            const result = await connection.execute(sql, parameters);
            if (result === undefined || result.rows === undefined) {
                throw new Error("No results returned from the database.");
            }
            console.log(`result.rows: ${result.rows}`);
            const entities: T[] = [];
            for (const row of result.rows) {
                entities.push(createEntity(row));
            }
            return entities;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    static async querySingle<T>(
        sql: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        parameters: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createEntity: (row: any) => T,
        nullEntity: T)
        : Promise<T> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleDao.dbConfig);
            const result = await connection.execute(sql, parameters);
            if (result === undefined || result.rows === undefined) {
                throw new Error("No results returned from the database.");
            }
            const entity = result.rows.length > 0 ? createEntity(result.rows[0]) : nullEntity;
            return entity;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async executeUpsert(insert: string, update: string, parameters: any): Promise<void> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleDao.dbConfig);
            //console.log(`update sql:${update}`);
            //console.log(`update param:${JSON.stringify(parameters)}`);
            let result = await connection.execute(update, parameters, { autoCommit: false });
            if (result === undefined || result.rowsAffected === undefined) {
                throw new Error("No results returned from the database.");
            }
            if (result.rowsAffected < 1) {
                //console.log(`insert sql:${insert}`);
                //console.log(`insert param:${JSON.stringify(parameters)}`);
                result = await connection.execute(insert, parameters, { autoCommit: false });
            }
            await connection.commit();
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            throw error;
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async executeSql(sql: string, parameters: any): Promise<void> {
        let connection;
        try {
            connection = await oracledb.getConnection(OracleDao.dbConfig);
            console.log(`delete sql:${sql}`);
            console.log(`delete param:${JSON.stringify(parameters)}`);
            await connection.execute(sql, parameters, { autoCommit: true });
        } finally {
            if (connection) {
                await connection.close();
            }
        }
    }
}