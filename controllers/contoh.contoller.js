const router = require('express').Router();
const moment = require('moment');
const client = require('../config/config.db');
const { encryptV1, decryptV1 } = require('../config/config.EnDeCrypt');
const { isAuthenticated, getToken } = require('../config/config.Jwt');

router.post('/path', async (req, res) => {
    // var encryptReq = req.body.encrypt;
    // var data = decryptV1(encryptReq);
    // if (data.length > 0) {
    client
        .query(`SELECT * FROM orders`)
        .then(result => {
            return res.status(200).send(result);
        })
        .catch(error => {
            return res.status(400).send({ status: 400, message: error })
        });
    // } else {
    //     return res.status(400).send({ status: 400, message: "Invalid Data" })
    // }
})
module.exports = router;