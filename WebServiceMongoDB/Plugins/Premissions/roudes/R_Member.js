
const express = require("express");

const router = express.Router({ mergeParams: true });

const  Member = require('../controlers/C_Member');





router.all('/',async(req,res,next) =>
{
    let plugin = await Plugin.EDIT(req.params);
    if (plugin == null) {
        res.status(404).send("This premission is not existing");
        return;
      }
      req.plugin = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})

router.all('/:PlayerID',async(req,res,next) =>
{
    let id = {"P_Name":req.params.P_Name};
    let plugin = await Plugin.EDIT(id);
    if (plugin == null) {
        res.status(404).send("This premission is not existing");
        return;
      }
      req.plugin = plugin;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})

router.get('/delete', async (req, res) => {
    await Member.DELETE(req.params, res);
});
router.get('/', async (req, res) => {
    await Member.GET(req.params, res);
});
router.put('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Member.INSERT(data, res);
});
router.delete('/:PluginID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await Member.DELETE(data, res);
});
module.exports = router;

