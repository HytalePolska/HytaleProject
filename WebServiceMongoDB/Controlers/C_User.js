var mongoose = require("mongoose");
var Model = require("../Models/User");

function Conditions(data){ return {'PlayerID' : data.PlayerID}  };
function SetData(data){  return { 'P_Online':data.P_Online ,'P_Pass':data.P_Pass } }
var Controller = {};

//GET===================================================================================
Controller.GET = (Json, res) => {

    if (JSON.stringify(Json) === "{}") {
        Model.find({}).exec(function (err, models) {
            if (err)
                console.log("ERROR INSERT " + Model.collection.name + JSON.stringify(Json) + err);
            else
                res.send(models);
        });
    }
    else {
        Model.findOne(Json).exec(function (err, models) {
            if (err)
                console.log("ERROR INSERT " + Model.collection.name + JSON.stringify(Json) + err);
            else
                res.send(models);
        });
    }
};
//INSERT===================================================================================
Controller.INSERT = function (Json, res) {
    
        let FinalMsg = "";
        for (let data in Json) {
            Model.find(Conditions(Json[data])).exec(function (err, result) {
                if (err)
                    console.log("ERROR FIND INSERT " + Model.collection.name + JSON.stringify(Json) + err);

                if (JSON.stringify(result) == "[]") {
                    var model = new Model(Json[data]);
                    model.save(function (err) {
                        if (err) {
                            FinalMsg += "ERROR INSERT " + Json[data].PlayerID + " Table " + Model.collection.name + err + '\n';
                            console.log("ERROR INSERT " + Json[data].PlayerID + " Table " + Model.collection.name + err + '\n');
                        }
                        else {
                            FinalMsg += " INSERT " + Json[data].PlayerID + " Table " + Model.collection.name + err + '\n';
                        }
                    });
                }
                else {
                    FinalMsg += Json[data].PlayerID + " Is already existing \n";
                }
            });
        } resolve(FinalMsg);
        res.send("INSERT " + Model.collection.name + value);

};
//EDIT===================================================================================
Controller.EDIT = function (Where, Json, res) {
    Model.findOne(Where).exec(function (err, model) {
        if (err)
            console.log("ERROR EDIT  " + Model.collection.name + JSON.stringify(Json) + err);
        else
            res.send("EDIT " + Model.collection.name + "  " + JSON.stringify(Json));
    });
};

//UPDATE===================================================================================
Controller.UPDATE = function (Json, res) {
    for (let data in Json) {
    Model.findOneAndUpdate(Conditions(Json[data]),SetData(Json[data]), {upsert: true }, function (err, model) {
        if (err)
            console.log("ERROR UPDATE " + Model.collection.name + JSON.stringify(Json[data]) + err);
           
    });
}
res.send("UPDATE " + Model.collection.name + "  " + JSON.stringify(Json));
};

// Delete===================================================================================
Controller.DELETE = function (Json, res) {

    if (JSON.stringify(Json) === "{}") {
        Model.remove({}, function (err) {
            if (err)
                console.log("ERROR DELETE ALL " + Model.collection.name + err);
            else
                res.send("DELETE ALL " + Model.collection.name);
        });
    }
    else {
        for (let data in Json) {
            Model.deleteOne(Json[data], function (err) {
                if (err) {
                    console.log("ERROR DELETE " + Model.collection.name + JSON.stringify(Json) + err);
                    res.send("ERROR DELETE " + Model.collection.name + JSON.stringify(Json) + err);
                }
            });
        }
        res.send("DELETE " + Model.collection.name + "  " + JSON.stringify(Json));
    }



};

module.exports = Controller;