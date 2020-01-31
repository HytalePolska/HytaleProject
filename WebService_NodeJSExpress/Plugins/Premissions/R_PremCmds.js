
const express = require("express");

const router = express.Router({ mergeParams: true });

const Command = require("../../Classes/Command");
const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const PremCmds = require('./PremCmds');
const Premission = require('./Premission');
//////////////////////////////////////////////////
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
router.all('/:PluginName',async(req,res,next) =>
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
router.get('/:PluginName', async (req, res, next) => {

    
    let cmdslist = await SQL_query(`SELECT CommandID FROM P_Prem_PremCmds WHERE PremissionID = ${req.data["PremissionID"]}`);
        cmdslist = JSON.parse(JSON.stringify(cmdslist));
  
    let pluginName =[];
    pluginName["p.P_Name"]= req.params.PluginName;


    let query = " SELECT c.* FROM S_Commands c ";
        query+= "JOIN S_Plugins p ON c.PluginID = p.PluginID WHERE "
        query+= new SQL_builder().In(cmdslist,"c.CommandID").And().Condition(pluginName,"AND").Get();
    
    let result =await SQL_query(query);
    res.send(result);
    

});
router.put('/', async (req, res, next) => {
        
        req.body["PremissionID"]=req.data["PremissionID"];

    await  PremCmds.PUT(SQL_query,req.body,res);

});
router.delete('/', async (req, res, next) => {
  
    req.body["PremissionID"]=req.data["PremissionID"];
    await  PremCmds.DELETE(SQL_query, req.data, res);
 
});
router.delete('/:PluginName', async (req, res, next) => {

  
    let cmdslist = await SQL_query(`SELECT CommandID FROM P_Prem_PremCmds WHERE PremissionID = ${req.data["PremissionID"]}`);
    cmdslist = JSON.parse(JSON.stringify(cmdslist));

let pluginName =[];
pluginName["p.P_Name"]= req.params.PluginName;


let query = " SELECT c.CommandID FROM S_Commands c ";
query+= "JOIN S_Plugins p ON c.PluginID = p.PluginID WHERE "
query+= new SQL_builder().In(cmdslist,"c.CommandID").And().Condition(pluginName,"AND").Get();

let list2 = JSON.parse(JSON.stringify(await SQL_query(query)));

query = " DELETE P_Prem_PremCmds FROM S_Commands WHERE ";
    query+= new SQL_builder().In(cmdslist,"CommandID").And().Condition(list2,"AND").Get();



  console.log(query);
//let result =await SQL_query(query);
res.send("123");
});
async function Initialize()
{
     await PremCmds.Init_table(SQL_query);
}


/*
let query = "DELETE m FROM S_Members m INNER JOIN S_Commands c ON m.M_ValueID = c.CommandID";
      query += ` WHERE m.GroupID =${GroupId} AND m.M_ValueTable = 'Command' AND c.C_Plugin = '${Plugin}' `;*/


module.exports = router;

