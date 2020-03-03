
const express = require("express");

const router = express.Router({ mergeParams: true });

const Member = require('../controlers/C_Member');

const Premission = require('../controlers/C_Premission');



router.all('/', async (req, res, next) => {
    let data = await Premission.EDIT(req.params);
    if (data == null) {
        res.status(404).send("This premission is not existing");
        return;
    }
    req.data = data;
    req.body = JSON.parse(JSON.stringify(req.body))[0];
    next();
})

router.all('/:PlayerID', async (req, res, next) => {
    let id = { "P_Name": req.params.P_Name };
    let data = await Premission.EDIT(id);
    if (data == null) {
        res.status(404).send("This premission is not existing");
        return;
    }
    req.data = data;
    req.body = JSON.parse(JSON.stringify(req.body))[0];
    next();
})


router.get('/', async (req, res) => {
    let where = { "PremissionID": String(req.data._id) }
    await Member.GET(where, res);
});

router.get('/:PlayerID', async (req, res) => {
    let where = { "PremissionID": String(req.data._id), "PlayerID": req.params.PlayerID }
    await Member.GET(where, res);
});

router.put('/:PlayerID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    let member = { "PremissionID": String(req.data._id), "P_Name": req.data.P_Name, "PlayerID": req.params.PlayerID, "P_Prefix": req.data.P_Name, "P_AddByPlayer": data.P_AddByPlayer };

    await Member.INSERT({ member }, res);
});
router.post('/:PlayerID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    let member = { "PremissionID": String(req.data._id), "PlayerID": req.params.PlayerID, "P_Prefix": data.P_Prefix };

    await Member.UPDATE({ member }, res);
});

router.delete('/:PluginID', async (req, res) => {
    let where = { "PremissionID": String(req.data._id), "PlayerID": req.params.PlayerID }
    await Member.DELETE(where, res);
});
router.get('/delete', async (req, res) => {
    let where = { "PremissionID": String(req.data._id) }
    await Member.DELETE(where, res);
});
module.exports = router;

