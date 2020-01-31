
const express = require("express");

const router = express.Router({ mergeParams: true });

const Group = require("../../Classes/Group/Group");
const Member = require("../../Classes/Group/Member");
const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const Command = require('./R_PremCmds');
const Premission = require('./Premission');
Initialize();


router.use("/:PremissionID/commands",Command);

router.all('/',async(req,res,next) =>
{
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
////////////////////Dodawanie Premisji///////////////////////////////
router.get('/', async (req, res, next) => {
    await Premission.GET(SQL_query,req.params,res);
});
router.get('/:P_Name', async (req, res, next) => {

    await Premission.GET(SQL_query,req.params,res);
 
});
router.put('/', async (req, res, next) => {

    await Premission.PUT(SQL_query,req.body,res);

});
router.post('/', async (req, res, next) => {

    await Premission.POST(SQL_query, req.body, res);
});
router.delete('/', async (req, res, next) => {
   
    await Premission.DELETE(SQL_query, req.params, res);
});
router.delete('/:P_Name', async (req, res, next) => {
   
    await Premission.DELETE(SQL_query, req.params, res);
});
////////////////////Dodawanie Graczy///////////////////////////////

router.get('/Players/:PlayerID', async (req, res, next) => {
    let get_data = [];
    get_data["G_Type"] = "Premission";

    let PlayerID = req.params.PlayerID;
    
   
  let query = " SELECT p.* FROM S_Players p INNER JOIN S_Members m ON p.PlayerID = m.M_ValueID ";
  query+=`WHERE  m.M_ValueTable = 'Player' AND m.M_ValueID = ${PlayerID} `;

   await Member.CUSTOM(SQL_query,query,res);
   
});
router.get('/:GroupID/Players', async (req, res, next) => {
    let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;

    let result = await Group.GET(SQL_query,get_data);
    let GroupId= result[0].GroupID;
  
   
  let query = "SELECT p.* FROM S_Players p INNER JOIN S_Members s ON p.PlayerID = s.M_ValueID ";
  query+=`WHERE s.GroupID = ${GroupId} AND M_ValueTable = 'Player' `;

   await Member.CUSTOM(SQL_query,query,res);
   
});
router.put('/:GroupID/Players', async (req, res, next) => {
    let get_data = [];
    get_data["G_Type"] = "Premission";
    get_data["G_Name"] = req.params.GroupID;
    let result = await Group.GET(SQL_query,get_data); //pobiernie ID S_Group po jej nazwie
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    get_data = [];
    get_data["GroupID"] = result[0].GroupID;
    get_data["M_ValueID"] = bodyData[0].PlayerID;
    get_data["M_ValueTable"] = "Player";
     
    await Member.PUT(SQL_query,get_data, res);
});
router.delete('/:GroupID/Players', async (req, res, next) => {
    let bodyData =  JSON.parse(JSON.stringify(req.body));
    let data = [];
   
    data["G_ValueID"] =bodyData[0].PlayerID;
   
   await Member.DELETE(SQL_query,data,res);
});
//////////////////////////////////////////////////////////////
async function Initialize()
{
     let plugin_data = [];
     plugin_data["P_Name"] = "Plugin_Premisje";
     plugin_data["P_Description"] = "Slorzy do nadawanie rang gracza";
     plugin_data["P_LastComandsUpdate"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
     await Plugin.PUT(SQL_query,plugin_data);
}



module.exports = router;

