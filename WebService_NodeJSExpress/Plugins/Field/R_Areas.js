
const express = require("express");

const router = express.Router({ mergeParams: true });

const Command = require("../../Classes/Command");
const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const Areas = require('./Areas');
const Field = require('./Field');
//////////////////////////////////////////////////
Initialize();
router.all('/',async(req,res,next) =>
{
    let data = await Field.GET(SQL_query,req.params);
  
    if (typeof data == 'undefined') {
        res.status(404).send("This Field  is not existing "+req.params.FieldID);
        return;
      }
      req.data =premdata;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
router.all('/:PlayerID',async(req,res,next) =>
{
    let data = await Field.GET(SQL_query,req.params);
  
    if (typeof data == 'undefined') {
        res.status(404).send("This Field  is not existing "+req.params.FieldID);
        return;
      }
      req.data =premdata;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
////////////////////Dodawanie Premisji///////////////////////////////
router.get('/', async (req, res, next) => {
    await Areas.GET(SQL_query,req.data,res);
});
router.get('/:F_Name', async (req, res, next) => {
    await Areas.GET(SQL_query,req.params,res);
  
});
router.put('/', async (req, res, next) => {
        
    req.body["FieldID"]=req.data["FieldID"];
    await  Areas.PUT(SQL_query,req.body,res);

});
router.delete('/', async (req, res, next) => {
  
    req.body["FieldID"]=req.data["FieldID"];
    await  Areas.DELETE(SQL_query, req.data, res);
 
});

async function Initialize()
{
     await Areas.Init_table(SQL_query);
}


/*
let query = "DELETE m FROM S_Members m INNER JOIN S_Commands c ON m.M_ValueID = c.CommandID";
      query += ` WHERE m.GroupID =${GroupId} AND m.M_ValueTable = 'Command' AND c.C_Plugin = '${Plugin}' `;*/


module.exports = router;

