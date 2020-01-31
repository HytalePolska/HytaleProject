
const express = require("express");

const router = express.Router({ mergeParams: true });

const Command = require("../Classes/Command");

const SQL_query = require('../Connectors/MySql_Connector');

router.get('/:Plugin', async (req, res, next) => {

   await Command.GET(SQL_query, req.params, res);
});

router.get('/', async (req, res, next) => {
  await Command.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    let data =  JSON.parse(JSON.stringify(req.body))[0];
    await Command.PUT(SQL_query,data, res);
});

router.post('/', async (req, res, next) => {
    await Command.POST(SQL_query, req.body, res);
});

router.delete('/:Plugin', async (req, res, next) => {
    await Command.DELETE(SQL_query, req.params, res);
});
router.delete('/', async (req, res, next) => {
    let data =  JSON.parse(JSON.stringify(req.body))[0];
    await Command.DELETE(SQL_query,data , res);
});



module.exports = router;

