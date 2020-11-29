import { MysqlExecute as mysqlDb } from '../db/mysqlExecute'

let db = new mysqlDb();

export class UserMapper {

    /**
     * init user
     * @param fnc  * init list of user
     * @param fnc callback function
     */
    public initUserList(fnc: (err: any, ret: Array<string>) => void) {
        let sql = "SELECT TABLE_NAME FROM information_schema.TABLES WHERE table_schema='app-list'"
        let endStr = "_app_list"
        let tables = new Array<string>();
        db.doExecute(sql, [], (err, ret) => {
            if (err) {
                console.log(err);
                fnc(err, null)
                return;
            }
            for (let item of ret) {
                let data = item.TABLE_NAME
                if (data.endsWith(endStr)) {
                    data = data.replace(endStr, '')
                    tables.push(data)
                }
            }
            console.log('init user table:', tables)
            fnc(null, tables)
        });
    }

    /**
     * login
     * @param uname 
     * @param upwd 
     * @param func 
     */
    public userLogin(uname: string, upwd: string, func: (err: any, ret: any) => void) {
        let sql = `select * from hr_user where uname=? and upwd=?`;
        let params = [uname, upwd];
        db.doExecute(sql, params, func);
    }

    /**
     * get user info
     * @param uid 
     * @param func 
     */
    public getUserInfo(uid: string, func: (err: any, ret: any) => void) {
        let sql = `select * from hr_user where uid=?`
        let params = [uid];
        db.doExecute(sql, params, func);
    }

    /**
     * change user password
     * @param uid 
     * @param newpwd 
     * @param oldpwd 
     * @param func 
     */
    public changePwd(uid: string, newpwd: string, oldpwd: string, func: (err: any, ret: any) => void) {
        let sql = "update hr_user set upwd=? where uid=? and upwd=?";
        let params = [newpwd, uid, oldpwd];
        db.doExecute(sql, params, func);
    }
}

