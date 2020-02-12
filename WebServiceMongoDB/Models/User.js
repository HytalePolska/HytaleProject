
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    PlayerID: String,
    P_Name: String,
    P_Online: Number,
    P_Pass: String,
    updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', Schema);