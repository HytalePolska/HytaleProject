
const express = require("express");

const router = express.Router();


router.get('/', async (req, res, next) => {
    await Player.GET(SQL_query, req.body, res);
});

router.get('/:GroupID', async (req, res, next) => {
    await Player.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    await Player.PUT(SQL_query, req.body, res);
});

router.post('/', async (req, res, next) => {
    await Player.POST(SQL_query, req.body, res);
});

router.delete('/:GroupID', async (req, res, next) => {
    await Player.DELETE(SQL_query, req.params, res);
});




module.exports = router;

