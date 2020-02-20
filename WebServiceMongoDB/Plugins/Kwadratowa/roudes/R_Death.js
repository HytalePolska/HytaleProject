
const express = require("express");

const router = express.Router({ mergeParams: true });

const Death = require("../controlers/C_Death");

const PlayerData = require("../controlers/C_PlayerData");

router.get('/:PlayerID', async (req, res, next) => {
  await Death.GET(req.params,res);
});

router.get('/', async (req, res, next) => {
  await Death.GET(req.params,res);
});

router.put('/:PlayerID', async (req, res, next) => {
let reqbody = JSON.parse(JSON.stringify(req.body))[0];
   
let body = [];
  body["PlayerID"] = req.params.PlayerID;
  body["D_date"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
  body["D_cause"] = reqbody.D_cause;
  body["D_Location"] = reqbody.D_Location;

 let playerdata = await PlayerData.EDIT(req.params);

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

 
 PlayerData.save((err) => {
  if (err) { res.status(500).send(err); return; }
  else
  await Death.PUT(body,res);
});

});

router.delete('/:PlayerID', async (req, res, next) => {
 await Death.DELETE(req.params,res);
});
module.exports = router;

