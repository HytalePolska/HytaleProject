
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
    Con_MySQL.Execute(query, res);
});
router.put('/:UUID/:Password/:Nick', (req, res, next) => {
    let con = [];
    con["Player_ID"]=req.params.UUID ;
    con["Player_Password"]=req.params.Password ;
    con["Nick"]=req.params.UUID ;
    let query = query_Builder.Insert("MC_Players",con).Get(); 
    Con_MySQL.Execute(query, res);
   
});
router.post('/:UUID/:Password', (req, res, next) => {


    let con = [];
    con["Player_ID"]="#123#";
    con["Player_Password"] ="Zeb123";
    con["Nick"]="Pawel12";

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

