const express = require('express');
const Con_MySQL = require("./Connectors/Con_MySQL");
const conncector = new Con_MySQL(); 
const app = express();



app.use(express.json());

//conncector.Execute("SELECT * from MC_Players");
console.log(conncector.Execute("SELECT * FROM MC_Players"));
app.get('/J', function (req, res) {
    res.send( conncector.Execute("SELECT * FROM MC_Players"));
  })


app.listen('1111', () => {
    console.log("Server is running on port: ${process.env.PORT || '000' }")
});
