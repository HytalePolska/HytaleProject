var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_Death');
var Schema = new mongoose.Schema({
    PlayerID: String,
    D_date:Date,
    D_cause:String,
    D_location:String,
});
module.exports = mongoose.model('Death', Schema);
