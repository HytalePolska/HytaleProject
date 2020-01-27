
const express = require("express");

const router = express.Router();

const Member = require("../../Classes/Group/Member");

router.get('/', async (req, res, next) => {
    await Player.GET(SQL_query, req.body, res);
});

router.get('/:M_PlayerID', async (req, res, next) => {
    await Player.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    await Player.PUT(SQL_query, req.body, res);
});

router.post('/', async (req, res, next) => {
    await Player.POST(SQL_query, req.body, res);
});

router.delete('/:M_PlayerID', async (req, res, next) => {
    await Player.DELETE(SQL_query, req.params, res);
});




module.exports = router;

