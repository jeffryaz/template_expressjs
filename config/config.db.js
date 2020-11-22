var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'admin',
        database: 'angular',
        port: 5432,
        statement_timeout: 100,
        connectionTimeoutMillis: 10000
    },
    pool: { min: 0, max: 7 },
    acquireConnectionTimeout: 10000,
    log: {
        warn(message) {
            console.log("warn: ", message);
        },
        error(message) {
            console.log("error: ", message);
        },
        deprecate(message) {
            console.log("deprecate: ", message);
        },
        debug(message) {
            console.log("debug: ", message);
        },
    }
});

module.exports = knex;