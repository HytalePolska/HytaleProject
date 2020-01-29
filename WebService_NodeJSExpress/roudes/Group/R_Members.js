
const express = require("express");

const router = express.Router({ mergeParams: true });

const Member = require("../../Classes/Group/Member");

const SQL_query = require('../../Connectors/MySql_Connector');

router.get('/:M_PlayerID', async (req, res, next) => {

   await Member.GET(SQL_query, req.params, res);
});

router.get('/', async (req, res, next) => {
  await Member.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
   
   let data =  JSON.parse(JSON.stringify(req.body))[0];
   data.GroupID =  req.params.GroupID;
    await Member.PUT(SQL_query,data, res);
});

router.post('/', async (req, res, next) => {
    await Member.POST(SQL_query, req.body, res);
});

router.delete('/:M_PlayerID', async (req, res, next) => {
    await Member.DELETE(SQL_query, req.params, res);
});




module.exports = router;

