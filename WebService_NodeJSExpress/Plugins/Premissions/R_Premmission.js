
const express = require("express");

const router = express.Router({ mergeParams: true });

const Group = require("../../Classes/Group/Group");

const SQL_query = require('../../Connectors/MySql_Connector');


////////////////////Dodawanie Premisji///////////////////////////////
router.get('/', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    await Group.GET(SQL_query,get_data, res);
});
router.get('/:GroupID', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;

    await Group.GET(SQL_query,get_data,res);
 
});
router.put('/', async (req, res, next) => {
    req.body.G_Type = "Premission";
    await Group.PUT(SQL_query, req.body, res);
});
router.post('/:GroupID', async (req, res, next) => {

    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["Name"] = req.params.GroupID;

    let result = Group.GET(SQL_query,get_data);
     
    get_data = [];
    get_data["GroupID"] = result[0].G_GroupID;
    get_data["Name"] = req.body.G_Name;

    await Group.POST(SQL_query, get_data, res);
});
router.delete('/', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    await Group.DELETE(SQL_query,get_data, res);
});
router.delete('/:GroupID', async (req, res, next) => {
    let get_data = [];
    get_data["Type"] = "Premission";
    get_data["GroupID"] = req.params.G_GroupID;
    await Group.DELETE(SQL_query, get_data, res);
});
////////////////////Dodawanie Graczy dla Premissji///////////////////////////////
router.get('/:GroupID/players/:PlayerID', async (req, res, next) => {
    console.log(req.params);
    await Group.GET(SQL_query,req.query, res);
});
router.put('/:GroupID/players', async (req, res, next) => {
    await Group.PUT(SQL_query, req.body, res);
});
router.post('/:GroupID/players', async (req, res, next) => {
    await Group.POST(SQL_query, req.body, res);
});
router.delete('/:GroupID/players/:PlayerID', async (req, res, next) => {
    console.log(req.params);
    await Group.DELETE(SQL_query, req.params, res);
});
////////////////////Dodawanie Komand Premissji///////////////////////////////


module.exports = router;

