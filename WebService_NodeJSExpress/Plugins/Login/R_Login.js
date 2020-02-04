
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');

const SQL_query = require('../../Connectors/MySql_Connector');

const SQL_builder = require('../../Tools/Sql_Builder');

const Config = require("./config");

const Plugin = require("../../Classes/Plugins");

Initialize();

router.get('/deleteall', async (req, res, next) => {
  await SQL_query("DELETE FROM S_Players");
  res.status(200).send("Players have been deleted");

})
//login
router.post('/', async (req, res, next) => {
  let reqbody = JSON.parse(JSON.stringify(req.body))[0];

  let pass = reqbody["P_Pass"];

  delete (reqbody["P_Pass"]);
  delete (reqbody["P_Online"]);

  let player = await Player.GET(SQL_query, reqbody);

  if (typeof player == 'undefined') {
    res.status(404).send("This players has not established password");
    return;
  }
  if (player.P_Pass !== pass) {
    res.status(406).send("Wrong Password");
    return;
  }
  player.P_Online = 1;
  await Player.POST(SQL_query, player);
  res.status(200).send("Success login");
});
//PlayerQuitEvent
router.post('/Exit/:PlayerID', async (req, res) => {

  let player = await Player.GET(SQL_query, req.params);
  if (typeof player == 'undefined') {
    res.status(401).send("This players in not exisitng");
    return;
  }

  player.P_Online = 0;
  await Player.POST(SQL_query, player);
  res.status(200).send("Player has been logined out");
});
//haslo
router.put('/', async (req, res) => {
  let reqbody = JSON.parse(JSON.stringify(req.body))[0];

  let pass = reqbody["P_Pass"];

  delete (reqbody["P_Pass"]);
  delete (reqbody["P_Online"]);

  let player = await Player.GET(SQL_query, reqbody);

  if (typeof player !== 'undefined') {
    res.status(409).send("This players has already established password");
    return;
  }
  let Valid_Status = IsPasswordValid(pass);
  if (Valid_Status != true) {
    res.status(406).send(Valid_Status);
    return;
  }

  let new_player = [];
  new_player["PlayerID"] = reqbody.PlayerID;
  new_player["P_Pass"] = pass;
  new_player["P_Name"] = reqbody.P_Name;
  new_player["P_Online"] = 1;

  await Player.PUT(SQL_query, new_player);
  res.status(200).send("Successed created account! Now you need to login ");
});
function IsPasswordValid(password) {
  let passSize = String(password).length;

  if (passSize < Config.P_MinSize)
    return "Your password is too short";
  if (passSize > Config.P_MaxSize)
    return "Your password is too large";

  return true;
}

async function Initialize() {

  let plugin_data = [];
  plugin_data["P_Name"] = "Plugin_Login";
  plugin_data["P_Description"] = "Slorzy do logowania sie na strony";
  plugin_data["P_LastComandsUpdate"] = new Date().toISOString().slice(0, 19).replace('T', ' ');
  await Plugin.PUT(SQL_query, plugin_data);

}

module.exports = router;

