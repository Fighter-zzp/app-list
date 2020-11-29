import express = require("express");
import { ListService } from '../service/listService'

let router = express.Router();

let listService = ListService.getInstance();

router.get("/hi", (req, res, next) => {
    res.json({ sucess: 0, message: 'hi list' });
})

/**
 * get suer isdone list
 */
router.get("/:username/:userid/:isdone", (req, res, next) => {
    try {
        listService.getListByUserIdAndIsDone(
            req.params.username,
            req.params.userid,
            req.params.isdone,
            (err, ret) => {
                if (err) {
                    res.json({ sucess: 0, message: err.message });
                }
                else {
                    res.json({ sucess: 1, message: '成功', data: ret });
                }
            }
        )
    } catch (e) {
        res.json({ sucess: 0, message: e.message });
    }
});

/**
 * delec user list
 */
router.post("/delete/:username", (req, res, next) => {
    try {
        listService.deleteList(req.params.username, req.body.id, (err, ret) => {
            if (err) {
                res.json({ sucess: 0, message: err.message });
            }
            else {
                res.json({ sucess: 1, message: '成功', data: ret });
            }
        })
    } catch (e) {
        res.json({ sucess: 0, message: e.message });
    }
});

/**
 * change list done
 */
router.post("/done/:username", (req, res, next) => {
    try {
        listService.doneList(req.params.username, req.body.key, (err, ret) => {
            if (err) {
                res.json({ sucess: 0, message: err.message });
            }
            else {
                res.json({ sucess: 1, message: '成功', data: ret.changedRows });
            }
        })
    } catch (e) {
        res.json({ sucess: 0, message: e.message });
    }
});

router.post("/add/:username", (req, res, next) => {
    try {
        let param = JSON.parse(req.body.params);
        listService.saveList(
            req.params.username,
            param.title,
            param.type,
            param.userid,
            (err, ret) => {
                if (err) {
                    res.json({ sucess: 0, message: err.message });
                }
                else {
                    res.json({ sucess: 1, message: '成功', data: ret.affectedRows });
                }
            }
        )
    } catch (e) {
        res.json({ sucess: 0, message: e.message });
    }
});

router.post("/edit/:username", (req, res, next) => {
    try {
        listService.editList(
            req.params.username,
            req.body.id,
            req.body.title,
            req.body.type,
            (err, ret) => {
                if (err) {
                    res.json({ sucess: 0, message: err.message });
                }
                else {
                    res.json({ sucess: 1, message: '成功', data: ret.affectedRows });
                }
            }
        )
    } catch (e) {
        res.json({ sucess: 0, message: e.message });
    }
})

export let list = router;
