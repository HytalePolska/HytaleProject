
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    P_Name: String,
    P_Description:String,
    P_LastComandsUpdate:{ type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Plugin', Schema);

