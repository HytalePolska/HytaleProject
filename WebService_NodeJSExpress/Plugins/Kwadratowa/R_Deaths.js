
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');
const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');

const Death = require("./Death");
const PlayerData= require("./PlayerData");


router.get('/:PlayerID', async (req, res, next) => {
     await Death.GET(SQL_query,req.params,res);
});
router.put('/:PlayerID', async (req, res, next) => {
 let reqbody = JSON.parse(JSON.stringify(req.body))[0];
      
 let body = [];
     body["PlayerID"] = req.params.PlayerID;
     body["D_date"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
     body["D_cause"] = reqbody.D_cause;
     body["D_Location"] = reqbody.D_Location;
   
    let playerdata = await PlayerData.GET(SQL_query,req.params);
 
    if(typeof playerdata == "undefined")
    {
        res.send("404");
        return;
    }
    playerdata.PD_Deaths +=1;
    playerdata.PD_life -=1;
     if(playerdata.PD_life <= 0)
     {
         playerdata.PD_life=0;
         playerdata.PD_IsDeath = 1;
         playerdata.PD_UnbanDate = body.D_date;
     }
   
    await PlayerData.POST(SQL_query,playerdata);
    
   await Death.PUT(SQL_query,body,res);
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

