const express = require('express');
const app = express();
var bodyParser = require("body-parser");


const player = require('./roudes/R_Player');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/player', player);




const PORT = process.env.PORT | '5000';
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});




