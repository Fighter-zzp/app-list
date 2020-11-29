import { cryptoPassword } from '../util/crypto'
import { getUuId } from '../util/uuId'
import { UserMapper } from '../mapper/userMapper'

let userMapper = new UserMapper();

export class UserService {
    private static instance: UserService;
    private constructor() { }

    // Single Case
    public static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    /**
     * user login
     * @param uname 
     * @param upwd 
     * @param func 
     */
    public userLogin(uname: string, upwd: string, func: (err: any, ret?: any) => void) {
        try {
            let password = cryptoPassword(upwd);
            userMapper.userLogin(uname, password, func)
        } catch (e) {
            func({ sucess: 0, sqlMessage: e.message });
        }
    }

    /**
     * user info
     * @param uid 
     * @param func 
     */
    public userInfo(uid: string, func: (err: any, ret?: any) => void) {
        try {
            userMapper.getUserInfo(uid, func);
        } catch (e) {
            func({ sucess: 0, sqlMessage: e.message });
        }
    }

    /**
     * change user password
     * @param uid 
     * @param newpwd 
     * @param oldpwd 
     * @param func 
     */
    public changePwd(uid: string, newpwd: string, oldpwd: string, func: (err: any, ret?: any) => void) {
        try {
            userMapper.changePwd(uid, cryptoPassword(newpwd), cryptoPassword(oldpwd), func);
        } catch (e) {
            func({ sucess: 0, sqlMessage: e.message });
        }
    }

}