const express = require('express');
const app = express();
var bodyParser = require("body-parser");

//const player = require('./roudes/R_Player');
//const group = require('./roudes/Group/R_Groups');
//const plugins = require('./roudes/R_Plugins');
const SQL = require('./Connectors/MySql_Connector');

const SQL_builder = require('./Tools/Sql_Builder');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongodb = require('./Connectors/Mongoose_Connector');

let conn = mongodb();

//app.use('/players', player);
////app.use('/groups', group);
//app.use('/plugins', plugins);



const Mongouser = require('./MongoClasses/User');

app.get('/test/:paramter', async (req, res) => {
  console.log(req.params);
  res.status(300).send("Hello Word");
});
app.get('/test/test1/:paramater', async (req, res) => {
  console.log(req.params);
  res.send("Hello Word" + req.params.paramater);
});

app.get('/', async (req, res, next) => {
  
    Mongouser.Init_table(conn)
 // Mongouser.GET(mongodb,"[]",res);

});

app.on('exit', function () {
  console.log('Pa pa');
});

const PORT = process.env.PORT | '5000';
app.listen(PORT, () => {
  console.log("Server is running on port:" + PORT);
});




