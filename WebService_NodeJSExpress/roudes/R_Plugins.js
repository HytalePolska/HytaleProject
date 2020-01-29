
const express = require("express");

const router = express.Router({ mergeParams: true });

const premissions = require('../Plugins/Premissions/R_Premmission');

const login = require('../Plugins/Login/R_Login');


router.use('/premissions', premissions);
router.use('/login', login);
router.get('/', async (req, res, next) => {

    res.send('/premmissions');
    res.send('/login');
});


module.exports = router;

