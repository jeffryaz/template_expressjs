var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var fs = require("fs");

var app = express();
var logFile = fs.createWriteStream('./log/log-request.log', { flags: 'a' });
app.use(logger(':remote-addr :remote-user HTTP/:http-version [:date[web]] ":method :url" :status :res[content-length] Byte - :response-time ms', { stream: logFile }));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

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

app.set('port', 3739);
app.listen(app.get('port'), () => {
    console.log(`Service NodeJs ExpressJs ORM KnexJs with Postgresql is running on port  ${app.get('port')}`);
});
module.exports = app;