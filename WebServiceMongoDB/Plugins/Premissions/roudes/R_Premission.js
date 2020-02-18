
const express = require("express");

const router = express.Router({ mergeParams: true });

const  Premmission = require('../controlers/C_Premission');

const Commands = require('../roudes/R_PremCmds');

const Players = require('../roudes/R_Member');

router.use('/:P_Name/commands',Commands);

router.use('/:P_Name/players',Players);

router.get('/delete', async (req, res) => {
    await Premmission.DELETE(req.params, res);
});
router.get('/', async (req, res) => {
    await Premmission.GET(req.params, res);
});
router.put('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Premmission.INSERT(data, res);
});
router.post('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Premmission.UPDATE(data, res);

});
router.delete('/:PluginID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Premmission.DELETE(data, res);
});
module.exports = router;

