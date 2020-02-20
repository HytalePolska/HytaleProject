
const express = require("express");

const router = express.Router({ mergeParams: true });

const  Premmission = require('../controlers/C_Premission');

const Commands = require('../roudes/R_PremCmds');

const Players = require('../roudes/R_Member');

const Cmds = require('../controlers/C_PremCmds');

const Player = require('../controlers/C_Member');

router.get('/cmds', async (req, res) => {
    await Cmds.GET(req.params, res);
});
router.get('/players', async (req, res) => {
    await Player.GET(req.params, res);
});

router.use('/:P_Name/cmds',Commands);

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
router.delete('/:P_Name', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Premmission.DELETE(data, res);
});
module.exports = router;

