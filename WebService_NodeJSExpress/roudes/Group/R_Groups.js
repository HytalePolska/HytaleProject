
const express = require("express");

const router = express.Router();

const Group = require(".../classes/Group/Group");

const Memebers = require("./R_Members");

router.use("/Memebers",Memebers);

router.get('/', async (req, res, next) => {
    await Group.GET(SQL_query, req.body, res);
});

router.get('/:GroupID', async (req, res, next) => {
    await Group.GET(SQL_query, req.params, res);
});

router.put('/', async (req, res, next) => {
    await Group.PUT(SQL_query, req.body, res);
});

router.post('/', async (req, res, next) => {
    await Group.POST(SQL_query, req.body, res);
});

router.delete('/:GroupID', async (req, res, next) => {
    await Group.DELETE(SQL_query, req.params, res);
});




module.exports = router;

