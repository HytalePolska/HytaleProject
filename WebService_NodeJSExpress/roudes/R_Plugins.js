
const express = require("express");

const router = express.Router({ mergeParams: true });

const premissions = require('../Plugins/Premissions/R_Premmission');



router.use('/premissions', premissions);

router.get('/', async (req, res, next) => {
  
    res.send('/premmissions');
});


module.exports = router;

