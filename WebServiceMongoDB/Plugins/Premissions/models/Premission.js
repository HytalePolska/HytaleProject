
var mongoose = require('mongoose');
var plugins = require('../../../Controlers/C_Plugin');
var Schema = new mongoose.Schema({
    P_Name: String,
    P_Members:Number,
    P_Access:Number,
    updated_at: { type: Date, default: Date.now },
});

let plug = { "P_Name":"premission","P_Description":"Manage Players"};
let list = {plug}
plugins.INSERT(list);

module.exports = mongoose.model('Premission', Schema);

