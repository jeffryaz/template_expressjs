require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const router = require('./routes/router');
const socket = require('./routes/socket');

var app = express();
var logFile = fs.createWriteStream('./log/log-request.log', { flags: 'a' });
app.use(cors());
app.use(logger(':remote-addr :remote-user HTTP/:http-version [:date[web]] ":method :url" :status :res[content-length] Byte - :response-time ms', { stream: logFile }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

const server = http.createServer(app);

//Path
router.init(app);
socket.init(server);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
        status: error.status || 500, message: error.message || "Internal Server Error"
    });
});

app.listen(process.env.PORT_EXPRESS, () => {
    console.log(`Service NodeJs ExpressJs ORM KnexJs with Postgresql is running on port  ${process.env.PORT_EXPRESS}`);
});
server.listen(process.env.PORT_SOCKET, () => {
    console.log(`Socket NodeJs ExpressJs ORM KnexJs with Postgresql is running on port  ${process.env.PORT_SOCKET}`);
});
