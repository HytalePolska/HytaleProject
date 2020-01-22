const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const SQL_Builder = require("./Tools/Sql_Builder");
const query_Builder = new SQL_Builder();

const player = require('./roudes/R_Player');

const SQL_query = require('./Connectors/MySql_Connector');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/player', player);
app.get('/', async (req, res, next) => {

  let query = query_Builder.Select("*", "MC_Players").Get();

  let resp = await SQL_query(query);
  res.json(resp);
});

app.get('/paw', async (req, res, next) => {
  let con = [];
  con["Player_ID"] = "#123#";
  con["Player_Password"] = "Zeb123";
  con["Nick"] = "Pawel12";

  let wher = [];
  wher["Player_ID"] = "#123#";
  let query = query_Builder.Update(con, "MC_Players").Where(wher).Get();
  res.send(query);
});

app.listen('2222', () => {
  console.log("Server is running on port: ${process.env.PORT || '000' }")
});
