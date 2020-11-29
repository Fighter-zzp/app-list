import { MysqlExecute as mysqlDb } from '../db/mysqlExecute'

let db = new mysqlDb();

let endStr = "_app_list";

interface IWhere {
    [key: string]: any;
}

export class ListMapper {

    private static instance: ListMapper

    private constructor() { }


    // Single Case
    static getInstance() {
        if (!this.instance) {
            this.instance = new ListMapper();
        }
        return this.instance;
    }

    /**
     * get user list by userid & isdone
     * @param username user table 
     * @param userid 
     * @param isdone 
     * @param func 
     */
    public getList(username: string, obj: object, func: (err: any, ret: any) => void) {
        let sql = `select * from ${username}${endStr}`;
        // init sql params
        let params: any[] = [];
        // Solve the problem that string variables cannot be used for indexing
        let where: IWhere = obj;
        // add where
        let keys = Object.keys(where);
        if (where && keys.length !== 0) {
            sql += " where ";
            for (let i = 0; i < keys.length; i++) {
                if (i === 0) {
                    sql = sql.concat(keys[i], "=", "?");
                } else {
                    sql = sql.concat(" and ", keys[i], "=", "?");
                }
                params.push(where[keys[i]]);
            }
        }
        db.doExecute(sql, params, func);
    }

    /**
     * delete list
     * @param username user table 
     * @param id 
     * @param func 
     */
    public deleteList(username: string, id: string, func: (err: any, ret: any) => void) {
        let sql = "delete from ?? where id=?";
        let params = [`${username}${endStr}`, id];
        db.doExecute(sql, params, func);
    }

    /**
     * done list
     * @param username user table 
     * @param keyId 
     * @param func 
     */
    public doneList(username: string, keyId: string, func: (err: any, ret: any) => void) {
        let sql = `update ${username}${endStr} set isdone=1 where id=?`;
        let params = [keyId];
        db.doExecute(sql, params, func);
    }

    /**
     * edit user list
     * @param username 
     * @param keyId 
     * @param func 
     */
    public editListById(username: string, id: string, obj: object, func: (err: any, ret: any) => void) {
        let sql = `UPDATE ${username}${endStr} `;
        // init sql params
        let params: any[] = [];
        // Solve the problem that string variables cannot be used for indexing
        let where: IWhere = obj;
        // add where
        let keys = Object.keys(where);
        if (where && keys.length !== 0) {
            let set = 'SET '
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    set = set.concat(keys[i], "=?");
                } else {
                    set = set.concat(keys[i], "=?,");
                }
                params.push(where[keys[i]]);
            }
            sql = sql.concat(set, "where id=?");
            params.push(id)
        }

        db.doExecute(sql, params, func)

    }

    /**
     * save user list
     * @param username 
     * @param params 
     * @param func 
     */
    public saveList(username: string, obj: object, func: (err: any, ret: any) => void) {
        let sql = `INSERT INTO ${username}${endStr}`;

        // init sql params
        let params: any[] = [];
        // Solve the problem that string variables cannot be used for indexing
        let where: IWhere = obj;
        // add where
        let keys = Object.keys(where);
        if (where && keys.length !== 0) {
            let insert = "(";
            let values = ") values(";
            for (let i = 0; i < keys.length; i++) {
                if (i === keys.length - 1) {
                    insert = insert.concat(keys[i]);
                    values = values.concat("?");
                } else {
                    insert = insert.concat(keys[i], ",");
                    values = values.concat("?", ",");
                }
                params.push(where[keys[i]]);
            }
            insert += values + ")";
            sql = sql.concat(insert);
        }

        db.doExecute(sql, params, func)
    }
}
