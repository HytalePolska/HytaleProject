
const express = require("express");

const router = express.Router();

const Group = require("../../Classes/Group/Group");

const Memebers = require("./R_Members");

const SQL_query = require('../../Connectors/MySql_Connector');

router.use("/members",Memebers);

router.get('/', async (req, res, next) => {
    await Group.GET(SQL_query, req.body, res);
});

router.get('/:G_GroupID', async (req, res, next) => {
    await Group.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    await Group.PUT(SQL_query, req.body, res);
});

router.post('/', async (req, res, next) => {
    await Group.POST(SQL_query, req.body, res);
});

router.delete('/:G_GroupID', async (req, res, next) => {
    await Group.DELETE(SQL_query, req.params, res);
});




module.exports = router;

