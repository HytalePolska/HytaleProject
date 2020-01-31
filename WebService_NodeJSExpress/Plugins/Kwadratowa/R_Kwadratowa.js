
const express = require("express");

const router = express.Router({ mergeParams: true });

const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');

const PlayerData = require("./PlayerData");
const R_Death = require("./R_Deaths");
const R_Life = require("./R_Life");
const Plugin_Config = require("./Plugin_Config");
const Plugin = require("../../Classes/Plugins");
Initialize();

router.use('/Deaths',R_Death);
router.use('/Lifes',R_Life);
router.get('/', async (req, res, next) => 
{
    await PlayerData.GET(SQL_query,req.params,res);
 });
router.get('/config', async (req, res, next) => 
{
    res.send(Plugin_Config);
 });
router.get('/:PlayerID', async (req, res, next) => {
   await PlayerData.GET(SQL_query,req.params,res);
});
router.put('/', async (req, res, next) => {
    let reqbody = JSON.parse(JSON.stringify(req.body))[0];
  
    await PlayerData.GET(SQL_query,reqbody,res);
});
router.put('/:PlayerID', async (req, res, next) => {
   
    let new_player = [];
    new_player["PlayerID"] = req.params.PlayerID;
    new_player['PD_Deaths'] = "0";
    new_player['PD_lifes'] = "0";
    new_player['PD_life'] = Plugin_Config.StartHealths;
    new_player['PD_IsDeath'] = "0";
    new_player['PD_UnbanDate'] = "2020-01-01";
  
    await PlayerData.PUT(SQL_query,new_player,res);
});
router.post('/:PlayerID', async (req, res, next) => {
    let reqbody = JSON.parse(JSON.stringify(req.body))[0];
    reqbody["PlayerID"] = req.params.PlayerID;
    await PlayerData.POST(SQL_query,reqbody,res);
});
router.delete('/:PlayerID', async (req, res, next) => {
    await PlayerData.DELETE(SQL_query,req.params,res);
});
//=================================================

async function Initialize()
{

    let filds=[];
  
    filds.push("DeathID INT AUTO_INCREMENT PRIMARY KEY");
    filds.push("PlayerID VARCHAR(50) NOT NULL");
    filds.push("D_date DATETIME");
    filds.push(" D_cause VARCHAR(50)");
    filds.push(" D_location VARCHAR(50)");
    
    let TableDeaths = new SQL_builder().CreateTable("P_KM_Deaths").TableFilds(filds).Get();

    let fildslifes=[];
  
    fildslifes.push("LifeID INT AUTO_INCREMENT PRIMARY KEY");
    fildslifes.push("PlayerID VARCHAR(50) NOT NULL");
    fildslifes.push("L_date DATETIME");
    fildslifes.push("L_Healer VARCHAR(50)");
    fildslifes.push("L_location VARCHAR(50)");
    
    let Tablelifes = new SQL_builder().CreateTable("P_KM_Lifes").TableFilds(fildslifes).Get();

    let fildsPlayerData=[];
  
    fildsPlayerData.push("PlayerID VARCHAR(50) NOT NULL");
    fildsPlayerData.push("PD_Deaths INT");
    fildsPlayerData.push("PD_lifes INT");
    fildsPlayerData.push("PD_life INT");
    fildsPlayerData.push("PD_IsDeath INT");
    fildsPlayerData.push("PD_UnbanDate DATETIME");
    
    let TablePlayerData = new SQL_builder().CreateTable("P_KM_PlayerData").TableFilds(fildsPlayerData).Get();
   
     await SQL_query(TableDeaths);
     await SQL_query(TablePlayerData);
     await SQL_query(Tablelifes);

     let plugin_data = [];
     plugin_data["P_Name"] = "Plugin_Kwadratowa Masakra";
     plugin_data["P_Description"] = "Jesli umrzesz to dosajesz bana na godzine";
     plugin_data["P_LastComandsUpdate"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
     await Plugin.PUT(SQL_query,plugin_data);
  
}

module.exports = router;

