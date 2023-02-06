require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const fs = require("fs");
const http = require("http");
const router = require('./routes/router');
const socket = require('./routes/socket');
const stomp = require('./routes/stomp');
const StompServer = require('stomp-broker-js');

var app = express();
var logFile = fs.createWriteStream('./log/log-request.log', { flags: 'a' });
app.use(cors());
app.use(logger(':remote-addr :remote-user HTTP/:http-version [:date[web]] ":method :url" :status :res[content-length] Byte - :response-time ms', { stream: logFile }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());

router.init(app);

app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).send({
        status: error.status || 500, message: error.message || "Internal Server Error"
    });
});

const file = async () => {

    // const path = require('path');
    // const fs = require('fs');

    // const zipper = require('zip-local');
    // zipper.sync.zip(path.join(__dirname, 'documents/temps/')).compress().save(path.join(__dirname, 'documents/zip/pack.zip'));
    // const unzip = zipper.sync.unzip(path.join(__dirname, 'documents/zip/pack.zip'));
    // const unzipped = await unzip.memory();
    // var files = unzipped.contents();
    // console.log("unzipped", files);
    // const removeFile = ['Vendor experience.xlsx', '1.jpg'];
    // const listfile = files.filter(element => removeFile.findIndex(item => item === element) !== -1);
    // console.log("listfile", listfile);
    // listfile.forEach(function (file) {
    // if (!notExecRegExp.test(file))
    // unzip.lowLevel().remove('2.jpg');
    // unzip.lowLevel().remove('1.jpg');
    // const buffer = fs.readFileSync(path.join(__dirname, 'documents/temps/2.jpg'));
    // unzip.lowLevel().file('2.jpg', buffer);
    // // // });
    // var cleanUnzippedFS = unzip.memory();
    // console.log("cleanUnzippedFS", cleanUnzippedFS);
    // zipper.sync.zip(cleanUnzippedFS).compress().save(path.join(__dirname, 'documents/zip/pack.zip'));

}

file()
// zipper.unzip(path.join(__dirname, 'documents/zip/pack.zip'), function (error, unzipped) {

//     if (error) {
//         console.log("ERROR: %s", error.message);
//         return;
//     }

//     var unzippedFS = unzipped.memory();
//     console.log("unzipped", unzipped);
//     var files = unzippedFS.contents();
//     var notExecRegExp = new RegExp(/^[^.]+$|\.(?!(sh|exe|bat)$)([^.]+$)/);

//     files.forEach(function (file) {
//         if (!notExecRegExp.test(file))
//             unzipped.lowLevel().remove(file);
//     });

//     var cleanUnzippedFS = unzipped.memory();

//     // re-zip the clean ZippedFS
//     // zipper.zip(cleanUnzippedFS, function(zipped) {

//     //     zipped.save("package.zip", function(error) {
//     //         if(error) {
//     //             console.log("ERROR: %s", error.message);
//     //         }
//     //         else {
//     //             console.log("The file is scanned and cleaned of executables");
//     //         }
//     //     });
//     // });
// });

const server = http.createServer(app);
socket.init(server);

const stompServer = new StompServer({
    server: server,
    debug: console.log,
    path: '/ws',
    protocol: 'sockjs',
    heartbeat: [10000, 10000]
});

stomp.init(stompServer)

server.listen(process.env.PORT_EXPRESS, () => {
    console.log(`Service NodeJs ExpressJs ORM KnexJs with Postgresql is running on port  ${process.env.PORT_EXPRESS}`);
});

module.exports = { stompServer };



// dipakai jika port bisa lebih dari 1. dak tidak perlu stomp-broker
// server.listen(process.env.PORT_SOCKET, () => {
//     console.log(`Socket NodeJs ExpressJs ORM KnexJs with Postgresql is running on port  ${process.env.PORT_SOCKET}`);
// });
