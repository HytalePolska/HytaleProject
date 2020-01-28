const express = require('express');
const app = express();
var bodyParser = require("body-parser");

const player = require('./roudes/R_Player');
const group = require('./roudes/Group/R_Groups');

const SQL = require('./Connectors/MySql_Connector');

const SQL_builder = require('./Tools/Sql_Builder');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/player', player);
app.use('/group', group);

app.get('/test', async (req,res) =>{
 
   let sql_data = await SQL('SELECT Nick FROM MC_Players'); 
   let where = [];
   
   let build = new SQL_builder().Select("*","MC_Players").Where().And().In(sql_data,"Nick").Get();
   console.log(build);
   res.send(await SQL(build));
});

const PORT = process.env.PORT | '5000';
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});




