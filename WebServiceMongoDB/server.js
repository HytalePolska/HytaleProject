const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const DataBase = require('./Connectors/Mongoose_Connector');
const users = require("./roudes/R_User");
const plugins = require("./roudes/R_Plugins");
 DataBase();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/players', users);
app.use('/plugins', plugins);



const PORT = process.env.PORT | '5000';
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});




