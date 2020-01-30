
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');
const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');
const Config = require("./config");
//Na login
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
router.put('/', async(req,res)=>{
   let reqbody = JSON.parse(JSON.stringify(req.body))[0];
    
    let player  = await Player.GET(SQL_query,reqbody);

    if(typeof player !== 'undefined')
    {
       res.status(401).send("This players has already established password");
       return;
    }
    if(IsPasswordValid(reqbody.P_Pass) != true)
    {
        res.status(402).send("Password Is not valid");
        return;  
    }
    
    let new_player = [];
     new_player["PlayerID"] = reqbody.PlayerID;
     new_player["P_Pass"] = reqbody.P_Pass;
     new_player["P_Online"] = reqbody.P_Online;

      await Player.PUT(SQL_query,new_player);
      res.status(400).send("Successed created account, you need to login nowe");   
});


function IsPasswordValid(password)
{
  let passSize = String(password).length;
  
  if(passSize >Config.P_MinSize && passSize <Config.P_MaxSize)
    return true;

    return false;
}

module.exports = router;

