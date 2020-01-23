
const express = require("express");
const router = express.Router();

const Player = require("../classes/Player");

const SQL_Builder = require("../Tools/Sql_Builder");
const query_Builder = new SQL_Builder();

const SQL_query = require('../Connectors/MySql_Connector');
const Table_Name = "MC_Players";


router.get('/', async (req, res, next) => {
    
  await  Player.GET(SQL_query,req.body,res);
});

router.get('/:Player_ID', async (req, res, next) => {
   await  Player.GET(SQL_query,req.params,res);
});

router.put('/', async (req, res, next) => {
    await  Player.PUT(SQL_query,req.body,res);
});

router.post('/', async (req, res, next) => {
    await  Player.POST(SQL_query,req.body,res);
  
    
});

router.delete('/:Player_ID', async (req, res, next) => {
    await  Player.DELETE(SQL_query,req.params,res);
});




module.exports = router;

