
const express = require("express");

const router = express.Router();

const Player = require("../Classes/Player");

const SQL_query = require('../Connectors/MySql_Connector');

Player.Init_table(SQL_query);

router.get('/', async (req, res, next) => {
    let t = [];
    await Player.GET(SQL_query, t, res);
});

router.get('/:PlayerID', async (req, res, next) => {

    await Player.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    let data = JSON.parse(JSON.stringify(req.body));

    await Player.PUT(SQL_query, data, res);
});
router.post('/', async (req, res, next) => {
    let data = JSON.parse(JSON.stringify(req.body));

    await Player.POST(SQL_query, data, res);

});

router.delete('/:PlayerID', async (req, res, next) => {
    await Player.DELETE(SQL_query, req.params, res);
});



module.exports = router;

