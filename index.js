var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var app = express();
app.use(logger(':remote-user [:date[web]] ":method :url" :status :response-time ms'));
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

//Path
// app.use(require('./routes/index'));
app.use(require('./controllers/contoh.contoller'));
// app.use(require('./controllers/dashboard.controller'));

app.set('port', 3738);
app.listen(app.get('port'), () => {
    console.log(`Service NodeJs Express with Postgresql is running on port  ${app.get('port')}`);
});
module.exports = app;