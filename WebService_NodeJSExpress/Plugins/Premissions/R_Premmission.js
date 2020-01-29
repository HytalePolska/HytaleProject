
const express = require("express");

const router = express.Router({ mergeParams: true });

const Group = require("../../Classes/Group/Group");
const Member = require("../../Classes/Group/Member");
const Command = require("../../Classes/Command");
const SQL_query = require('../../Connectors/MySql_Connector');


////////////////////Dodawanie Premisji///////////////////////////////
router.get('/', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    await Group.GET(SQL_query,get_data, res);
});
router.get('/:GroupID', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;

    await Group.GET(SQL_query,get_data,res);
 
});
router.put('/', async (req, res, next) => {
    req.body.G_Type = "Premission";
    await Group.PUT(SQL_query, req.body, res);
});
router.post('/:GroupID', async (req, res, next) => {

    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;

    let result = Group.GET(SQL_query,get_data);
     
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;
    get_data["Name"] = req.body.G_Name;

    await Group.POST(SQL_query, get_data, res);
});
router.delete('/', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    await Group.DELETE(SQL_query,get_data, res);
});
router.delete('/:GroupID', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["GroupID"] = req.params.G_GroupID;
    await Group.DELETE(SQL_query, get_data, res);
});
////////////////////Dodawanie Graczy do Premissji///////////////////////////////
router.get('/:GroupID/players', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;

    let result = await Group.GET(SQL_query,get_data);
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;

    await Member.GET(SQL_query,get_data, res);
});
router.put('/:GroupID/players', async (req, res, next) => {

    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;
    let result = await Group.GET(SQL_query,get_data); //pobiernie ID S_Group po jej nazwie
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;
    get_data["PlayerID"] = bodyData[0].M_PlayerID;
    get_data["Rang"] = bodyData[0].M_Rang;
     
    await Member.PUT(SQL_query,get_data, res);
});
router.post('/:GroupID/players', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;
   
    let result = await Group.GET(SQL_query,get_data);
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;
    get_data["PlayerID"] = bodyData[0].M_PlayerID;
    get_data["Rang"] = bodyData[0].M_Rang;
   
    await Member.POST(SQL_query, get_data, res);
});
router.delete('/:GroupID/players', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;
   
    let result = await Group.GET(SQL_query,get_data);
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;
    get_data["PlayerID"] = bodyData[0].M_PlayerID;
    
    await Member.DELETE(SQL_query, get_data, res);
});
////////////////////Dodawanie Komand Premissji///////////////////////////////
router.get('/:GroupID/Cmds', async (req, res, next) => {
  
    await Command.GET(SQL_query,req.params.GroupID, res);
});
router.get('/:GroupID/Cmds/:Plugin', async (req, res, next) => {

    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;
    let result = await Group.GET(SQL_query,get_data); //pobiernie ID S_Group po jej nazwie

    get_data = [];
    get_data["GroupID"] = result.G_GroupID;
    get_data["Plugin"] = req.params.Plugin;
    
    await Command.GET(SQL_query,get_data, res);
});
router.put('/:GroupID/Cmds', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;
    let result = await Group.GET(SQL_query,get_data); //pobiernie ID S_Group po jej nazwie
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;
    get_data["Name"] = bodyData[0].C_Name;
    get_data["Plugin"] = bodyData[0].C_Plugin;
  
    await Command.PUT(SQL_query,get_data, res);
});
router.post('/:GroupID/Cmds', async (req, res, next) => {
    
});
router.delete('/:GroupID/Cmds', async (req, res, next) => {
   
});
router.delete('/:GroupID/Cmds/:CmdID', async (req, res, next) => {
});

module.exports = router;

