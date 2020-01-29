
const express = require("express");

const router = express.Router({ mergeParams: true });

const Group = require("../../Classes/Group/Group");

const SQL_query = require('../../Connectors/MySql_Connector');






router.get('/', async (req, res, next) => {
    await Group.GET(SQL_query,req.query, res);
});
router.put('/:GroupID', async (req, res, next) => {
    await Group.PUT(SQL_query, req.body, res);
});

router.post('/:GroupID', async (req, res, next) => {
    await Group.POST(SQL_query, req.body, res);
});

router.delete('/:GroupID', async (req, res, next) => {
    await Group.DELETE(SQL_query, req.params, res);
});




module.exports = router;

