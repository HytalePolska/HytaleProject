
const express = require("express");
const router = express.Router();

const Con_MySQL = require("../Connectors/Con_MySQL");

const SQl_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQl_Builder();

router.get('/', async (req, res, next) => {
    let query=query_Builder.Select("*","MC_Players").Get();
    Con_MySQL.Execute(query, res);
});

router.get('/:UUID', (req, res, next) => {
    let cond =[];
    cond['Nick'] = req.params.UUID;
    query=query_Builder.Select("*","MC_Players").Where(cond).Get();
    console.log( req.params.UUID);
    Con_MySQL.Execute(query, res);
});

router.put('/:Player_ID/:Nick/:Player_Password', (req, res, next) => {
    let con = [];
    con["Nick"]=req.params.Nick;
    con["Player_Password"] =req.params.Player_Password;
    con["Player_ID"]=req.params.Player_ID;
    let query = query_Builder.Insert(con,"MC_Players").Get(); 
   Con_MySQL.Execute(query, res);
});

router.post('/:Player_ID/:Nick/:Player_Password', (req, res, next) => {
    console.log(req.body);
    let con = [];
    con["Nick"]=req.params.Nick;
    con["Player_Password"] =req.params.Player_Password;
   
    let wher = [];
    wher["Player_ID"]=req.params.Player_ID;

    let query=query_Builder.Update(con,"MC_Players").Where(wher).Get();
   Con_MySQL.Execute(query, res);
});

router.delete('/:Player_ID', (req, res, next) => {
   let con = [];
   con["Player_ID"]=req.params.Player_ID;
   let query = query_Builder.Delete("MC_Players").Where(con).Get(); 
  Con_MySQL.Execute(query, res);
});




module.exports = router;

