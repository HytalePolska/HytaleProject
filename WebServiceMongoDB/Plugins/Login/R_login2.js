var express = require('express');
var router = express.Router();
var user = require("../../Controlers/C_User");
const Config = require("./config");

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
    //let player = await user.GET(req.params, res);
    //  console.log(player);
    res.send("123");
});
router.post('/password', async (req, res) => {
    //let player = await user.GET(req.params, res);
    //  console.log(player);
    res.send("123");
});


module.exports = router;