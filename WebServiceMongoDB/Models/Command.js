
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    PluginID:String,
    C_Name: String,
    C_Description:String,
    updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Command', Schema);

