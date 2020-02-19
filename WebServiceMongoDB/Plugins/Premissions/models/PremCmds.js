var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_Plugin');
var Schema = new mongoose.Schema({
    CommandID: String,
    PremissionID:String,
    C_Name:String,
    P_Name:String
});
module.exports = mongoose.model('PremCmds', Schema);
