const router = require("express").Router();
const ContohController = require("../controllers/contoh.contoller");
const { isAuthenticated, getToken } = require('../config/config.Jwt');
const { encryptV1, decryptV1 } = require('../config/config.EnDeCrypt');

router.get('/', ContohController.contoh_3)
router.post('/get', ContohController.contoh_1)
router.post('/path', isAuthenticated, decryptV1, ContohController.contoh_2)

module.exports = router