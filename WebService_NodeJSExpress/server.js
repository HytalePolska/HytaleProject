const express = require('express');
const app = express();
var bodyParser = require("body-parser");

const player = require('./roudes/R_Player');
const group = require('./roudes/Group/R_Groups');
const SQL = require('./Connectors/MySql_Connector');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/player', player);
app.use('/group', group);

app.get('/test', async (req,res) =>{
 
   let sql_data = await SQL('SELECT * FROM MC_Players'); 
   res.send(sql_data);
});

const PORT = process.env.PORT | '5000';
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});




