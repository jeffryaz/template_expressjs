var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fs = require("fs");
const socketIo = require("socket.io");
const http = require("http");

var app = express();
var logFile = fs.createWriteStream('./log/log-request.log', { flags: 'a' });
app.use(logger(':remote-addr :remote-user HTTP/:http-version [:date[web]] ":method :url" :status :res[content-length] Byte - :response-time ms', { stream: logFile }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use((req, res, next) => {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Path
// app.use(require('./routes/index'));
app.use(require('./routes/contoh'));
// app.use(require('./controllers/dashboard.controller'));

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
        status: error.status || 500, message: error.message || "Internal Server Error"
    });
});

const server = http.createServer(app);
const io = socketIo(server, {
    transports: ['websocket', 'polling', 'flashsocket'],
    cors: {
        origin: "*",
        credentials: true
    }
});
let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

const port = process.env.PORT || 3739;
server.listen(port, () => {
    console.log(`Service NodeJs ExpressJs ORM KnexJs with Postgresql is running on port  ${port}`);
});
module.exports = server;