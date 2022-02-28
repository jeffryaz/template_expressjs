const file = require('../routes/file');
const contoh = require('../routes/contoh');

const router = {
    init(app) {
        app.use("/files", file);
        app.use("/", contoh);
        // app.use(error);
    },
};

module.exports = router;