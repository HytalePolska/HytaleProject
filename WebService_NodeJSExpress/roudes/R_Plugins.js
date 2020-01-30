
const express = require("express");

const router = express.Router({ mergeParams: true });

const premissions = require('../Plugins/Premissions/R_Premmission');

const login = require('../Plugins/Login/R_Login');

const kwadratowa = require('../Plugins/Kwadratowa/R_Kwadratowa');

router.use('/premissions', premissions);
router.use('/login', login);
router.use('/kwadratowa', kwadratowa);
router.get('/', async (req, res, next) => {

    res.send('/premmissions');
    res.send('/login');
});


module.exports = router;

