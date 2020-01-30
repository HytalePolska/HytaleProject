
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');
const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');
const Config = require("./config");
//login
router.post('/', async (req, res, next) => {
    let reqbody = JSON.parse(JSON.stringify(req.body))[0];

    let player  = await Player.GET(SQL_query,reqbody);

    if(typeof player == 'undefined')
    {
       res.status(401).send("This players has not established password");
       return;
    }
    if( player.P_Pass !== reqbody.P_Pass)
    {
        res.status(402).send("Wrong Password");
        return;  
    }
      player.P_Online = 1;
      await Player.POST(SQL_query,player);
      res.status(400).send("Success login");   
});
//PlayerQuitEvent
router.post('/Exit/:PlayerID',async(req,res) =>{
  
    let player = await Player.GET(SQL_query,req.params);
    if(typeof player == 'undefined')
    {
       res.status(401).send("This players in not exisitng");
       return;
    }

    player.P_Online =0;
    await Player.POST(SQL_query,player);
    res.status(401).send("Player has been logined out");
});
//haslo
router.put('/', async(req,res)=>{
   let reqbody = JSON.parse(JSON.stringify(req.body))[0];
    
    let player  = await Player.GET(SQL_query,reqbody);
         
    if(typeof player !== 'undefined')
    {
       res.status(401).send("This players has already established password");
       return;
    }
    let Valid_Status = IsPasswordValid(reqbody.P_Pass);
    if(Valid_Status != true)
    {
        res.status(402).send(Valid_Status);
        return;  
    }
    
    let new_player = [];
     new_player["PlayerID"] = reqbody.PlayerID;
     new_player["P_Pass"] = reqbody.P_Pass;
     new_player["P_Name"] = reqbody.P_Name;
     new_player["P_Online"] = 0;

      await Player.PUT(SQL_query,new_player);
      res.status(400).send("Successed created account! Now you need to login ");   
});


function IsPasswordValid(password)
{
  let passSize = String(password).length;
  
  if(passSize <Config.P_MinSize)
    return "Your password is too short";
  if(passSize> Config.P_MaxSize)
    return "Your password is too large";

    return true;
}

module.exports = router;

