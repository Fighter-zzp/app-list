import { MysqlConfig } from '../config/mysqlConfig'
import { SqlCofnig } from '../config/sqlConfig'
import mysql = require('mysql')

/**
 * mysql execute tool class
 */
export class MysqlExecute {
    private mysqlConfig: MysqlConfig;

    constructor(config?: MysqlConfig) {
        // get db configure info
        if (!config) {
            this.mysqlConfig = SqlCofnig;
        } else {
            this.mysqlConfig = config;
        }
    }


    /**
     * execute mysql
     * @param _sql 
     * @param params 
     * @param func 
     */
    public doExecute(_sql: string, params: any[], func: (err: any, ret: any) => void) {
        var pool = mysql.createPool(this.mysqlConfig);
        pool.getConnection(function (err, conn) {
            if (err) {
                func(err, null);
                conn.release();
            }
            
            // Use the connection
            conn.query(_sql, params, (error, results, fields) => {
                func(error, results);
                // When done with the connection, release it.
                conn.release();
            });
            // pool.end()
        });
    }
}