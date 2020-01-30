
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');
const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');

const Deaths = require("./R_Deaths");

router.use('/:PlayerID/Deaths',Deaths);

router.get('/:PlayerID', async (req, res, next) => {

    
});
router.put('/:PlayerID', async (req, res, next) => {
  
});
router.post('/:PlayerID', async (req, res, next) => {
  
});
router.delete('/:PlayerID', async (req, res, next) => {
   
});


module.exports = router;

