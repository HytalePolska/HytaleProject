
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');
const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');
router.get('/:PlayerID', async (req, res, next) => {

    let tab = ["P_Name", "P_Online"];
    let where = []
    where["PlayerID"] = req.params.PlayerID;

    let query = new SQL_builder().Select(tab, "S_Players").Where(where).Get();
    let result = await SQL_query(query);
    res.status(401);
    res.send(result);
});
router.post('/', async (req, res, next) => {
    let reqbody = JSON.parse(JSON.stringify(req.body))[0];
    let where = [];
    where["PlayerID"] = reqbody.PlayerID;
    where["P_Pass"] = reqbody.P_Pass;

    let query = new SQL_builder().Select("*", "S_Players").Where(where).Get();

    if (JSON.stringify(await SQL_query(query)) != "[]")  //in other case return filled JSON with data
    {
        let filds = [];
        filds["P_Online"] = "1";
        let where = [];
        where["PlayerID"] = reqbody.PlayerID;
        let query = new SQL_builder().Update(filds, "S_Players").Where(where).Get();

        await SQL_query(query)
        res.send('success');
        return;
    }
    res.send('wrong_password');
    return;

});
router.delete('/:PlayerID', async (req, res, next) => {
    let filds = [];
    filds["P_Online"] = "0";
    let where = [];
    where["PlayerID"] = req.params.PlayerID;
    let query = new SQL_builder().Update(filds, "S_Players").Where(where).Get();
    await SQL_query(query)
    res.send("Logined Out")
});


module.exports = router;

