const Nilai = require('./config.RegexMe');
var jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                var sendRespons = { status: 401, data: null, message: "Please check token" };
                return res.status(401).send(sendRespons);
            } else {
                jwt.verify(authorization[1], Nilai, (error, decoded) => {
                    if (error) return res.status(200).send({ status: 503, message: error.message });
                    req.decoded = decoded; // menyimpan decoded ke req.decoded
                    next();
                });
            }
        } catch (err) {
            var sendRespons = { status: 401, data: null, message: "Please check token" };
            return res.status(401).send(sendRespons);
        }
    } else {
        var sendRespons = { status: 403, data: null, message: "No token provided" };
        return res.status(403).send(sendRespons);
    }
}

function getToken(data) {
    var token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (300 * 60), data: data }, Nilai, { algorithm: 'HS384' });
    return token;
}

module.exports = { isAuthenticated, getToken };