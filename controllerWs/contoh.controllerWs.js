
class ContohControllerWs {
    static async contoh_1(stompServer) {
        try {
            // menerima dari send
            stompServer.subscribe("/sample", function (msg, headers) {
                var topic = headers.destination;
                console.log(`topic:${topic} messageType: ${typeof msg}`, msg, headers);
                console.log(topic, "->", msg);
            });
            // mengikirkan ke subscribe
            // stompServer.send('/sample', headers, msg)
        } catch (error) {
            console.log('error');
        }
    }
}
module.exports = ContohControllerWs;