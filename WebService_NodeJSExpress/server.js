const express = require('express');
const sql = require("./Connectors/Con_MySQL");

const app = express();

var db =  sql.get();

app.use(express.json());

db.get();



app.listen(process.env.PORT || '000', () => {
    console.log("Server is running on port: ${process.env.PORT || '000' }")
});
