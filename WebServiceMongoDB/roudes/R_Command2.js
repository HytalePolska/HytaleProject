var express = require('express');
var router = express.Router();
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
router.all('/:CommandID',async(req,res,next) =>
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

router.get('/', async (req, res, next) => {
    console.log(req.plugin);
    await Command.GET(req.plugin,res);
});

module.exports = router;