
const express = require("express");

const router = express.Router({ mergeParams: true });

const Command = require("../../Classes/Command");
const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const PremCmds = require('./PremCmds');
const Premission = require('./Premission');

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
router.all('/:P_Name',async(req,res,next) =>
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
    await PremCmds.GET(SQL_query,req.data,res);
});
router.get('/P_Name', async (req, res, next) => {
    await PremCmds.GET(SQL_query,req.data,res);
});
router.put('/', async (req, res, next) => {

   
      let command = await Command.GET(SQL_query,req.body);
     
      if (typeof command == 'undefined') {
        res.status(404).send("This Command is not existing "+req.body.CommandID);
        return;
      }
        
        req.body["PremissionID"]=req.data["PremissionID"];

    await  PremCmds.PUT(SQL_query,req.body,res);

});
router.delete('/', async (req, res, next) => {
   
    await  PremCmds.DELETE(SQL_query, req.data, res);
});
router.delete('/:P_Name', async (req, res, next) => {

   
   req.data["PlayerID"]  = req.params.PlayerID;
    await  PremCmds.DELETE(SQL_query, req.data, res);
});
async function Initialize()
{
     await PremCmds.Init_table(SQL_query);
}


/*let query = "SELECT c.* FROM S_Commands c INNER JOIN S_Members m on c.CommandID = m.M_ValueID ";
query+=`WHERE m.GroupID = ${GroupId} AND M_ValueTable = 'Command' `;
let query = "SELECT c.* FROM S_Commands c INNER JOIN S_Members m on c.CommandID = m.M_ValueID ";
query+=`WHERE m.GroupID = ${GroupId} AND c.C_Plugin = '${Plugin}' AND M_ValueTable = 'Command'  `;

let commandids = `SELECT M_PlayerID FROM S_Members WHERE M_GroupID = ${GroupID} AND M_ValueTable = 'Command' `;

let query = " INSERT INTO S_Members (GroupID,M_ValueID,M_ValueTable) ";
query+= ` SELECT ${GroupID} , CommandID ,'Command' FROM S_Commands`;
query+= ` WHERE C_Plugin = '${Plugin}' AND CommandID NOT IN (${commandids})`;
let query = "DELETE m FROM S_Members m INNER JOIN S_Commands c ON m.M_ValueID = c.CommandID";
      query += ` WHERE m.GroupID =${GroupId} AND m.M_ValueTable = 'Command' AND c.C_Plugin = '${Plugin}' `;*/


module.exports = router;

