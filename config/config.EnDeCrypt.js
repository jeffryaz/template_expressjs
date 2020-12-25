const Nilai = require('./config.RegexMe')

var CryptoJS = require("crypto-js");

function decryptV1(req, res, next) {
    try {
        var bytes = CryptoJS.AES.decrypt(req.body.encrypt, Nilai.toString());
        req.body.dataDecoded = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        next();
    } catch (error) {
        return res.status(400).send({ status: 400, message: "Invalid Data" })
    }
}

function encryptV1(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), Nilai.toString()).toString();
}

module.exports = { encryptV1, decryptV1 };