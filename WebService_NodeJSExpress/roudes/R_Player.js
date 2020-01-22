
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
///:UUID/:Password/:Nick
router.put('/', (req, res, next) => {
    let con = [];
    con["Player_ID"]='1232344334';
    con["Player_Password"]='qaz3421';
    con["Nick"]='pawel433' ;
    let query = query_Builder.Insert(con,"MC_Players").Get(); 
   Con_MySQL.Execute(query, res);
   // res.send(query);
});
router.post('/', (req, res, next) => {
    let con = [];
    con["Player_ID"]="#1322323#";
    con["Player_Password"] ="Zeb123";
    con["Nick"]="Pawel4";

    let wher = [];
    wher["Player_ID"]="#123#";

    let query=query_Builder.Update(con,"MC_Players").Where(wher).Get();
   Con_MySQL.Execute(query, res);
});
router.delete('/:UUID', (req, res, next) => {
   let con = [];
   con["Nick"]=req.params.UUID ;
   let query = query_Builder.Delete("MC_Players").Where(con).Get(); 
  Con_MySQL.Execute(query, res);
});




module.exports = router;

