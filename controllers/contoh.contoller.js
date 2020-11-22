const router = require('express').Router();
const moment = require('moment');
const knex = require('../config/config.db');
const { encryptV1, decryptV1 } = require('../config/config.EnDeCrypt');
const { isAuthenticated, getToken } = require('../config/config.Jwt');

router.post('/path', isAuthenticated, decryptV1, async (req, res) => {
    var data = await knex.select().from('employees')
    return res.status(200).send(data);
})

router.get('/get', async (req, res) => {
    var data = { token: getToken({ id: "test" }) };
    data.encrypt = encryptV1([{ id: "test" }]);
    return res.status(200).send(data);
})
module.exports = router;