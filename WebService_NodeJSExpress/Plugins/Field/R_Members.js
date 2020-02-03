
const express = require("express");

const router = express.Router({ mergeParams: true });


const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');

const Member = require('./Members');
const Field = require('./Field');
const Player = require('../../Classes/Player');

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
    await Member.GET(SQL_query,req.data,res);
});
router.put('/', async (req, res, next) => {

   
      let player = await Player.GET(SQL_query,req.body);
     
      if (typeof player == 'undefined') {
        res.status(404).send("This Player is not existing "+req.body.PlayerID);
        return;
      } 

     
        req.body["M_Type"]  = "Owner";
     if(typeof  req.body["M_AddDate"] == "undefined")
        req.body["P_AddDate"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        req.body["FieldID"]=req.data["FieldID"];

    await  Member.PUT(SQL_query,req.body,res);

});
router.post('/', async (req, res, next) => {

    await  Member.POST(SQL_query, req.body, res);
});
router.delete('/', async (req, res, next) => {
   
    await  Member.DELETE(SQL_query, req.body, res);
});
router.delete('/:PlayerID', async (req, res, next) => {

   
   req.data["PlayerID"]  = req.params.PlayerID;
    await  Member.DELETE(SQL_query, req.data, res);
});
async function Initialize()
{
     await  Member.Init_table(SQL_query);
}

module.exports = router;

