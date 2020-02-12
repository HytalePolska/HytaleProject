var express = require('express');
var router = express.Router();
var user = require("../Controlers/C_User");

// Get all employees
router.get('/', function (req, res) {
    user.GET(req.body, res);
});

// Get single employee by id
router.get('/:PlayerID', async (req, res) =>{
   await  user.GET(req.params, res);
});
router.put('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body))[0]
    await   user.INSERT(data, res);
});
// Edit update
router.post('/', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.body));
    await user.UPDATE(data, res);
});
// Edit update
router.delete('/',  async (req, res) =>{
    let data = JSON.parse(JSON.stringify(req.body));
    await   user.DELETE(data, res);
});
module.exports = router;