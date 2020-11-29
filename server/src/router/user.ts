import express = require("express");
import { UserService } from '../service/userService'

let router = express.Router();

let userService = UserService.getInstance();

/**
 * login
 */
router.post("/login", (req, res, next) => {
    try {
        if (req.body.username && req.body.password) {
            userService.userLogin(req.body.username, req.body.password, (err, ret) => {
                // console.log("execute:", ret)
                if (err) {
                    res.json({ sucess: 0, message: err.message });
                } else {
                    // rerunt 1 char
                    if (ret.length === 1) {
                        var token = ret[0].uid;
                        var username = ret[0].uname;
                        res.json({ sucess: 1, message: '登录成功', data: {uid:token,uname:username} });
                    }
                    else {
                        res.json({ sucess: 0, message: "登录失败" });
                    }
                }
            })
        }
    } catch (e) {
        console.log(e);
        res.json({ sucess: 0, message: e.message });
    }
});

/**
 * get user info
 */
router.get("/me/:uid", (req, res, next) => {
    try {
        userService.userInfo(req.params.uid, (err, ret) => {
            if (err) {
                res.json({ sucess: 0, message: err.message });
            }
            else {
                res.json({ sucess: 1, message: '成功', data: ret[0] });
            }
        });
    } catch (e) {
        console.log(e);
        res.json({ sucess: 0, message: e.message });
    }
});

router.post("/changepwd", (req, res, next) => {
    try {
        userService.changePwd(
            req.body.uid,
            req.body.newpwd,
            req.body.oldpwd,
            (err,ret)=>{
                if (err) {
                    res.json({ sucess: 0, message: err.sqlMessage });
                }
                else {
                    res.json({ sucess: 1, message: '成功', data: ret.changedRows });
                }
            }
        )
    } catch (e) {
        console.log(e);
        res.json({ sucess: 0, message: e.message });
    }
});


export let user = router;

