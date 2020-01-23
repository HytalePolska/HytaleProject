const express = require('express');
const app = express();
var bodyParser = require("body-parser");


const player = require('./roudes/R_Player');


const SQL_query = require('./Connectors/MySql_Connector');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/player', player);




app.listen('2222', () => {
  console.log("Server is running on port: ${process.env.PORT || '000' }")
});
