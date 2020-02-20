var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_Life');
var Schema = new mongoose.Schema({
    PlayerID: String,
    L_date:Date,
    L_Healer:String,
    L_location:String,
});
module.exports = mongoose.model('Life', Schema);


