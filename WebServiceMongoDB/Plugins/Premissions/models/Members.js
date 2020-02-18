var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_Plugin');
var Schema = new mongoose.Schema({
    PlayerID: String,
    PremissionID:String,
    P_Prefix:String,
    P_AddByPlayer:String,
    P_AddDate:Date
});
module.exports = mongoose.model('Members', Schema);
