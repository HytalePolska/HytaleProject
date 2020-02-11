var express = require('express');
var router = express.Router();
var user = require("../Controlers/C_User");

// Get all employees
router.get('/', function (req, res) {
    user.GET(req.body, res);
});

// Get single employee by id
router.get('/:PlayerID', function (req, res) {
    user.GET(req.params, res);
});
router.put('/', function (req, res) {
    let data = JSON.parse(JSON.stringify(req.body));
    user.INSERT(data, res);
});
// Edit update
router.post('/', function (req, res) {
    let data = JSON.parse(JSON.stringify(req.body));
    user.UPDATE(data, res);
});
// Edit update
router.delete('/', function (req, res, next) {
    let data = JSON.parse(JSON.stringify(req.body));
    user.DELETE(data, res);
});
module.exports = router;