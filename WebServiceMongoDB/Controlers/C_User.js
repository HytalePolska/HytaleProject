var mongoose = require("mongoose");
var Model = require("../Models/User");

function Conditions(data) { return { 'PlayerID': data.PlayerID } };
function SetData(data) { return { 'P_Online': data.P_Online, 'P_Pass': data.P_Pass } }
var Controller = {};

//GET===================================================================================
Controller.GET = async (Json, res) => {

    if (JSON.stringify(Json) === "{}") {
        Model.find({}).exec(function (err, models) {
            if (err)
                console.log("ERROR GET " + Model.collection.name + JSON.stringify(Json) + err);
            if (models === null)
                res.status(200).send('[]')
            else
                res.status(200).send(models);
        });
    }
    else {

        Model.findOne(Json).exec(function (err, models) {
            if (err)
                console.log("ERROR INSERT " + Model.collection.name + JSON.stringify(Json) + err);
            if (models === null)
                res.status(200).send('[]')
            else
                res.status(200).send(models);
        });
    }
};
//INSERT===================================================================================
Controller.INSERT = async (Json, res) => {

    let FinalMsg = "";
    let error = false;
    for (let data in Json) {

        FinalMsg += await new Promise(function (resolve, reject) {
            Model.find(Conditions(Json[data])).exec(function (err, result) {
                if (err)
                    console.log("ERROR FIND INSERT " + Model.collection.name + JSON.stringify(Json) + err);

                if (JSON.stringify(result) == "[]") {
                    var model = new Model(Json[data]);
                    model.save(function (err) {
                        if (err) {
                            error = true;
                            resolve("ERROR INSERT " + Json[data].PlayerID + " Table " + Model.collection.name + err + '\n');
                            console.log("ERROR INSERT " + Json[data].PlayerID + " Table " + Model.collection.name + err + '\n');
                        }
                        else
                            resolve(" INSERT " + Json[data].PlayerID + " Table " + Model.collection.name + err + '\n');
                    });
                }
                else {
                    error = true;
                    resolve(FinalMsg += Json[data].PlayerID + " Is already existing \n");
                }
            });
        }).then((value) => { return value; });

    }
    if (error)
        res.status(400).send("INSERT " + Model.collection.name + FinalMsg);
    else
        res.status(200).send("INSERT " + Model.collection.name);
};
//EDIT===================================================================================
Controller.EDIT = async (Where, Json) => {
    if (typeof Json == 'undefined') {
        return new Promise((resolve, reject) => {

            Model.findOne(Where).exec(function (err, model) {
                if (err) {
                    console.log("ERROR EDIT " + Model.collection.name + JSON.stringify(Json) + err);
                    resolve(null);
                }
                else
                    resolve(model);
            })
        }).then((value) => { return value });
    }

};
//UPDATE===================================================================================
Controller.UPDATE = async (Json, res) => {
    let result = "";
    let error = false;
    for (let data in Json) {
        result += await new Promise(function (resolve, reject) {
            Model.findOneAndUpdate(Conditions(Json[data]), SetData(Json[data]), { upsert: true }, function (err, model) {
                if (err) {
                    console.log("ERROR UPDATE " + Model.collection.name + JSON.stringify(Json[data]) + err);
                    error = true;
                    resolve("ERROR UPDATE " + Model.collection.name + JSON.stringify(Json[data]) + err);
                }
                else resolve("Updated " + Json[data]);
            }).then((value) => { return value });

        });
    }

    if (error)
        res.status(400).send("UPDATE " + Model.collection.name + "  " + result);
    else
        res.status(200).send("UPDATE " + Model.collection.name);
};
// Delete===================================================================================
Controller.DELETE = async (Json, res) => {
    if (JSON.stringify(Json) === "{}") {
        Model.deleteMany({}, function (err) {
            if (err) {
                console.log("ERROR DELETE ALL " + Model.collection.name + err);
                res.status(400).send("DELETE ALL " + Model.collection.name + " \n" + err);
            }
            else
                res.status(200).send("DELETE ALL " + Model.collection.name);
        });
    }
    else {
        let FinalMsg = "";
        let error = false;


        FinalMsg += await new Promise(function (resolve, reject) {
            Model.deleteOne(Json, function (err) {
                if (err) {
                    error = true;
                    console.log("ERROR DELETE " + Model.collection.name + JSON.stringify(Json) + err);
                    resolve("ERROR DELETE " + Model.collection.name + JSON.stringify(Json) + err);
                }
                else
                    resolve("Deleted " + Json);
            });
        }).then((value) => { return value });

        if (error)
            res.status(400).send("DELETE " + Model.collection.name + " \n" + FinalMsg);
        else
            res.status(200).send("DELETE " + Model.collection.name);
    }
};




module.exports = Controller;