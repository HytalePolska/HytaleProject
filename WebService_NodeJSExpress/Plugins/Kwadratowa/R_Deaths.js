
const express = require("express");

const router = express.Router({ mergeParams: true });

const Player = require('../../Classes/Player');
const SQL_query = require('../../Connectors/MySql_Connector');
const SQL_builder = require('../../Tools/Sql_Builder');



router.get('/', async (req, res, next) => {

    
});
router.put('/', async (req, res, next) => {
  
});
router.post('/', async (req, res, next) => {
  
});
router.delete('/', async (req, res, next) => {
   
});


module.exports = router;

