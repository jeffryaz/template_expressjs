const file = require('../routes/file');
const ContohControllerWs = require('../controllerWs/contoh.controllerWs');

const stomp = {
    init(stompServer) {
        ContohControllerWs.contoh_1(stompServer);
    },
};

module.exports = stomp;