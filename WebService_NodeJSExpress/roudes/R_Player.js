
const express = require("express");
const router = express.Router();



const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();

const SQL_query = require('../Connectors/MySql_Connector');
const Table_Name = "MC_Players";

router.get('/', async (req, res, next) => {
    let query = query_Builder.Select("*", Table_Name).Get();
    let sql_res = await SQL_query(query);
    res.send(sql_res);
});

router.get('/:UUID', async (req, res, next) => {
    let cond = [];
    cond['Player_ID'] = req.params.UUID;
    query = query_Builder.Select("*", Table_Name).Where(cond).Get();
    let sql_res = await SQL_query(query);
    res.send(sql_res);

});

router.put('/', async (req, res, next) => {
    let con = [];
    con["Nick"] = req.body.Nick;
    con["Player_Password"] = req.body.Player_Password;
    con["Player_ID"] = req.body.Player_ID;

    let wher = []; wher["Player_ID"] = req.body.Player_ID;     //check if player exists
    let query = query_Builder.Select("*", Table_Name).Where(wher).Get();

    if (JSON.stringify(await SQL_query(query)) != "[]")  //in other case return filled JSON with data
        res.send("The Player is already existing");

    query = query_Builder.Insert(con, Table_Name).Get();   //add new player
    await SQL_query(query);
    res.send("The Players has been added");

});

router.post('/', async (req, res, next) => {


    let con = [];
    con["Nick"] = req.body.Nick;
    con["Player_Password"] = req.body.Player_Password;
    let wher = [];
    wher["Player_ID"] = req.body.Player_ID;

    let query = query_Builder.Update(con, Table_Name).Where(wher).Get();
    let sql_res = await SQL_query(query);
    res.send("Player has been updated");
});

router.delete('/:Player_ID', async (req, res, next) => {
    let con = [];
    con["Player_ID"] = req.params.Player_ID;
    let query = query_Builder.Delete(Table_Name).Where(con).Get();
    await SQL_query(query);
    res.send("Player has been deleted");
});




module.exports = router;

