
const express = require("express");

const router = express.Router({ mergeParams: true });

const Command = require("../Classes/Command");

const SQL_query = require('../Connectors/MySql_Connector');

const SQL_builder = require('../Tools/Sql_Builder');

const Plugin = require("../Classes/Plugins");


Initialize();

router.all('/',async(req,res,next) =>
{
    let plugin = await Plugin.GET(SQL_query,req.params);
    if (typeof plugin == 'undefined') {
        res.status(404).send("This plugin is not existing");
        return;
      }
      req.P_data = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
router.all('/:CommandID',async(req,res,next) =>
{
    let plugin = await Plugin.GET(SQL_query,req.params);
    if (typeof plugin == 'undefined') {
        res.status(404).send("This plugin is not existing");
        return;
      }
      req.P_data = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})

router.get('/', async (req, res, next) => {
    
    await Command.GET(SQL_query,req,res);
});

router.get('/:C_Name', async (req, res, next) => {
  
      let data = [];
      data["PluginID"] = req.P_data.PluginID;
      data["C_Name"] = req.params.C_Name;
    await Command.GET(SQL_query,data, res);
 });

router.put('/', async (req, res, next) => {
   
   let data  = [];
    data["PluginID"] = req.P_data.PluginID;
    data["C_Name"] =  req.body.C_Name;
    data["C_Description"] =req.body.C_Description;
   await Command.PUT(SQL_query,data, res);

});

router.post('/', async (req, res, next) => {
    let data  = [];
    data["PluginID"] =  req.P_data.PluginID;
    data["C_Name"] =  req.body.C_Name;
    data["C_Description"] =req.body.C_Description;
   await Command.POST(SQL_query,data, res);
});

router.delete('/:CommandName', async (req, res, next) => {
    let data  = [];
    data["PluginID"] = req.P_data.PluginID;
    data["C_Name"] =  req.params.CommandName;
   
    await Command.DELETE(SQL_query,data, res);
});
router.delete('/', async (req, res, next) => {
    await Command.DELETE(SQL_query,req.P_data, res);
});
async function Initialize()
{

    let filds=[];
    this.CommandID='';
    this.PluginID = '';
    this.C_Name = '';
    this.C_Description = '';
    filds.push("CommandID INT AUTO_INCREMENT PRIMARY KEY");
    filds.push("PluginID INT NOT NULL");
    filds.push("C_Name VARCHAR(50) NOT NULL");
    filds.push("C_Description  VARCHAR(50)");
    
    let Table = new SQL_builder().CreateTable("S_Commands").TableFilds(filds).Get();

     await SQL_query(Table);
  
}


module.exports = router;

