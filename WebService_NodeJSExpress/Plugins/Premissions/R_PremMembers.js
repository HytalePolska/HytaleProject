
const express = require("express");

const router = express.Router({ mergeParams: true });


const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');

const Member = require('./PremMembers');
const Premission = require('./Premission');
const Player = require('../../Classes/Player');

Initialize();
router.all('/',async(req,res,next) =>
{
    let premdata = await Premission.GET(SQL_query,req.params);
  
    if (typeof premdata == 'undefined') {
        res.status(404).send("This Premission is not existing "+req.params.PremissionID);
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

     if(typeof req.body["P_Prefix"] == "undefined")
        req.body["P_Prefix"]  = req.data["P_Name"];
     if(typeof  req.body["P_AddDate"] == "undefined")
        req.body["P_AddDate"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
        
        req.body["PremissionID"]=req.data["PremissionID"];

    await  Member.PUT(SQL_query,req.body,res);

});
router.post('/', async (req, res, next) => {

    await  Member.POST(SQL_query, req.body, res);
});
router.delete('/', async (req, res, next) => {
   
    await  Member.DELETE(SQL_query, req.params, res);
});
router.delete('/:P_Name', async (req, res, next) => {
   
    await  Member.DELETE(SQL_query, req.params, res);
});
async function Initialize()
{
     await  Member.Init_table(SQL_query);
}

module.exports = router;

