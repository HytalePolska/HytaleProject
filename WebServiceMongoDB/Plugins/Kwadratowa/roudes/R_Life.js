
const express = require("express");

const router = express.Router({ mergeParams: true });

const  Cmds = require('../controlers/C_Death');

const Commands = require('../../../Controlers/C_Command');

const Premission = require('../controlers/C_PlayerData');

router.all('/',async(req,res,next) =>
{
    let data = await Premission.EDIT(req.params);
    if (data == null) {
        res.status(404).send("This premission is not existing");
        return;
      }
      req.data = data;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})

router.all('/:C_Name',async(req,res,next) =>
{
    let id = {"P_Name":req.params.P_Name};
    
    let data = await Premission.EDIT(id);
    
    if (data == null) {
        res.status(404).send("This premission is not existing");
        return;
      }

      let Cmd_id = {"C_Name":req.params.C_Name};
      
      let Cmd_data = await Commands.EDIT(Cmd_id);
      if (Cmd_data == null) {
          res.status(404).send("This command is not existing");
          return;
        } 

      req.data = data;
      req.data2 = Cmd_data;
      req.body = JSON.parse(JSON.stringify(req.body))[0];
      next();
})
router.get('/', async (req, res) => {
    await Cmds.GET(req.params, res);
});
router.get('/:C_Name', async (req, res) => {
    let where = {"PremissionID":String(req.data._id),"C_Name":req.params.C_Name}
    await Cmds.GET(where, res);
});
router.put('/:C_Name', async (req, res) => {
      let data_to_insert = {
        CommandID: req.data2._id,
        PremissionID:req.data._id,
        C_Name: req.data2.C_Name,
        P_Name:req.data.P_Name

      }
    await Cmds.INSERT({data_to_insert}, res);
});
router.delete('/:C_Name', async (req, res) => {
    let where = {"PremissionID":String(req.data._id),"C_Name":req.params.C_Name}
    await Cmds.DELETE(where, res);    

});
module.exports = router;

