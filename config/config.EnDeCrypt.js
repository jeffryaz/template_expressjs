const Nilai = require('./config.RegexMe')

var CryptoJS = require("crypto-js");

function decryptV1(data) {
    try {
        var bytes = CryptoJS.AES.decrypt(data, Nilai.toString());
        return [JSON.parse(bytes.toString(CryptoJS.enc.Utf8))];
    } catch (error) {
        return [];
    }
}

function encryptV1(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), Nilai.toString()).toString();
}

module.exports = { encryptV1, decryptV1 };