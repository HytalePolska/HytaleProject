


/*const SQL_query = require('../Connectors/MySql_Connector');

const SQL_builder = require('../Tools/Sql_Builder');

const premissions = require('../Plugins/Premissions/R_Premmission');

const plugin = require('../Classes/Plugins');

const login = require('../Plugins/Login/R_Login');

const kwadratowa = require('../Plugins/Kwadratowa/R_Kwadratowa');

const commands = require('./R_Command');

const fields = require('./../Plugins/Field/R_FieldMain');

router.use('/login', login);
router.use('/kwadratowa', kwadratowa);
router.use('/premissions', premissions);
router.use('/fields', fields);
router.use('/:P_Name/commands', commands);
*/
const express = require("express");

const router = express.Router({ mergeParams: true });

const CPlugin = require('../Controlers/C_Plugin');


router.get('/',async (req, res) => {
    await CPlugin.GET(req.params,res);
});
router.get('/:P_Name', async (req, res) => {
    let data =  JSON.parse(JSON.stringify(req.body))[0]
    await CPlugin.GET(data,res);
});
router.put('/', async (req, res) => {
    let data =  JSON.parse(JSON.stringify(req.body));
    await CPlugin.INSERT(data,res);
});
router.post('/', async (req, res) => {
    let data =  JSON.parse(JSON.stringify(req.body));
    await CPlugin.UPDATE(data,res);
    
});
router.delete('/:PluginID', async (req, res) => {
    let data =  JSON.parse(JSON.stringify(req.body));
    await CPlugin.DELETE(data,res);
});
module.exports = router;

