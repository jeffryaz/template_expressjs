const socketIo = require("socket.io");

const socket = {
    init(server) {
        const io = socketIo(server, {
            cors: {
                // origin: ["http://localhost:3000", "http://192.168.0.168:3000"],
                origin: 'http://localhost:3739',
                methods: ["GET", "POST"],
                credentials: true
            },
        });

        io.on("connection", (socket) => {
            // socket.on("notification", (user_id) => {
            //     const temp = io.data ? io.data : [];
            //     temp.push({ socket_id: socket.id, user_id: user_id });
            //     io.data = temp;
            //     notification(socket, io);
            // });
            // socket.on("send_notif", () => {
            //     if (io && io.data && io.data.length > 0) {
            //         io.data.forEach(function (arrayItem) {
            //             notification_2(io, arrayItem.socket_id, arrayItem.user_id);
            //         });
            //     }
            // });
            socket.on("disconnect", () => {
                temp = io.data ? io.data : [];
                temp2 = temp.filter(function (obj) {
                    return obj.socket_id !== socket.id;
                });
                io.data = temp2;
            });
        });
    },
};

module.exports = socket;