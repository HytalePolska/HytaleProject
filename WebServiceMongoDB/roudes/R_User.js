var express = require('express');
var router = express.Router();
var user = require("../Controlers/C_User");

// Get all employees
router.get('/', async (req, res) => {
    await user.GET(req.body, res);
});
//deleteall
router.get('/delete', async (req, res) => {
    await user.DELETE(req.params, res);
});
// Get single employee by id
router.get('/:PlayerID', async (req, res) => {
    await user.GET(req.params, res);
});
router.put('/', async (req, res) => {

    let data = JSON.parse(JSON.stringify(req.body));
    await user.INSERT(data, res);
});
// Edit update
router.post('/', async (req, res) => {

    let data = JSON.parse(JSON.stringify(req.body));
    await user.UPDATE(data, res);
});
// Edit update
router.delete('/:PlayerID', async (req, res) => {
    let data = JSON.parse(JSON.stringify(req.params));
    await user.DELETE(data, res);
});


module.exports = router;