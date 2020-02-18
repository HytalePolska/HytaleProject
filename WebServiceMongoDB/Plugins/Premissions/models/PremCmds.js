var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_Plugin');
var Schema = new mongoose.Schema({
    CommandID: String,
    PremissionID:String,
});
module.exports = mongoose.model('PremCmds', Schema);
