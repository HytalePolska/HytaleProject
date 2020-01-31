
const express = require("express");

const router = express.Router({ mergeParams: true });

const SQL_query = require('../Connectors/MySql_Connector');

const SQL_builder = require('../Tools/Sql_Builder');

const premissions = require('../Plugins/Premissions/R_Premmission');

const plugin = require('../Classes/Plugins');

const login = require('../Plugins/Login/R_Login');

const kwadratowa = require('../Plugins/Kwadratowa/R_Kwadratowa');

const commands = require('./R_Command');

Initialize();

router.use('/:P_Name/commands', commands);
router.use('/premissions', premissions);
router.use('/login', login);
router.use('/kwadratowa', kwadratowa);

router.get('/', async (req, res, next) => {
     await plugin.GET(SQL_query,req.body,res);
});
router.get('/:P_Name', async (req, res, next) => {
    await plugin.GET(SQL_query,req.params,res);
});
router.put('/', async (req, res, next) => {
    let data =  JSON.parse(JSON.stringify(req.body))[0];
    let con = [];
    con['P_Name'] = data.P_Name;
    con['P_Description'] = data.P_Description;
    con['P_LastComandsUpdate']  =new Date().toISOString().slice(0, 19).replace('T', ' ');
    await plugin.PUT(SQL_query,data,res);
});
router.post('/', async (req, res, next) => {
    
    let data =  JSON.parse(JSON.stringify(req.body))[0];
    let con = [];
    con['PluginID'] = data.PluginID;
    con['P_Name'] = data.P_Name;
    con['P_Description'] = data.P_Description;
    con['P_LastComandsUpdate']  =new Date().toISOString().slice(0, 19).replace('T', ' ');
    let where = []; where["PluginID"] = data.PluginID; 
    await plugin.POST(SQL_query,data,res);
});
router.delete('/:PluginID', async (req, res, next) => {
    await plugin.DELETE(SQL_query,req.params,res);
  
});

async function Initialize()
{

    let filds=[];
  
    filds.push("PluginID INT AUTO_INCREMENT PRIMARY KEY");
    filds.push("P_Name VARCHAR(50) NOT NULL");
    filds.push("P_Description  VARCHAR(50)");
    filds.push("P_LastComandsUpdate  DATETIME");
   
    
    let Table = new SQL_builder().CreateTable("S_Plugins").TableFilds(filds).Get();

     await SQL_query(Table);
  
}



module.exports = router;

