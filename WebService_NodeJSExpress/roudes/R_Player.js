
const express = require("express");
const router = express.Router();

const Con_MySQL = require("../Connectors/Con_MySQL");



router.get('/', async (req, res, next) => {


    Con_MySQL.Execute("SELECT * FROM MC_Players", res);
});

router.get('/:UUID', (req, res, next) => {
    Con_MySQL.Execute('SELECT * FROM MC_Players WHERE Nick = \"' + req.params.UUID + '\"', res);
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

