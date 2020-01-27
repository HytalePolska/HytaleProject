
const express = require("express");

const router = express.Router();

const Member = require("../../Classes/Group/Member");

const SQL_query = require('../../Connectors/MySql_Connector');

router.get('/:M_GroupID', async (req, res, next) => {
    console.log("Witam"+req.params.M_GroupID);
      res.send("w");
  //  await Member.GET(SQL_query, req.params, res);
});

router.get('/:M_GroupID/user:M_PlayerID', async (req, res, next) => {
   
    console.log("Witam" +res.params.M_PlayerID +" "+res.params.M_GroupID);
    res.send(res.params.M_PlayerID +" "+res.params.M_GroupID);
  //  await Member.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    await Member.PUT(SQL_query, req.body, res);
});

router.post('/', async (req, res, next) => {
    await Member.POST(SQL_query, req.body, res);
});

router.delete('/:M_PlayerID', async (req, res, next) => {
    await Member.DELETE(SQL_query, req.params, res);
});




module.exports = router;

