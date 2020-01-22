
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
    let query=query_Builder.Select("*","MC_Players").Where().Condition(cond).Get();
    Con_MySQL.Execute(query, res);
});
router.put('/:UUID/:Password', (req, res, next) => {

    let query = 'UPDATE MC_Players SET Player_Password = \"' + req.params.Password + '\" WHERE Nick = \"' + req.params.UUID + '\"';
    Con_MySQL.Execute(query, res);
});
router.post('/:UUID/:Password/:Nick', (req, res, next) => {

    let query = 'INSERT INTO MC_Players VALUES(\"' + req.params.UUID + '\",\"' + req.params.Password + '\",\"' +
        req.params.Nick + '\")';

    Con_MySQL.Execute(query, res);
});
router.delete('/:UUID', (req, res, next) => {

    let query = 'DELETE FROM MC_Players WHERE Nick =\"' + req.params.UUID + '\"';
    query = 'DELETE FROM MC_Players WHERE Nick = \"kuba\"';
    Con_MySQL.Execute(query, res);
});
module.exports = router;

