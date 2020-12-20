const moment = require('moment');
const knex = require('../config/config.db');
const { encryptV1, decryptV1 } = require('../config/config.EnDeCrypt');
const { isAuthenticated, getToken } = require('../config/config.Jwt');
const Response = require("../helpers/response")

class ContohController {
    static async contoh_1(req, res, next) {
        try {
            const {
                id
            } = req.body;
            var data = { token: getToken({ id: id ? id : "test" }) };
            data.encrypt = encryptV1([{ id: id ? id : "test" }]);
            return res.status(200).send(Response.success("1.0.0", 1, data));
        } catch (error) {
            next(error)
        }
    }

    static async contoh_2(req, res, next) {
        try {
            var data = await knex.select().from('employees')
            return res.status(200).send(Response.success("1.0.0", data.length, data));
        } catch (error) {
            next(error)
        }
    }
}
module.exports = ContohController;