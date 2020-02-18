
const express = require("express");

const router = express.Router({ mergeParams: true });

const  Cmds = require('../controlers/C_PremCmds');



router.get('/delete', async (req, res) => {
    await Cmds.DELETE(req.params, res);
});
router.get('/', async (req, res) => {
    await Cmds.GET(req.params, res);
});
router.put('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Cmds.INSERT(data, res);
});
router.delete('/:PluginID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Cmds.DELETE(data, res);
});
module.exports = router;

