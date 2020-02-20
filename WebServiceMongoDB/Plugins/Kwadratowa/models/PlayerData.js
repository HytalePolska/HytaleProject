
var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_PlayerData');
var Schema = new mongoose.Schema({
    PlayerID:String,
    PD_Deaths:Number,
    PD_lifes:Number,
    PD_life:Number,
    PD_IsDeath:Number,
    PD_UnbanDate:Date,
    updated_at: { type: Date, default: Date.now },
});

let plug = { "P_Name":"kwadratowa","P_Description":"gdy gracz umiera traci zyceo"};
let list = {plug}
plugins.INSERT(list);

module.exports = mongoose.model('PlayerData', Schema);

