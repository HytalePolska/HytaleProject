
const express = require("express");

const router = express.Router({ mergeParams: true });


const SQL_query = require('../../Connectors/MySql_Connector');
const Plugin = require('../../Classes/Plugins');
const SQL_builder = require('../../Tools/Sql_Builder');
const Areas = require('./R_Areas');
const Field = require('./Field');
const Member = require('./R_Members');
Initialize();


router.use("/:F_Name/areas",Areas);
router.use("/:F_Name/players",Member);
router.all('/',async(req,res,next) =>
{
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
////////////////////Dodawanie Premisji///////////////////////////////
router.get('/', async (req, res, next) => {
    await Field.GET(SQL_query,req.params,res);
});
router.get('/:F_Name', async (req, res, next) => {

    await Field.GET(SQL_query,req.params,res);
 
});
router.put('/', async (req, res, next) => {

    await Field.PUT(SQL_query,req.body,res);

});
router.post('/', async (req, res, next) => {

    await Field.POST(SQL_query, req.body, res);
});
router.delete('/', async (req, res, next) => {
   
    await Field.DELETE(SQL_query, req.params, res);
});
router.delete('/:F_Name', async (req, res, next) => {
   
    await Field.DELETE(SQL_query, req.params, res);
});
////////////////////Dodawanie Graczy///////////////////////////////


//////////////////////////////////////////////////////////////
async function Initialize()
{
    await Field.Init_table(SQL_query);
     let plugin_data = [];
     plugin_data["P_Name"] = "Plugin_Dzialki";
     plugin_data["P_Description"] = "nadawania gracz dzialek";
     plugin_data["P_LastComandsUpdate"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
     await Plugin.PUT(SQL_query,plugin_data);
    
}



module.exports = router;

