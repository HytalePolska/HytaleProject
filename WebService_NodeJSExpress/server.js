const express = require('express');
const app = express();




const player = require('./roudes/R_Player');





app.use('/player', player);

app.get('/', async function (req, res) {
  let query = 'UPDATE MC_Players SET Player_Password = \"' + req.params.Password + '\" WHERE Nick = \"' + req.params.UUID + '\"';
  res.send(query);
});

app.listen('2222', () => {
  console.log("Server is running on port: ${process.env.PORT || '000' }")
});
