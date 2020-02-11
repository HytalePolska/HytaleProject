const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const DataBase = require('./Connectors/Mongoose_Connector');
const users = require("./roudes/R_User");
let conn = DataBase();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/players', users);




const PORT = process.env.PORT | '5000';
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});




