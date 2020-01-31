
const express = require("express");

const router = express.Router({ mergeParams: true });


const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const Command = require('./R_PremCmds');
const Premission = require('./Premission');
const Member = require('./R_PremMembers');
Initialize();


router.use("/:P_Name/commands",Command);
router.use("/:P_Name/players",Member);
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


//////////////////////////////////////////////////////////////
async function Initialize()
{
     let plugin_data = [];
     plugin_data["P_Name"] = "Plugin_Premisje";
     plugin_data["P_Description"] = "Slorzy do nadawanie rang gracza";
     plugin_data["P_LastComandsUpdate"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
     await Plugin.PUT(SQL_query,plugin_data);
     await Premission.Init_table(SQL_query);
}



module.exports = router;

