var express = require('express');
const router = express.Router({ mergeParams: true });
var Command = require("../Controlers/C_Command");
var Plugin = require("../Controlers/C_Plugin");


router.all('/',async(req,res,next) =>
{
    let plugin = await Plugin.EDIT(req.params);
    if (plugin == null) {
        res.status(404).send("This plugin is not existing");
        return;
      }
      req.plugin = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})

router.all('/:C_Name',async(req,res,next) =>
{
    let id = {"P_Name":req.params.P_Name};
    let plugin = await Plugin.EDIT(id);
    if (plugin == null) {
        res.status(404).send("This plugin is not existing");
        return;
      }
      req.plugin = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
router.get('/', async (req, res) => {
 
    let where = {"PluginID":String(req.plugin._id)}
      
    await Command.GET(where,res);
});
router.get('/:C_Name', async (req, res) => {
  
    let where = { "PluginID":req.plugin._id,"C_Name":req.params.C_Name};
    await Command.GET(where,res);
});
router.put('/', async (req, res) => {
  
    let data = req.body;
    data.PluginID = String(req.plugin._id);
    let list = {data};
  await Command.INSERT(list,res);
});
router.delete('/', async (req, res) => {
  
    let where = { "PluginID":req.plugin._id}
    await Command.DELETE(where,res);
});
router.delete('/:C_Name', async (req, res) => {
  
    let where = { "PluginID":req.plugin._id,"C_Name":req.params.C_Name};
    await Command.DELETE(where,res);
});
module.exports = router;