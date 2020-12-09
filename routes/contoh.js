const router = require("express").Router();
const ContohController = require("../controllers/contoh.contoller");
const { isAuthenticated, getToken } = require('../config/config.Jwt');

router.post('/get', ContohController.contoh_1)
router.post('/path', isAuthenticated, ContohController.contoh_2)

module.exports = router