import { getUuId } from '../util/uuId'
import { ListMapper } from '../mapper/listMapper'
import { UserMapper } from '../mapper/userMapper'

let listMapper = ListMapper.getInstance();
let userMapper = new UserMapper();

let tables: Array<string>;

/**
 * init user list
 */
userMapper.initUserList((err, ret) => {
    if (err) {
        console.log("can`t init server fail !");
    } else {
        tables = ret;
    }
})


export class ListService {
    private static instance: ListService;
    private constructor() { }

    // Single Case
    public static getInstance() {
        if (!this.instance) {
            this.instance = new ListService();
        }
        return this.instance;
    }

    /**
     * get list
     * @param username 
     * @param userid 
     * @param isdone 
     * @param func 
     */
    public getListByUserIdAndIsDone(username: string, userid: string, isdone: string, func: (err: any, ret?: any) => void) {
        try {
            if (tables.indexOf(username) === -1) {
                func({ sucess: 0, message: `${username}未注册` });
            } else {
                let obj = { userid: userid, isdone: isdone }
                listMapper.getList(username, obj, func)
            }
        } catch (e) {
            func({ sucess: 0, message: e.message });
        }
    }

    /**
     * delete list
     * @param username 
     * @param id 
     * @param func 
     */
    public deleteList(username: string, id: string, func: (err: any, ret?: any) => void) {
        try {
            if (tables.indexOf(username) === -1) {
                func({ sucess: 0, message: `${username}未注册` });
            } else {
                listMapper.deleteList(username, id, func)
            }
        } catch (e) {
            func({ sucess: 0, message: e.message });
        }
    }


    /**
     * done list
     * @param username 
     * @param keyId 
     * @param func 
     */
    public doneList(username: string, keyId: string, func: (err: any, ret?: any) => void) {
        try {
            if (tables.indexOf(username) === -1) {
                func({ sucess: 0, message: `${username}未注册` });
            } else {
                listMapper.doneList(username, keyId, func)
            }
        } catch (e) {
            func({ sucess: 0, message: e.message });
        }
    }

    /**
     * save user new list
     * @param username 
     * @param title 
     * @param type 
     * @param userid 
     * @param func 
     */
    public saveList(username: string, title: string, type: string, userid: string, func: (err: any, ret?: any) => void) {
        try {
            if (tables.indexOf(username) === -1) {
                func({ sucess: 0, message: `${username}未注册` });
            } else {
                let date = new Date();
                // generator params
                let obj = {
                    id: getUuId(),
                    title: title,
                    type: type,
                    userid: userid,
                    isdone: 0,
                    addtime: date,
                    adduser: username,
                    modifytime: date,
                    modifyuser: username
                }
                listMapper.saveList(username, obj, func);
            }
        } catch (e) {
            func({ sucess: 0, message: e.message });
        }
    }

    /**
     * edit user list
     * @param username 
     * @param id 
     * @param title 
     * @param type 
     * @param func 
     */
    public editList(username: string, id: string, title: string, type: string, func: (err: any, ret?: any) => void) {
        try {
            if (tables.indexOf(username) === -1) {
                func({ sucess: 0, message: `${username}未注册` });
            } else {
                let date = new Date();
                // generator params
                let obj = {
                    title: title,
                    type: type,
                    modifytime: date,
                    modifyuser: username
                }
                listMapper.editListById(username, id, obj, func);
            }
        } catch (e) {
            func({ sucess: 0, message: e.message });
        }
    }

}