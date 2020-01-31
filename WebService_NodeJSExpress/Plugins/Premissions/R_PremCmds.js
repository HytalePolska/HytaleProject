
const express = require("express");

const router = express.Router({ mergeParams: true });

const Group = require("../../Classes/Group/Group");
const Member = require("../../Classes/Group/Member");
const Command = require("../../Classes/Command");
const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const PremCmds = require('./PremCmds');

router.all('/',async(req,res,next) =>
{
    /*let plugin = await Plugin.GET(SQL_query,req.params);
    if (typeof plugin == 'undefined') {
        res.status(404).send("This plugin is not existing");
        return;
      }
      req.P_data = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];*/
      next();
})
////////////////////Dodawanie Komand Premissji///////////////////////////////
router.get('/', async (req, res, next) => {
  
    let data = [];
    data["Imie"] = "Jacek";
    data["PKT"] = 12;
    data["PermCmdID"] = 123;
       await PremCmds.GET(SQL_query,data,res);
   /* let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;

    let result = await Group.GET(SQL_query,get_data);
    let GroupId= result[0].GroupID;
  
   
  let query = "SELECT c.* FROM S_Commands c INNER JOIN S_Members m on c.CommandID = m.M_ValueID ";
  query+=`WHERE m.GroupID = ${GroupId} AND M_ValueTable = 'Command' `;

   await Member.CUSTOM(SQL_query,query,res);*/
   
});
router.get('/:GroupID/Cmds/:Plugin', async (req, res, next) => {

    let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;

    let result = await Group.GET(SQL_query,get_data);
    let GroupId= result[0].GroupID;
    let Plugin= req.params.Plugin;
   
  let query = "SELECT c.* FROM S_Commands c INNER JOIN S_Members m on c.CommandID = m.M_ValueID ";
      query+=`WHERE m.GroupID = ${GroupId} AND c.C_Plugin = '${Plugin}' AND M_ValueTable = 'Command'  `;

   await Member.CUSTOM(SQL_query,query,res);
});
router.put('/:GroupID/Cmds', async (req, res, next) => {
    let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;
    let result = await Group.GET(SQL_query,get_data); //pobiernie ID S_Group po jej nazwie
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    get_data = [];
    get_data["GroupID"] = result[0].GroupID;
    get_data["PlayerID"] = bodyData[0].C_CommandID;
    get_data["Rang"] = "Command";
     
    await Member.PUT(SQL_query,get_data, res);
});
router.put('/:GroupID/Cmds/:Plugin', async (req, res, next) => {
    let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;
    let result = await Group.GET(SQL_query,get_data); //pobiernie ID S_Group po jej nazwie
    get_data = [];
    let GroupID = result[0].GroupID;
    let Plugin = req.params.Plugin;
   

    let commandids = `SELECT M_PlayerID FROM S_Members WHERE M_GroupID = ${GroupID} AND M_ValueTable = 'Command' `;

    let query = " INSERT INTO S_Members (GroupID,M_ValueID,M_ValueTable) ";
    query+= ` SELECT ${GroupID} , CommandID ,'Command' FROM S_Commands`;
    query+= ` WHERE C_Plugin = '${Plugin}' AND CommandID NOT IN (${commandids})`;
     
    await Member.CUSTOM(SQL_query,query,res);
});
router.delete('/:GroupID/Cmds', async (req, res, next) => {
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    let data = [];
   
    data["M_ValueID"] =bodyData[0].CommandID;
   
   await Member.DELETE(SQL_query,data,res);
});
router.delete('/:GroupID/Cmds/:Plugin', async (req, res, next) => 
{
    let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;

    let result = await Group.GET(SQL_query,get_data);
    let GroupId= result[0].GroupID;
    let Plugin= req.params.Plugin;
   
  let query = "DELETE m FROM S_Members m INNER JOIN S_Commands c ON m.M_ValueID = c.CommandID";
      query += ` WHERE m.GroupID =${GroupId} AND m.M_ValueTable = 'Command' AND c.C_Plugin = '${Plugin}' `;
 

   await Member.CUSTOM(SQL_query,query,res);
});



module.exports = router;

