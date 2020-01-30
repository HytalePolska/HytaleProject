
const express = require("express");

const router = express.Router({ mergeParams: true });


const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');

const config = require('./Plugin_Config');
const Life = require("./Life");
const PlayerData= require("./PlayerData");


router.get('/:PlayerID', async (req, res, next) => {
    
     await Life.GET(SQL_query,req.params,res);
});
router.put('/:PlayerID', async (req, res, next) => {
 let reqbody = JSON.parse(JSON.stringify(req.body))[0];
    reqbody["PlayerID"] = req.params.PlayerID;
    reqbody["L_date"] =  new Date().toISOString().slice(0, 19).replace('T', ' ');
    let playerdata = await PlayerData.GET(SQL_query,req.params);
    
    if(typeof playerdata == "undefined")
    {
        res.send("404"); //nie mozna odlaesc gracza
        return;
    }
    if(playerdata.PD_lifes+1 > config.MaxHealths)
    {
        res.send("405"); //przekracza maxymalna liczbe zyc
        return;
    }
    if(playerdata.PD_lifes ==0)
    {
        playerdata.PD_IsDeath =0;
        playerdata.PD_UnbanDate =   reqbody["L_date"];
    }
    playerdata.PD_lifes +=1;
    playerdata.PD_life +=1;
   
   await PlayerData.POST(SQL_query,playerdata);
    
   await Life.PUT(SQL_query,reqbody,res);
});
router.post('/', async (req, res, next) => {
    let reqbody = JSON.parse(JSON.stringify(req.body))[0];
    reqbody["PlayerID"] = req.params.PlayerID;
    await Death.POST(SQL_query,reqbody,res);
});
router.delete('/:DeathID', async (req, res, next) => {
    await Death.DELETE(SQL_query,req.params,res);
});


module.exports = router;

