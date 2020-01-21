const express = require('express');
const app = express();




const player = require('./roudes/R_Player');





app.use('/player', player);

app.get('/', async function (req, res) {
  res.send("Testowa wiadomosc");
});

app.listen('2222', () => {
  console.log("Server is running on port: ${process.env.PORT || '000' }")
});
