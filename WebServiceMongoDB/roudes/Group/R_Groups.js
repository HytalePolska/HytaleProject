
const express = require("express");

const router = express.Router({ mergeParams: true });

const Group = require("../../Classes/Group/Group");

const SQL_query = require('../../Connectors/MySql_Connector');

const members = require("./R_Members");

router.use('/:G_GroupID/members', members);

router.get('/', async (req, res, next) => {
    await Group.GET(SQL_query, req.body, res);
});

router.get('/:G_GroupID', async (req, res, next) => {
    await Group.GET(SQL_query, req.params, res);
});
router.put('/', async (req, res, next) => {
    let data =  JSON.parse(JSON.stringify(req.body))[0];
    await Group.PUT(SQL_query,data, res);
});

router.post('/', async (req, res, next) => {
    let data =  JSON.parse(JSON.stringify(req.body))[0];
    await Group.POST(SQL_query, data, res);
});

router.delete('/:G_GroupID', async (req, res, next) => {
    await Group.DELETE(SQL_query, req.params, res);
});




module.exports = router;

