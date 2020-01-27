
const express = require("express");

const router = express.Router();

const Group = require("../../Classes/Group/Group");

const SQL_query = require('../../Connectors/MySql_Connector');


router.get('/', async (req, res, next) => {
    await Group.GET(SQL_query, req.body, res);
});

router.get('/:G_GroupID', async (req, res, next) => {
    await Group.GET(SQL_query, req.params, res);
});

router.get('/members/:G_GroupID', async (req, res, next) => {
    req.body.members = "true";
    req.body.G_GroupID = req.params.G_GroupID;
    await Group.GET(SQL_query, req.body, res);
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

