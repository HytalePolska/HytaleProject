var express = require('express');
var router = express.Router();
var user = require("../../Controlers/C_User");
const Config = require("./config");
const plugin = require("../../Controlers/C_Plugin");


let plug = { "P_Name": "login", "P_Description": "Basic plugin helps players to create accounts" };
let list = { plug }
plugin.INSERT(list);


//login out a  player 
router.get('/LogOut/:PlayerID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.params));
    let player = await user.EDIT(data);

    if (player == null) {
        res.status(401).send("This players in not exisitng");
        return;
    }

    player.P_Online = 0;
    player.save((err) => {
        if (err) { res.status(500).send(err); return; }
        else
            res.status(200).send(`Player ${req.params.PlayerID} has been logined out`);
    });

});
//login
router.post('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body))[0];
    let p_id = { PlayerID: data["PlayerID"] };

    let player = await user.EDIT(p_id);

    if (player == null) {
        res.status(401).send("This players is not exisitng");
        return;
    }
    if (player.P_Pass !== data["P_Pass"]) {
        res.status(406).send("Wrong Password");
        return;
    }
    player.P_Online = 1;
    player.save((err) => {
        if (err) { res.status(500).send(err); return; }
        else
            res.status(200).send(`Player ${data.PlayerID} has been logined in`);
    });
});
router.post('/register', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body))[0];
    let p_id = { PlayerID: data["PlayerID"] };

    let player = await user.EDIT(p_id);

    if (player != null) {
        res.status(401).send("This password is already set");
        return;
    }

    let Valid_Status = IsPasswordValid(data.P_Pass);
    if (Valid_Status != true) {
        res.status(406).send(Valid_Status);
        return;
    }

    let new_player = [];
    new_player["PlayerID"] = data.PlayerID;
    new_player["P_Pass"] = data.P_Pass;
    new_player["P_Name"] = data.P_Name;
    new_player["P_Online"] = 1;
    let list = { new_player };
    await user.INSERT(list, res);


});
router.post('/password', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body))[0];
    let p_id = { PlayerID: data["PlayerID"] };

    let player = await user.EDIT(p_id);

    if (player == null) {
        res.status(401).send("This players is not exisitng");
        return;
    }
    if (player.P_Pass == data["P_Pass"]) {
        res.status(406).send("Passwords should be diffrent");
        return;
    }
    player.P_Pass = data["P_Pass"];
    player.save((err) => {
        if (err) { res.status(500).send(err); return; }
        else
            res.status(200).send(`Player ${data.PlayerID} password has been changed`);
    });
});

function IsPasswordValid(password) {
    let passSize = String(password).length;

    if (passSize < Config.P_MinSize)
        return "Your password is too short";
    if (passSize > Config.P_MaxSize)
        return "Your password is too large";

    return true;
}
module.exports = router;