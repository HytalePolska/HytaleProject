const express = require('express');
const app = express();



const player = require('./roudes/R_Player');

let t_tab = [];
t_tab[0] = 'Nick';
t_tab[1] = 'Password';

let tab = [];
tab['jacek']=12;
tab['gracz']='kuba';
tab['haslo']='1223';


app.use('/player', player);

app.get('/', async function (req, res) {
  
});

app.listen('2222', () => {
  console.log("Server is running on port: ${process.env.PORT || '000' }")
});