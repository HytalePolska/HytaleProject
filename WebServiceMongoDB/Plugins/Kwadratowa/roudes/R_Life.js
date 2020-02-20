
const express = require("express");

const router = express.Router({ mergeParams: true });

const Life =  require("../controlers/C_Life");

const Player = require("../../../Controlers/C_User");

router.get('/', async (req, res, next) => {
    
    await Life.GET({},res);
});
router.get('/:PlayerID', async (req, res, next) => {
    
     await Life.GET(req.params,res);
});
router.put('/:PlayerID', async (req, res, next) => {

    let reqbody = JSON.parse(JSON.stringify(req.body))[0];
      
    let body = [];
        body["PlayerID"] = req.params.PlayerID;
        body["C_date"] =new Date().toISOString().slice(0, 19).replace('T', ' ');
        body["C_Cause"] = reqbody.L_healer;
        body["C_Location"] = reqbody.L_Location;
      
       let player = await Player.Edit(body["PlayerID"]);
    
    if(typeof player== "undefined")
    {
        res.status(404).send("This player is not existing"); //nie mozna odlaesc gracza
        return;
    }
    if(player.PD_lifes+1 > config.MaxHealths)
    {
        res.status(405).send("Player has life limit") //przekracza maxymalna liczbe zyc
        return;
    }
    if(player.PD_lifes ==0)
    {
        player.PD_IsDeath =0;
        player.PD_UnbanDate =  body["L_date"];
    }
    player.PD_lifes +=1;
    player.PD_life +=1;
   
    player.save((err) => {
        if (err) { res.status(500).send(err); return; }
        else
            await Life.PUT(body,res);
    });
  
});
router.delete('/:PlayerID', async (req, res, next) => {

    await Death.DELETE(req.params,res);
});
module.exports = router;

